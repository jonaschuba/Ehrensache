import { Zap, TrendingUp, ChevronRight, Award, Briefcase, GraduationCap, Edit3 } from 'lucide-react'
import { currentUser } from '../data/user'
import { coupons } from '../data/coupons'
import { ehrensachen } from '../data/ehrensachen'
import CouponCard from '../components/CouponCard'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const levelColors = [
  '', // 0
  '#94A3B8', // 1
  '#64748B', // 2
  '#D97706', // 3
  '#2563EB', // 4 - current
  '#7C3AED', // 5
  '#DC2626', // 6
  '#EA580C', // 7
  '#059669', // 8
]

function getSuggestedEhrensache(pointsNeeded: number) {
  return ehrensachen.find((e) => e.points >= pointsNeeded * 0.5 && e.status === 'swipe')
    ?? ehrensachen.find((e) => e.status === 'swipe')
}

export default function ProfilePage() {
  const [redeemed, setRedeemed] = useState<string[]>([])
  const [redeemToast, setRedeemToast] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handleRedeem = (couponId: string, couponName: string) => {
    setRedeemed((prev) => [...prev, couponId])
    setRedeemToast(couponName)
    setTimeout(() => setRedeemToast(null), 2500)
  }

  const userColor = levelColors[currentUser.level] ?? '#2563EB'
  const progressPct = (currentUser.ehrenpunkte / currentUser.nextLevelPoints) * 100

  // Find closest coupon not yet reachable
  const nextCoupon = coupons
    .filter((c) => c.pointsRequired > currentUser.ehrenpunkte && !redeemed.includes(c.id))
    .sort((a, b) => a.pointsRequired - b.pointsRequired)[0]
  const suggestedEhrensache = nextCoupon
    ? getSuggestedEhrensache(nextCoupon.pointsRequired - currentUser.ehrenpunkte)
    : null

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 pt-10 pb-6 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
          style={{ background: userColor }}
        />
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg"
              style={{ background: userColor }}
            >
              {currentUser.initials}
            </div>
            <div>
              <h2 className="text-white font-black text-lg">{currentUser.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: userColor + '55' }}
                >
                  Lvl {currentUser.level} · {currentUser.levelName}
                </span>
              </div>
            </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Edit3 size={15} className="text-white" />
          </button>
        </div>

        {/* Points overview */}
        <div className="grid grid-cols-2 gap-3 mt-5 relative z-10">
          <div className="bg-white/10 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-xs text-slate-300 font-medium">Ehrenpunkte</span>
            </div>
            <p className="text-2xl font-black text-white">{currentUser.ehrenpunkte.toLocaleString()}</p>
            <div className="mt-1.5 h-1 bg-white/20 rounded-full">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${Math.min(progressPct, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">von {currentUser.nextLevelPoints} für Lvl {currentUser.level + 1}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={13} className="text-green-400" />
              <span className="text-xs text-slate-300 font-medium">Rankingpunkte</span>
            </div>
            <p className="text-2xl font-black text-white">{currentUser.rankingpunkte.toLocaleString()}</p>
            <p className="text-xs text-slate-400 mt-2.5">Kumuliert · steigt nie</p>
          </div>
        </div>
      </div>

      {/* Coupons */}
      <div className="px-4 mt-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-800">🎁 Belohnungen</h2>
          <button className="text-xs text-primary font-semibold">Alle</button>
        </div>
        <div className="overflow-x-auto -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {coupons.map((coupon) => (
              <div key={coupon.id} className="w-52">
                <CouponCard
                  coupon={coupon}
                  onRedeem={() => handleRedeem(coupon.id, coupon.name)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion */}
        {nextCoupon && suggestedEhrensache && (
          <div className="mt-3 bg-primary-light rounded-2xl p-3.5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: suggestedEhrensache.gradient }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-bold">💡 Für {nextCoupon.name}</p>
              <p className="text-xs text-slate-700 mt-0.5">
                Mach <span className="font-semibold">"{suggestedEhrensache.name}"</span> — bringt dir{' '}
                <span className="font-bold text-primary">{suggestedEhrensache.points} EP</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Personal data */}
      <div className="px-4 space-y-2">
        <h2 className="text-sm font-bold text-slate-800 mb-3">👤 Mein Profil</h2>

        <ProfileSection
          id="skills"
          title="Skills"
          icon={<Award size={16} className="text-primary" />}
          expanded={expanded === 'skills'}
          onToggle={() => setExpanded(expanded === 'skills' ? null : 'skills')}
        >
          <div className="flex flex-wrap gap-2 pt-2">
            {currentUser.skills.map((s) => (
              <span key={s} className="bg-primary-light text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </ProfileSection>

        <ProfileSection
          id="experience"
          title="Erfahrung"
          icon={<Briefcase size={16} className="text-secondary" />}
          expanded={expanded === 'experience'}
          onToggle={() => setExpanded(expanded === 'experience' ? null : 'experience')}
        >
          <ul className="pt-2 space-y-1.5">
            {currentUser.experience.map((e) => (
              <li key={e} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </ProfileSection>

        <ProfileSection
          id="certs"
          title="Zertifikate"
          icon={<GraduationCap size={16} className="text-amber-600" />}
          expanded={expanded === 'certs'}
          onToggle={() => setExpanded(expanded === 'certs' ? null : 'certs')}
        >
          <ul className="pt-2 space-y-1.5">
            {currentUser.certificates.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-amber-500 text-base">🏅</span>
                {c}
              </li>
            ))}
          </ul>
        </ProfileSection>

        <div className="bg-white rounded-2xl shadow-card p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-700">Alter</p>
            <p className="text-xs text-slate-400">{currentUser.age} Jahre</p>
          </div>
        </div>
      </div>

      {/* Redeem toast */}
      <AnimatePresence>
        {redeemToast && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="absolute bottom-20 left-4 right-4 z-50 bg-secondary text-white px-4 py-3 rounded-2xl shadow-card-lg text-sm font-semibold text-center"
          >
            ✅ "{redeemToast}" eingelöst!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfileSection({
  title, icon, expanded, onToggle, children,
}: {
  id?: string
  title: string
  icon: React.ReactNode
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3.5"
      >
        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="flex-1 text-left font-semibold text-slate-800 text-sm">{title}</span>
        <ChevronRight
          size={16}
          className={`text-slate-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
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
