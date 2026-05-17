import {
  ArrowRight,
  Building2,
  CheckCircle,
  CircleDot,
  GraduationCap,
  Landmark,
  Network,
  ShieldCheck,
  UserRoundPlus
} from "lucide-react";
import { Link } from "react-router-dom";
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
    stat: "48 h",
    statLabel: "respuesta media"
  },
  {
    title: "Estudiante",
    description:
      "Accede a tu agenda, notificaciones, eventos, trámites y acompañamiento personalizado.",
    detail: "Vida estudiantil",
    path: paths.estudiante.root,
    icon: GraduationCap,
    accentColor: "#1D84B5",
    stat: "360",
    statLabel: "vista integral"
  },
  {
    title: "Administrativo",
    description:
      "Monitorea captación, permanencia, alertas institucionales y analítica para decisiones.",
    detail: "Gestión institucional",
    path: paths.admin.root,
    icon: Building2,
    accentColor: "#0A4D8C",
    stat: "3",
    statLabel: "paneles clave"
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
      </main>
    </div>
  );
}
