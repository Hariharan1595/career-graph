import { cn } from '@/lib/utils'

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-shimmer rounded-md bg-surface-hover', className)}
      aria-hidden="true"
    />
  )
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/5" />
          <Shimmer className="h-3 w-2/5" />
        </div>
        <Shimmer className="h-8 w-14 rounded-full" />
      </div>
      <Shimmer className="mt-4 h-1.5 w-full rounded-full" />
      <div className="mt-4 flex gap-2">
        <Shimmer className="h-6 w-16 rounded-full" />
        <Shimmer className="h-6 w-20 rounded-full" />
      </div>
      <Shimmer className="mt-5 h-8 w-full rounded-lg" />
    </div>
  )
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface/60 p-5">
      <Shimmer className="h-3 w-24" />
      <Shimmer className="mt-3 h-8 w-12" />
    </div>
  )
}

export function ChipSkeleton() {
  return <Shimmer className="h-6 w-20 rounded-full" />
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  )
}
