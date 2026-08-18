import { RefreshCw, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Unable to load recommendations',
  description = 'Please check that the CareerGraph backend is running and reachable.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-low/30 bg-low-soft px-6 py-16 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-low/15 text-low">
        <WifiOff className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-1">{title}</h3>
      <p className="max-w-sm text-sm text-ink-2">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-ink-1 transition-colors hover:bg-surface-hover"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  )
}
