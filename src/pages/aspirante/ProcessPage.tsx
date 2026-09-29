import { Clock, Mail, FileText, Calendar, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { ProgressStepper } from "../../components/common/ProgressStepper";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { getCurrentApplicant } from "../../data/applicantStorage";
import { paths } from "../../router/paths";
import type { ProgressStep } from "../../types/campus";

const admissionStageLabels = [
  { title: "Registro recibido", detail: "Solicitud registrada" },
  { title: "Contacto inicial", detail: "Revisión inicial por el equipo" },
  { title: "Documentación", detail: "Revisión de documentos" },
  { title: "Evaluación", detail: "Evaluación académica en curso" },
  { title: "Resultado", detail: "Publicación de resultados" },
  { title: "Inscripción", detail: "Proceso de inscripción" }
];

function getPublicStageIndex(stage: string) {
  if (stage === "Contacto inicial" || stage === "Interés confirmado") return 1;
  if (stage === "Documentación pendiente") return 2;
  if (stage === "Evaluación / entrevista") return 3;
  if (stage === "Inscripción finalizada") return 5;
  return 0;
}

function buildAdmissionStages(stage: string): ProgressStep[] {
  const currentIndex = getPublicStageIndex(stage);

  return admissionStageLabels.map((step, index) => ({
    id: String(index + 1),
    ...step,
    state: index < currentIndex ? "completado" : index === currentIndex ? "activo" : "pendiente"
  }));
}

export function ProcessPage() {
  const currentApplicant = getCurrentApplicant();

  if (!currentApplicant) {
    return (
      <PageShell
        eyebrow="Admisión"
        title="Mi proceso de admisión"
        description="Monitorea cada etapa de tu solicitud de ingreso."
      >
        <EmptyState
          title="Aún no tienes una solicitud activa"
          description="Registra una solicitud de admisión para consultar aquí tu folio, etapas, documentos y seguimiento."
          action={
            <Link
              to={paths.aspirante.registro}
              className="inline-flex rounded-full bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid"
            >
              Iniciar registro
            </Link>
          }
        />
      </PageShell>
    );
  }

  const currentStageIndex = getPublicStageIndex(currentApplicant.stage);
  const applicant = {
    name: currentApplicant.name,
    folio: currentApplicant.folio,
    career: currentApplicant.career,
    status: currentApplicant.status,
    stage: currentStageIndex + 1
  };

  const visibleAdmissionStages = buildAdmissionStages(currentApplicant.stage);

  const visibleTimelineEvents = currentApplicant.timeline.map((event) => ({
    id: event.id,
    date: event.time,
    time: "",
    title: event.title,
    description: event.detail,
    icon: Check
  }));

  const advisor = {
    name: currentApplicant.owner,
    position: "Asesor pendiente de asignación",
    email: "admisiones@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    hours: "Lunes a viernes, 09:00 - 18:00"
  };

  const visibleNextActions = [
    {
      title: currentApplicant.nextAction,
      description: "El equipo de admisiones dará seguimiento a tu solicitud.",
      deadline: "Por definir",
      priority: "pendiente"
    }
  ];

  const visibleDocuments = currentApplicant.documents.map((document) => ({
    id: document.id,
    name: document.name,
    detail: document.reviewNote
      ? `Observación: ${document.reviewNote}`
      : document.fileName
        ? `${document.fileName} · ${document.fileSize ?? document.updatedAt}`
        : document.updatedAt === "Nunca"
          ? "Documento pendiente"
          : document.updatedAt,
    status: document.status
  }));
  const completedDocuments = visibleDocuments.filter((document) => document.status === "aprobado").length;
  const documentProgress = Math.round((completedDocuments / Math.max(visibleDocuments.length, 1)) * 100);

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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Aspirante</p>
            <p className="font-semibold text-tech-textMain">{applicant.name}</p>
          </div>
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
          <p className="text-sm text-tech-textSecond">Paso {applicant.stage} de {visibleAdmissionStages.length}</p>
        </div>
        <ProgressStepper steps={visibleAdmissionStages} />
      </section>

      <SectionCard title="Historial de eventos" description="Registro cronológico de hitos relevantes en tu proceso." className="mb-6">
        <div className="space-y-4">
          {visibleTimelineEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-tech-primary">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  {index < visibleTimelineEvents.length - 1 && (
                    <div className="mt-1 h-12 w-0.5 bg-tech-border"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">
                    {event.date}{event.time ? ` · ${event.time}` : ""}
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
            {visibleNextActions.map((action, index) => (
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
          {visibleDocuments.map((document) => (
            <div key={document.id} className="flex items-center justify-between rounded-2xl border border-tech-border bg-surface-card p-3">
              <div>
                <p className="text-sm font-medium text-tech-textMain">{document.name}</p>
                <p className="text-xs text-tech-textSecond">{document.detail}</p>
              </div>
              <StatusBadge status={document.status} />
            </div>
          ))}

          <div className="mt-4 rounded-2xl bg-surface-card p-3">
            <div className="flex h-2 overflow-hidden rounded-full bg-tech-divider">
              <div className="h-full bg-tech-primary" style={{ width: `${documentProgress}%` }}></div>
            </div>
            <p className="mt-2 text-xs text-tech-textSecond">
              <span className="font-semibold">{documentProgress}%</span> de documentación completada
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
              "Tu solicitud fue recibida. Prepara los documentos solicitados mientras el equipo de admisiones realiza el primer contacto."
            </p>
          </div>
          <Link
            to={paths.aspirante.documentacion}
            className="rounded-full bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid"
          >
            Preparar documentos
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
