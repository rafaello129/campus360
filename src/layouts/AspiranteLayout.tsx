import { Outlet } from "react-router-dom";
import { PublicNavbar } from "../components/navigation/PublicNavbar";
import { aspiranteNavItems } from "../data/navigation";

export function AspiranteLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar items={aspiranteNavItems} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}

