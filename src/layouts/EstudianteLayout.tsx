import { Link, NavLink, Outlet } from "react-router-dom";
import { UserAvatar } from "../components/common/UserAvatar";
import { estudianteNavItems } from "../data/navigation";
import { students } from "../data/students";
import { paths } from "../router/paths";

const activeDesktopClass =
  "flex items-center gap-2 rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-800";
const inactiveDesktopClass =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

export function EstudianteLayout() {
  const currentStudent = students[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <div className="md:grid md:grid-cols-[260px_1fr]">
        <aside className="hidden min-h-screen border-r border-slate-200 bg-white md:flex md:flex-col">
          <div className="border-b border-slate-200 px-5 py-4">
            <h1 className="text-lg font-bold text-petrol-800">Campus360</h1>
            <p className="text-xs text-slate-500">Portal del estudiante</p>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {estudianteNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === paths.estudiante.root}
                  className={({ isActive }) => (isActive ? activeDesktopClass : inactiveDesktopClass)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
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
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Campus360 Estudiante
                </p>
                <p className="text-base font-semibold text-slate-900">{currentStudent.name}</p>
                <p className="text-xs text-slate-500">{currentStudent.career}</p>
              </div>
              <UserAvatar name={currentStudent.name} subtitle={currentStudent.semester} />
            </div>
          </header>

          <main className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex gap-1 overflow-x-auto px-2 py-2">
          {estudianteNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === paths.estudiante.root}
                className={({ isActive }) =>
                  `inline-flex min-w-[92px] flex-col items-center rounded-md px-2 py-1 text-[11px] font-medium ${
                    isActive ? "bg-petrol-50 text-petrol-800" : "text-slate-500"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                <span className="mt-1 truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

