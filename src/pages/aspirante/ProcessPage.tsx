import { Clock, Mail, FileText, Calendar } from "lucide-react";
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
    icon: "✓"
  },
  {
    id: 2,
    date: "19 Febrero 2026",
    time: "09:15",
    title: "Asesor asignado",
    description: "Dra. María Elena Rodríguez te ha sido asignada como asesor académico.",
    icon: "👤"
  },
  {
    id: 3,
    date: "20 Febrero 2026",
    time: "10:45",
    title: "Contacto inicial",
    description: "Tu asesor se puso en contacto contigo vía correo electrónico.",
    icon: "📧"
  },
  {
    id: 4,
    date: "21 Febrero 2026",
    time: "16:20",
    title: "Documentos solicitados",
    description: "Se solicitaron los documentos faltantes para completar tu expediente.",
    icon: "📋"
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
      {/* Bienvenida */}
      <SectionCard className="mb-6 border-l-4 border-l-petrol-700 bg-petrol-50">
        <div>
          <p className="text-sm text-slate-600">Bienvenido/a</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">{applicant.name}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-slate-600">FOLIO</p>
              <p className="font-mono font-bold text-petrol-700">{applicant.folio}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">CARRERA</p>
              <p className="font-semibold text-slate-900">{applicant.career}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">ESTADO</p>
              <StatusBadge status={applicant.status} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Progress Stepper */}
      <section className="mb-8">
        <h3 className="mb-6 font-bold text-slate-900">Etapas del proceso</h3>
        <ProgressStepper steps={admissionStages} />
      </section>

      {/* Timeline */}
      <SectionCard title="Historial de eventos" className="mb-6">
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol-100 text-lg font-bold text-petrol-700">
                  {event.icon}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="mt-1 h-12 w-0.5 bg-slate-200"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-xs font-semibold uppercase text-slate-600">
                  {event.date} · {event.time}
                </p>
                <h4 className="mt-1 font-semibold text-slate-900">{event.title}</h4>
                <p className="text-sm text-slate-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Asesor asignado */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <SectionCard title="Tu asesor académico">
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{advisor.name}</p>
              <p className="text-sm text-slate-600">{advisor.position}</p>
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <div className="text-sm">
                  <p className="text-xs text-slate-600">Correo</p>
                  <a
                    href={`mailto:${advisor.email}`}
                    className="font-medium text-petrol-700 hover:text-petrol-800"
                  >
                    {advisor.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-slate-400" />
                <div className="text-sm">
                  <p className="text-xs text-slate-600">Disponibilidad</p>
                  <p className="font-medium text-slate-900">{advisor.hours}</p>
                </div>
              </div>
            </div>

            <button className="w-full rounded-lg bg-petrol-50 px-4 py-2.5 text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100">
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
                className={`rounded-lg border-l-4 p-4 ${
                  action.priority === "urgente"
                    ? "border-l-rose-500 bg-rose-50"
                    : "border-l-amber-500 bg-amber-50"
                }`}
              >
                <h4 className="font-semibold text-slate-900">{action.title}</h4>
                <p className="text-xs text-slate-600">{action.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-700">
                  <Calendar className="h-3 w-3" />
                  {action.deadline}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Documentación */}
      <SectionCard title="Estado de documentación" className="mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Certificado de bachillerato</p>
              <p className="text-xs text-slate-600">PDF • 2.4 MB</p>
            </div>
            <StatusBadge status="aprobado" />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">Identificación oficial</p>
              <p className="text-xs text-slate-600">En revisión</p>
            </div>
            <StatusBadge status="en_revision" />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
            <div>
              <p className="text-sm font-medium text-slate-900">CURP</p>
              <p className="text-xs text-slate-600">Documento faltante</p>
            </div>
            <StatusBadge status="pendiente" />
          </div>

          <div className="mt-4 rounded-lg bg-slate-100 p-2">
            <div className="flex h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/3 bg-amber-500"></div>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              <span className="font-semibold">66%</span> de documentación completada
            </p>
          </div>

          <Link
            to={paths.aspirante.documentacion}
            className="mt-4 inline-flex text-sm font-semibold text-petrol-700 hover:text-petrol-800"
          >
            <FileText className="mr-2 h-4 w-4" />
            Ver módulo de documentación
          </Link>
        </div>
      </SectionCard>

      {/* CTA - Ir a documentación */}
      <section className="rounded-lg border border-teal-200 bg-teal-50 p-6">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-teal-700" />
          <div className="flex-1">
            <h3 className="font-bold text-teal-900">Acción requerida</h3>
            <p className="mt-1 text-sm text-teal-800">
              Necesitamos que cargues el CURP antes del 28 de febrero para completar tu expediente.
            </p>
          </div>
          <Link
            to={paths.aspirante.documentacion}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Subir documento
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
