import {
  ArrowRight,
  Bell,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  MessageSquare,
  Route,
  Trophy,
  Users,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/common/MetricCard";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import {
  agendaItems,
  campusEvents,
  estudianteMetrics,
  notices,
  currentStudent,
  studentDocuments
} from "../../data/estudiante.mock";
import { paths } from "../../router/paths";

const quickAccessItems = [
  { label: "Agenda", icon: Calendar, path: paths.estudiante.agenda },
  { label: "Documentos", icon: FileText, path: paths.estudiante.documentos },
  { label: "Profesores", icon: Users, path: paths.estudiante.profesores },
  { label: "Mapa", icon: MapPin, path: paths.estudiante.mapa },
  { label: "Chat", icon: MessageSquare, path: paths.estudiante.chat },
  { label: "Asistente", icon: Zap, path: paths.estudiante.asistente }
];

export function EstudianteOverviewPage() {
  const pendingDocuments = studentDocuments.filter((document) => document.status === "pendiente").length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
        <div className="grid min-w-0 gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-w-0 overflow-hidden bg-tech-primary px-6 py-8 text-white md:px-8 lg:px-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "64px 64px"
              }}
            />
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                <GraduationCap className="h-3.5 w-3.5" />
                Portal del estudiante
              </div>
              <h1 className="max-w-[20rem] text-3xl font-bold leading-tight tracking-tight sm:max-w-3xl sm:text-4xl md:text-5xl">
                Bienvenido, {currentStudent.name}
              </h1>
              <p className="mt-4 max-w-[20rem] text-sm leading-7 text-blue-100 sm:max-w-2xl md:text-base">
                Tu agenda, avisos, documentos y acompañamiento académico en una vista pensada para actuar rápido durante la semana.
              </p>

              <div className="mt-8 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Carrera", value: currentStudent.career },
                  { label: "Semestre", value: currentStudent.semester },
                  { label: "Matrícula", value: currentStudent.enrollment },
                  { label: "Asesor", value: currentStudent.tutor }
                ].map((item) => (
                  <div key={item.label} className="border-l border-white/25 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">{item.label}</p>
                    <p className="mt-2 text-sm font-bold leading-5 text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 p-5 md:p-6 lg:p-8">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Estado de trayectoria</p>
                <h2 className="mt-1 text-xl font-bold text-tech-textMain">Lectura rápida de tu avance</h2>
              </div>
              <Route className="h-5 w-5 text-tech-primary" />
            </div>
            <div className="space-y-5">
              {[
                { label: "Participación", value: currentStudent.participationPercentage, color: "bg-tech-primary" },
                { label: "Documentación", value: currentStudent.documentCompletion, color: "bg-tech-mid" }
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-tech-textMain">{item.label}</span>
                    <span className="font-bold text-tech-primary">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-tech-divider">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
              <div className="border-t border-tech-divider pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Acompañamiento</p>
                <p className="mt-2 text-lg font-bold text-tech-textMain">{currentStudent.accompanimentLevel}</p>
              </div>
              <Link
                to={paths.estudiante.trayectoria}
                className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid"
              >
                Ver trayectoria
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {estudianteMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-tech-primary/20 bg-white shadow-sm">
          <div className="border-b border-tech-divider bg-blue-50/70 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-tech-primary shadow-sm">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Convocatoria destacada</p>
                <h2 className="mt-1 text-xl font-bold text-tech-textMain">Becas 2026-B</h2>
                <p className="mt-2 text-sm leading-6 text-tech-textSecond">
                  Inscripciones abiertas para becas académicas y deportivas. Cierre: 31 de mayo.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-tech-textMain">Revisa requisitos y fechas desde eventos institucionales.</p>
            <Link to={paths.estudiante.eventos} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary transition hover:text-tech-mid">
              Ver convocatoria
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <SectionCard
          title="Accesos rápidos"
          description="Herramientas frecuentes para resolver tareas del día."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group flex items-center gap-3 rounded-lg border border-tech-border bg-tech-bg/60 p-3 transition hover:border-tech-primary/30 hover:bg-blue-50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-tech-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-tech-textMain">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          title="Próximas actividades"
          description="Lo más cercano en tu calendario académico."
          action={
            <Link to={paths.estudiante.agenda} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary">
              Ver agenda
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="space-y-3">
            {agendaItems.slice(0, 4).map((item) => (
              <div key={item.id} className="grid gap-3 border-t border-tech-divider pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-tech-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-tech-textMain">{item.title}</h3>
                  <p className="mt-1 text-sm text-tech-textSecond">
                    <Clock className="mr-1 inline h-3.5 w-3.5" />
                    {item.date} · {item.time}
                  </p>
                  <p className="text-xs text-tech-textSecond">{item.location}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Avisos importantes"
          description="Notificaciones que pueden afectar tu semana."
          action={
            <Link to={paths.estudiante.avisos} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary">
              Ver todo
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="space-y-3">
            {notices.slice(0, 3).map((notice) => (
              <div
                key={notice.id}
                className={`border-l-2 px-4 py-3 ${
                  notice.priority === "urgente"
                    ? "border-rose-500 bg-rose-50"
                    : notice.priority === "alta"
                      ? "border-amber-500 bg-amber-50"
                      : "border-tech-primary bg-tech-bg/60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-tech-textMain">{notice.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-tech-textSecond">{notice.summary}</p>
                  </div>
                  <Bell className="h-4 w-4 shrink-0 text-tech-textSecond" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-primary">Vida institucional</p>
            <h2 className="mt-1 text-2xl font-bold text-tech-textMain">Eventos recomendados</h2>
          </div>
          <Link to={paths.estudiante.eventos} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary hover:text-tech-mid">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {campusEvents.slice(0, 3).map((event) => (
            <article key={event.id} className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-tech-primary/30 hover:shadow-md">
              <div className="h-1 bg-tech-primary" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">{event.category}</span>
                  <StatusBadge status={event.status} />
                </div>
                <h3 className="text-lg font-bold leading-6 text-tech-textMain">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-tech-textSecond">{event.summary}</p>
                <div className="mt-4 space-y-2 border-t border-tech-divider pt-3 text-xs text-tech-textSecond">
                  <p>
                    <Calendar className="mr-1 inline h-3.5 w-3.5 text-tech-primary" />
                    {event.date} · {event.time}
                  </p>
                  <p>
                    <MapPin className="mr-1 inline h-3.5 w-3.5 text-tech-primary" />
                    {event.location}
                  </p>
                  <p className="font-semibold text-tech-textMain">
                    {event.registered}/{event.capacity} inscritos
                  </p>
                </div>
                <button className="mt-4 w-full rounded-lg border border-tech-border bg-blue-50 px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-blue-100">
                  Inscribirse
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <SectionCard title="Tu perfil académico" description="Indicadores personales para mantener tu trayectoria visible.">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-tech-textMain">Participación</span>
                <span className="font-bold text-tech-primary">{currentStudent.participationPercentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-tech-divider">
                <div className="h-full rounded-full bg-tech-primary" style={{ width: `${currentStudent.participationPercentage}%` }} />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-tech-textMain">Documentación</span>
                <span className="font-bold text-tech-primary">{currentStudent.documentCompletion}%</span>
              </div>
              <div className="h-2 rounded-full bg-tech-divider">
                <div className="h-full rounded-full bg-tech-mid" style={{ width: `${currentStudent.documentCompletion}%` }} />
              </div>
            </div>

            <div className="border-t border-tech-divider pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Estado de acompañamiento</p>
              <p className="mt-2 flex items-center gap-2 font-bold text-tech-textMain">
                <Trophy className="h-4 w-4 text-tech-primary" />
                {currentStudent.accompanimentLevel}
              </p>
            </div>
          </div>
        </SectionCard>

        {pendingDocuments > 0 ? (
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-tech-primary shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Expediente</p>
                <h3 className="mt-1 text-xl font-bold text-tech-textMain">Documentos pendientes</h3>
                <p className="mt-2 text-sm leading-6 text-tech-textSecond">
                  Tienes {pendingDocuments} documento{pendingDocuments > 1 ? "s" : ""} por completar. Mantén tu expediente en orden para evitar bloqueos.
                </p>
                <Link to={paths.estudiante.documentos} className="mt-4 inline-flex items-center gap-2 font-semibold text-tech-primary hover:text-tech-mid">
                  Ver documentos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}
