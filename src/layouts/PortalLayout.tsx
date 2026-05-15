import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import type { NavItem } from "../types";
import { paths } from "../router/paths";

interface PortalLayoutProps {
  roleTitle: string;
  roleBasePath: string;
  navItems: NavItem[];
}

export function PortalLayout({ roleTitle, roleBasePath, navItems }: PortalLayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const activeItem = navItems
    .slice()
    .sort((a, b) => b.path.length - a.path.length)
    .find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(`${item.path}/`)
    );

  const currentSection = activeItem?.label ?? roleTitle;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="md:grid md:grid-cols-[260px_1fr]">
        <aside className="hidden min-h-screen border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-5 py-4">
            <h1 className="text-lg font-bold text-petrol-800">Campus360</h1>
            <p className="text-xs text-slate-500">{roleTitle}</p>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === roleBasePath}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-petrol-50 font-semibold text-petrol-800"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-3">
            <Link
              to={paths.roleSelector}
              className="block rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cambiar rol
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
                  aria-label="Alternar navegación"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {roleTitle}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">{currentSection}</p>
                </div>
              </div>

              <Link
                to={paths.roleSelector}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Cambiar rol
              </Link>
            </div>

            {open ? (
              <nav className="mt-3 space-y-1 border-t border-slate-200 pt-3 md:hidden">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === roleBasePath}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          isActive
                            ? "bg-petrol-50 font-semibold text-petrol-800"
                            : "text-slate-600 hover:bg-slate-100"
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>
            ) : null}
          </header>

          <main className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

