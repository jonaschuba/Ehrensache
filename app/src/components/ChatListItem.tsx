import type { Chat } from '../types'

interface ChatListItemProps {
  chat: Chat
  onClick: () => void
}

export default function ChatListItem({ chat, onClick }: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 bg-white hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-100"
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
        style={{ background: chat.participantColor }}
      >
        {chat.participantInitials}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold text-slate-800 text-sm truncate">{chat.participantName}</p>
          <span className="text-xs text-slate-400 ml-2 shrink-0">{chat.timestamp}</span>
        </div>
        {chat.ehrensacheName && (
          <p className="text-xs text-primary font-medium truncate">{chat.ehrensacheName}</p>
        )}
        <p className="text-xs text-slate-500 truncate mt-0.5">{chat.lastMessage}</p>
      </div>
      {chat.unreadCount > 0 && (
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
          {chat.unreadCount}
        </div>
      )}
    </button>
  )
}
