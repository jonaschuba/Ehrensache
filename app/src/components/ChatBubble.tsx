import type { Message } from '../types'

interface ChatBubbleProps {
  message: Message
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-[78%] px-4 py-2.5 text-sm font-body leading-relaxed ${
          message.isUser
            ? 'bg-primary text-on-primary rounded-[1.25rem] rounded-br-[0.375rem]'
            : 'bg-surface-container-lowest text-on-surface rounded-[1.25rem] rounded-bl-[0.375rem]'
        }`}
      >
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${message.isUser ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}
