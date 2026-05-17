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
    <div className="min-h-screen bg-tech-bg md:h-screen md:overflow-hidden">
      <div className="md:grid md:h-screen md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-tech-border bg-white md:sticky md:top-0 md:flex md:h-screen md:flex-col">
          <div className="border-b border-tech-border px-5 py-4">
            <h1 className="text-lg font-bold text-tech-primary">Campus360</h1>
            <p className="text-xs text-tech-textSecond">{roleTitle}</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
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
                        ? "bg-blue-100 font-semibold text-tech-primary"
                        : "text-tech-textSecond hover:bg-tech-bg hover:text-tech-textMain"
                    }`
                  }
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {item.badge ? (
                    <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-tech-border p-3">
            <Link
              to={paths.roleSelector}
              className="block rounded-lg border border-tech-border px-3 py-2 text-center text-sm font-medium text-tech-textSecond transition hover:bg-tech-bg"
            >
              Cambiar rol
            </Link>
          </div>
        </aside>

        <div className="min-w-0 md:flex md:h-screen md:flex-col md:overflow-hidden">
          <header className="sticky top-0 z-20 border-b border-tech-border bg-white/95 px-4 py-3 backdrop-blur sm:px-5 lg:px-6 2xl:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="rounded-lg border border-tech-border p-2 text-tech-textSecond md:hidden"
                  aria-label="Alternar navegación"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-tech-textSecond">
                    {roleTitle}
                  </p>
                  <p className="text-lg font-semibold text-tech-textMain">{currentSection}</p>
                </div>
              </div>

              <Link
                to={paths.roleSelector}
                className="rounded-lg border border-tech-border px-3 py-2 text-sm font-medium text-tech-textSecond hover:bg-tech-bg transition"
              >
                Cambiar rol
              </Link>
            </div>

            {open ? (
              <nav className="mt-3 space-y-1 border-t border-tech-border pt-3 md:hidden">
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
                            ? "bg-blue-100 font-semibold text-tech-primary"
                            : "text-tech-textSecond hover:bg-tech-bg"
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

          <main className="p-4 sm:p-5 md:flex-1 md:overflow-y-auto lg:p-6 2xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

