import { useState } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { chats as initialChats } from '../data/chats'
import type { Chat, Message } from '../types'
import ChatListItem from '../components/ChatListItem'
import ChatBubble from '../components/ChatBubble'
import PageHeader from '../components/PageHeader'

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [openChat, setOpenChat] = useState<Chat | null>(null)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim() || !openChat) return
    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: 'user',
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    }
    setChats((prev) =>
      prev.map((c) =>
        c.id === openChat.id
          ? { ...c, messages: [...c.messages, msg], lastMessage: msg.text, unreadCount: 0 }
          : c
      )
    )
    setOpenChat((prev) => prev ? { ...prev, messages: [...prev.messages, msg] } : null)
    setInput('')
  }

  const totalUnread = chats.reduce((sum, c) => sum + c.unreadCount, 0)

  if (openChat) {
    const chat = chats.find((c) => c.id === openChat.id) ?? openChat
    return (
      <div className="flex flex-col h-full bg-surface">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-surface-container-lowest shrink-0">
          <button
            onClick={() => setOpenChat(null)}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-on-surface" />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ background: chat.participantColor }}
          >
            {chat.participantInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-headline font-bold text-on-surface text-sm truncate">{chat.participantName}</p>
            {chat.ehrensacheName && (
              <p className="font-body text-xs text-primary truncate">{chat.ehrensacheName}</p>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 bg-surface-container-low" style={{ scrollbarWidth: 'none' }}>
          {chat.messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </div>

        {/* Input */}
        <div className="px-4 py-3 bg-surface-container-lowest flex items-center gap-2 shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Nachricht schreiben..."
            className="flex-1 bg-surface-container-low rounded-full px-4 py-2.5 font-body text-sm outline-none placeholder:text-on-surface-variant/50 text-on-surface"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send size={16} className="text-on-primary" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      <PageHeader
        title="Chats"
        rightSlot={
          totalUnread > 0 ? (
            <span className="font-label text-xs bg-primary text-on-primary rounded-full px-2.5 py-0.5 font-bold">
              {totalUnread}
            </span>
          ) : undefined
        }
      />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} onClick={() => setOpenChat(chat)} />
        ))}
      </div>
    </div>
  )
}
