import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useRecommendations } from "@/hooks/useRecommendations";
import type { Recommendation } from "@/types";

type SortOption = "match" | "job" | "company";

const currentUser = "hari";

function getMatchLabel(percentage: number) {
  if (percentage >= 80) return "Excellent Match";
  if (percentage >= 60) return "Good Match";
  if (percentage >= 40) return "Potential Match";
  return "Low Match";
}

function getMatchClasses(percentage: number) {
  if (percentage >= 80) {
    return {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      bar: "bg-emerald-500",
    };
  }

  if (percentage >= 60) {
    return {
      badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      bar: "bg-cyan-500",
    };
  }

  if (percentage >= 40) {
    return {
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      bar: "bg-amber-500",
    };
  }

  return {
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    bar: "bg-rose-500",
  };
}

export default function Jobs() {
  const navigate = useNavigate();

  const {
    data: recommendations = [],
    isLoading,
    isError,
    refetch,
  } = useRecommendations(currentUser);

  const [search, setSearch] = useState("");
  const [minMatch, setMinMatch] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("match");

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...recommendations]
      .filter((job: Recommendation) => {
        if (!query) return true;

        return (
          job.job.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.matchedSkills.some((skill) =>
            skill.toLowerCase().includes(query),
          ) ||
          job.missingSkills.some((skill) => skill.toLowerCase().includes(query))
        );
      })
      .filter((job: Recommendation) => job.matchPercentage >= minMatch)
      .sort((a, b) => {
        switch (sortBy) {
          case "job":
            return a.job.localeCompare(b.job);

          case "company":
            return a.company.localeCompare(b.company);

          case "match":
          default:
            return b.matchPercentage - a.matchPercentage;
        }
      });
  }, [recommendations, search, minMatch, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Recommended Jobs
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Discover opportunities matched to your skills.
              </p>
            </div>
          </div>
        </div>

        {/* Search + controls */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search jobs, companies or skills..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-xl border border-white/10 bg-slate-900 px-10 py-3 text-sm text-white outline-none focus:border-cyan-500/50"
              >
                <option value="match">Sort by Match</option>
                <option value="job">Sort by Job</option>
                <option value="company">Sort by Company</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="mr-1 flex items-center gap-2 text-sm text-slate-400">
              <SlidersHorizontal size={16} />
              Match:
            </div>

            {[0, 80, 60, 40].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMinMatch(value)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  minMatch === value
                    ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {value === 0 ? "All" : `${value}%+`}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-5 h-6 w-2/3 rounded bg-white/10" />
                <div className="mb-6 h-4 w-1/3 rounded bg-white/10" />
                <div className="mb-3 h-3 w-full rounded bg-white/10" />
                <div className="mb-6 h-3 w-4/5 rounded bg-white/10" />
                <div className="mb-3 h-4 w-1/4 rounded bg-white/10" />

                <div className="flex gap-2">
                  <div className="h-7 w-16 rounded-full bg-white/10" />
                  <div className="h-7 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="max-w-md rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 text-center">
              <h2 className="text-lg font-semibold text-white">
                Unable to load recommendations
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                We couldn't retrieve your recommended jobs. Please make sure the
                backend is running.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filteredJobs.length === 0 && (
          <div className="flex min-h-[320px] items-center justify-center">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-400">
                <Search size={24} />
              </div>

              <h2 className="text-lg font-semibold">No matching jobs found</h2>

              <p className="mt-2 text-sm text-slate-400">
                Try changing your search or lowering the match filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setMinMatch(0);
                }}
                className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && filteredJobs.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-medium text-white">
                  {filteredJobs.length}
                </span>{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => {
                const styles = getMatchClasses(job.matchPercentage);

                return (
                  <article
                    key={`${job.job}-${job.company}`}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
                  >
                    {/* Title */}
                    <div className="mb-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-lg font-semibold text-white">
                            {job.job}
                          </h2>

                          <p className="mt-1 text-sm text-slate-400">
                            {job.company}
                          </p>
                        </div>

                        <div
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
                        >
                          {job.matchPercentage.toFixed(2)}%
                        </div>
                      </div>

                      <p className="mt-3 text-xs font-medium text-slate-500">
                        {getMatchLabel(job.matchPercentage)}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          Match score
                        </span>

                        <span className="text-xs font-medium text-slate-300">
                          {job.matchPercentage.toFixed(2)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${styles.bar} transition-all duration-700`}
                          style={{
                            width: `${Math.min(
                              Math.max(job.matchPercentage, 0),
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Matched Skills */}
                    <div className="mb-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Matched Skills
                      </p>

                      {job.matchedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {job.matchedSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-500">
                          No matched skills
                        </span>
                      )}
                    </div>

                    {/* Missing Skills */}
                    <div className="mb-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Missing Skills
                      </p>

                      {job.missingSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {job.missingSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-emerald-400">
                          No missing skills
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/jobs/${encodeURIComponent(job.job)}`)
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      View Job Details
                    </button>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
