import { Bell, AlertTriangle, Clock, UserPlus, Sparkles } from 'lucide-react'
import type { AppNotification } from '../types'

const icons = {
  cancellation: { Icon: AlertTriangle, bg: 'bg-error-container', color: 'text-error' },
  last_chance: { Icon: Clock, bg: 'bg-tertiary-fixed', color: 'text-tertiary' },
  new_event: { Icon: Sparkles, bg: 'bg-primary-fixed', color: 'text-primary' },
  friend_request: { Icon: UserPlus, bg: 'bg-secondary-container', color: 'text-secondary' },
  change: { Icon: Bell, bg: 'bg-surface-container', color: 'text-on-surface-variant' },
}

interface NotificationItemProps {
  notification: AppNotification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const { Icon, bg, color } = icons[notification.type]

  return (
    <div className={`flex gap-3 px-4 py-3.5 ${notification.read ? 'opacity-60' : ''}`}>
      <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
        <Icon size={16} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`font-headline text-sm text-on-surface ${!notification.read ? 'font-bold' : 'font-semibold'}`}>
            {notification.title}
          </p>
          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />}
        </div>
        <p className="font-body text-xs text-on-surface-variant mt-0.5 leading-relaxed">{notification.body}</p>
        <p className="font-body text-xs text-outline mt-1">{notification.timestamp}</p>
      </div>
    </div>
  )
}
