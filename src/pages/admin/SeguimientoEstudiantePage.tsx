import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MetricCard } from "../../components/common/MetricCard";
import { PageShell } from "../../components/common/PageShell";
import { ProgressStepper } from "../../components/common/ProgressStepper";
import { SearchInput } from "../../components/common/SearchInput";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import { EmptyState } from "../../components/common/EmptyState";
import { AlertActionModal } from "../../components/admin/AlertActionModal";
import { adminStudents } from "../../data/adminStudents";
import { buildStudentFollowUpResult, followUpActionOptions, type FollowUpActionOption } from "../../data/adminFollowUp";
import type { Metric } from "../../types";
import type { ProgressStep } from "../../types/campus";

export function SeguimientoEstudiantePage() {
  const [searchParams] = useSearchParams();
  const initialStudentId = searchParams.get("estudiante") ?? adminStudents[0]?.id ?? "";
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);
  const [activeAction, setActiveAction] = useState<FollowUpActionOption | null>(null);
  const [actionFields, setActionFields] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedStudent = useMemo(
    () => adminStudents.find((student) => student.id === selectedStudentId) ?? adminStudents[0],
    [selectedStudentId]
  );

  if (!selectedStudent) {
    return <EmptyState title="Sin registros" description="No hay estudiantes para mostrar." />;
  }

  const metrics: Metric[] = [
    {
      label: "Participación en eventos",
      value: `${selectedStudent.metrics.eventParticipation}%`,
      trend: "Asistencia consolidada",
      trendDirection: "up"
    },
    {
      label: "Tutorías atendidas",
      value: String(selectedStudent.metrics.tutoringAttended),
      trend: "Sesiones realizadas",
      trendDirection: "neutral"
    },
    {
      label: "Documentos completos",
      value: String(selectedStudent.metrics.documentsComplete),
      trend: "Expediente académico",
      trendDirection: "up"
    },
    {
      label: "Incidencias abiertas",
      value: String(selectedStudent.metrics.openIncidents),
      trend: "Casos activos",
      trendDirection: selectedStudent.metrics.openIncidents > 0 ? "up" : "neutral"
    },
    {
      label: "Actividad reciente",
      value: selectedStudent.metrics.recentActivity,
      trend: "Último movimiento registrado",
      trendDirection: "neutral"
    }
  ];

  const followUpSteps: ProgressStep[] = selectedStudent.timeline.map((item) => ({
    id: item.id,
    title: item.title,
    detail: item.detail,
    state: (item.status === "pendiente" ? "pendiente" : item.status === "activo" ? "activo" : "completado") as ProgressStep["state"]
  }));

  const openAction = (action: FollowUpActionOption) => {
    setActiveAction(action);
    setActionFields({});
  };

  const confirmAction = () => {
    if (!activeAction) {
      return;
    }

    const result = buildStudentFollowUpResult(selectedStudent);
    setFeedback(`${result.message} ${activeAction.label} aplicado.`);
    setActiveAction(null);
    setActionFields({});
  };

  return (
    <PageShell
      title="Seguimiento estudiantil"
      description="Visualiza la trayectoria, participación, incidencias y acciones de acompañamiento."
      eyebrow="Mesa de seguimiento"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.3fr]">
        <SectionCard title="Estudiantes" description="Selecciona un alumno para ver su trazabilidad" className="sticky top-4 self-start">
          <SearchInput placeholder="Buscar estudiante" />
          <div className="mt-4 space-y-2 max-h-[64vh] overflow-y-auto pr-1">
            {adminStudents.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${selectedStudent.id === student.id ? "border-petrol-300 bg-petrol-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <UserAvatar name={student.name} subtitle={student.enrollment} compact />
                  <StatusBadge status={student.state} />
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-900">{student.career}</p>
                <p className="text-xs text-slate-500">{student.semester} · Riesgo {student.risk}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title={selectedStudent.name} description="Perfil de seguimiento y acompañamiento">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol-700">{selectedStudent.enrollment}</p>
                <p className="mt-1 text-sm text-slate-600">{selectedStudent.career} · {selectedStudent.semester}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={selectedStudent.state} />
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${selectedStudent.risk === "alto" ? "bg-rose-100 text-rose-800 border-rose-200" : selectedStudent.risk === "medio" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-emerald-100 text-emerald-800 border-emerald-200"}`}>
                  Riesgo {selectedStudent.risk}
                </span>
              </div>
            </div>
          </SectionCard>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </section>

          <SectionCard title="Trayectoria de seguimiento" description="Secuencia de acciones y observaciones">
            <ProgressStepper steps={followUpSteps} />
          </SectionCard>

          <section className="grid gap-6 lg:grid-cols-2">
            <SectionCard title="Fortalezas" description="Aspectos que sostienen el avance académico">
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedStudent.strengths.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-emerald-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Áreas de atención" description="Puntos que requieren seguimiento adicional">
              <div className="space-y-3">
                {selectedStudent.attentionAreas.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.value}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </section>

          <SectionCard title="Acciones rápidas" description="Registrar acciones de acompañamiento" action={feedback ? <span className="text-sm font-semibold text-emerald-700">{feedback}</span> : undefined}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {followUpActionOptions.map((action) => (
                <button
                  key={action.key}
                  type="button"
                  onClick={() => openAction(action)}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-petrol-300 hover:bg-petrol-50"
                >
                  <p className="font-semibold text-slate-900">{action.label}</p>
                  <p className="mt-1 text-xs text-slate-600">{action.helper}</p>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {activeAction ? (
        <AlertActionModal
          title={activeAction.title}
          description={activeAction.helper}
          confirmLabel="Guardar"
          onCancel={() => setActiveAction(null)}
          onConfirm={confirmAction}
        >
          <div className="space-y-3">
            {activeAction.fields.map((field) => (
              <label key={field.name} className="block space-y-1 text-sm">
                <span className="font-medium text-slate-700">{field.label}</span>
                {field.type === "textarea" ? (
                  <textarea
                    value={actionFields[field.name] ?? ""}
                    onChange={(event) => setActionFields((previous) => ({ ...previous, [field.name]: event.target.value }))}
                    rows={4}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={actionFields[field.name] ?? ""}
                    onChange={(event) => setActionFields((previous) => ({ ...previous, [field.name]: event.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500"
                  />
                )}
              </label>
            ))}
          </div>
        </AlertActionModal>
      ) : null}
    </PageShell>
  );
}

