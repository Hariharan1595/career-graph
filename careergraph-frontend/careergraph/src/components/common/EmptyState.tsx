import type { LucideIcon } from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionTo?: string
  className?: string
}

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  actionTo,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-surface/40 px-6 py-16 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-1">{title}</h3>
      <p className="max-w-sm text-sm text-ink-2">{description}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
