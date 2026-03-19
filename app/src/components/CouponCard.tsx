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
    <div className="coupon-card" style={{ '--coupon-color': coupon.color } as React.CSSProperties}>
      <div className="coupon-header">
        <div className="coupon-icon" style={{ background: coupon.color + '22', color: coupon.color }}>
          <Ticket size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 font-medium truncate">{coupon.partner}</p>
          <p className="text-sm font-bold text-slate-800 truncate">{coupon.name}</p>
        </div>
        <span className="text-xs font-bold" style={{ color: coupon.color }}>
          {coupon.pointsRequired} EP
        </span>
      </div>

      <div className="mt-2.5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-500">{canRedeem ? 'Einlösbar!' : `Noch ${missing} EP`}</span>
          <span className="font-semibold text-slate-700">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: coupon.color }}
          />
        </div>
      </div>

      {canRedeem && (
        <button
          onClick={onRedeem}
          className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-lg text-white"
          style={{ background: coupon.color }}
        >
          Jetzt einlösen <ChevronRight size={14} />
        </button>
      )}
    </div>
  )
}
