import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, BellDot, Handshake } from 'lucide-react'
import { ehrensachen } from '../data/ehrensachen'
import type { Ehrensache } from '../types'
import SwipeCardLarge from '../components/SwipeCardLarge'
import EhrensacheDetail from '../components/EhrensacheDetail'

interface SwipePageProps {
  onChatOpen?: (ehrensacheId: string) => void
  notifCount: number
  onNotifOpen: () => void
}

const initialCards = ehrensachen.filter((e) => e.status === 'swipe')

export default function SwipePage({ notifCount, onNotifOpen, onChatOpen }: SwipePageProps) {
  const [cards, setCards] = useState<Ehrensache[]>(initialCards)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [showMatch, setShowMatch] = useState<string | null>(null)
  const [gone, setGone] = useState<Ehrensache[]>([])
  const [detailCard, setDetailCard] = useState<Ehrensache | null>(null)

  const swipe = (direction: 'left' | 'right' | 'chat', id: string) => {
    const card = cards.find((c) => c.id === id)
    if (!card) return

    if (direction === 'chat') {
      onChatOpen?.(id)
      return
    }

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

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Minimal header with utility buttons */}
      <div className="flex items-center justify-end px-5 pt-5 pb-2 shrink-0 gap-2">
        <button
          onClick={undoLast}
          disabled={gone.length === 0}
          className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center disabled:opacity-25 transition-opacity"
        >
          <RotateCcw size={15} className="text-on-surface-variant" />
        </button>
        <button
          onClick={onNotifOpen}
          className="relative w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center"
        >
          <BellDot size={17} className="text-on-surface-variant" />
          {notifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-error rounded-full border-2 border-surface" />
          )}
        </button>
      </div>

      {/* Card Stack - takes all remaining space */}
      <div className="flex-1 relative mx-1 mb-2">
        {cards.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-10">
            <h3 className="font-headline text-base font-bold text-on-surface">Alles gesehen</h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">Du hast alle aktuellen Ehrensachen gesehen. Schau morgen wieder vorbei.</p>
            <button onClick={undoLast} className="mt-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-label font-bold text-sm">
              Letzte Karte zurück
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
              onTap={(e) => setDetailCard(e)}
              onBookmark={toggleBookmark}
              bookmarked={bookmarks.includes(card.id)}
            />
          ))
        )}
      </div>

      {/* Match toast */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="absolute top-16 left-5 right-5 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Handshake size={16} className="text-on-secondary" />
            </div>
            <div>
              <p className="font-headline font-bold text-sm">Matched!</p>
              <p className="font-body text-xs text-inverse-on-surface/70 truncate">{showMatch}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen detail view */}
      <AnimatePresence>
        {detailCard && (
          <EhrensacheDetail
            ehrensache={detailCard}
            onClose={() => setDetailCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
