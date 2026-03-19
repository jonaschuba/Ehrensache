import { friends } from '../data/friends'

interface FriendAvatarProps {
  friendId: string
  size?: 'sm' | 'md'
  showName?: boolean
}

export default function FriendAvatar({ friendId, size = 'sm', showName = false }: FriendAvatarProps) {
  const friend = friends.find((f) => f.id === friendId)
  if (!friend) return null

  const dim = size === 'sm' ? 28 : 36

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm"
        style={{
          width: dim,
          height: dim,
          background: friend.color,
          fontSize: size === 'sm' ? 10 : 12,
        }}
      >
        {friend.initials}
      </div>
      {showName && (
        <span className="text-xs text-slate-500 font-medium">{friend.name.split(' ')[0]}</span>
      )}
    </div>
  )
}

interface FriendAvatarGroupProps {
  friendIds: string[]
  max?: number
}

export function FriendAvatarGroup({ friendIds, max = 3 }: FriendAvatarGroupProps) {
  const shown = friendIds.slice(0, max)
  const extra = friendIds.length - max

  return (
    <div className="flex items-center">
      {shown.map((id, i) => {
        const friend = friends.find((f) => f.id === id)
        if (!friend) return null
        return (
          <div
            key={id}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold border-2 border-white"
            style={{
              background: friend.color,
              fontSize: 10,
              marginLeft: i > 0 ? -8 : 0,
              zIndex: shown.length - i,
            }}
          >
            {friend.initials}
          </div>
        )
      })}
      {extra > 0 && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-200 text-slate-600 font-bold border-2 border-white"
          style={{ fontSize: 10, marginLeft: -8 }}
        >
          +{extra}
        </div>
      )}
    </div>
  )
}
