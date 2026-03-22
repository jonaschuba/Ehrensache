import { TrendingUp, Star, ThumbsUp } from 'lucide-react'
import { currentUser } from '../data/user'
import { friends } from '../data/friends'
import { ehrensachen } from '../data/ehrensachen'
import PageHeader from '../components/PageHeader'

const leaderboard = [
  { name: 'Elena S.', initials: 'ES', rankingpunkte: 12840, color: '#7C3AED' },
  { name: 'Anna T.', initials: 'AT', rankingpunkte: 8320, color: '#0EA5E9' },
  { name: 'Sarah B.', initials: 'SB', rankingpunkte: 5920, color: '#DC2626' },
  { name: 'Jonas K.', initials: 'JK', rankingpunkte: 3450, color: '#059669' },
]

const sorted = [...leaderboard]
  .sort((a, b) => b.rankingpunkte - a.rankingpunkte)
  .map((e, i) => ({ ...e, rank: i + 1 }))

const userRank = sorted.filter((e) => e.rankingpunkte > currentUser.rankingpunkte).length + 1

const friendActivity = friends
  .filter((f) => f.recentEhrensacheId)
  .map((f) => ({
    friend: f,
    ehrensache: ehrensachen.find((e) => e.id === f.recentEhrensacheId),
  }))
  .filter((item) => item.ehrensache)
  .slice(0, 5)

export default function RankingPage() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-surface" style={{ scrollbarWidth: 'none' }}>
      <PageHeader title="Ranking" />

      {/* Stats cards */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container-lowest rounded-lg p-4 card-ambient">
            <p className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Rankingpunkte</p>
            <div className="flex items-baseline gap-2">
              <p className="font-headline text-3xl font-extrabold text-on-surface">{currentUser.rankingpunkte.toLocaleString()}</p>
              <TrendingUp size={16} className="text-primary" />
            </div>
            <p className="font-body text-[11px] text-on-surface-variant mt-1">Gesamtpunktzahl für deinen globalen Rang</p>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-4 card-ambient">
            <p className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Ehrenpunkte</p>
            <div className="flex items-baseline gap-2">
              <p className="font-headline text-3xl font-extrabold text-on-surface">{currentUser.ehrenpunkte.toLocaleString()}</p>
              <Star size={16} className="text-secondary" />
            </div>
            <p className="font-body text-[11px] text-on-surface-variant mt-1">Eintauschbar für lokale Belohnungen</p>
          </div>
        </div>
      </div>

      {/* Friends in Action */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-headline font-bold text-on-surface text-base">Friends in Action</h3>
          <button className="font-label text-xs text-primary font-semibold">Alle ansehen</button>
        </div>
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex gap-3" style={{ width: 'max-content', paddingRight: 20 }}>
            {friendActivity.map(({ friend, ehrensache }) =>
              ehrensache ? (
                <div key={friend.id} className="w-56 bg-surface-container-lowest rounded-lg overflow-hidden card-ambient shrink-0">
                  <div className="h-28 overflow-hidden relative">
                    <img src={ehrensache.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 bg-secondary-container text-on-surface text-[10px] font-label font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Umwelt
                    </span>
                  </div>
                  <div className="p-3.5">
                    <p className="font-headline font-bold text-on-surface text-sm leading-snug mb-0.5">{ehrensache.name}</p>
                    <p className="font-body text-xs text-on-surface-variant mb-2.5">
                      {friend.name} war hier
                    </p>
                    <button className="flex items-center gap-1.5 bg-secondary-container text-on-surface rounded-full px-3 py-1.5 text-xs font-label font-bold">
                      <ThumbsUp size={12} /> High-five
                    </button>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* Top Performer */}
      <div className="px-5 pb-8">
        <h3 className="font-headline font-bold text-on-surface text-base mb-3">Top Performer</h3>
        <div className="bg-surface-container-lowest rounded-lg overflow-hidden card-ambient">
          {sorted.slice(0, 3).map((person, i) => (
            <div
              key={person.name}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                i < 2 ? 'border-b border-surface-container' : ''
              }`}
            >
              <span className="w-7 text-center font-headline font-bold text-on-surface-variant text-sm">
                {person.rank}
              </span>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ background: person.color }}
              >
                {person.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline text-sm font-semibold text-on-surface truncate">
                  {person.name}
                </p>
              </div>
              <span className="font-headline text-sm font-bold text-on-surface tabular-nums">
                {person.rankingpunkte.toLocaleString()} pts
              </span>
            </div>
          ))}

          {/* User entry */}
          <div className="border-t-2 border-surface-container">
            <div className="flex items-center gap-3 px-4 py-3.5 bg-primary/5">
              <span className="w-7 text-center font-headline font-bold text-primary text-sm">
                {userRank}
              </span>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs bg-primary">
                {currentUser.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline text-sm font-semibold text-primary truncate">
                  Du ({currentUser.name.split(' ')[0]})
                </p>
              </div>
              <span className="font-headline text-sm font-bold text-primary tabular-nums">
                {currentUser.rankingpunkte.toLocaleString()} pts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
