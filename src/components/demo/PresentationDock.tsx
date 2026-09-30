import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  RotateCcw,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PRESENTATION_SCENE_COUNT,
  getPresentationScene
} from "../../config/presentationDemo";
import {
  disablePresentation,
  getPresentationSession,
  previousPresentationScene,
  nextPresentationScene,
  setPresentationScene,
  subscribeToPresentationChanges
} from "../../data/presentationSession";
import { getPresentationReadinessMessage } from "../../data/presentationReadiness";
import { subscribeToCampusStorageChange } from "../../data/storageEvents";
import { paths } from "../../router/paths";

export function PresentationDock() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => getPresentationSession());
  const [expanded, setExpanded] = useState(false);
  const [, setRevision] = useState(0);

  useEffect(
    () =>
      subscribeToPresentationChanges(() => {
        setSession(getPresentationSession());
      }),
    []
  );

  useEffect(
    () =>
      subscribeToCampusStorageChange(() => {
        setRevision((value) => value + 1);
      }),
    []
  );

  const scene = useMemo(
    () => getPresentationScene(session?.currentSceneId),
    [session?.currentSceneId]
  );

  if (!session?.enabled || !scene) return null;

  const readinessMessage = getPresentationReadinessMessage(scene.id);

  const goToScene = (sceneId: number) => {
    const target = getPresentationScene(sceneId);
    if (!target) return;
    setPresentationScene(sceneId);
    navigate(target.entryPath);
    setExpanded(false);
  };

  const goPrevious = () => {
    const nextSession = previousPresentationScene();
    const target = getPresentationScene(nextSession.currentSceneId);
    if (target) navigate(target.entryPath);
    setExpanded(false);
  };

  const goNext = () => {
    const nextSession = nextPresentationScene();
    const target = getPresentationScene(nextSession.currentSceneId);
    if (target) navigate(target.entryPath);
    setExpanded(false);
  };

  const restartScene = () => {
    navigate(scene.entryPath);
    setExpanded(false);
  };

  const exitPresentation = () => {
    disablePresentation();
    setExpanded(false);
  };

  return (
    <>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="campus360-presentation-dock"
        onClick={() => setExpanded(true)}
        className="fixed bottom-20 right-4 z-40 inline-flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-left shadow-xl transition hover:border-tech-primary/40 md:bottom-4"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-tech-primary text-sm font-bold text-white">
          {scene.id}
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-tech-textSecond">
            Escena {scene.id} de {PRESENTATION_SCENE_COUNT}
          </span>
          <span className="block truncate text-sm font-semibold text-tech-textMain">{scene.title}</span>
        </span>
      </button>

      {expanded ? (
        <div className="fixed inset-0 z-40 flex items-end justify-end bg-slate-950/20 p-4 md:items-end">
          <section
            id="campus360-presentation-dock"
            role="dialog"
            aria-modal="true"
            aria-labelledby="campus360-presentation-title"
            className="z-40 max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-tech-border bg-white shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-tech-divider p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">
                  Escena {scene.id} de {PRESENTATION_SCENE_COUNT} · {scene.role}
                </p>
                <h2 id="campus360-presentation-title" className="mt-1 text-xl font-bold text-tech-textMain">
                  {scene.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar guía de presentación"
                className="rounded-lg border border-tech-border p-2 text-tech-textSecond hover:bg-tech-bg"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="space-y-5 p-5">
              {readinessMessage ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
                  {readinessMessage}
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Checklist</p>
                <ol className="mt-3 space-y-2">
                  {scene.checklist.map((item, index) => (
                    <li key={item} className="flex gap-3 rounded-xl bg-tech-bg p-3 text-sm leading-6 text-tech-textMain">
                      <span className="font-bold text-tech-primary">{index + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  disabled={scene.id === 1}
                  onClick={goPrevious}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={restartScene}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-tech-bg"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reiniciar
                </button>
                <button
                  type="button"
                  disabled={scene.id === PRESENTATION_SCENE_COUNT}
                  onClick={goNext}
                  className="inline-flex items-center justify-center gap-1 rounded-xl bg-tech-primary px-3 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate(paths.roleSelector);
                    setExpanded(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-tech-bg"
                >
                  <Home className="h-4 w-4" />
                  Volver al selector
                </button>
                <button
                  type="button"
                  onClick={exitPresentation}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <ClipboardList className="h-4 w-4" />
                  Salir de presentación
                </button>
              </div>

              <div className="border-t border-tech-divider pt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Ir a escena</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: PRESENTATION_SCENE_COUNT }, (_, index) => index + 1).map((sceneId) => (
                    <button
                      key={sceneId}
                      type="button"
                      onClick={() => goToScene(sceneId)}
                      className={`h-9 w-9 rounded-full text-sm font-bold transition ${
                        sceneId === scene.id
                          ? "bg-tech-primary text-white"
                          : "border border-tech-border bg-white text-tech-textSecond hover:bg-tech-bg"
                      }`}
                    >
                      {sceneId}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
