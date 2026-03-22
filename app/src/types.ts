export interface Ehrensache {
  id: string
  name: string
  organization: string
  organizationId: string
  date: string
  dateEnd: string
  location: string
  district: string
  shortDescription: string
  fullDescription: string
  skills: string[]
  points: number
  gradient: string
  image: string
  urgency: 'hoch' | 'mittel' | 'niedrig'
  durationHours: number
  friendIds: string[]
  status: 'swipe' | 'upcoming' | 'active' | 'completed'
  rating?: number
  impactText?: string
  maxParticipants: number
  currentParticipants: number
}

export interface Friend {
  id: string
  name: string
  initials: string
  color: string
  ehrenpunkte: number
  rankingpunkte: number
  recentEhrensacheId?: string
}

export interface User {
  id: string
  name: string
  initials: string
  age: number
  ehrenpunkte: number
  rankingpunkte: number
  skills: string[]
  experience: string[]
  certificates: string[]
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  isUser: boolean
}

export interface Chat {
  id: string
  participantName: string
  participantType: 'organization' | 'event'
  participantInitials: string
  participantColor: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  ehrensacheName?: string
  messages: Message[]
}

export interface AppNotification {
  id: string
  type: 'cancellation' | 'last_chance' | 'new_event' | 'friend_request' | 'change'
  title: string
  body: string
  timestamp: string
  read: boolean
}

export interface Coupon {
  id: string
  name: string
  partner: string
  pointsRequired: number
  description: string
  category: string
  color: string
}

export type Tab = 'ranking' | 'ehrensachen' | 'swipe' | 'chat' | 'profile'
