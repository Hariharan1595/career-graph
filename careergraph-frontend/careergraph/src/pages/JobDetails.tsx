import { useMemo } from "react";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Target,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecommendations } from "@/hooks/useRecommendations";
import { useSkillGap } from "@/hooks/useSkillGap";

const currentUser = "hari";

export default function JobDetails() {
  const navigate = useNavigate();
  const { jobName } = useParams<{ jobName: string }>();

  const decodedJobName = decodeURIComponent(jobName ?? "");

  const { data: recommendations = [], isLoading: recommendationsLoading } =
    useRecommendations(currentUser);

  const {
    data: skillGap,
    isLoading: skillGapLoading,
    isError: skillGapError,
  } = useSkillGap(currentUser, decodedJobName);

  const job = useMemo(
    () =>
      recommendations.find(
        (recommendation) =>
          recommendation.job.toLowerCase() === decodedJobName.toLowerCase(),
      ),
    [recommendations, decodedJobName],
  );

  if (recommendationsLoading || skillGapLoading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 h-8 w-32 rounded bg-white/10" />
          <div className="h-10 w-2/3 rounded bg-white/10" />
          <div className="mt-3 h-5 w-1/3 rounded bg-white/10" />
          <div className="mt-8 h-40 rounded-2xl bg-white/[0.04]" />
          <div className="mt-6 h-52 rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl py-20 text-center">
          <h1 className="text-2xl font-bold">Job not found</h1>
          <p className="mt-3 text-slate-400">
            We couldn't find this job in your recommendations.
          </p>

          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const matchedSkills = job.matchedSkills;
  const missingSkills = job.missingSkills;
  const requiredSkills = job.requiredSkills;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="mb-8 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* Header */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3 text-slate-400">
                <Building2 size={20} />
                <span>{job.company}</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {job.job}
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                This role was recommended based on the skills connected to your
                profile.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Match Score
              </p>

              <p className="mt-2 text-4xl font-bold text-cyan-300">
                {job.matchPercentage.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">Skill match</span>
              <span className="font-medium text-slate-300">
                {job.matchPercentage.toFixed(2)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                style={{
                  width: `${Math.min(Math.max(job.matchPercentage, 0), 100)}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Required */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Target className="text-cyan-400" size={20} />
              <h2 className="font-semibold">Required Skills</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Matched */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400" size={20} />
              <h2 className="font-semibold">You Have</h2>
            </div>

            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                No matching skills found.
              </p>
            )}
          </div>

          {/* Missing */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <div className="mb-5 flex items-center gap-3">
              <XCircle className="text-amber-400" size={20} />
              <h2 className="font-semibold">Skills to Learn</h2>
            </div>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-emerald-400">
                You already have all required skills.
              </p>
            )}
          </div>
        </section>

        {/* Recommendation explanation */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">
            Why this job was recommended
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            CareerGraph compared the skills connected to your profile with the
            skills required by this job. Jobs with stronger skill overlap
            receive a higher match percentage.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
            <Node label={currentUser} type="User" />
            <Arrow />
            <Node label="HAS_SKILL" type="Relationship" />
            <Arrow />
            <Node label={matchedSkills[0] ?? "Skill"} type="Skill" />
            <Arrow />
            <Node label="REQUIRED_FOR" type="Relationship" />
            <Arrow />
            <Node label={job.job} type="Job" />
            <Arrow />
            <Node label="OFFERED_BY" type="Relationship" />
            <Arrow />
            <Node label={job.company} type="Company" />
          </div>
        </section>

        {/* Skill gap */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">Skill Gap Analysis</h2>

          {skillGapError ? (
            <div className="mt-5 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <p className="text-sm text-rose-300">
                Unable to load detailed skill-gap information.
              </p>
            </div>
          ) : skillGap ? (
            <div className="mt-5 grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Current Skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {skillGap.currentSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Required Skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {skillGap.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Missing Skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {skillGap.missingSkills.length > 0 ? (
                    skillGap.missingSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-amber-500/10 px-3 py-1.5 text-sm text-amber-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-emerald-400">None</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No skill-gap data available for this job.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function Node({ label, type }: { label: string; type: string }) {
  return (
    <div className="min-w-[120px] rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-center">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {type}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{label}</p>
    </div>
  );
}

function Arrow() {
  return <div className="rotate-90 text-slate-600 md:rotate-0">→</div>;
}
