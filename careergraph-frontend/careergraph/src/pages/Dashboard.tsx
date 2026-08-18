import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  GraduationCap,
  Network,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useRecommendations } from "@/hooks/useRecommendations";
import { useSkillGap } from "@/hooks/useSkillGap";

const currentUser = "hari";

export default function Dashboard() {
  const {
    data: recommendations = [],
    isLoading,
    isError,
    refetch,
  } = useRecommendations(currentUser);

  const topJobs = [...recommendations]
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  const strongMatches = recommendations.filter(
    (job) => job.matchPercentage >= 80,
  ).length;

  const skills = Array.from(
    new Set(recommendations.flatMap((job) => job.matchedSkills)),
  );

  const missingSkills = Array.from(
    new Set(recommendations.flatMap((job) => job.missingSkills)),
  );

  const previewJob =
    recommendations.find((job) => job.missingSkills.length > 0) ??
    recommendations[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-8">
          <p className="text-sm font-medium text-cyan-400">CareerGraph</p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Good afternoon, Hari
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Discover opportunities that connect to your skills.
          </p>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Recommended Jobs"
            value={isLoading ? "..." : String(recommendations.length)}
            icon={<BriefcaseBusiness size={20} />}
          />

          <StatCard
            title="Strong Matches"
            value={isLoading ? "..." : String(strongMatches)}
            icon={<Target size={20} />}
          />

          <StatCard
            title="Your Skills"
            value={isLoading ? "..." : String(skills.length)}
            icon={<Code2 size={20} />}
          />

          <StatCard
            title="Skills to Learn"
            value={isLoading ? "..." : String(missingSkills.length)}
            icon={<GraduationCap size={20} />}
          />
        </section>

        {/* Error */}
        {isError && (
          <section className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 text-center">
            <h2 className="text-lg font-semibold text-rose-300">
              Unable to load recommendations
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please make sure the CareerGraph backend is running.
            </p>

            <button
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Retry
            </button>
          </section>
        )}

        {/* Loading */}
        {isLoading && (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="h-5 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-4 w-1/3 rounded bg-white/10" />
                <div className="mt-6 h-2 rounded bg-white/10" />
                <div className="mt-6 flex gap-2">
                  <div className="h-7 w-16 rounded-full bg-white/10" />
                  <div className="h-7 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Recommendations */}
        {!isLoading && !isError && recommendations.length > 0 && (
          <>
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Top recommended jobs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Ranked by skill match
                  </p>
                </div>

                <Link
                  to="/jobs"
                  className="flex items-center gap-1 text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {topJobs.map((job) => (
                  <JobCard key={`${job.job}-${job.company}`} job={job} />
                ))}
              </div>
            </section>

            {/* Skill gap preview */}
            {previewJob && previewJob.missingSkills.length > 0 && (
              <SkillGapPreview
                jobName={previewJob.job}
                company={previewJob.company}
              />
            )}

            {/* Graph explanation */}
            <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Network className="text-cyan-400" size={22} />

                <h2 className="text-xl font-semibold">
                  How your recommendation works
                </h2>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                CareerGraph traverses relationships in CognoDB from you, to your
                skills, to jobs that require those skills, and finally to the
                companies offering those jobs.
              </p>

              <div className="mt-8 grid gap-3 md:grid-cols-7">
                <GraphBox label="Hari" type="USER" />

                <Relation label="HAS_SKILL" />

                <GraphBox label="Java" type="SKILL" />

                <Relation label="REQUIRED_FOR" />

                <GraphBox label={topJobs[0]?.job ?? "Job"} type="JOB" />

                <Relation label="OFFERED_BY" />

                <GraphBox
                  label={topJobs[0]?.company ?? "Company"}
                  type="COMPANY"
                />
              </div>
            </section>
          </>
        )}

        {/* Empty */}
        {!isLoading && !isError && recommendations.length === 0 && (
          <section className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
            <BriefcaseBusiness className="mx-auto text-slate-600" size={32} />

            <h2 className="mt-4 text-lg font-semibold">
              No recommendations yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add skills to your profile to discover matching jobs.
            </p>

            <Link
              to="/profile"
              className="mt-5 inline-flex rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              View Profile
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
          {icon}
        </div>

        <span className="text-sm text-slate-400">{title}</span>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}

function JobCard({
  job,
}: {
  job: {
    job: string;
    company: string;
    matchedSkills: string[];
    missingSkills: string[];
    matchPercentage: number;
  };
}) {
  const matchColor =
    job.matchPercentage >= 80
      ? "text-emerald-400"
      : job.matchPercentage >= 60
        ? "text-cyan-400"
        : "text-amber-400";

  return (
    <Link
      to={`/jobs/${encodeURIComponent(job.job)}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{job.job}</h3>

          <p className="mt-1 text-sm text-slate-400">{job.company}</p>
        </div>

        <span className={`text-lg font-bold ${matchColor}`}>
          {job.matchPercentage.toFixed(2)}%
        </span>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-cyan-500 transition-all"
            style={{
              width: `${Math.min(job.matchPercentage, 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Matched skills
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {job.matchedSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {job.missingSkills.length > 0 && (
        <div className="mt-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Missing
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {job.missingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}

function SkillGapPreview({
  jobName,
  company,
}: {
  jobName: string;
  company: string;
}) {
  const { data, isLoading } = useSkillGap(currentUser, jobName);

  if (isLoading || !data) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Skill gap preview</h2>

          <p className="mt-1 text-sm text-slate-500">
            What you need for {jobName} at {company}
          </p>
        </div>

        <Link
          to={`/skill-gap`}
          className="text-sm font-medium text-violet-400 hover:text-violet-300"
        >
          Full analysis →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <SkillColumn
          title="Current"
          skills={data.currentSkills}
          className="text-emerald-300"
        />

        <SkillColumn
          title="Required"
          skills={data.requiredSkills}
          className="text-cyan-300"
        />

        <SkillColumn
          title="To learn"
          skills={data.missingSkills}
          className="text-amber-300"
        />
      </div>
    </section>
  );
}

function SkillColumn({
  title,
  skills,
  className,
}: {
  title: string;
  skills: string[];
  className: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full bg-white/[0.05] px-3 py-1.5 text-xs ${className}`}
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-600">None</span>
        )}
      </div>
    </div>
  );
}

function GraphBox({ label, type }: { label: string; type: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-4 text-center">
      <p className="text-[10px] tracking-[0.2em] text-slate-600">{type}</p>

      <p className="mt-2 text-sm font-semibold">{label}</p>
    </div>
  );
}

function Relation({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center text-center text-[10px] font-medium text-cyan-400">
      → {label} →
    </div>
  );
}
