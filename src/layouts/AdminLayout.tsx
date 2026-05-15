import { Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SearchInput } from "../components/common/SearchInput";
import { UserAvatar } from "../components/common/UserAvatar";
import { adminNavItems } from "../data/navigation";
import { paths } from "../router/paths";

const activeClass =
  "flex items-center justify-between rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-800";
const inactiveClass =
  "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="md:grid md:grid-cols-[280px_1fr]">
        <aside className="hidden min-h-screen border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-5 py-4">
            <h1 className="text-lg font-bold text-petrol-800">Campus360</h1>
            <p className="text-xs text-slate-500">Panel administrativo</p>
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
              className="block rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Volver al selector
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
                aria-label="Alternar navegación administrativa"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <SearchInput
                placeholder="Buscar aspirantes, estudiantes o documentos..."
                className="max-w-xl"
              />

              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                aria-label="Ver notificaciones"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-petrol-700 px-1 text-[10px] font-bold text-white">
                  4
                </span>
              </button>

              <UserAvatar name="Laura Mendoza" subtitle="Administración" />
            </div>

            {mobileOpen ? (
              <nav className="mt-3 space-y-1 border-t border-slate-200 pt-3 md:hidden">
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

