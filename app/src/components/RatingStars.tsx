import { useState } from 'react'
import { Star } from 'lucide-react'

interface RatingStarsProps {
  value?: number
  onChange?: (v: number) => void
  readOnly?: boolean
  size?: number
}

export default function RatingStars({ value = 0, onChange, readOnly = false, size = 20 }: RatingStarsProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hover || value)
        return (
          <button
            key={star}
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={`transition-transform ${readOnly ? 'cursor-default' : 'hover:scale-110 cursor-pointer'}`}
          >
            <Star
              size={size}
              strokeWidth={1.5}
              className={filled ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-100'}
            />
          </button>
        )
      })}
    </div>
  )
}
