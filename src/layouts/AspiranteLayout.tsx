import { Outlet } from "react-router-dom";
import { PublicNavbar } from "../components/navigation/PublicNavbar";
import { aspiranteNavItems } from "../data/navigation";

export function AspiranteLayout() {
  return (
    <div className="min-h-screen bg-tech-bg">
      <PublicNavbar items={aspiranteNavItems} />
      <main className="w-full px-4 py-6 sm:px-5 lg:px-6 lg:py-8 2xl:px-8">
        <Outlet />
      </main>
    </div>
  );
}

