import { Clock, Mail, FileText, Calendar, Check, User, Inbox, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "../../components/common/PageShell";
import { ProgressStepper } from "../../components/common/ProgressStepper";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { careers } from "../../data/careers";
import { paths } from "../../router/paths";

const admissionStages = [
  { id: "1", title: "Registro recibido", detail: "Solicitud registrada", state: "completado" as const },
  { id: "2", title: "Contacto inicial", detail: "Revisión inicial por el equipo", state: "completado" as const },
  { id: "3", title: "Documentación", detail: "Revisión de documentos", state: "activo" as const },
  { id: "4", title: "Evaluación", detail: "Evaluación académica en curso", state: "pendiente" as const },
  { id: "5", title: "Resultado", detail: "Publicación de resultados", state: "pendiente" as const },
  { id: "6", title: "Inscripción", detail: "Proceso de inscripción", state: "pendiente" as const }
];

const timelineEvents = [
  {
    id: 1,
    date: "18 Febrero 2026",
    time: "14:32",
    title: "Registro completado",
    description: "Tu solicitud fue recibida exitosamente.",
    icon: Check
  },
  {
    id: 2,
    date: "19 Febrero 2026",
    time: "09:15",
    title: "Asesor asignado",
    description: "Dra. María Elena Rodríguez te ha sido asignada como asesor académico.",
    icon: User
  },
  {
    id: 3,
    date: "20 Febrero 2026",
    time: "10:45",
    title: "Contacto inicial",
    description: "Tu asesor se puso en contacto contigo vía correo electrónico.",
    icon: Inbox
  },
  {
    id: 4,
    date: "21 Febrero 2026",
    time: "16:20",
    title: "Documentos solicitados",
    description: "Se solicitaron los documentos faltantes para completar tu expediente.",
    icon: ClipboardList
  }
];

const nextActions = [
  {
    title: "Subir CURP",
    description: "Documento de identidad oficial",
    deadline: "28 Febrero 2026",
    priority: "urgente"
  },
  {
    title: "Confirmar cita",
    description: "Entrevista diagnóstica el 3 de marzo",
    deadline: "1 Marzo 2026",
    priority: "urgente"
  },
  {
    title: "Revisar documentación requerida",
    description: "Verifica todos los archivos solicitados",
    deadline: "28 Febrero 2026",
    priority: "pendiente"
  }
];

export function ProcessPage() {
  // Mock aspirant data
  const applicant = {
    name: "Carlos Alberto Morales",
    folio: "ASP-2026-0148",
    career: careers[0]?.name || "Ingeniería en Software",
    status: "en_revision" as const,
    stage: 3
  };

  const advisor = {
    name: "Dra. María Elena Rodríguez",
    position: "Asesora Académica",
    email: "mrodriguez@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    hours: "Lunes a viernes, 09:00 - 18:00"
  };

  return (
    <PageShell
      eyebrow="Admisión"
      title="Mi proceso de admisión"
      description="Monitorea cada etapa de tu solicitud de ingreso."
    >
      <SectionCard
        className="mb-6 border border-tech-primary/20 bg-gradient-to-r from-blue-50 to-white"
        title="Estado actual"
        description="Una vista compacta de tu solicitud y del paso donde te encuentras."
      >
        <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Folio</p>
              <p className="font-mono font-semibold text-tech-primary">{applicant.folio}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Carrera</p>
              <p className="font-semibold text-tech-textMain">{applicant.career}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Estado</p>
              <StatusBadge status={applicant.status} />
            </div>
          </div>
      </SectionCard>

      <section className="mb-8 rounded-2xl border border-tech-border bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-primary">Seguimiento</p>
            <h3 className="mt-1 text-xl font-semibold text-tech-textMain">Etapas del proceso</h3>
          </div>
          <p className="text-sm text-tech-textSecond">Paso {applicant.stage} de {admissionStages.length}</p>
        </div>
        <ProgressStepper steps={admissionStages} />
      </section>

      <SectionCard title="Historial de eventos" description="Registro cronológico de hitos relevantes en tu proceso." className="mb-6">
        <div className="space-y-4">
          {timelineEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-tech-primary">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {index < timelineEvents.length - 1 && (
                    <div className="mt-1 h-12 w-0.5 bg-tech-border"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">
                    {event.date} · {event.time}
                  </p>
                  <h4 className="mt-1 font-semibold text-tech-textMain">{event.title}</h4>
                  <p className="text-sm leading-6 text-tech-textSecond">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="Tu asesor académico">
          <div className="space-y-4">
            <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
              <p className="font-semibold text-tech-textMain">{advisor.name}</p>
              <p className="text-sm text-tech-textSecond">{advisor.position}</p>
            </div>

            <div className="space-y-3 border-t border-tech-border pt-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-tech-textSecond" />
                <div className="text-sm">
                  <p className="text-xs text-tech-textSecond">Correo</p>
                  <a
                    href={`mailto:${advisor.email}`}
                    className="font-medium text-tech-primary hover:text-tech-mid"
                  >
                    {advisor.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-tech-textSecond" />
                <div className="text-sm">
                  <p className="text-xs text-tech-textSecond">Disponibilidad</p>
                  <p className="font-medium text-tech-textMain">{advisor.hours}</p>
                </div>
              </div>
            </div>

            <button className="w-full rounded-full bg-blue-50 px-4 py-2.5 text-sm font-semibold text-tech-primary transition hover:bg-blue-100">
              Solicitar cita
            </button>
          </div>
        </SectionCard>

        {/* Próximas acciones */}
        <SectionCard title="Próximas acciones">
          <div className="space-y-3">
            {nextActions.map((action, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-4 ${
                  action.priority === "urgente"
                    ? "border-rose-200 bg-rose-50"
                    : "border-tech-border bg-surface-card"
                }`}
              >
                <h4 className="font-semibold text-tech-textMain">{action.title}</h4>
                <p className="text-xs text-tech-textSecond">{action.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-tech-textSecond">
                  <Calendar className="h-3 w-3" />
                  {action.deadline}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Estado de documentación" description="Resumen del expediente documental y su avance actual." className="mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-tech-border bg-surface-card p-3">
            <div>
              <p className="text-sm font-medium text-tech-textMain">Certificado de bachillerato</p>
              <p className="text-xs text-tech-textSecond">PDF · 2.4 MB</p>
            </div>
            <StatusBadge status="aprobado" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-tech-border bg-surface-card p-3">
            <div>
              <p className="text-sm font-medium text-tech-textMain">Identificación oficial</p>
              <p className="text-xs text-tech-textSecond">En revisión</p>
            </div>
            <StatusBadge status="en_revision" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-tech-border bg-surface-card p-3">
            <div>
              <p className="text-sm font-medium text-tech-textMain">CURP</p>
              <p className="text-xs text-tech-textSecond">Documento faltante</p>
            </div>
            <StatusBadge status="pendiente" />
          </div>

          <div className="mt-4 rounded-2xl bg-surface-card p-3">
            <div className="flex h-2 overflow-hidden rounded-full bg-tech-divider">
              <div className="h-full w-2/3 bg-tech-primary"></div>
            </div>
            <p className="mt-2 text-xs text-tech-textSecond">
              <span className="font-semibold">66%</span> de documentación completada
            </p>
          </div>

          <Link
            to={paths.aspirante.documentacion}
            className="mt-4 inline-flex items-center text-sm font-semibold text-tech-primary hover:text-tech-mid"
          >
            <FileText className="mr-2 h-4 w-4" />
            Ver módulo de documentación
          </Link>
        </div>
      </SectionCard>

      <section className="rounded-2xl border border-tech-primary/20 bg-blue-50 p-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-tech-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-tech-textMain">Acción requerida</h3>
            <p className="mt-1 text-sm text-tech-textSecond">
              Necesitamos que cargues el CURP antes del 28 de febrero para completar tu expediente.
            </p>
          </div>
          <Link
            to={paths.aspirante.documentacion}
            className="rounded-full bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid"
          >
            Subir documento
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
