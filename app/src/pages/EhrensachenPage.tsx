import { useState } from 'react'
import { Calendar, MapPin, Clock, Share2, MessageCircle } from 'lucide-react'
import { upcomingEhrensachen, activeEhrensachen, completedEhrensachen } from '../data/ehrensachen'
import CheckInButton from '../components/CheckInButton'
import RatingStars from '../components/RatingStars'
import PointsBadge from '../components/PointsBadge'
import { FriendAvatarGroup } from '../components/FriendAvatar'

type Section = 'upcoming' | 'active' | 'completed'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })
}
function formatTime(start: string, end: string) {
  const s = new Date(start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const e = new Date(end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  return `${s} – ${e} Uhr`
}

export default function EhrensachenPage() {
  const [section, setSection] = useState<Section>('upcoming')
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const sections: { id: Section; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Bevorstehend', count: upcomingEhrensachen.length },
    { id: 'active', label: 'Aktiv', count: activeEhrensachen.length },
    { id: 'completed', label: 'Abgeschlossen', count: completedEhrensachen.length },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <h1 className="text-xl font-black text-slate-800">Meine Ehrensachen</h1>
        <p className="text-xs text-slate-400">Deine gematchten Aktionen</p>
      </div>

      {/* Segment control */}
      <div className="px-4 mb-4 shrink-0">
        <div className="bg-slate-100 rounded-2xl p-1 flex gap-1">
          {sections.map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                section === id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`ml-1 text-xs ${section === id ? 'text-primary' : 'text-slate-400'}`}>
                  ({count})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
        {section === 'upcoming' && (
          <>
            {upcomingEhrensachen.length === 0 && (
              <EmptyState text="Noch keine gematchten Ehrensachen. Geh zum Swipe-Tab und finde deine nächste!" />
            )}
            {upcomingEhrensachen.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="h-20 w-full" style={{ background: e.gradient }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{e.name}</h3>
                    <PointsBadge points={e.points} size="sm" />
                  </div>
                  <p className="text-xs text-primary font-semibold mb-2">{e.organization}</p>
                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={12} />
                      {formatDate(e.date)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={12} />
                      {formatTime(e.date, e.dateEnd)}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} />
                      {e.location}
                    </div>
                  </div>
                  {e.friendIds.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <FriendAvatarGroup friendIds={e.friendIds} max={3} />
                      <span className="text-xs text-slate-500">auch dabei</span>
                    </div>
                  )}
                  <button className="w-full flex items-center justify-center gap-2 bg-primary-light text-primary rounded-xl py-2.5 text-sm font-semibold">
                    <Calendar size={15} />
                    Zum Kalender hinzufügen
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {section === 'active' && (
          <>
            {activeEhrensachen.length === 0 && (
              <EmptyState text="Heute keine aktiven Ehrensachen." />
            )}
            {activeEhrensachen.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl shadow-card overflow-hidden border-l-4 border-secondary">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-secondary uppercase tracking-wide">Läuft gerade</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-0.5">{e.name}</h3>
                  <p className="text-xs text-primary font-semibold mb-3">{e.organization}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <MapPin size={12} />
                    {e.location}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <CheckInButton ehrensacheName={e.name} />
                    </div>
                    <button className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                      <MessageCircle size={18} className="text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {section === 'completed' && (
          <>
            {completedEhrensachen.length === 0 && (
              <EmptyState text="Noch keine abgeschlossenen Ehrensachen." />
            )}
            {completedEhrensachen.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="h-16 w-full relative" style={{ background: e.gradient }}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-2 right-3">
                    <PointsBadge points={e.points} size="sm" variant="white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm mb-0.5">{e.name}</h3>
                  <p className="text-xs text-slate-400 mb-3">{e.organization}</p>

                  {e.impactText && (
                    <div className="bg-secondary-light rounded-xl p-3 mb-3">
                      <p className="text-xs font-semibold text-secondary mb-1">💚 Deine Wirkung</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{e.impactText}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Deine Bewertung:</p>
                      <RatingStars
                        value={ratings[e.id] ?? e.rating ?? 0}
                        onChange={(v) => setRatings((prev) => ({ ...prev, [e.id]: v }))}
                        size={18}
                      />
                    </div>
                    <button className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
                      <Share2 size={13} />
                      Teilen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-12 px-4">
      <div className="text-4xl mb-3">✨</div>
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  )
}
