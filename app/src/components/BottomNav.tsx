import { Trophy, Handshake, MessageCircle, User, Layers } from 'lucide-react'
import type { Tab } from '../types'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
  chatUnread: number
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'ranking', label: 'Ranking', Icon: Trophy },
  { id: 'ehrensachen', label: 'Ehrensachen', Icon: Handshake },
  { id: 'swipe', label: 'Home', Icon: Layers },
  { id: 'chat', label: 'Chat', Icon: MessageCircle },
  { id: 'profile', label: 'Profile', Icon: User },
]

export default function BottomNav({ active, onChange, chatUnread }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id
        const isSwipe = id === 'swipe'
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`bottom-nav-item ${isActive ? 'active' : ''} ${isSwipe ? 'swipe-btn' : ''}`}
          >
            {id === 'chat' && chatUnread > 0 && (
              <span className="nav-badge">{chatUnread}</span>
            )}
            {isSwipe ? (
              <div className={`swipe-center-btn ${isActive ? 'active' : ''}`}>
                <Icon size={24} strokeWidth={2} />
              </div>
            ) : (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="nav-label">{label}</span>
              </>
            )}
          </button>
        )
      })}
    </nav>
  )
}
