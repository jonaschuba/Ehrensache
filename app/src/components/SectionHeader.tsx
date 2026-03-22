interface SectionHeaderProps {
  title: string
  action?: string
  onAction?: () => void
  className?: string
}

export default function SectionHeader({ title, action, onAction, className = '' }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h3 className="font-headline font-bold text-on-surface text-base">{title}</h3>
      {action && (
        <button onClick={onAction} className="font-label text-xs text-primary font-semibold">
          {action}
        </button>
      )}
    </div>
  )
}
