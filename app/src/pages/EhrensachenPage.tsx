import { useState } from 'react'
import { Clock, MapPin, Share2, MessageCircle } from 'lucide-react'
import { upcomingEhrensachen, activeEhrensachen, completedEhrensachen } from '../data/ehrensachen'
import CheckInButton from '../components/CheckInButton'
import RatingStars from '../components/RatingStars'
import PageHeader from '../components/PageHeader'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short' })
}
function formatTime(start: string, end: string) {
  const s = new Date(start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  const e = new Date(end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  return `${s}–${e}`
}

type TabKey = 'current' | 'completed'

// Combine active + upcoming, active first
const currentEhrensachen = [...activeEhrensachen, ...upcomingEhrensachen]

export default function EhrensachenPage() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [activeTab, setActiveTab] = useState<TabKey>('current')

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'current', label: 'Active', count: currentEhrensachen.length },
    { key: 'completed', label: 'Completed', count: completedEhrensachen.length },
  ]

  return (
    <div className="flex flex-col h-full bg-surface">
      <PageHeader title="Meine Matches" />

      {/* Tab bar */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-xs font-label font-bold transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 pb-4" style={{ scrollbarWidth: 'none' }}>
        {/* Current (Active + Upcoming) */}
        {activeTab === 'current' && (
          <div className="space-y-4">
            {currentEhrensachen.length === 0 && <EmptyState text="Noch keine gematchten Ehrensachen." />}

            {currentEhrensachen.map((e, index) => {
              const isActive = e.status === 'active'
              return (
                <div key={e.id} className="space-y-2">
                  {/* Section label */}
                  {isActive && index === 0 && (
                    <span className="inline-block bg-secondary-container text-on-surface text-[10px] font-label font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Today's Mission
                    </span>
                  )}
                  {!isActive && index === activeEhrensachen.length && (
                    <p className="font-headline font-bold text-on-surface text-base mt-2">Bevorstehend</p>
                  )}

                  <div className="bg-surface-container-lowest rounded-lg overflow-hidden card-ambient">
                    {/* Image */}
                    <div className="h-36 w-full overflow-hidden relative">
                      <img src={e.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {isActive && (
                        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-secondary-container rounded-full animate-pulse" />
                          <span className="text-white text-xs font-label font-semibold">Läuft jetzt</span>
                        </div>
                      )}
                      <span className="absolute top-3 right-3 bg-secondary-container text-on-surface text-xs font-label font-bold px-2.5 py-1 rounded-full">
                        +{e.points} EP
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-headline font-bold text-on-surface text-base leading-snug mb-0.5">{e.name}</h3>
                      <p className="font-body text-xs text-primary font-semibold mb-2">{e.organization}</p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                        <span className="flex items-center gap-1 font-body text-xs text-on-surface-variant">
                          <Clock size={11} className="text-outline" />
                          {formatDate(e.date)} · {formatTime(e.date, e.dateEnd)}
                        </span>
                        <span className="flex items-center gap-1 font-body text-xs text-on-surface-variant">
                          <MapPin size={11} className="text-outline" />
                          {e.district}
                        </span>
                      </div>

                      {/* Buttons: Check-In + Chat, same height */}
                      {isActive && (
                        <div className="flex gap-2">
                          <div className="flex-1"><CheckInButton /></div>
                          <button className="h-[46px] px-4 rounded-full bg-surface-container flex items-center justify-center gap-1.5 text-on-surface-variant font-label font-semibold text-sm">
                            <MessageCircle size={16} />
                            Chat
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Monthly impact celebration */}
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-lg p-5 text-on-primary">
              <span className="inline-block bg-on-primary/20 text-on-primary text-[10px] font-label font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Monthly Rewards
              </span>
              <h3 className="font-headline font-extrabold text-xl mb-1">You did it!</h3>
              <p className="font-body text-sm text-on-primary/80 mb-2">12h of real impact this month.</p>
              <p className="font-headline font-bold text-secondary-container text-lg mb-4">+500 Ehrenpunkte</p>
              <button className="w-full bg-on-primary/20 text-on-primary rounded-full py-2.5 font-label font-bold text-sm">
                Share to Instagram Stories
              </button>
            </div>
          </div>
        )}

        {/* Completed tab */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedEhrensachen.length === 0 && <EmptyState text="Noch keine abgeschlossenen Ehrensachen." />}
            {completedEhrensachen.map((e) => (
              <div key={e.id} className="bg-surface-container-lowest rounded-lg overflow-hidden card-ambient">
                <div className="h-24 w-full overflow-hidden relative">
                  <img src={e.image} alt="" className="w-full h-full object-cover grayscale-[30%]" />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute top-3 right-3 bg-secondary-container text-on-surface text-xs font-label font-bold px-2.5 py-1 rounded-full">
                    +{e.points} EP
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-headline font-bold text-on-surface text-sm mb-0.5">{e.name}</h3>
                  <p className="font-body text-xs text-on-surface-variant mb-3">{e.organization}</p>

                  {e.impactText && (
                    <p className="font-body text-xs text-on-surface leading-relaxed bg-secondary-container/30 rounded-md px-3 py-2.5 mb-3">
                      {e.impactText}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <RatingStars
                      value={ratings[e.id] ?? e.rating ?? 0}
                      onChange={(v) => setRatings((prev) => ({ ...prev, [e.id]: v }))}
                      size={18}
                    />
                    <button className="flex items-center gap-1.5 text-xs text-on-surface-variant font-label font-medium">
                      <Share2 size={12} /> Teilen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-16">
      <p className="font-body text-sm text-on-surface-variant">{text}</p>
    </div>
  )
}
