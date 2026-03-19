import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Tab } from './types'
import BottomNav from './components/BottomNav'
import SwipePage from './pages/SwipePage'
import RankingPage from './pages/RankingPage'
import EhrensachenPage from './pages/EhrensachenPage'
import ChatPage from './pages/ChatPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPanel from './pages/NotificationsPanel'
import { chats } from './data/chats'
import { notifications } from './data/notifications'

const tabOrder: Tab[] = ['ranking', 'ehrensachen', 'swipe', 'chat', 'profile']

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('swipe')
  const [prevTab, setPrevTab] = useState<Tab>('swipe')
  const [showNotifs, setShowNotifs] = useState(false)

  const totalUnread = chats.reduce((sum, c) => sum + c.unreadCount, 0)
  const unreadNotifs = notifications.filter((n) => !n.read).length

  const handleTabChange = (tab: Tab) => {
    setPrevTab(activeTab)
    setActiveTab(tab)
  }

  const prevIdx = tabOrder.indexOf(prevTab)
  const currIdx = tabOrder.indexOf(activeTab)
  const direction = currIdx > prevIdx ? 1 : -1

  const pages: Record<Tab, React.ReactNode> = {
    ranking: <RankingPage />,
    ehrensachen: <EhrensachenPage />,
    swipe: <SwipePage notifCount={unreadNotifs} onNotifOpen={() => setShowNotifs(true)} />,
    chat: <ChatPage />,
    profile: <ProfilePage />,
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <div className="app-inner">
          <div className="page-area">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial={{ x: direction * 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -30, opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                {pages[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>

          <BottomNav active={activeTab} onChange={handleTabChange} chatUnread={totalUnread} />
        </div>

        <AnimatePresence>
          {showNotifs && (
            <NotificationsPanel onClose={() => setShowNotifs(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
