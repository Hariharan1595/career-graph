import { NavLink } from 'react-router-dom'
import { LayoutGrid, Briefcase, GitBranch, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/skill-gap', label: 'Skill Gap', icon: GitBranch },
  { to: '/profile', label: 'Profile', icon: UserRound },
]

export function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-bg-elevated/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
              isActive ? 'text-accent-strong' : 'text-ink-3',
            )
          }
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
