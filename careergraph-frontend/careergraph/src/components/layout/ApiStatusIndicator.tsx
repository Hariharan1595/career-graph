import { useApiHealth } from '@/hooks/useApiHealth'
import { cn } from '@/lib/utils'

export function ApiStatusIndicator({ compact = false }: { compact?: boolean }) {
  const { data: isHealthy, isLoading } = useApiHealth()

  const label = isLoading ? 'Checking API…' : isHealthy ? 'API Connected' : 'API Offline'
  const dotClass = isLoading ? 'bg-ink-3' : isHealthy ? 'bg-strong' : 'bg-low'

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs',
        compact && 'border-none bg-transparent px-0 py-0',
      )}
    >
      <span className={cn('relative flex h-2 w-2 rounded-full', dotClass)}>
        {isHealthy && !isLoading && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-strong opacity-60" />
        )}
      </span>
      <span className="text-ink-2">{label}</span>
    </div>
  )
}
