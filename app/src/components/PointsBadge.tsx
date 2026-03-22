import { Star } from 'lucide-react'

interface PointsBadgeProps {
  points: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'green' | 'primary' | 'glass'
}

export default function PointsBadge({ points, size = 'md', variant = 'green' }: PointsBadgeProps) {
  const configs = {
    sm: { px: 'px-2 py-0.5', text: 'text-xs', icon: 10 },
    md: { px: 'px-2.5 py-1', text: 'text-sm', icon: 12 },
    lg: { px: 'px-3 py-1.5', text: 'text-base', icon: 14 },
  }

  const colors = {
    green: 'bg-secondary-container text-on-surface',
    primary: 'bg-primary-fixed text-primary',
    glass: 'glass-dark text-white',
  }

  const { px, text, icon } = configs[size]

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-label font-bold ${px} ${text} ${colors[variant]}`}>
      <Star size={icon} className="fill-current" />
      {points} EP
    </span>
  )
}
