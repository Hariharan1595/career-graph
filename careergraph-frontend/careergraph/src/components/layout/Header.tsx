import { Search } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-border bg-bg/80 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <h1 className="font-display text-xl font-semibold text-ink-1 sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-2">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <label className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search jobs, companies, skills…"
            aria-label="Search"
            className="w-64 rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-ink-1 placeholder:text-ink-3 outline-none transition-colors focus:border-accent/50"
          />
        </label>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-white">
          H
        </div>
      </div>
    </header>
  )
}
