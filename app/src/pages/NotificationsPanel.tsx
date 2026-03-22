import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { notifications } from '../data/notifications'
import NotificationItem from '../components/NotificationItem'

interface NotificationsPanelProps {
  onClose: () => void
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute top-0 left-0 right-0 bg-surface-container-lowest rounded-b-[2rem] max-h-[75%] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="font-headline font-bold text-on-surface">Benachrichtigungen</h2>
            <p className="font-body text-xs text-on-surface-variant">{notifications.filter((n) => !n.read).length} ungelesen</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
            <X size={16} className="text-on-surface" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
