import { cn } from '@/lib/utils'

interface GraphNode {
  label: string
  sublabel?: string
  kind: 'user' | 'skill' | 'job' | 'company'
}

interface GraphEdge {
  relation: string
}

interface GraphPathProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const kindStyles: Record<GraphNode['kind'], string> = {
  user: 'border-accent/40 bg-accent-soft text-accent-strong',
  skill: 'border-edge/40 bg-edge-soft text-edge',
  job: 'border-strong/40 bg-strong-soft text-strong',
  company: 'border-border-strong bg-surface text-ink-1',
}

/**
 * Renders a small node-relationship graph (e.g. Hari -HAS_SKILL-> Java
 * -REQUIRED_FOR-> Java Developer -OFFERED_BY-> ABC Tech) with an animated
 * flowing edge, communicating how the backend's graph traversal works.
 */
export function GraphPath({ nodes, edges, className, orientation = 'horizontal' }: GraphPathProps) {
  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={cn(
        'flex items-stretch gap-0',
        isHorizontal ? 'flex-row flex-wrap items-center' : 'flex-col',
        className,
      )}
    >
      {nodes.map((node, i) => (
        <div key={`${node.label}-${i}`} className={cn('flex items-center', isHorizontal ? 'flex-row' : 'flex-col')}>
          <div
            className={cn(
              'animate-pulse-node flex min-w-[9rem] flex-col items-center justify-center gap-0.5 rounded-xl border px-4 py-3 text-center',
              kindStyles[node.kind],
            )}
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <span className="font-display text-sm font-semibold">{node.label}</span>
            {node.sublabel && <span className="text-[10px] uppercase tracking-wide opacity-70">{node.sublabel}</span>}
          </div>

          {i < edges.length && (
            <div className={cn('relative flex items-center justify-center', isHorizontal ? 'w-10 sm:w-14' : 'h-10')}>
              {isHorizontal ? (
                <svg width="100%" height="16" viewBox="0 0 56 16" className="overflow-visible">
                  <line
                    x1="2" y1="8" x2="48" y2="8"
                    stroke="var(--color-border-strong)" strokeWidth="1.5"
                  />
                  <line
                    x1="2" y1="8" x2="48" y2="8"
                    stroke="var(--color-edge)" strokeWidth="1.5"
                    strokeDasharray="4 4" className="animate-flow"
                  />
                  <path d="M46 4L52 8L46 12" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="100%" viewBox="0 0 16 48" className="overflow-visible">
                  <line x1="8" y1="2" x2="8" y2="40" stroke="var(--color-border-strong)" strokeWidth="1.5" />
                  <line x1="8" y1="2" x2="8" y2="40" stroke="var(--color-edge)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow" />
                  <path d="M4 38L8 44L12 38" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+6px)] whitespace-nowrap rounded-full border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-3">
                {edges[i].relation}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
