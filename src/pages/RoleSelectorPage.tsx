import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle,
  CircleDot,
  GraduationCap,
  Landmark,
  Network,
  RotateCcw,
  ShieldCheck,
  UserRoundPlus,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PresentationDock } from "../components/demo/PresentationDock";
import { PRESENTATION_SCENES, getPresentationScene } from "../config/presentationDemo";
import { resetDemoSession } from "../data/demoSession";
import { getPresentationReadiness } from "../data/presentationReadiness";
import {
  enablePresentation,
  getPresentationSession,
  subscribeToPresentationChanges
} from "../data/presentationSession";
import { subscribeToCampusStorageChange } from "../data/storageEvents";
import { paths } from "../router/paths";

const roleCards = [
  {
    title: "Aspirante",
    description:
      "Explora programas académicos, completa tu solicitud y da seguimiento al estado de tu admisión.",
    detail: "Admisión y registro",
    path: paths.aspirante.root,
    icon: UserRoundPlus,
    accentColor: "#003B70",
    stat: "Registro",
    statLabel: "y seguimiento"
  },
  {
    title: "Estudiante",
    description:
      "Accede a tu agenda, notificaciones, eventos, trámites y acompañamiento personalizado.",
    detail: "Vida estudiantil",
    path: paths.estudiante.root,
    icon: GraduationCap,
    accentColor: "#1D84B5",
    stat: "Vida campus",
    statLabel: "experiencia integral"
  },
  {
    title: "Administrativo",
    description:
      "Monitorea captación, permanencia, alertas institucionales y analítica para decisiones.",
    detail: "Gestión institucional",
    path: paths.admin.root,
    icon: Building2,
    accentColor: "#0A4D8C",
    stat: "Gestión",
    statLabel: "y analítica"
  }
];

const platformSignals = [
  { label: "Admisión", value: "captación y documentos" },
  { label: "Permanencia", value: "avisos, agenda y trayectoria" },
  { label: "Gestión", value: "alertas, datos y operación" }
];

const routeSteps = [
  "Exploración",
  "Registro",
  "Seguimiento",
  "Vida académica",
  "Decisión institucional"
];

export function RoleSelectorPage() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPrepareModal, setShowPrepareModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [presentationSession, setPresentationSession] = useState(() => getPresentationSession());
  const [, setStorageRevision] = useState(0);
  const [resetFeedback, setResetFeedback] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);

  useEffect(
    () =>
      subscribeToPresentationChanges(() => {
        setPresentationSession(getPresentationSession());
      }),
    []
  );

  useEffect(
    () =>
      subscribeToCampusStorageChange(() => {
        setStorageRevision((value) => value + 1);
      }),
    []
  );

  const readiness = getPresentationReadiness();
  const currentScene = getPresentationScene(presentationSession?.currentSceneId);

  const handlePreparePresentation = () => {
    if (isResetting) return;

    setIsResetting(true);
    setResetFeedback(null);

    try {
      resetDemoSession();
      const session = enablePresentation(1);
      setPresentationSession(session);
      setShowPrepareModal(false);
      setResetFeedback({
        type: "success",
        message: "Presentación preparada. Los datos de Ana están limpios y la guía inicia en la Escena 1."
      });
    } catch (error) {
      setResetFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No fue posible preparar la presentación."
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleResetDemo = () => {
    if (isResetting) return;

    setIsResetting(true);
    setResetFeedback(null);

    try {
      resetDemoSession();
      setShowResetModal(false);
      setResetFeedback({
        type: "success",
        message: "Simulación reiniciada. Campus360 está listo para iniciar un nuevo recorrido."
      });
    } catch (error) {
      setResetFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "No fue posible reiniciar la simulación. Intenta nuevamente."
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-tech-bg text-tech-textMain">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,77,140,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(10,77,140,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px"
          }}
        />
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <svg className="absolute right-0 top-24 hidden h-[34rem] w-[48rem] text-tech-primary/15 lg:block" viewBox="0 0 760 520" fill="none">
          <path d="M82 348C185 224 280 390 392 238C504 86 595 160 706 72" stroke="currentColor" strokeWidth="1.5" />
          <path d="M112 422C214 310 328 422 456 286C550 187 618 218 706 156" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 9" />
          {[82, 238, 392, 558, 706].map((cx, index) => (
            <circle key={cx} cx={cx} cy={[348, 292, 238, 136, 72][index]} r="6" fill="currentColor" />
          ))}
        </svg>
      </div>

      <header className="relative border-b border-tech-border bg-white/85 backdrop-blur">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-5 lg:px-6 2xl:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tech-primary text-white shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-tech-textMain">Campus360</p>
              <p className="text-xs font-medium text-tech-textSecond">Plataforma educativa institucional</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-tech-border bg-white px-3 py-1.5 text-xs font-semibold text-tech-textSecond shadow-sm sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-tech-primary" />
            Prototipo integral
          </div>
        </div>
      </header>

      <main className="relative flex w-full flex-col gap-8 px-4 py-6 sm:px-5 lg:px-6 lg:py-8 2xl:px-8">
        {resetFeedback ? (
          <div
            role={resetFeedback.type === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
              resetFeedback.type === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            {resetFeedback.type === "error" ? (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{resetFeedback.message}</span>
          </div>
        ) : null}

        <section className="grid min-w-0 gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex min-h-[30rem] min-w-0 flex-col justify-between rounded-lg border border-tech-border bg-white/92 p-6 shadow-sm md:min-h-[34rem] md:p-8 lg:p-10">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">
                <Network className="h-3.5 w-3.5" />
                Ecosistema Campus360
              </div>
              <h1 className="max-w-[20rem] text-3xl font-bold leading-tight tracking-tight text-tech-textMain sm:max-w-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                Una entrada clara para conectar admisión, vida estudiantil y gestión institucional.
              </h1>
              <p className="mt-5 max-w-[20rem] text-sm leading-7 text-tech-textSecond sm:max-w-2xl sm:text-base md:text-lg">
                Campus360 organiza la experiencia académica por rol, centraliza señales importantes y muestra la información que cada perfil necesita para avanzar.
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-tech-divider pt-5 sm:grid-cols-3">
              {platformSignals.map((signal) => (
                <div key={signal.label} className="border-l-2 border-tech-primary/30 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">{signal.label}</p>
                  <p className="mt-2 text-sm leading-6 text-tech-textSecond">{signal.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            {roleCards.map((role, index) => {
              const Icon = role.icon;

              return (
                <Link
                  key={role.title}
                  to={role.path}
                  className="group relative min-w-0 max-w-full overflow-hidden rounded-lg border border-tech-border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-tech-primary/30 hover:shadow-md"
                >
                  <div className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: role.accentColor }} />
                  <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-tech-border bg-blue-50" style={{ color: role.accentColor }}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-textSecond">
                            0{index + 1} · {role.detail}
                          </p>
                          <h2 className="mt-1 text-2xl font-bold tracking-tight text-tech-textMain">{role.title}</h2>
                        </div>
                        <div className="w-full border-t border-tech-divider pt-3 text-left sm:w-auto sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0 sm:text-right">
                          <p className="text-lg font-bold text-tech-textMain">{role.stat}</p>
                          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-tech-textSecond">{role.statLabel}</p>
                        </div>
                      </div>
                      <p className="mt-3 max-w-[18rem] text-sm leading-6 text-tech-textSecond sm:max-w-2xl">{role.description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-tech-primary">
                        Entrar al portal
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-tech-border bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Lectura institucional</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-tech-textMain">Una base única para la operación académica.</h2>
            <p className="mt-3 text-sm leading-6 text-tech-textSecond">
              El prototipo reúne las rutas principales del campus en una navegación compacta, con señales visuales para entender estado, prioridad y siguiente acción.
            </p>
            <div className="mt-5 space-y-3">
              {["Acceso por rol sin fricción", "Información organizada por ciclo académico", "Paneles listos para seguimiento y decisión"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-tech-divider pt-3">
                  <CheckCircle className="h-4 w-4 text-tech-primary" />
                  <span className="text-sm font-medium text-tech-textMain">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-tech-border bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Trayectoria Campus360</p>
                <h2 className="mt-1 text-xl font-bold text-tech-textMain">Del primer contacto a la decisión institucional</h2>
              </div>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-tech-primary">
                Flujo integral
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-5">
              {routeSteps.map((step, index) => (
                <div key={step} className="relative border-l border-tech-primary/30 bg-tech-bg/40 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <CircleDot className="h-4 w-4 text-tech-primary" />
                    <span className="text-xs font-semibold text-tech-textSecond">0{index + 1}</span>
                  </div>
                  <p className="text-sm font-semibold leading-5 text-tech-textMain">{step}</p>
                  {index < routeSteps.length - 1 ? (
                    <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-tech-primary/40 md:block" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-tech-border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">
                Herramientas de presentación
              </p>
              <h2 className="mt-1 text-xl font-bold text-tech-textMain">Estado del recorrido</h2>
              <p className="mt-2 text-sm leading-6 text-tech-textSecond">
                Prepara una exposición limpia o continúa la escena guardada en esta pestaña.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {presentationSession?.enabled && currentScene ? (
                <Link
                  to={currentScene.entryPath}
                  className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white hover:bg-tech-mid"
                >
                  Continuar Escena {currentScene.id}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setResetFeedback(null);
                    setShowPrepareModal(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white hover:bg-tech-mid"
                >
                  <CheckCircle className="h-4 w-4" />
                  Preparar presentación
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setResetFeedback(null);
                  setShowResetModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar datos
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["Registro", readiness.hasApplicant ? "Completo" : "Pendiente"],
              ["Seguimiento", readiness.followUpComplete ? "Completo" : "Pendiente"],
              [
                "Documento",
                readiness.documentStatus === "aprobado"
                  ? "Aprobado"
                  : readiness.documentStatus === "en_revision"
                    ? "En revisión"
                    : "Pendiente"
              ]
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-tech-divider bg-tech-bg/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{label}</p>
                <p className="mt-1 font-semibold text-tech-textMain">{value}</p>
              </div>
            ))}
          </div>

          {!presentationSession?.enabled && readiness.hasApplicant ? (
            <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-tech-primary">
              El progreso persistente sugiere retomar desde la Escena {readiness.suggestedSceneId}.
            </p>
          ) : null}

          {presentationSession?.enabled ? (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">
                Recorrido de siete escenas
              </p>
              <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {PRESENTATION_SCENES.map((scene) => (
                  <Link
                    key={scene.id}
                    to={scene.entryPath}
                    className={`rounded-xl border p-3 text-sm transition ${
                      scene.id === presentationSession.currentSceneId
                        ? "border-tech-primary bg-blue-50 text-tech-primary"
                        : "border-tech-border bg-white text-tech-textSecond hover:bg-tech-bg"
                    }`}
                  >
                    <span className="block text-xs font-bold">0{scene.id}</span>
                    <span className="mt-1 block font-semibold">{scene.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </main>

      {showPrepareModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="prepare-demo-title"
            className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-tech-divider px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-tech-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="prepare-demo-title" className="text-lg font-bold text-tech-textMain">
                    Preparar presentación
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-tech-textSecond">
                    Se limpiará únicamente el progreso dinámico de admisión de Campus360 y se
                    activará la guía en la Escena 1. Los datos demostrativos institucionales se conservan.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrepareModal(false)}
                disabled={isResetting}
                className="rounded-lg border border-tech-border p-2 text-tech-textSecond transition hover:bg-tech-bg disabled:opacity-50"
                aria-label="Cerrar preparación"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col-reverse gap-2 bg-tech-bg/60 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowPrepareModal(false)}
                disabled={isResetting}
                className="rounded-lg border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handlePreparePresentation}
                disabled={isResetting}
                className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {isResetting ? "Preparando..." : "Preparar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <PresentationDock />

      {showResetModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-demo-title"
            className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-tech-divider px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 id="reset-demo-title" className="text-lg font-bold text-tech-textMain">
                    Reiniciar simulación
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-tech-textSecond">
                    Esto eliminará los aspirantes creados durante la demostración, el expediente
                    activo y el progreso guardado del guion. Los datos demostrativos del sistema
                    permanecerán intactos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="rounded-lg border border-tech-border p-2 text-tech-textSecond transition hover:bg-tech-bg disabled:opacity-50"
                aria-label="Cerrar confirmación"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col-reverse gap-2 bg-tech-bg/60 px-5 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={isResetting}
                className="rounded-lg border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleResetDemo}
                disabled={isResetting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RotateCcw className="h-4 w-4" />
                {isResetting ? "Reiniciando..." : "Reiniciar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
