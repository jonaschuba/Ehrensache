import { Ticket, ChevronRight } from 'lucide-react'
import type { Coupon } from '../types'
import { currentUser } from '../data/user'

interface CouponCardProps {
  coupon: Coupon
  onRedeem?: () => void
}

export default function CouponCard({ coupon, onRedeem }: CouponCardProps) {
  const userPoints = currentUser.ehrenpunkte
  const progress = Math.min((userPoints / coupon.pointsRequired) * 100, 100)
  const missing = Math.max(coupon.pointsRequired - userPoints, 0)
  const canRedeem = userPoints >= coupon.pointsRequired

  return (
    <div className="bg-surface-container-lowest rounded-lg p-4 card-ambient">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: coupon.color + '22', color: coupon.color }}>
          <Ticket size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-xs text-on-surface-variant font-medium truncate">{coupon.partner}</p>
          <p className="font-headline text-sm font-bold text-on-surface truncate">{coupon.name}</p>
        </div>
        <span className="font-label text-xs font-bold" style={{ color: coupon.color }}>
          {coupon.pointsRequired} EP
        </span>
      </div>

      <div className="mt-2.5">
        <div className="flex justify-between font-body text-xs mb-1.5">
          <span className="text-on-surface-variant">{canRedeem ? 'Einlösbar!' : `Noch ${missing} EP`}</span>
          <span className="font-semibold text-on-surface">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-surface-container rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: coupon.color }}
          />
        </div>
      </div>

      {canRedeem && (
        <button
          onClick={onRedeem}
          className="mt-3 w-full flex items-center justify-center gap-1 font-label text-xs font-bold py-2 rounded-full text-white"
          style={{ background: coupon.color }}
        >
          Jetzt einlösen <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
}
