import { Link } from "react-router-dom";
import { paths } from "../router/paths";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] p-6">
      <div className="surface-card max-w-md space-y-4 rounded-3xl border border-tech-border p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-primary">
          Campus360
        </p>
        <h1 className="text-2xl font-semibold text-tech-textMain">Ruta no encontrada</h1>
        <p className="text-sm leading-6 text-tech-textSecond">
          La vista que buscas no existe en este prototipo. Regresa al selector de rol para
          continuar navegando.
        </p>
        <Link
          to={paths.roleSelector}
          className="inline-flex rounded-2xl bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
        >
          Ir al selector de rol
        </Link>
      </div>
    </div>
  );
}

