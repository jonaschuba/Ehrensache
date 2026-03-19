import type { Message } from '../types'

interface ChatBubbleProps {
  message: Message
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          message.isUser
            ? 'bg-primary text-white rounded-br-md'
            : 'bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100'
        }`}
      >
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-200' : 'text-slate-400'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}
