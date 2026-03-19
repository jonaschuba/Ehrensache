import { Zap } from 'lucide-react'

interface PointsBadgeProps {
  points: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'gold' | 'blue' | 'green' | 'white'
}

export default function PointsBadge({ points, size = 'md', variant = 'gold' }: PointsBadgeProps) {
  const configs = {
    sm: { px: 'px-2 py-0.5', text: 'text-xs', icon: 12 },
    md: { px: 'px-2.5 py-1', text: 'text-sm', icon: 14 },
    lg: { px: 'px-3 py-1.5', text: 'text-base', icon: 16 },
  }

  const colors = {
    gold: 'bg-gold-light text-amber-700 border border-amber-200',
    blue: 'bg-primary-light text-primary border border-blue-200',
    green: 'bg-secondary-light text-secondary border border-green-200',
    white: 'bg-white/20 text-white border border-white/30',
  }

  const { px, text, icon } = configs[size]

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold ${px} ${text} ${colors[variant]}`}>
      <Zap size={icon} className="fill-current" />
      {points} EP
    </span>
  )
}
