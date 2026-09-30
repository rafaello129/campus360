import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PresentationDock } from "../components/demo/PresentationDock";
import { getPresentationScene } from "../config/presentationDemo";
import {
  getPresentationSession,
  subscribeToPresentationChanges
} from "../data/presentationSession";
import { paths } from "../router/paths";

export function NotFoundPage() {
  const [session, setSession] = useState(() => getPresentationSession());

  useEffect(
    () =>
      subscribeToPresentationChanges(() => {
        setSession(getPresentationSession());
      }),
    []
  );

  const scene = getPresentationScene(session?.currentSceneId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] p-6">
      <div className="surface-card max-w-md space-y-4 rounded-3xl border border-tech-border p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-primary">
          Campus360
        </p>
        <h1 className="text-2xl font-semibold text-tech-textMain">Ruta no encontrada</h1>
        <p className="text-sm leading-6 text-tech-textSecond">
          La vista que buscas no existe en este prototipo. Puedes regresar al selector o recuperar
          la escena actual si estás usando el modo presentación.
        </p>

        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          {session?.enabled && scene ? (
            <Link
              to={scene.entryPath}
              className="inline-flex items-center justify-center rounded-2xl bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
            >
              Volver a la escena {scene.id}
            </Link>
          ) : null}
          <Link
            to={paths.roleSelector}
            className="inline-flex items-center justify-center rounded-2xl border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg"
          >
            Ir al selector de rol
          </Link>
        </div>
      </div>

      <PresentationDock />
    </div>
  );
}
