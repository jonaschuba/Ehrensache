import { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { MapPin, Clock, Star, X, Handshake, MessageCircle } from 'lucide-react'
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
  const startTime = s.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const endTime = e.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  return `${startTime} - ${endTime}`
}

export default function SwipeCardLarge({
  ehrensache,
  isTop,
  stackIndex,
  onSwipe,
}: SwipeCardLargeProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-220, 220], [-16, 16])
  const acceptOpacity = useTransform(x, [30, 110], [0, 1])
  const rejectOpacity = useTransform(x, [-110, -30], [1, 0])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (isScrolled) return
    if (info.offset.x > 100 || info.velocity.x > 500) onSwipe('right', ehrensache.id)
    else if (info.offset.x < -100 || info.velocity.x < -500) onSwipe('left', ehrensache.id)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolled(e.currentTarget.scrollTop > 20)
  }

  const timeRange = formatDateRange(ehrensache.date, ehrensache.dateEnd)
  const joiningFriends = friends.filter((f) => ehrensache.friendIds.includes(f.id))

  const scale = isTop ? 1 : 1 - stackIndex * 0.04
  const translateY = isTop ? 0 : stackIndex * 12

  return (
    <motion.div
      className="absolute inset-x-3 top-0"
      style={{
        height: 'calc(100% - 4px)',
        scale,
        y: translateY,
        zIndex: 10 - stackIndex,
        rotate: isTop ? rotate : 0,
        x: isTop ? x : 0,
      }}
      drag={isTop && !isScrolled ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
    >
      <div className="swipe-card-inner">
        {/* Background image */}
        <img
          src={ehrensache.image}
          alt={ehrensache.name}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent h-28" />

        {/* Accept / Reject indicators */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-8 left-6 z-20 rotate-[-15deg]"
              style={{ opacity: acceptOpacity }}
            >
              <span className="border-4 border-secondary-container text-secondary-container font-black text-2xl px-4 py-1.5 rounded-lg tracking-widest uppercase block">
                Match!
              </span>
            </motion.div>
            <motion.div
              className="absolute top-8 right-6 z-20 rotate-[15deg]"
              style={{ opacity: rejectOpacity }}
            >
              <span className="border-4 border-error text-error font-black text-2xl px-4 py-1.5 rounded-lg tracking-widest uppercase block">
                Nope
              </span>
            </motion.div>
          </>
        )}

        {/* Top bar: Org name + Ehrenpunkte */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <span className="glass-dark text-white/90 text-[11px] font-label font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {ehrensache.organization}
          </span>
          <div className="bg-secondary-container rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <Star size={12} className="text-on-surface fill-on-surface" />
            <span className="text-on-surface text-xs font-bold">{ehrensache.points} Ehrenpunkte</span>
          </div>
        </div>

        {/* Scrollable content - pushed to bottom */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute inset-0 overflow-y-auto rounded-lg"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Push content to bottom - more space for image */}
          <div className="h-[64%] shrink-0" />

          <div className="px-5 pb-5">
            {/* Title */}
            <h2 className="text-white font-headline font-extrabold text-[26px] leading-tight mb-3">
              {ehrensache.name}
            </h2>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="flex items-center gap-1.5 glass-dark text-white/90 text-xs font-body px-3 py-1.5 rounded-full">
                <Clock size={12} className="text-secondary-container" />
                {timeRange}
              </span>
              <span className="flex items-center gap-1.5 glass-dark text-white/90 text-xs font-body px-3 py-1.5 rounded-full">
                <MapPin size={12} className="text-secondary-container" />
                {ehrensache.district}
              </span>
            </div>

            {/* Friends */}
            {joiningFriends.length > 0 && (
              <div className="flex items-center gap-2.5 mb-5">
                <FriendAvatarGroup friendIds={ehrensache.friendIds} max={3} />
                <span className="text-white/70 text-xs font-body">
                  {joiningFriends[0].name.split(' ')[0]} & {joiningFriends.length} weitere sind dabei
                </span>
              </div>
            )}

            {/* Action buttons ON the card */}
            {isTop && (
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={(e) => { e.stopPropagation(); onSwipe('left', ehrensache.id) }}
                  className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center"
                >
                  <X size={24} className="text-white" strokeWidth={2.5} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={(e) => { e.stopPropagation(); onSwipe('right', ehrensache.id) }}
                  className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                  style={{ boxShadow: '0 6px 20px rgba(0,97,255,0.4)' }}
                >
                  <Handshake size={26} className="text-on-primary" strokeWidth={2} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={(e) => { e.stopPropagation(); onSwipe('chat', ehrensache.id) }}
                  className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center"
                >
                  <MessageCircle size={22} className="text-white" strokeWidth={2} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
