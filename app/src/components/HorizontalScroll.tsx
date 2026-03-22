interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  return (
    <div className={`overflow-x-auto ${className}`} style={{ scrollbarWidth: 'none' }}>
      <div className="flex gap-3" style={{ width: 'max-content', paddingRight: 20 }}>
        {children}
      </div>
    </div>
  )
}
