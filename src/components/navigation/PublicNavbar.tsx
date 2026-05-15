import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import type { NavItem } from "../../types";
import { paths } from "../../router/paths";

interface PublicNavbarProps {
  items: NavItem[];
}

const activeLinkClass = "rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-800";
const inactiveLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

export function PublicNavbar({ items }: PublicNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={paths.aspirante.root} className="text-lg font-bold text-petrol-800">
          Campus360
        </Link>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden"
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
            className="ml-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver al selector
          </Link>
        </div>
      </div>

      {open ? (
        <div className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden">
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
            className="mt-2 block rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
          >
            Volver al selector
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

