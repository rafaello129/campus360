import { Outlet } from "react-router-dom";
import { PresentationDock } from "../components/demo/PresentationDock";
import { PublicNavbar } from "../components/navigation/PublicNavbar";
import { RouteScrollReset } from "../components/navigation/RouteScrollReset";
import { aspiranteNavItems } from "../data/navigation";

export function AspiranteLayout() {
  return (
    <div className="min-h-screen bg-tech-bg">
      <RouteScrollReset />
      <PublicNavbar items={aspiranteNavItems} />
      <main data-route-scroll className="w-full px-4 py-6 sm:px-5 lg:px-6 lg:py-8 2xl:px-8">
        <Outlet />
      </main>
      <PresentationDock />
    </div>
  );
}
