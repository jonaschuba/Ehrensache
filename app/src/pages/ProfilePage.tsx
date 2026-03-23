import { ChevronRight, Award, Briefcase, GraduationCap, Star, Handshake } from 'lucide-react'
import { currentUser } from '../data/user'
import { coupons } from '../data/coupons'
import { ehrensachen } from '../data/ehrensachen'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import HorizontalScroll from '../components/HorizontalScroll'

function getSuggestedEhrensache(pointsNeeded: number) {
  return ehrensachen.find((e) => e.points >= pointsNeeded * 0.5 && e.status === 'swipe')
    ?? ehrensachen.find((e) => e.status === 'swipe')
}

const couponImages: Record<string, string> = {
  cp1: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=200&fit=crop&q=80',
  cp2: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&h=200&fit=crop&q=80',
  cp3: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop&q=80',
  cp4: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop&q=80',
  cp5: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop&q=80',
}

const completedCount = ehrensachen.filter((e) => e.status === 'completed').length +
  currentUser.experience.length

export default function ProfilePage() {
  const [redeemed, setRedeemed] = useState<string[]>([])
  const [redeemToast, setRedeemToast] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleRedeem = (couponId: string, couponName: string) => {
    setRedeemed((prev) => [...prev, couponId])
    setRedeemToast(couponName)
    setTimeout(() => setRedeemToast(null), 2500)
  }

  const nextCoupon = coupons
    .filter((c) => c.pointsRequired > currentUser.ehrenpunkte && !redeemed.includes(c.id))
    .sort((a, b) => a.pointsRequired - b.pointsRequired)[0]
  const suggestedEhrensache = nextCoupon
    ? getSuggestedEhrensache(nextCoupon.pointsRequired - currentUser.ehrenpunkte)
    : null

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-surface" style={{ scrollbarWidth: 'none' }}>
      {/* Ehrensache Logo - only on Profile */}
      <div className="px-5 pt-6 pb-3 shrink-0 flex items-center gap-2">
        <Handshake size={22} className="text-primary" strokeWidth={2.5} />
        <span className="font-headline text-lg font-bold text-primary tracking-wide">Ehrensache</span>
      </div>

      {/* Profile header */}
      <div className="px-5 pb-6 flex flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-surface-container">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary text-[10px] font-label font-bold px-2 py-0.5 rounded-full">
            #{currentUser.rankingpunkte.toLocaleString()}
          </span>
        </div>
        <h2 className="font-headline text-xl font-extrabold text-on-surface mb-1">{currentUser.name}</h2>
        <div className="flex items-center gap-1.5 bg-secondary-container rounded-full px-3 py-1">
          <Star size={12} className="text-secondary fill-secondary" />
          <span className="font-label text-sm font-bold text-on-surface">{currentUser.ehrenpunkte.toLocaleString()} Ehrenpunkte</span>
        </div>
      </div>

      {/* Rewards / Coupons */}
      <div className="pb-4">
        <SectionHeader title="Deine Belohnungen" action="Alle ansehen" className="px-5 mb-3" />
        <HorizontalScroll className="pl-5">
            {coupons.map((coupon) => {
              const userPoints = currentUser.ehrenpunkte
              const progress = Math.min((userPoints / coupon.pointsRequired) * 100, 100)
              const canRedeem = userPoints >= coupon.pointsRequired && !redeemed.includes(coupon.id)
              const imgSrc = couponImages[coupon.id]

              return (
                <div key={coupon.id} className="w-48 bg-surface-container-lowest rounded-lg overflow-hidden shrink-0 card-ambient">
                  <div className="h-20 overflow-hidden relative">
                    {imgSrc && <img src={imgSrc} alt="" className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-2 left-2.5 badge-label bg-surface-container-lowest/80 text-on-surface">
                      {coupon.category}
                    </span>
                  </div>
                  <div className="p-3.5">
                    <p className="font-headline text-sm font-bold text-on-surface mb-1">{coupon.name}</p>
                    <p className="font-body text-xs text-on-surface-variant mb-2">{coupon.description}</p>
                    <div className="mb-1.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-body text-[10px] text-on-surface-variant">Fortschritt</span>
                        <span className="font-label text-[10px] font-bold text-on-surface-variant">
                          {Math.min(userPoints, coupon.pointsRequired)} / {coupon.pointsRequired} Pkt.
                        </span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    {canRedeem && (
                      <button
                        onClick={() => handleRedeem(coupon.id, coupon.name)}
                        className="mt-2 w-full py-2 bg-primary text-on-primary text-xs font-label font-bold rounded-full"
                      >
                        Jetzt einlösen
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
        </HorizontalScroll>

        {/* Suggested Ehrensache */}
        {nextCoupon && suggestedEhrensache && (
          <div className="mx-5 mt-3 rounded-md overflow-hidden bg-primary/5 flex items-center p-3 gap-3">
            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <p className="font-body text-xs text-on-surface flex-1">
              Mach diese Ehrensache, um dein Ziel zu erreichen:{' '}
              <span className="font-semibold">{suggestedEhrensache.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Profile sections */}
      <div className="px-5 pb-8 space-y-2">
        <SectionHeader title="Mein Profil" className="mb-3" />

        <ProfileSection
          title="Fähigkeiten"
          icon={<Award size={14} className="text-on-surface-variant" />}
          expanded={expanded === 'skills'}
          onToggle={() => setExpanded(expanded === 'skills' ? null : 'skills')}
        >
          <div className="flex flex-wrap gap-1.5 pt-2">
            {currentUser.skills.map((s) => (
              <span key={s} className="bg-surface-container text-on-surface-variant text-xs font-body font-medium px-3 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection
          title="Zertifikate"
          icon={<GraduationCap size={14} className="text-on-surface-variant" />}
          expanded={expanded === 'certs'}
          onToggle={() => setExpanded(expanded === 'certs' ? null : 'certs')}
        >
          <ul className="pt-2 space-y-2">
            {currentUser.certificates.map((c) => (
              <li key={c} className="flex items-center gap-2 font-body text-sm text-on-surface">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </ProfileSection>

        <div className="bg-surface-container-lowest rounded-md px-4 py-4 flex items-center gap-3 card-ambient">
          <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center">
            <Briefcase size={16} className="text-on-surface-variant" />
          </div>
          <div className="flex-1">
            <p className="font-headline text-sm font-semibold text-on-surface">Meine Erfahrung</p>
            <p className="font-body text-xs text-on-surface-variant">{completedCount} Projekte abgeschlossen</p>
          </div>
          <ChevronRight size={16} className="text-outline" />
        </div>
      </div>

      <AnimatePresence>
        {redeemToast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="absolute bottom-20 left-5 right-5 z-50 bg-inverse-surface text-inverse-on-surface px-5 py-3.5 rounded-lg font-label text-sm font-semibold text-center"
          >
            "{redeemToast}" eingelöst
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfileSection({
  title, icon, expanded, onToggle, children,
}: {
  title: string
  icon: React.ReactNode
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface-container-lowest rounded-md overflow-hidden card-ambient">
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-4 py-4">
        <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0">{icon}</span>
        <span className="flex-1 text-left font-headline text-sm font-semibold text-on-surface">{title}</span>
        <ChevronRight size={15} className={`text-outline transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
