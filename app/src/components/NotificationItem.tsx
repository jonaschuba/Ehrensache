import { Bell, AlertTriangle, Clock, UserPlus, Sparkles } from 'lucide-react'
import type { AppNotification } from '../types'

const icons = {
  cancellation: { Icon: AlertTriangle, bg: 'bg-red-50', color: 'text-red-500' },
  last_chance: { Icon: Clock, bg: 'bg-amber-50', color: 'text-amber-500' },
  new_event: { Icon: Sparkles, bg: 'bg-primary-light', color: 'text-primary' },
  friend_request: { Icon: UserPlus, bg: 'bg-secondary-light', color: 'text-secondary' },
  change: { Icon: Bell, bg: 'bg-slate-100', color: 'text-slate-500' },
}

interface NotificationItemProps {
  notification: AppNotification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { Icon, bg, color } = icons[notification.type]

  return (
    <div className={`flex gap-3 px-4 py-3.5 ${notification.read ? 'opacity-60' : ''} border-b border-slate-100`}>
      <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon size={16} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm font-semibold text-slate-800 ${!notification.read ? 'font-bold' : ''}`}>
            {notification.title}
          </p>
          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
        </div>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notification.body}</p>
        <p className="text-xs text-slate-400 mt-1">{notification.timestamp}</p>
      </div>
    </div>
  )
}
