interface PillTabsProps<T extends string> {
  tabs: { key: T; label: string }[]
  active: T
  onChange: (key: T) => void
}

export default function PillTabs<T extends string>({ tabs, active, onChange }: PillTabsProps<T>) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 rounded-full text-xs font-label font-bold transition-colors ${
            active === tab.key
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container text-on-surface-variant'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
