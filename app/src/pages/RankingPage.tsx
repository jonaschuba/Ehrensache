import { Trophy, Zap, TrendingUp, Crown, Medal } from 'lucide-react'
import { currentUser } from '../data/user'
import { friends } from '../data/friends'
import { ehrensachen } from '../data/ehrensachen'
import SwipeCardSmall from '../components/SwipeCardSmall'
import { useState } from 'react'

const leaderboard = [
  { rank: 1, name: 'Lena M.', initials: 'LM', color: '#7C3AED', rankingpunkte: 2840, level: 8 },
  { rank: 2, name: 'Anna T.', initials: 'AT', color: '#0EA5E9', rankingpunkte: 2340, level: 7 },
  { rank: 3, name: 'Sarah B.', initials: 'SB', color: '#DC2626', rankingpunkte: 1920, level: 6 },
  { rank: 4, name: 'Jonas C. (du)', initials: 'JC', color: '#2563EB', rankingpunkte: 1120, level: 4, isUser: true },
  { rank: 5, name: 'Jonas K.', initials: 'JK', color: '#059669', rankingpunkte: 1450, level: 5 },
  { rank: 6, name: 'Max W.', initials: 'MW', color: '#D97706', rankingpunkte: 680, level: 3 },
]

const sorted = [...leaderboard].sort((a, b) => b.rankingpunkte - a.rankingpunkte).map((e, i) => ({ ...e, rank: i + 1 }))

export default function RankingPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const friendActivity = friends
    .filter((f) => f.recentEhrensacheId)
    .map((f) => ({
      friend: f,
      ehrensache: ehrensachen.find((e) => e.id === f.recentEhrensacheId),
    }))
    .filter((item) => item.ehrensache)

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-4" style={{ scrollbarWidth: 'none' }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 shrink-0">
        <h1 className="text-xl font-black text-slate-800">Ranking</h1>
        <p className="text-xs text-slate-400">Dein Ehrenstand auf einen Blick</p>
      </div>

      {/* User Stats */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-5 text-white shadow-card-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm font-medium">Dein Level</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black">{currentUser.level}</span>
                <span className="text-blue-200 font-semibold">{currentUser.levelName}</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <Trophy size={24} className="text-amber-300" />
            </div>
          </div>

          {/* Progress to next level */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-blue-200 mb-1.5">
              <span>Level {currentUser.level}</span>
              <span>Level {currentUser.level + 1}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(currentUser.ehrenpunkte / currentUser.nextLevelPoints) * 100}%` }}
              />
            </div>
            <p className="text-xs text-blue-200 mt-1">
              Noch {currentUser.nextLevelPoints - currentUser.ehrenpunkte} EP bis Level {currentUser.level + 1}
            </p>
          </div>

          {/* Points */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/15 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={14} className="text-amber-300 fill-amber-300" />
                <span className="text-xs text-blue-200 font-medium">Ehrenpunkte</span>
              </div>
              <p className="text-xl font-black">{currentUser.ehrenpunkte.toLocaleString()}</p>
              <p className="text-xs text-blue-300 mt-0.5">Verfügbares Guthaben</p>
            </div>
            <div className="bg-white/15 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp size={14} className="text-green-300" />
                <span className="text-xs text-blue-200 font-medium">Rankingpunkte</span>
              </div>
              <p className="text-xl font-black">{currentUser.rankingpunkte.toLocaleString()}</p>
              <p className="text-xs text-blue-300 mt-0.5">Permanent · steigt nie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-4 mb-5">
        <h2 className="text-sm font-bold text-slate-700 mb-3">🏆 Freunde-Ranking</h2>
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {sorted.map((person, i) => (
            <div
              key={person.name}
              className={`flex items-center gap-3 px-4 py-3 ${
                (person as any).isUser ? 'bg-primary-light' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              } ${i < sorted.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              <div className="w-7 text-center">
                {person.rank === 1 ? (
                  <Crown size={18} className="text-amber-500 mx-auto" />
                ) : person.rank === 2 ? (
                  <Medal size={18} className="text-slate-400 mx-auto" />
                ) : person.rank === 3 ? (
                  <Medal size={18} className="text-amber-700 mx-auto" />
                ) : (
                  <span className="text-sm font-bold text-slate-400">{person.rank}</span>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: person.color }}
              >
                {person.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate ${(person as any).isUser ? 'text-primary' : 'text-slate-800'}`}>
                  {person.name}
                </p>
                <p className="text-xs text-slate-400">Level {person.level}</p>
              </div>
              <span className="text-sm font-bold text-slate-700">
                {person.rankingpunkte.toLocaleString()} RP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Friends Activity */}
      <div className="px-4 mb-4">
        <h2 className="text-sm font-bold text-slate-700 mb-3">👋 Was machen deine Freunde?</h2>
        <div className="flex flex-col gap-2.5">
          {friendActivity.map(({ friend, ehrensache }) => (
            ehrensache && (
              <div key={friend.id} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                  style={{ background: friend.color }}
                >
                  {friend.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">{friend.name}</span> hat mitgemacht:
                  </p>
                  <SwipeCardSmall
                    ehrensache={ehrensache}
                    onClick={() => setSelectedCard(selectedCard === ehrensache.id ? null : ehrensache.id)}
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
