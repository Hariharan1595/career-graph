import { matchTier, cn } from '@/lib/utils'

const barClasses = {
  strong: 'bg-strong',
  medium: 'bg-medium',
  low: 'bg-low',
} as const

interface MatchProgressProps {
  percentage: number
  className?: string
}

export function MatchProgress({ percentage, className }: MatchProgressProps) {
  const tier = matchTier(percentage)
  const clamped = Math.min(100, Math.max(0, percentage))
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-hover', className)}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-out', barClasses[tier])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
