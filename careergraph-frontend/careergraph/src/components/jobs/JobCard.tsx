import { Link } from 'react-router-dom'
import { ArrowRight, Building2 } from 'lucide-react'
import type { Recommendation } from '@/types'
import { slugifyJob } from '@/lib/utils'
import { MatchBadge } from './MatchBadge'
import { MatchProgress } from './MatchProgress'
import { SkillChip } from './SkillChip'

interface JobCardProps {
  recommendation: Recommendation
  index?: number
}

export function JobCard({ recommendation, index = 0 }: JobCardProps) {
  const { job, company, matchPercentage, matchedSkills, missingSkills } = recommendation

  return (
    <article
      className="animate-rise group flex flex-col rounded-2xl border border-border bg-surface/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface hover:shadow-[0_8px_30px_-12px_rgba(124,111,242,0.25)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold text-ink-1">{job}</h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-2">
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
            {company}
          </p>
        </div>
        <MatchBadge percentage={matchPercentage} />
      </div>

      <MatchProgress percentage={matchPercentage} className="mt-4" />

      <div className="mt-4 flex-1 space-y-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">Matched skills</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => <SkillChip key={skill} label={skill} variant="matched" />)
            ) : (
              <span className="text-xs text-ink-3">None yet</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-3">Missing skills</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => <SkillChip key={skill} label={skill} variant="missing" />)
            ) : (
              <SkillChip label="None" variant="matched" />
            )}
          </div>
        </div>
      </div>

      <Link
        to={`/jobs/${slugifyJob(job)}`}
        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-strong bg-bg-elevated px-3 py-2 text-sm font-medium text-ink-1 transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-accent-strong"
      >
        View details
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
