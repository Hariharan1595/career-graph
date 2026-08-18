import { NavLink } from 'react-router-dom'
import { LayoutGrid, Briefcase, GitBranch, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ApiStatusIndicator } from './ApiStatusIndicator'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/jobs', label: 'Recommended Jobs', icon: Briefcase },
  { to: '/skill-gap', label: 'Skill Gap', icon: GitBranch },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-bg-elevated/60 lg:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <img src="/logo.svg" alt="" className="h-8 w-8" />
        <div>
          <p className="font-display text-base font-semibold leading-tight text-ink-1">CareerGraph</p>
          <p className="text-[11px] leading-tight text-ink-3">skills → jobs → growth</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent-soft text-accent-strong'
                  : 'text-ink-2 hover:bg-surface-hover hover:text-ink-1',
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-border px-4 py-4">
        <ApiStatusIndicator />
        <div className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-xs font-semibold text-white">
            H
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink-1">Hari</p>
            <p className="truncate text-[11px] text-ink-3">Current user</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
