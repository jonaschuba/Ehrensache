interface PageHeaderProps {
  title: string
  subtitle?: string
  rightSlot?: React.ReactNode
}

export default function PageHeader({ title, subtitle, rightSlot }: PageHeaderProps) {
  return (
    <div className="px-5 pt-6 pb-4 shrink-0 flex items-start justify-between">
      <div>
        {subtitle && (
          <p className="font-body text-xs text-on-surface-variant mb-0.5">{subtitle}</p>
        )}
        {title && (
          <h1 className="font-headline text-2xl font-extrabold text-on-surface leading-tight">{title}</h1>
        )}
      </div>
      {rightSlot && <div className="flex items-center gap-2">{rightSlot}</div>}
    </div>
  )
}
