import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SkillChipProps {
  label: string
  variant?: 'neutral' | 'matched' | 'missing'
  className?: string
  style?: React.CSSProperties
}

const variantClasses: Record<NonNullable<SkillChipProps['variant']>, string> = {
  neutral: 'border-border-strong bg-surface text-ink-2',
  matched: 'border-strong/30 bg-strong-soft text-strong',
  missing: 'border-low/30 bg-low-soft text-low',
}

export function SkillChip({ label, variant = 'neutral', className, style }: SkillChipProps) {
  return (
    <span
      style={style}
      className={cn(
        'animate-rise inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-xs',
        variantClasses[variant],
        className,
      )}
    >
      {variant === 'matched' && <Check className="h-3 w-3" aria-hidden="true" />}
      {variant === 'missing' && <X className="h-3 w-3" aria-hidden="true" />}
      {label}
    </span>
  )
}
