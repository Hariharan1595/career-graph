import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Target, XCircle } from "lucide-react";

import { useRecommendations } from "@/hooks/useRecommendations";
import { useSkillGap } from "@/hooks/useSkillGap";

const currentUser = "hari";

export default function SkillGap() {
  const [selectedJob, setSelectedJob] = useState("");

  const { data: recommendations = [], isLoading: recommendationsLoading } =
    useRecommendations(currentUser);

  const {
    data: skillGap,
    isLoading: skillGapLoading,
    isError: skillGapError,
  } = useSkillGap(currentUser, selectedJob);

  const selectedRecommendation = useMemo(
    () =>
      recommendations.find(
        (job) => job.job.toLowerCase() === selectedJob.toLowerCase(),
      ),
    [recommendations, selectedJob],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Skill Gap Analysis
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Compare your current skills with the requirements of a target job
            and identify what you should learn next.
          </p>
        </div>

        {/* Job selector */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label
            htmlFor="job"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Select a target job
          </label>

          <select
            id="job"
            value={selectedJob}
            onChange={(event) => setSelectedJob(event.target.value)}
            disabled={recommendationsLoading}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 md:max-w-lg"
          >
            <option value="">
              {recommendationsLoading ? "Loading jobs..." : "Choose a job"}
            </option>

            {recommendations.map((job) => (
              <option key={`${job.job}-${job.company}`} value={job.job}>
                {job.job} — {job.company}
              </option>
            ))}
          </select>
        </section>

        {/* Nothing selected */}
        {!selectedJob && (
          <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                <Target size={24} />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                Select a target job
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Choose a role above to see which skills you already have and
                which ones you still need.
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {selectedJob && skillGapLoading && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="h-5 w-32 rounded bg-white/10" />
                <div className="mt-6 space-y-3">
                  <div className="h-8 rounded-full bg-white/10" />
                  <div className="h-8 w-2/3 rounded-full bg-white/10" />
                  <div className="h-8 w-1/2 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {selectedJob && !skillGapLoading && skillGapError && (
          <div className="mt-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
            <h2 className="font-semibold text-rose-300">
              Unable to load skill-gap analysis
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              We couldn't retrieve the skill requirements for this job.
            </p>
          </div>
        )}

        {/* Result */}
        {selectedJob && !skillGapLoading && !skillGapError && skillGap && (
          <>
            {/* Job summary */}
            <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Target role</p>

                  <h2 className="mt-1 text-2xl font-bold">{skillGap.job}</h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {skillGap.company}
                  </p>
                </div>

                {selectedRecommendation && (
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Current Match
                    </p>

                    <p className="mt-1 text-2xl font-bold text-cyan-300">
                      {selectedRecommendation.matchPercentage.toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Skill comparison */}
            <section className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Current */}
              <SkillCard
                title="Current Skills"
                subtitle={`${skillGap.currentSkills.length} skills`}
                icon={<CheckCircle2 size={20} />}
                iconClass="text-emerald-400"
                borderClass="border-emerald-500/20"
                bgClass="bg-emerald-500/[0.04]"
              >
                {skillGap.currentSkills.length > 0 ? (
                  skillGap.currentSkills.map((skill) => (
                    <SkillChip
                      key={skill}
                      text={skill}
                      className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    />
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No current skills found.
                  </p>
                )}
              </SkillCard>

              {/* Required */}
              <SkillCard
                title="Required Skills"
                subtitle={`${skillGap.requiredSkills.length} skills`}
                icon={<Target size={20} />}
                iconClass="text-cyan-400"
                borderClass="border-cyan-500/20"
                bgClass="bg-cyan-500/[0.04]"
              >
                {skillGap.requiredSkills.map((skill) => (
                  <SkillChip
                    key={skill}
                    text={skill}
                    className="border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                  />
                ))}
              </SkillCard>

              {/* Missing */}
              <SkillCard
                title="Skills to Learn"
                subtitle={`${skillGap.missingSkills.length} skills`}
                icon={<XCircle size={20} />}
                iconClass="text-amber-400"
                borderClass="border-amber-500/20"
                bgClass="bg-amber-500/[0.04]"
              >
                {skillGap.missingSkills.length > 0 ? (
                  skillGap.missingSkills.map((skill) => (
                    <SkillChip
                      key={skill}
                      text={skill}
                      className="border-amber-500/20 bg-amber-500/10 text-amber-300"
                    />
                  ))
                ) : (
                  <p className="text-sm text-emerald-400">
                    You already have all required skills.
                  </p>
                )}
              </SkillCard>
            </section>

            {/* Learning path */}
            <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold">Your Skill Path</h2>

              <p className="mt-2 text-sm text-slate-400">
                Focus on the missing skills to improve your match for this role.
              </p>

              <div className="mt-6 flex flex-col items-center justify-center gap-3 md:flex-row">
                <PathBox
                  title="You have"
                  value={`${skillGap.currentSkills.length} skills`}
                />

                <ArrowRight className="hidden text-slate-600 md:block" />

                <PathBox
                  title="Need to learn"
                  value={`${skillGap.missingSkills.length} skills`}
                  highlight={skillGap.missingSkills.length > 0}
                />

                <ArrowRight className="hidden text-slate-600 md:block" />

                <PathBox title="Target" value={skillGap.job} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function SkillCard({
  title,
  subtitle,
  icon,
  iconClass,
  borderClass,
  bgClass,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
  borderClass: string;
  bgClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border ${borderClass} ${bgClass} p-6`}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={iconClass}>{icon}</span>

          <div>
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function SkillChip({ text, className }: { text: string; className: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}
    >
      {text}
    </span>
  );
}

function PathBox({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-xl border p-4 text-center md:w-52 ${
        highlight
          ? "border-amber-500/20 bg-amber-500/5"
          : "border-white/10 bg-slate-900"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-slate-500">{title}</p>

      <p
        className={`mt-2 text-sm font-semibold ${
          highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
