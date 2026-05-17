import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import type { NavItem } from "../../types";
import { paths } from "../../router/paths";

interface PublicNavbarProps {
  items: NavItem[];
}

const activeLinkClass = "rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-tech-primary";
const inactiveLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-tech-textSecond transition hover:bg-tech-bg hover:text-tech-textMain";

export function PublicNavbar({ items }: PublicNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-tech-border bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-5 lg:px-6 2xl:px-8">
        <Link to={paths.aspirante.root} className="text-lg font-bold text-tech-primary">
          Campus360
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center rounded-lg border border-tech-border p-2 text-tech-textSecond md:hidden"
          aria-label="Alternar menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === paths.aspirante.root}
              className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={paths.roleSelector}
            className="ml-2 rounded-lg border border-tech-border px-3 py-2 text-sm font-medium text-tech-textSecond hover:bg-tech-bg transition"
          >
            Volver al selector
          </Link>
        </div>
      </div>

      {open ? (
        <div className="space-y-1 border-t border-tech-border px-4 py-3 md:hidden">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === paths.aspirante.root}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block ${isActive ? activeLinkClass : inactiveLinkClass}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to={paths.roleSelector}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg border border-tech-border px-3 py-2 text-sm font-medium text-tech-textSecond hover:bg-tech-bg transition"
          >
            Volver al selector
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

