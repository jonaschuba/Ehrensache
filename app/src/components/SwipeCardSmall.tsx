import { Calendar, MapPin, Zap } from 'lucide-react'
import type { Ehrensache } from '../types'
import { FriendAvatarGroup } from './FriendAvatar'

interface SwipeCardSmallProps {
  ehrensache: Ehrensache
  onClick: () => void
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
}

export default function SwipeCardSmall({ ehrensache, onClick }: SwipeCardSmallProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl shadow-card border border-slate-100 p-3.5 flex items-center gap-3 text-left active:scale-98 transition-transform"
    >
      <div
        className="w-16 h-16 rounded-xl shrink-0"
        style={{ background: ehrensache.gradient }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-slate-800 text-sm leading-tight truncate">{ehrensache.name}</p>
        <p className="text-xs text-slate-500 mt-0.5 truncate">{ehrensache.organization}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar size={11} />
            {formatDate(ehrensache.date)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={11} />
            {ehrensache.district}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
            <Zap size={11} className="fill-amber-500 text-amber-500" />
            {ehrensache.points}
          </span>
        </div>
      </div>
      {ehrensache.friendIds.length > 0 && (
        <div className="shrink-0">
          <FriendAvatarGroup friendIds={ehrensache.friendIds} max={2} />
        </div>
      )}
    </button>
  )
}
