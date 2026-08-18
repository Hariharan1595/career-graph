import { matchTier, formatPercent, cn } from '@/lib/utils'

const tierClasses = {
  strong: 'bg-strong-soft text-strong border-strong/30',
  medium: 'bg-medium-soft text-medium border-medium/30',
  low: 'bg-low-soft text-low border-low/30',
} as const

const tierLabel = {
  strong: 'Strong match',
  medium: 'Good match',
  low: 'Partial match',
} as const

interface MatchBadgeProps {
  percentage: number
  className?: string
  showLabel?: boolean
}

export function MatchBadge({ percentage, className, showLabel = false }: MatchBadgeProps) {
  const tier = matchTier(percentage)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold tabular',
        tierClasses[tier],
        className,
      )}
    >
      {formatPercent(percentage)}
      {showLabel && <span className="font-sans font-normal opacity-80">· {tierLabel[tier]}</span>}
    </span>
  )
}
