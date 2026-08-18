import { cn } from '@/lib/utils'

interface LoadingStateProps {
  label?: string
  className?: string
}

/** Generic inline loading indicator for smaller, non-grid regions of a page. */
export function LoadingState({ label = 'Loading…', className }: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn('flex items-center justify-center gap-2 py-10 text-sm text-ink-2', className)}
    >
      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border-strong border-t-accent" />
      {label}
    </div>
  )
}
