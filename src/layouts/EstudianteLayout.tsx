import { Link, NavLink, Outlet } from "react-router-dom";
import { UserAvatar } from "../components/common/UserAvatar";
import { estudianteNavItems } from "../data/navigation";
import { students } from "../data/students";
import { paths } from "../router/paths";

const activeDesktopClass =
  "flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-tech-primary";
const inactiveDesktopClass =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-tech-textSecond transition hover:bg-tech-bg hover:text-tech-textMain";

export function EstudianteLayout() {
  const currentStudent = students[0];

  return (
    <div className="min-h-screen bg-tech-bg pb-20 md:h-screen md:overflow-hidden md:pb-0">
      <div className="md:grid md:h-screen md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-tech-border bg-white md:sticky md:top-0 md:flex md:h-screen md:flex-col">
          <div className="border-b border-tech-border px-5 py-4">
            <h1 className="text-lg font-bold text-tech-primary">Campus360</h1>
            <p className="text-xs text-tech-textSecond">Portal del estudiante</p>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
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
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-tech-textSecond">
                  Campus360 Estudiante
                </p>
                <p className="text-base font-semibold text-tech-textMain">{currentStudent.name}</p>
                <p className="text-xs text-tech-textSecond">{currentStudent.career}</p>
              </div>
              <UserAvatar name={currentStudent.name} subtitle={currentStudent.semester} />
            </div>
          </header>

          <main className="p-4 sm:p-5 md:flex-1 md:overflow-y-auto lg:p-6 2xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-tech-border bg-white/95 backdrop-blur md:hidden">
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
                    isActive ? "bg-blue-100 text-tech-primary" : "text-tech-textSecond"
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

