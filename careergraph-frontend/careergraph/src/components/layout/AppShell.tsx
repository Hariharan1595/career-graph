import {
  BarChart3,
  BriefcaseBusiness,
  CircleUserRound,
  Network,
  Route,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Skill Gap",
    path: "/skill-gap",
    icon: Route,
  },
  {
    name: "Graph",
    path: "/graph",
    icon: Network,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: CircleUserRound,
  },
];

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950 lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="text-xl font-bold text-cyan-400">CareerGraph</div>

            <p className="mt-1 text-xs text-slate-500">
              Skills → Jobs → Opportunities
            </p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-cyan-500/10 text-cyan-300"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="space-y-3 border-t border-white/10 p-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs text-slate-500">API Status</p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-300">Connected</span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 font-semibold">
                H
              </div>

              <div>
                <p className="text-sm font-medium">Hari</p>
                <p className="text-xs text-slate-500">Current user</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1 pb-20 lg:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center justify-center gap-1 py-3 text-[11px] transition",
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-500 hover:text-white",
                  ].join(" ")
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
