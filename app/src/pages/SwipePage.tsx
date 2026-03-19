import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BellDot, X, Handshake, MessageCircle, RotateCcw } from 'lucide-react'
import { ehrensachen } from '../data/ehrensachen'
import type { Ehrensache } from '../types'
import SwipeCardLarge from '../components/SwipeCardLarge'

interface SwipePageProps {
  onChatOpen?: (ehrensacheId: string) => void
  notifCount: number
  onNotifOpen: () => void
}

const initialCards = ehrensachen.filter((e) => e.status === 'swipe')

export default function SwipePage({ notifCount, onNotifOpen }: SwipePageProps) {
  const [cards, setCards] = useState<Ehrensache[]>(initialCards)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [showMatch, setShowMatch] = useState<string | null>(null)
  const [gone, setGone] = useState<Ehrensache[]>([])

  const swipe = (direction: 'left' | 'right' | 'chat', id: string) => {
    const card = cards.find((c) => c.id === id)
    if (!card) return

    if (direction === 'right') setShowMatch(card.name)
    setGone((prev) => [card, ...prev])
    setCards((prev) => prev.filter((c) => c.id !== id))

    if (direction === 'right') {
      setTimeout(() => setShowMatch(null), 2200)
    }
  }

  const undoLast = () => {
    if (gone.length === 0) return
    const [last, ...rest] = gone
    setGone(rest)
    setCards((prev) => [last, ...prev])
  }

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) => prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id])
  }

  const triggerSwipe = (direction: 'left' | 'right') => {
    if (cards.length === 0) return
    swipe(direction, cards[0].id)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-800">Ehrensache</h1>
          <p className="text-xs text-slate-400 font-medium">{cards.length} Aktionen verfügbar</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undoLast} disabled={gone.length === 0} className="w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center disabled:opacity-30">
            <RotateCcw size={16} className="text-slate-600" />
          </button>
          <button onClick={onNotifOpen} className="relative w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center">
            <BellDot size={18} className="text-slate-700" />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {notifCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 relative mx-1 mb-3">
        {cards.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-8">
            <div className="text-5xl">🎉</div>
            <h3 className="text-lg font-bold text-slate-700">Alles gesehen!</h3>
            <p className="text-sm text-slate-500">Du hast alle aktuellen Ehrensachen durchgeschaut. Schau morgen wieder vorbei!</p>
            <button onClick={undoLast} className="mt-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold text-sm shadow-md">
              Zurück zur letzten Karte
            </button>
          </div>
        ) : (
          cards.slice(0, 3).map((card, index) => (
            <SwipeCardLarge
              key={card.id}
              ehrensache={card}
              isTop={index === 0}
              stackIndex={index}
              onSwipe={swipe}
              onBookmark={toggleBookmark}
              bookmarked={bookmarks.includes(card.id)}
            />
          ))
        )}
      </div>

      {/* Action Buttons */}
      {cards.length > 0 && (
        <div className="flex items-center justify-center gap-5 pb-4 px-4 shrink-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => triggerSwipe('left')}
            className="w-14 h-14 rounded-full bg-white shadow-card-lg border border-slate-100 flex items-center justify-center"
          >
            <X size={24} className="text-red-400" strokeWidth={2.5} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => swipe('chat', cards[0]?.id)}
            className="w-12 h-12 rounded-full bg-white shadow-card border border-slate-100 flex items-center justify-center"
          >
            <MessageCircle size={20} className="text-slate-500" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => triggerSwipe('right')}
            className="w-14 h-14 rounded-full bg-primary shadow-card-lg flex items-center justify-center"
          >
            <Handshake size={24} className="text-white" strokeWidth={2} />
          </motion.button>
        </div>
      )}

      {/* Match toast */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="absolute top-16 left-4 right-4 z-50 bg-secondary text-white px-5 py-4 rounded-2xl shadow-card-lg flex items-center gap-3"
          >
            <div className="text-2xl">🤝</div>
            <div>
              <p className="font-bold text-sm">Match!</p>
              <p className="text-xs text-green-100">{showMatch}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
