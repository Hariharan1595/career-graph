import { Network, ArrowRight } from "lucide-react";
import { useUserGraph } from "@/hooks/useUserGraph";

const currentUser = "hari";

export default function GraphExplorer() {
  const {
    data: paths = [],
    isLoading,
    isError,
    refetch,
  } = useUserGraph(currentUser);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Network className="text-cyan-400" size={28} />

            <div>
              <h1 className="text-3xl font-bold">Graph Explorer</h1>

              <p className="mt-1 text-sm text-slate-400">
                Explore how your skills connect you to jobs and companies.
              </p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            Loading graph...
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8">
            <h2 className="font-semibold text-rose-300">
              Unable to load graph
            </h2>

            <button
              onClick={() => refetch()}
              className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && paths.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <h2 className="text-lg font-semibold">
              No graph connections found
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Add skills and jobs to see relationship paths.
            </p>
          </div>
        )}

        {!isLoading && !isError && paths.length > 0 && (
          <div className="space-y-6">
            {paths.map((path, index) => (
              <div
                key={`${path.skill}-${path.job}-${path.company}-${index}`}
                className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex min-w-[900px] items-center justify-center gap-3">
                  <GraphNode label={path.user} type="USER" />

                  <Relationship label="HAS_SKILL" />

                  <GraphNode label={path.skill} type="SKILL" />

                  <Relationship label="REQUIRED_FOR" />

                  <GraphNode label={path.job} type="JOB" />

                  <Relationship label="OFFERED_BY" />

                  <GraphNode label={path.company} type="COMPANY" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-semibold">Why this matters</h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            CareerGraph finds recommendations by traversing relationships
            between users, skills, jobs, and companies in CognoDB.
          </p>
        </div>
      </main>
    </div>
  );
}

function GraphNode({ label, type }: { label: string; type: string }) {
  return (
    <div className="min-w-[150px] rounded-2xl border border-cyan-500/20 bg-slate-900 p-5 text-center">
      <p className="text-[10px] tracking-[0.2em] text-slate-500">{type}</p>

      <p className="mt-2 font-semibold text-white">{label}</p>
    </div>
  );
}

function Relationship({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-cyan-400">
      <span>{label}</span>
      <ArrowRight size={18} />
    </div>
  );
}
