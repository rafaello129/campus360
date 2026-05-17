import { useMemo, useState } from "react";
import { CalendarPlus, PhoneCall, Send, UserCog, ClipboardEdit } from "lucide-react";
import { useParams } from "react-router-dom";
import { DataTable } from "../../components/common/DataTable";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { ProgressStepper } from "../../components/common/ProgressStepper";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import { adminApplicants, type ApplicantPriority, type ApplicantStage } from "../../data/adminApplicants";
import type { ProgressStep } from "../../types/campus";

type QuickActionKey = "llamada" | "recordatorio" | "cita" | "estatus" | "responsable";

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
  }
];

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
  const [activeAction, setActiveAction] = useState<QuickActionConfig | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [actionConfirmation, setActionConfirmation] = useState<string | null>(null);

  const applicant = useMemo(
    () => adminApplicants.find((candidate) => candidate.id === id) ?? adminApplicants[0],
    [id]
  );

  if (!applicant) {
    return (
      <EmptyState
        title="Aspirante no encontrado"
        description="No hay datos disponibles para mostrar este perfil."
      />
    );
  }

  const progressSteps = buildProgressSteps(applicant.stage);

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
                ["Medio de origen", applicant.source],
                ["Fecha de registro", applicant.registeredAt]
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
                  render: (row) => <span className="font-medium text-slate-900">{row.name}</span>
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
                    onClick={() => setActiveAction(action)}
                    className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-tech-accent/30 hover:bg-tech-bg"
                  >
                    <Icon className="h-5 w-5 text-tech-primary" />
                    <p className="mt-3 font-semibold text-slate-900">{action.label}</p>
                    <p className="mt-1 text-xs text-slate-600">Abrir flujo simulado</p>
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
              <button type="button" onClick={() => setActiveAction(null)} className="text-sm font-semibold text-slate-500">
                Cerrar
              </button>
            </div>

            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Comentario</span>
              <textarea
                value={actionNote}
                onChange={(event) => setActionNote(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-tech-primary"
                placeholder="Escribe una nota breve..."
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setActiveAction(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionConfirmation(`${activeAction.label} registrada para ${applicant.name}.`);
                  setActionNote("");
                  setActiveAction(null);
                }}
                className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

