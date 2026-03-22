import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, Star, Users, Calendar } from 'lucide-react'
import type { Ehrensache } from '../types'
import { FriendAvatarGroup } from './FriendAvatar'
import { friends } from '../data/friends'

interface EhrensacheDetailProps {
  ehrensache: Ehrensache
  onClose: () => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(start: string, end: string) {
  const s = new Date(start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const e = new Date(end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  return `${s} – ${e}`
}

export default function EhrensacheDetail({ ehrensache, onClose }: EhrensacheDetailProps) {
  const joiningFriends = friends.filter((f) => ehrensache.friendIds.includes(f.id))

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className="absolute inset-0 z-50 bg-surface flex flex-col"
    >
      {/* Hero image */}
      <div className="relative h-[45%] shrink-0 overflow-hidden">
        <img
          src={ehrensache.image}
          alt={ehrensache.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Back button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Org badge + EP badge on image */}
        <div className="absolute top-5 left-5 z-10">
          <span className="glass-dark text-white/90 text-[11px] font-label font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
            {ehrensache.organization}
          </span>
        </div>

        {/* Title on image */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <h1 className="text-white font-headline font-extrabold text-2xl leading-tight">
            {ehrensache.name}
          </h1>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="px-5 py-5 space-y-5">
          {/* Ehrenpunkte highlight */}
          <div className="flex items-center gap-2 bg-secondary-container/30 rounded-full px-4 py-2.5 w-fit">
            <Star size={14} className="text-secondary fill-secondary" />
            <span className="font-label text-sm font-bold text-on-surface">{ehrensache.points} Ehrenpunkte</span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard
              icon={<Calendar size={14} className="text-primary" />}
              label="Datum"
              value={formatDate(ehrensache.date)}
            />
            <InfoCard
              icon={<Clock size={14} className="text-primary" />}
              label="Uhrzeit"
              value={formatTime(ehrensache.date, ehrensache.dateEnd)}
            />
            <InfoCard
              icon={<MapPin size={14} className="text-primary" />}
              label="Ort"
              value={ehrensache.location}
            />
            <InfoCard
              icon={<Users size={14} className="text-primary" />}
              label="Plätze"
              value={`${ehrensache.currentParticipants} / ${ehrensache.maxParticipants} belegt`}
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="font-headline font-bold text-on-surface text-base mb-2">Beschreibung</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {ehrensache.fullDescription}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-headline font-bold text-on-surface text-base mb-2">Benötigte Skills</h3>
            <div className="flex flex-wrap gap-2">
              {ehrensache.skills.map((s) => (
                <span key={s} className="bg-surface-container text-on-surface-variant text-xs font-body font-medium px-3 py-1.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Friends */}
          {joiningFriends.length > 0 && (
            <div>
              <h3 className="font-headline font-bold text-on-surface text-base mb-2">Freunde dabei</h3>
              <div className="flex items-center gap-3">
                <FriendAvatarGroup friendIds={ehrensache.friendIds} max={5} />
                <span className="font-body text-sm text-on-surface-variant">
                  {joiningFriends.map((f) => f.name.split(' ')[0]).join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Urgency */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              ehrensache.urgency === 'hoch' ? 'bg-error' :
              ehrensache.urgency === 'mittel' ? 'bg-tertiary-container' : 'bg-secondary'
            }`} />
            <span className="font-body text-sm text-on-surface-variant">
              Dringlichkeit: {ehrensache.urgency.charAt(0).toUpperCase() + ehrensache.urgency.slice(1)}
            </span>
          </div>

          {/* Bottom spacing */}
          <div className="h-4" />
        </div>
      </div>
    </motion.div>
  )
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-3.5 card-ambient">
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="stat-label">{label}</span>
      </div>
      <p className="font-headline text-sm font-semibold text-on-surface leading-snug">{value}</p>
    </div>
  )
}
