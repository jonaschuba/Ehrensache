import { Clock, MapPin } from 'lucide-react'
import type { Ehrensache } from '../types'

interface SwipeCardSmallProps {
  ehrensache: Ehrensache
  onClick?: () => void
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' })
}

export default function SwipeCardSmall({ ehrensache, onClick }: SwipeCardSmallProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-surface-container-lowest rounded-lg p-3 flex items-center gap-3 text-left active:bg-surface-container-low transition-colors"
    >
      <div className="w-14 h-14 rounded-md shrink-0 overflow-hidden">
        <img src={ehrensache.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-headline font-semibold text-on-surface text-sm leading-snug truncate">{ehrensache.name}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-on-surface-variant font-body">
            <Clock size={10} className="text-outline" />
            {formatDate(ehrensache.date)}
          </span>
          <span className="flex items-center gap-1 text-xs text-on-surface-variant font-body">
            <MapPin size={10} className="text-outline" />
            {ehrensache.district}
          </span>
        </div>
      </div>
      <span className="text-sm font-headline font-bold text-primary shrink-0">+{ehrensache.points}</span>
    </button>
  )
}
