import { Link } from "react-router-dom";
import { paths } from "../router/paths";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="surface-card max-w-md space-y-4 p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-petrol-700">
          Campus360
        </p>
        <h1 className="text-2xl font-bold text-slate-900">Ruta no encontrada</h1>
        <p className="text-sm text-slate-600">
          La vista que buscas no existe en este prototipo. Regresa al selector de rol para
          continuar navegando.
        </p>
        <Link
          to={paths.roleSelector}
          className="inline-flex rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Ir al selector de rol
        </Link>
      </div>
    </div>
  );
}

