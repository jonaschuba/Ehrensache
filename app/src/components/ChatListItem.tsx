import type { Chat } from '../types'

interface ChatListItemProps {
  chat: Chat
  onClick: () => void
}

export default function ChatListItem({ chat, onClick }: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3.5 px-5 py-4 bg-surface-container-lowest hover:bg-surface-container-low active:bg-surface-container transition-colors"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ background: chat.participantColor }}
      >
        {chat.participantInitials}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <p className="font-headline font-semibold text-on-surface text-sm truncate">{chat.participantName}</p>
          <span className="text-[11px] text-on-surface-variant font-body ml-2 shrink-0">{chat.timestamp}</span>
        </div>
        {chat.ehrensacheName && (
          <p className="text-[11px] text-primary font-label font-medium truncate">{chat.ehrensacheName}</p>
        )}
        <p className="text-xs text-on-surface-variant font-body truncate mt-0.5">{chat.lastMessage}</p>
      </div>
      {chat.unreadCount > 0 && (
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary text-[10px] font-bold shrink-0">
          {chat.unreadCount}
        </div>
      )}
    </button>
  )
}
