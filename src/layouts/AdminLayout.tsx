import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SearchInput } from "../components/common/SearchInput";
import { UserAvatar } from "../components/common/UserAvatar";
import { adminNavItems } from "../data/navigation";
import { paths } from "../router/paths";

const activeClass =
  "flex items-center justify-between rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-tech-primary";
const inactiveClass =
  "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-tech-textSecond transition hover:bg-tech-bg hover:text-tech-textMain";

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-tech-bg md:h-screen md:overflow-hidden">
      <div className="md:grid md:h-screen md:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-tech-border bg-white md:sticky md:top-0 md:flex md:h-screen md:flex-col">
          <div className="border-b border-tech-border px-5 py-4">
            <h1 className="text-lg font-bold text-tech-primary">Campus360</h1>
            <p className="text-xs text-tech-textSecond">Panel administrativo</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {adminNavItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === paths.admin.root}
                  className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
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
              className="block rounded-lg border border-tech-border px-3 py-2 text-center text-sm font-medium text-tech-textSecond hover:bg-tech-bg transition"
            >
              Volver al selector
            </Link>
          </div>
        </aside>

        <div className="min-w-0 md:flex md:h-screen md:flex-col md:overflow-hidden">
          <header className="sticky top-0 z-20 border-b border-tech-border bg-white/95 px-4 py-3 backdrop-blur sm:px-5 lg:px-6 2xl:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="rounded-lg border border-tech-border p-2 text-tech-textSecond md:hidden"
                aria-label="Alternar navegación administrativa"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <SearchInput
                placeholder="Buscar aspirantes, estudiantes o documentos..."
                className="hidden min-w-0 flex-1 sm:flex sm:max-w-xl"
              />

              <button
                type="button"
                className="relative ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-tech-border text-tech-textSecond transition hover:bg-tech-bg sm:ml-0"
                aria-label="Ver notificaciones"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                  4
                </span>
              </button>

              <div className="hidden sm:block">
                <UserAvatar name="Laura Mendoza" subtitle="Administración" />
              </div>
            </div>

            {mobileOpen ? (
              <nav className="mt-3 space-y-1 border-t border-tech-border pt-3 md:hidden">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === paths.admin.root}
                      onClick={() => setMobileOpen(false)}
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

