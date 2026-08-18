import { BriefcaseBusiness, CheckCircle2, Code2, User } from "lucide-react";

import { useRecommendations } from "@/hooks/useRecommendations";

const currentUser = "hari";

export default function Profile() {
  const {
    data: recommendations = [],
    isLoading,
    isError,
    refetch,
  } = useRecommendations(currentUser);

  const skills = Array.from(
    new Set(
      recommendations.flatMap((recommendation) => recommendation.matchedSkills),
    ),
  );

  const recommendedJobs = recommendations.length;

  const strongMatches = recommendations.filter(
    (job) => job.matchPercentage >= 80,
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>

          <p className="mt-2 text-sm text-slate-400">
            Your career profile and connected skills.
          </p>
        </div>

        {/* Profile card */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500 text-2xl font-bold">
              H
            </div>

            <div>
              <p className="text-sm text-slate-500">Current user</p>

              <h2 className="mt-1 text-3xl font-bold">Hari</h2>

              <p className="mt-1 text-slate-400">CareerGraph profile</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Code2 size={20} />}
            label="Skills"
            value={isLoading ? "..." : String(skills.length)}
          />

          <StatCard
            icon={<BriefcaseBusiness size={20} />}
            label="Recommended Jobs"
            value={isLoading ? "..." : String(recommendedJobs)}
          />

          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="Strong Matches"
            value={isLoading ? "..." : String(strongMatches)}
          />
        </section>

        {/* Error */}
        {isError && (
          <section className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
            <h2 className="font-semibold text-rose-300">
              Unable to load profile insights
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              We couldn't retrieve your connected skills.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Retry
            </button>
          </section>
        )}

        {/* Skills */}
        {!isError && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <User className="text-cyan-400" size={20} />

              <div>
                <h2 className="text-lg font-semibold">Your Technical Skills</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Skills currently connected to your career graph.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-9 w-24 animate-pulse rounded-full bg-white/10"
                  />
                ))}
              </div>
            ) : skills.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm text-slate-500">No skills found.</p>
            )}
          </section>
        )}

        {/* Career insight */}
        {!isError && !isLoading && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">Career Insight</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Your profile is connected to{" "}
              <span className="font-medium text-white">{recommendedJobs}</span>{" "}
              recommended jobs.{" "}
              <span className="font-medium text-white">{strongMatches}</span>{" "}
              currently have an 80% or higher skill match.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/10 p-2 text-cyan-400">
          {icon}
        </div>

        <span className="text-sm text-slate-400">{label}</span>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}
