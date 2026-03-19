import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Calendar, Clock, Users, Zap, ChevronDown } from 'lucide-react'
import type { Ehrensache } from '../types'
import { FriendAvatarGroup } from './FriendAvatar'
import { friends } from '../data/friends'

interface SwipeCardLargeProps {
  ehrensache: Ehrensache
  isTop: boolean
  stackIndex: number
  onSwipe: (direction: 'left' | 'right' | 'chat', id: string) => void
  onBookmark?: (_id: string) => void
  bookmarked?: boolean
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const date = s.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' })
  const startTime = s.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  return { date, time: `${startTime} – ${endTime} Uhr` }
}

export default function SwipeCardLarge({
  ehrensache,
  isTop,
  stackIndex,
  onSwipe,
}: SwipeCardLargeProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const acceptOpacity = useTransform(x, [20, 100], [0, 1])
  const rejectOpacity = useTransform(x, [-100, -20], [1, 0])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (isScrolled) return
    if (info.offset.x > 100 || info.velocity.x > 500) {
      onSwipe('right', ehrensache.id)
    } else if (info.offset.x < -100 || info.velocity.x < -500) {
      onSwipe('left', ehrensache.id)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 20)
  }

  const { date, time } = formatDateRange(ehrensache.date, ehrensache.dateEnd)
  const joiningFriends = friends.filter((f) => ehrensache.friendIds.includes(f.id))

  const scale = isTop ? 1 : 1 - stackIndex * 0.035
  const translateY = isTop ? 0 : stackIndex * 10

  return (
    <motion.div
      className="absolute inset-x-3 top-0"
      style={{
        height: 'calc(100% - 8px)',
        scale,
        y: translateY,
        zIndex: 10 - stackIndex,
        rotate: isTop ? rotate : 0,
        x: isTop ? x : 0,
      }}
      drag={isTop && !isScrolled ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
    >
      <div className="swipe-card-inner" style={{ background: ehrensache.gradient }}>
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 rounded-3xl" />

        {/* Accept/Reject overlays */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-6 left-6 z-10 px-4 py-2 rounded-xl border-4 border-secondary bg-secondary/20"
              style={{ opacity: acceptOpacity }}
            >
              <span className="text-secondary font-black text-xl tracking-wider">MATCH!</span>
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 z-10 px-4 py-2 rounded-xl border-4 border-red-400 bg-red-400/20"
              style={{ opacity: rejectOpacity }}
            >
              <span className="text-red-400 font-black text-xl tracking-wider">NOPE</span>
            </motion.div>
          </>
        )}

        {/* Urgency badge */}
        <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${
          ehrensache.urgency === 'hoch'
            ? 'bg-red-500 text-white'
            : ehrensache.urgency === 'mittel'
            ? 'bg-amber-400 text-amber-900'
            : 'bg-white/20 text-white'
        }`}>
          {ehrensache.urgency === 'hoch' ? '🔥 Dringend' : ehrensache.urgency === 'mittel' ? '⏱ Bald' : '📅 Offen'}
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 overflow-y-auto rounded-3xl scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Spacer for gradient area */}
          <div className="h-[52%]" />

          {/* Main info panel */}
          <div className="px-5 pb-24">
            {/* Points */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                <Zap size={14} className="fill-amber-400 text-amber-400" />
                {ehrensache.points} Ehrenpunkte
              </span>
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                <Clock size={14} />
                {ehrensache.durationHours}h
              </span>
            </div>

            {/* Title */}
            <h2 className="text-white font-black text-2xl leading-tight mb-1">{ehrensache.name}</h2>
            <p className="text-white/80 font-semibold text-sm mb-3">{ehrensache.organization}</p>

            {/* Meta */}
            <div className="flex flex-col gap-1.5 mb-3">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Calendar size={14} className="shrink-0" />
                <span>{date} · {time}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <MapPin size={14} className="shrink-0" />
                <span>{ehrensache.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Users size={14} className="shrink-0" />
                <span>{ehrensache.currentParticipants}/{ehrensache.maxParticipants} Helfer</span>
              </div>
            </div>

            {/* Friends */}
            {joiningFriends.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <FriendAvatarGroup friendIds={ehrensache.friendIds} max={3} />
                <span className="text-white/80 text-xs">
                  {joiningFriends.map((f) => f.name.split(' ')[0]).slice(0, 2).join(', ')} {joiningFriends.length > 2 ? `+${joiningFriends.length - 2}` : ''} dabei
                </span>
              </div>
            )}

            {/* Short description always visible */}
            <p className="text-white/90 text-sm leading-relaxed">{ehrensache.shortDescription}</p>

            {/* Expand button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 flex items-center gap-1 text-white/70 text-xs font-semibold"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
              />
              {expanded ? 'Weniger' : 'Mehr lesen'}
            </button>

            {/* Full description (expanded) */}
            {expanded && (
              <div className="mt-3 space-y-3">
                <p className="text-white/85 text-sm leading-relaxed">{ehrensache.fullDescription}</p>
                <div>
                  <p className="text-white font-semibold text-sm mb-1.5">Benötigte Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ehrensache.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full border border-white/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scroll hint */}
        {!expanded && isTop && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-1 animate-bounce-subtle">
              <ChevronDown size={16} className="text-white/50" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
