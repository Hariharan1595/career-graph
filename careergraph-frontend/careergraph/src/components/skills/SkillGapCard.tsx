import { GraduationCap } from 'lucide-react'
import type { SkillGap } from '@/types'
import { SkillChip } from '@/components/jobs/SkillChip'

interface SkillGapCardProps {
  gap: SkillGap
}

export function SkillGapCard({ gap }: SkillGapCardProps) {
  const missingCount = gap.missingSkills.length

  return (
    <div className="rounded-2xl border border-border bg-surface/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-1">{gap.job}</h3>
          <p className="text-sm text-ink-2">{gap.company}</p>
        </div>
        <span className="rounded-full border border-medium/30 bg-medium-soft px-3 py-1 text-xs font-medium text-medium">
          {missingCount === 0 ? 'You have every skill' : `Missing ${missingCount} skill${missingCount === 1 ? '' : 's'}`}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">Current skills</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gap.currentSkills.map((s) => (
              <SkillChip key={s} label={s} variant="neutral" />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">Required skills</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gap.requiredSkills.map((s) => (
              <SkillChip
                key={s}
                label={s}
                variant={gap.missingSkills.includes(s) ? 'missing' : 'matched'}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">Missing skills</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {gap.missingSkills.length > 0 ? (
              gap.missingSkills.map((s) => <SkillChip key={s} label={s} variant="missing" />)
            ) : (
              <span className="text-xs text-ink-3">Nothing left to learn</span>
            )}
          </div>
        </div>
      </div>

      {missingCount > 0 && (
        <div className="mt-6 border-t border-border pt-4">
          <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-3">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            Recommended to learn
          </p>
          <ul className="space-y-2">
            {gap.missingSkills.map((skill) => (
              <li
                key={skill}
                className="flex items-center justify-between rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm"
              >
                <span className="font-mono text-ink-1">{skill}</span>
                <span className="text-xs text-ink-3">Recommended to learn</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
