import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: number
  icon: LucideIcon
  tone?: 'accent' | 'strong' | 'medium' | 'edge'
  index?: number
}

const toneClasses = {
  accent: 'text-accent-strong bg-accent-soft',
  strong: 'text-strong bg-strong-soft',
  medium: 'text-medium bg-medium-soft',
  edge: 'text-edge bg-edge-soft',
} as const

export function StatsCard({ label, value, icon: Icon, tone = 'accent', index = 0 }: StatsCardProps) {
  return (
    <div
      className="animate-rise rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-border-strong"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-3">{label}</p>
        <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', toneClasses[tone])}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-2 font-display text-3xl font-semibold tabular text-ink-1">{value}</p>
    </div>
  )
}
