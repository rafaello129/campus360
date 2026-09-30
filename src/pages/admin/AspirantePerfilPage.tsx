import { useEffect, useRef, useState } from "react";
import { CalendarPlus, PhoneCall, Send, UserCog, ClipboardEdit, StickyNote, FileCheck2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { DataTable } from "../../components/common/DataTable";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { ProgressStepper } from "../../components/common/ProgressStepper";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import {
  type ApplicantDocumentItem,
  type ApplicantPriority,
  type ApplicantStage
} from "../../data/adminApplicants";
import {
  getApplicantById,
  getDocumentUpdatedLabel,
  normalizeEmail,
  updateApplicant,
  updateApplicantDocument
} from "../../data/applicantStorage";
import { subscribeToCampusStorageChange } from "../../data/storageEvents";
import {
  DEMO_ADVISOR,
  DEMO_APPLICANT,
  DEMO_CALL_NOTE,
  DEMO_TARGET_STAGE
} from "../../config/demo";
import type { Status } from "../../types";
import type { ProgressStep } from "../../types/campus";

type QuickActionKey = "llamada" | "recordatorio" | "cita" | "estatus" | "responsable" | "nota";

interface QuickActionConfig {
  key: QuickActionKey;
  label: string;
  icon: typeof PhoneCall;
  title: string;
  helper: string;
}

const stageOrder: ApplicantStage[] = [
  "Nuevo registro",
  "Contacto inicial",
  "Interés confirmado",
  "Documentación pendiente",
  "Evaluación / entrevista",
  "Inscripción finalizada"
];

const quickActions: QuickActionConfig[] = [
  {
    key: "llamada",
    label: "Registrar llamada",
    icon: PhoneCall,
    title: "Registrar llamada",
    helper: "Describe el resultado de la conversación y los siguientes pasos."
  },
  {
    key: "recordatorio",
    label: "Enviar recordatorio",
    icon: Send,
    title: "Enviar recordatorio",
    helper: "Redacta un aviso para documentos o entrevista pendiente."
  },
  {
    key: "cita",
    label: "Programar cita",
    icon: CalendarPlus,
    title: "Programar cita",
    helper: "Confirma fecha, hora y modalidad de la siguiente reunión."
  },
  {
    key: "estatus",
    label: "Cambiar estatus",
    icon: ClipboardEdit,
    title: "Cambiar estatus",
    helper: "Define la nueva etapa del aspirante dentro del proceso."
  },
  {
    key: "responsable",
    label: "Asignar responsable",
    icon: UserCog,
    title: "Asignar responsable",
    helper: "Selecciona la persona encargada del seguimiento."
  },
  {
    key: "nota",
    label: "Agregar nota",
    icon: StickyNote,
    title: "Agregar nota interna",
    helper: "Registra una observación útil para el seguimiento del aspirante."
  }
];

const advisors = [
  DEMO_ADVISOR,
  "Mtra. Daniela Cruz",
  "Lic. Adrián Mora",
  "Mtra. Laura Treviño",
  "Lic. Mariana Peña"
];

const stageValues: Record<ApplicantStage, { status: Status; conversionProbability: number; nextAction: string }> = {
  "Nuevo registro": { status: "activo", conversionProbability: 48, nextAction: "Realizar primer contacto" },
  "Contacto inicial": { status: "activo", conversionProbability: 58, nextAction: "Confirmar interés y resolver dudas" },
  "Interés confirmado": { status: "activo", conversionProbability: 68, nextAction: "Solicitar documentación de admisión" },
  "Documentación pendiente": { status: "en_revision", conversionProbability: 76, nextAction: "Completar y validar documentos" },
  "Evaluación / entrevista": { status: "en_revision", conversionProbability: 88, nextAction: "Realizar evaluación o entrevista" },
  "Inscripción finalizada": { status: "aprobado", conversionProbability: 100, nextAction: "Enviar bienvenida e instrucciones de inicio" }
};

function buildProgressSteps(stage: ApplicantStage): ProgressStep[] {
  const currentIndex = stageOrder.indexOf(stage);

  return stageOrder.map((item, index) => ({
    id: String(index + 1),
    title: item,
    detail: index < currentIndex ? "Etapa completada" : index === currentIndex ? "Etapa actual" : "Pendiente por avanzar",
    state: (index < currentIndex ? "completado" : index === currentIndex ? "activo" : "pendiente") as ProgressStep["state"]
  }));
}

function priorityClasses(priority: ApplicantPriority) {
  if (priority === "alta") return "bg-rose-100 text-rose-800 border-rose-200";
  if (priority === "media") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-sky-100 text-sky-800 border-sky-200";
}

export function AspirantePerfilPage() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(() => getApplicantById(id));
  const [activeAction, setActiveAction] = useState<QuickActionConfig | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [actionConfirmation, setActionConfirmation] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);
  const actionSubmittingRef = useRef(false);
  const [selectedStage, setSelectedStage] = useState<ApplicantStage>("Nuevo registro");
  const [selectedOwner, setSelectedOwner] = useState(DEMO_ADVISOR);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentModality, setAppointmentModality] = useState("Presencial");
  const [documentReview, setDocumentReview] = useState<ApplicantDocumentItem | null>(null);
  const [documentReviewStatus, setDocumentReviewStatus] = useState<"aprobado" | "rechazado" | "correccion" | "en_revision">("aprobado");
  const [documentReviewNote, setDocumentReviewNote] = useState("");
  const [documentReviewError, setDocumentReviewError] = useState<string | null>(null);
  const [isDocumentReviewSubmitting, setIsDocumentReviewSubmitting] = useState(false);
  const documentReviewSubmittingRef = useRef(false);

  useEffect(() => {
    const syncApplicant = () => setApplicant(getApplicantById(id));
    syncApplicant();
    return subscribeToCampusStorageChange(syncApplicant);
  }, [id]);

  const openAction = (action: QuickActionConfig) => {
    setActionError(null);
    setActionNote("");
    if (applicant) {
      const isDemoProfile =
        normalizeEmail(applicant.email) === normalizeEmail(DEMO_APPLICANT.email);
      setSelectedStage(
        action.key === "estatus" && isDemoProfile && applicant.stage === "Nuevo registro"
          ? DEMO_TARGET_STAGE
          : applicant.stage
      );
      setSelectedOwner(
        applicant.owner === "Pendiente de asignación" ? DEMO_ADVISOR : applicant.owner
      );
    }
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentModality("Presencial");
    setActiveAction(action);
  };

  const handleConfirmAction = () => {
    if (!applicant || !activeAction || actionSubmittingRef.current) return;
    const note = actionNote.trim();
    const noteRequired = ["llamada", "recordatorio", "nota"].includes(activeAction.key);

    if (noteRequired && !note) {
      setActionError("Escribe un comentario antes de confirmar.");
      return;
    }
    if (activeAction.key === "cita" && (!appointmentDate || !appointmentTime)) {
      setActionError("Selecciona la fecha y la hora de la cita.");
      return;
    }
    if (activeAction.key === "estatus" && selectedStage === applicant.stage) {
      setActionError("Selecciona una etapa diferente antes de confirmar.");
      return;
    }
    if (activeAction.key === "responsable" && selectedOwner === applicant.owner) {
      setActionError("Selecciona un responsable diferente antes de confirmar.");
      return;
    }

    actionSubmittingRef.current = true;
    setIsActionSubmitting(true);

    try {
      let updatedApplicant = applicant;
      let confirmationMessage = "Acción guardada correctamente.";
      const contactTime = new Intl.DateTimeFormat("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date());

      if (activeAction.key === "estatus") {
        updatedApplicant = updateApplicant(
          applicant.id,
          { stage: selectedStage, ...stageValues[selectedStage] },
          {
            timelineEvent: {
              title: "Etapa actualizada",
              detail: note || `La solicitud avanzó a ${selectedStage}.`,
              status: stageValues[selectedStage].status
            }
          }
        );
        confirmationMessage = "Etapa actualizada correctamente.";
      } else if (activeAction.key === "responsable") {
        updatedApplicant = updateApplicant(
          applicant.id,
          { owner: selectedOwner },
          {
            timelineEvent: {
              title: "Responsable asignado",
              detail: note || `${selectedOwner} quedó a cargo del seguimiento.`,
              status: "activo"
            }
          }
        );
        confirmationMessage = "Responsable actualizado correctamente.";
      } else if (activeAction.key === "llamada" || activeAction.key === "recordatorio") {
        const isCall = activeAction.key === "llamada";
        updatedApplicant = updateApplicant(
          applicant.id,
          { lastContact: `Hoy ${contactTime}`, daysWithoutFollowUp: 0 },
          {
            timelineEvent: {
              title: isCall ? "Llamada registrada" : "Recordatorio enviado",
              detail: note,
              status: "completado"
            }
          }
        );
        confirmationMessage = isCall
          ? "Llamada registrada correctamente."
          : "Recordatorio registrado correctamente.";
      } else if (activeAction.key === "cita") {
        const appointmentLabel = `${appointmentDate} a las ${appointmentTime} · ${appointmentModality}`;
        updatedApplicant = updateApplicant(
          applicant.id,
          { nextAction: `Asistir a cita: ${appointmentLabel}` },
          {
            timelineEvent: {
              title: "Cita programada",
              detail: note ? `${appointmentLabel}. ${note}` : appointmentLabel,
              status: "activo"
            }
          }
        );
        confirmationMessage = "Cita programada correctamente.";
      } else if (activeAction.key === "nota") {
        updatedApplicant = updateApplicant(
          applicant.id,
          { observations: applicant.observations ? `${applicant.observations}\n${note}` : note },
          {
            timelineEvent: {
              title: "Nota interna agregada",
              detail: note,
              status: "activo"
            }
          }
        );
        confirmationMessage = "Nota agregada correctamente.";
      }

      setApplicant(updatedApplicant);
      setActionConfirmation(confirmationMessage);
      setActionNote("");
      setActionError(null);
      setActiveAction(null);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "No fue posible guardar la acción.");
    } finally {
      actionSubmittingRef.current = false;
      setIsActionSubmitting(false);
    }
  };

  const openDocumentReview = (document: ApplicantDocumentItem) => {
    setDocumentReview(document);
    setDocumentReviewStatus(document.status === "rechazado" ? "rechazado" : document.status === "en_revision" ? "en_revision" : "aprobado");
    setDocumentReviewNote(document.reviewNote ?? "");
    setDocumentReviewError(null);
  };

  const handleDocumentReview = () => {
    if (!applicant || !documentReview || documentReviewSubmittingRef.current) return;

    const trimmedNote = documentReviewNote.trim();
    const persistedStatus: Status =
      documentReviewStatus === "correccion" ? "rechazado" : documentReviewStatus;
    const currentNote = documentReview.reviewNote?.trim() ?? "";
    const hasChanges =
      persistedStatus !== documentReview.status || trimmedNote !== currentNote;

    if (!hasChanges) {
      setDocumentReviewError("No hay cambios para guardar.");
      return;
    }
    if (
      (documentReviewStatus === "rechazado" || documentReviewStatus === "correccion") &&
      !trimmedNote
    ) {
      setDocumentReviewError(
        "Agrega una observación para explicar el rechazo o la corrección solicitada."
      );
      return;
    }

    documentReviewSubmittingRef.current = true;
    setIsDocumentReviewSubmitting(true);

    try {
      const actionTitle =
        documentReviewStatus === "aprobado"
          ? "Documento aprobado"
          : documentReviewStatus === "correccion"
            ? "Corrección solicitada"
            : documentReviewStatus === "rechazado"
              ? "Documento rechazado"
              : "Documento en revisión";
      const updatedApplicant = updateApplicantDocument(
        applicant.id,
        documentReview.id,
        {
          status: persistedStatus,
          updatedAt: getDocumentUpdatedLabel(),
          reviewNote: trimmedNote || undefined
        },
        {
          timelineEvent: {
            title: actionTitle,
            detail: `${documentReview.name}${trimmedNote ? `: ${trimmedNote}` : ""}`,
            status: persistedStatus
          }
        }
      );
      setApplicant(updatedApplicant);
      setActionConfirmation(`${documentReview.name} actualizado correctamente.`);
      setDocumentReview(null);
      setDocumentReviewError(null);
    } catch (error) {
      setDocumentReviewError(
        error instanceof Error ? error.message : "No fue posible actualizar el documento."
      );
    } finally {
      documentReviewSubmittingRef.current = false;
      setIsDocumentReviewSubmitting(false);
    }
  };

  if (!applicant) {
    return (
      <EmptyState
        title="Aspirante no encontrado"
        description="No hay datos disponibles para mostrar este perfil."
      />
    );
  }

  const progressSteps = buildProgressSteps(applicant.stage);
  const isDemoProfile =
    normalizeEmail(applicant.email) === normalizeEmail(DEMO_APPLICANT.email);
  const actionHasNoChange =
    activeAction?.key === "estatus"
      ? selectedStage === applicant.stage
      : activeAction?.key === "responsable"
        ? selectedOwner === applicant.owner
        : false;
  const reviewPersistedStatus: Status | null = documentReview
    ? documentReviewStatus === "correccion"
      ? "rechazado"
      : documentReviewStatus
    : null;
  const documentReviewHasNoChanges = documentReview
    ? reviewPersistedStatus === documentReview.status &&
      documentReviewNote.trim() === (documentReview.reviewNote?.trim() ?? "")
    : true;

  return (
    <PageShell title="Perfil del aspirante" description="Vista detallada para el seguimiento de captación y admisión." eyebrow="Perfil individual">
      {actionConfirmation ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {actionConfirmation}
        </div>
      ) : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <UserAvatar name={applicant.name} subtitle={applicant.folio} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">{applicant.folio}</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">{applicant.name}</h1>
              <p className="mt-2 text-sm text-slate-600">{applicant.career}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{applicant.stage}</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityClasses(applicant.priority)}`}>Prioridad {applicant.priority}</span>
                <StatusBadge status={applicant.status} />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Responsable asignado</p>
            <p className="mt-1">{applicant.owner}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <SectionCard title="Datos personales" description="Información base del aspirante">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Correo", applicant.email],
                ["Teléfono", applicant.phone],
                ["Ciudad", applicant.city],
                ["Modalidad", applicant.modality],
                ["Último nivel de estudios", applicant.education ?? "Por definir"],
                ["Medio de origen", applicant.source],
                ["Fecha de registro", applicant.registeredAt],
                ["Comentarios", applicant.comments ?? "Sin comentarios"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Proceso de admisión" description="Etapas de seguimiento de la captación">
            <ProgressStepper steps={progressSteps} />
          </SectionCard>

          <SectionCard title="Timeline de interacciones" description="Historial de actividades registradas">
            <div className="space-y-4">
              {applicant.timeline.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3 w-3 rounded-full bg-tech-primary" />
                    {index < applicant.timeline.length - 1 ? <span className="mt-2 h-full w-px flex-1 bg-slate-200" /> : null}
                  </div>
                  <div className="pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Documentos del aspirante" description="Control del expediente de admisión">
            <DataTable
              rows={applicant.documents}
              rowKey={(row) => row.id}
              emptyText="No hay documentos registrados."
              columns={[
                {
                  id: "name",
                  header: "Documento",
                  render: (row) => (
                    <div>
                      <span className="font-medium text-slate-900">{row.name}</span>
                      {row.fileName ? <p className="mt-1 text-xs text-slate-500">{row.fileName} · {row.fileSize}</p> : null}
                      {row.reviewNote ? <p className="mt-1 text-xs font-medium text-rose-700">{row.reviewNote}</p> : null}
                    </div>
                  )
                },
                {
                  id: "status",
                  header: "Estado",
                  render: (row) => <StatusBadge status={row.status} />
                },
                {
                  id: "updatedAt",
                  header: "Actualizado",
                  render: (row) => <span className="text-slate-600">{row.updatedAt}</span>
                },
                {
                  id: "action",
                  header: "Acción",
                  render: (row) => (isDemoProfile ? Boolean(row.fileName) : row.fileName || row.status !== "pendiente") ? (
                    <button
                      type="button"
                      onClick={() => openDocumentReview(row)}
                      aria-label={`Revisar ${row.name}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-tech-border px-3 py-1.5 text-xs font-semibold text-tech-primary transition hover:bg-blue-50"
                    >
                      <FileCheck2 className="h-3.5 w-3.5" />
                      Revisar
                    </button>
                  ) : <span className="text-xs text-slate-400">Sin carga</span>
                }
              ]}
            />
          </SectionCard>

          <SectionCard title="Acciones rápidas" description="Operaciones frecuentes de seguimiento">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.key}
                    type="button"
                    onClick={() => openAction(action)}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-tech-accent/30 hover:bg-tech-bg"
                  >
                    <Icon className="h-5 w-5 text-tech-primary" />
                    <p className="mt-3 font-semibold text-slate-900">{action.label}</p>
                    <p className="mt-1 text-xs text-slate-600">Registrar y guardar</p>
                  </button>
                );
              })}
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-4 self-start">
          <SectionCard title="Panel lateral" description="Indicadores para priorizar seguimiento">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-600">Probabilidad de conversión</span>
                  <span className="font-semibold text-slate-900">{applicant.conversionProbability}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200">
                  <div className="h-3 rounded-full bg-gradient-to-r from-tech-primary to-tech-accent" style={{ width: `${applicant.conversionProbability}%` }} />
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Próxima acción recomendada</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{applicant.nextAction}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Último contacto</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{applicant.lastContact}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Días sin seguimiento</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{applicant.daysWithoutFollowUp}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Observaciones internas</p>
                <p className="mt-2 text-sm text-slate-700">{applicant.observations}</p>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>

      {activeAction ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{activeAction.title}</h3>
                <p className="text-sm text-slate-600">{activeAction.helper}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveAction(null)}
                disabled={isActionSubmitting}
                className="text-sm font-semibold text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cerrar
              </button>
            </div>

            {activeAction.key === "estatus" ? (
              <label className="mb-4 block space-y-1 text-sm">
                <span className="font-medium text-slate-700">Nueva etapa</span>
                <select
                  value={selectedStage}
                  onChange={(event) => setSelectedStage(event.target.value as ApplicantStage)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary"
                >
                  {stageOrder.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                </select>
              </label>
            ) : null}

            {activeAction.key === "responsable" ? (
              <label className="mb-4 block space-y-1 text-sm">
                <span className="font-medium text-slate-700">Responsable</span>
                <select
                  value={selectedOwner}
                  onChange={(event) => setSelectedOwner(event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary"
                >
                  {advisors.map((advisor) => <option key={advisor} value={advisor}>{advisor}</option>)}
                </select>
              </label>
            ) : null}

            {activeAction.key === "cita" ? (
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                <label className="space-y-1 text-sm">
                  <span className="font-medium text-slate-700">Fecha</span>
                  <input type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary" />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="font-medium text-slate-700">Hora</span>
                  <input type="time" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary" />
                </label>
                <label className="space-y-1 text-sm sm:col-span-2">
                  <span className="font-medium text-slate-700">Modalidad</span>
                  <select value={appointmentModality} onChange={(event) => setAppointmentModality(event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary">
                    <option>Presencial</option>
                    <option>Videollamada</option>
                    <option>Telefónica</option>
                  </select>
                </label>
              </div>
            ) : null}

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">
                Comentario {activeAction.key === "estatus" || activeAction.key === "responsable" || activeAction.key === "cita" ? "(opcional)" : ""}
              </span>
              <textarea
                value={actionNote}
                onChange={(event) => setActionNote(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary"
                placeholder={
                  activeAction.key === "llamada" && isDemoProfile
                    ? DEMO_CALL_NOTE
                    : "Escribe una nota breve..."
                }
              />
            </label>

            {actionError ? (
              <div role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">
                {actionError}
              </div>
            ) : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveAction(null)}
                disabled={isActionSubmitting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={isActionSubmitting || actionHasNoChange}
                className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isActionSubmitting ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {documentReview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-review-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-primary">Revisión documental</p>
              <h3 id="document-review-title" className="mt-1 text-xl font-bold text-slate-900">{documentReview.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{documentReview.fileName ?? "Sin archivo cargado"}</p>
            </div>

            <label className="block space-y-1 text-sm">
              <span className="font-medium text-slate-700">Resultado</span>
              <select
                value={documentReviewStatus}
                onChange={(event) => setDocumentReviewStatus(event.target.value as typeof documentReviewStatus)}
                disabled={isDocumentReviewSubmitting}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="en_revision">En revisión</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
                <option value="correccion">Solicitar corrección</option>
              </select>
            </label>

            <label className="mt-4 block space-y-1 text-sm">
              <span className="font-medium text-slate-700">Observación {documentReviewStatus === "rechazado" || documentReviewStatus === "correccion" ? "(obligatoria)" : "(opcional)"}</span>
              <textarea
                value={documentReviewNote}
                onChange={(event) => setDocumentReviewNote(event.target.value)}
                rows={4}
                disabled={isDocumentReviewSubmitting}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary disabled:cursor-not-allowed disabled:opacity-60"
              />
            </label>

            {documentReviewError ? <div role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">{documentReviewError}</div> : null}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDocumentReview(null)}
                disabled={isDocumentReviewSubmitting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDocumentReview}
                disabled={isDocumentReviewSubmitting || documentReviewHasNoChanges}
                className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDocumentReviewSubmitting ? "Guardando..." : "Guardar revisión"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}


[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]