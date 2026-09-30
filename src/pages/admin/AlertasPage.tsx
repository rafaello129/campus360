import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertActionModal } from "../../components/admin/AlertActionModal";
import { EmptyState } from "../../components/common/EmptyState";
import { FilterPill } from "../../components/common/FilterPill";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { ADMIN_DEMO } from "../../config/adminDemo";
import {
  adminAlerts,
  alertAttentionStats,
  alertFilters,
  type AdminAlertRecord,
  type AlertRisk
} from "../../data/adminAlerts";
import { institutionalRiskTotal } from "../../data/adminMetrics";
import { paths } from "../../router/paths";

const riskClasses: Record<AlertRisk, string> = {
  alto: "bg-rose-100 text-rose-800 border-rose-200",
  medio: "bg-amber-100 text-amber-800 border-amber-200",
  bajo: "bg-emerald-100 text-emerald-800 border-emerald-200"
};

interface AttentionForm {
  accion: string;
  observacion: string;
  responsable: string;
  fecha: string;
}

const emptyForm: AttentionForm = {
  accion: "",
  observacion: "",
  responsable: "",
  fecha: ""
};

export function AlertasPage() {
  const [alerts, setAlerts] = useState<AdminAlertRecord[]>(adminAlerts);
  const [filter, setFilter] = useState("Todas");
  const [selectedAlert, setSelectedAlert] = useState<AdminAlertRecord | null>(null);
  const [form, setForm] = useState<AttentionForm>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const filteredAlerts = useMemo(
    () =>
      alerts.filter((alert) => {
        if (filter === "Todas") return true;
        if (filter === "Riesgo alto") return alert.risk === "alto";
        if (filter === "Riesgo medio") return alert.risk === "medio";
        if (filter === "Riesgo bajo") return alert.risk === "bajo";
        if (filter === "Académicas") return alert.type === "Académica";
        if (filter === "Administrativas") return alert.type === "Administrativa";
        if (filter === "Participación") return alert.type === "Participación";
        if (filter === "Documentales") return alert.type === "Documental";
        if (filter === "Atendidas") return alert.state === "Atendida";
        if (filter === "Pendientes") return alert.state === "Pendiente";
        return true;
      }),
    [alerts, filter]
  );

  const pendingCount = alerts.filter((alert) => alert.state === "Pendiente").length;
  const attendedCount = alerts.filter((alert) => alert.state === "Atendida").length;
  const highPendingCount = alerts.filter(
    (alert) => alert.state === "Pendiente" && alert.risk === "alto"
  ).length;
  const mediumPendingCount = alerts.filter(
    (alert) => alert.state === "Pendiente" && alert.risk === "medio"
  ).length;
  const criticalAlerts = alerts.filter(
    (alert) => alert.critical && alert.state === "Pendiente"
  );

  const openAlert = (alert: AdminAlertRecord) => {
    setSelectedAlert(alert);
    setFormError(null);
    setConfirmation(null);
    if (alert.state === "Pendiente") {
      setForm({ ...emptyForm, responsable: alert.owner });
    }
  };

  const closeAlert = () => {
    if (isSubmitting) return;
    setSelectedAlert(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const attendAlert = () => {
    if (
      !selectedAlert ||
      selectedAlert.state !== "Pendiente" ||
      submittingRef.current
    ) {
      return;
    }

    const action = form.accion.trim();
    const responsible = form.responsable.trim();
    const note = form.observacion.trim();
    const followUpDate = form.fecha;

    if (!action) {
      setFormError("Describe la acción realizada antes de guardar la atención.");
      return;
    }
    if (!responsible) {
      setFormError("Indica el responsable del seguimiento.");
      return;
    }
    if (!followUpDate) {
      setFormError("Selecciona una fecha de seguimiento.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const updated: AdminAlertRecord = {
        ...selectedAlert,
        owner: responsible,
        state: "Atendida",
        status: "aprobado",
        nextAction: `Seguimiento programado para ${followUpDate}`,
        attention: {
          action,
          note: note || undefined,
          responsible,
          followUpDate,
          attendedAt: ADMIN_DEMO.attentionRecordedAt
        }
      };

      setAlerts((previous) =>
        previous.map((item) => (item.id === selectedAlert.id ? updated : item))
      );
      setConfirmation(`Alerta de ${selectedAlert.studentName} atendida correctamente.`);
      setSelectedAlert(null);
      setForm(emptyForm);
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const metrics = [
    { label: "Pendientes", value: pendingCount, detail: "casos por atender" },
    { label: "Riesgo alto pendiente", value: highPendingCount, detail: "prioridad inmediata" },
    { label: "Riesgo medio pendiente", value: mediumPendingCount, detail: "seguimiento preventivo" },
    { label: "Atendidas", value: attendedCount, detail: "casos de la muestra" }
  ];

  return (
    <PageShell
      title="Alertas institucionales"
      description={`Bandeja demostrativa de ${ADMIN_DEMO.demoAlertCases} casos representativos dentro de ${institutionalRiskTotal} señales institucionales del snapshot.`}
      eyebrow="Monitoreo"
    >
      <section className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">
            Muestra operativa · {ADMIN_DEMO.snapshotLabel}
          </p>
          <p className="mt-1 text-sm text-tech-textSecond">
            Las cifras de esta bandeja cambian durante la sesión; la Analítica conserva el snapshot institucional agregado.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="border-l-2 border-tech-primary/30 pl-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-tech-textMain">{metric.value}</p>
              <p className="text-xs text-tech-textSecond">{metric.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {confirmation ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-800">
          {confirmation}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {alertFilters.map((item) => (
          <FilterPill key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />
        ))}
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <SectionCard title="Casos priorizados" description="Casos representativos para demostrar la operación de seguimiento.">
          {filteredAlerts.length === 0 ? (
            <EmptyState
              title="No hay alertas para este filtro"
              description="Cambia el criterio o vuelve a consultar todos los casos de la muestra."
              action={
                <button
                  type="button"
                  onClick={() => setFilter("Todas")}
                  className="rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Ver todas
                </button>
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <article key={alert.id} className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-tech-textMain">{alert.studentName}</h3>
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${riskClasses[alert.risk]}`}>
                          Riesgo {alert.risk}
                        </span>
                        <StatusBadge status={alert.status} />
                      </div>
                      <p className="mt-1 text-xs text-tech-textSecond">
                        {alert.enrollment} · {alert.type} · Detectada {alert.detectedAt}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-tech-textSecond">{alert.description}</p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openAlert(alert)}
                        className="rounded-lg border border-tech-primary/30 px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-50"
                      >
                        {alert.state === "Atendida" ? "Ver atención" : "Atender"}
                      </button>
                      <Link
                        to={paths.admin.estudiantePerfil(alert.studentId)}
                        className="rounded-lg border border-tech-border px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:bg-tech-bg"
                      >
                        Ver estudiante
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 border-t border-tech-divider pt-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tech-textSecond">Responsable</p>
                      <p className="mt-1 text-sm font-semibold text-tech-textMain">{alert.owner}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tech-textSecond">Estado</p>
                      <p className="mt-1 text-sm font-semibold text-tech-textMain">{alert.state}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tech-textSecond">Próxima acción</p>
                      <p className="mt-1 text-sm leading-5 text-tech-textMain">{alert.nextAction}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </SectionCard>

        <aside className="space-y-4">
          <SectionCard title="Alertas críticas pendientes">
            {criticalAlerts.length === 0 ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900">Sin alertas críticas pendientes</p>
                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  Los casos críticos de esta muestra ya fueron atendidos.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {criticalAlerts.map((alert) => (
                  <article key={alert.id} className="rounded-lg border border-rose-200 bg-rose-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-rose-900">{alert.studentName}</p>
                        <p className="mt-1 text-xs leading-5 text-rose-700">{alert.nextAction}</p>
                      </div>
                      <StatusBadge status={alert.status} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Atención institucional">
            <div className="space-y-4 text-sm text-tech-textSecond">
              <div>
                <p className="text-3xl font-bold text-tech-textMain">{alertAttentionStats.avgAttentionTime}</p>
                <p className="mt-1">promedio histórico de atención</p>
                <p className="mt-1">{attendedCount} casos atendidos en esta muestra</p>
              </div>
              <div className="rounded-lg bg-tech-bg p-3">
                <p className="font-semibold text-tech-textMain">Criterio operativo</p>
                <p className="mt-1 leading-6">
                  Atender primero riesgo alto, después alertas documentales y seguimiento académico.
                </p>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>

      {selectedAlert?.state === "Pendiente" ? (
        <AlertActionModal
          title={`Atender alerta: ${selectedAlert.studentName}`}
          description={selectedAlert.description}
          confirmLabel="Guardar atención"
          onCancel={closeAlert}
          onConfirm={attendAlert}
          isSubmitting={isSubmitting}
        >
          <div className="space-y-3">
            {formError ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                {formError}
              </div>
            ) : null}
            <label className="block space-y-1 text-sm">
              <span className="font-medium text-tech-textMain">Acción realizada</span>
              <textarea
                value={form.accion}
                disabled={isSubmitting}
                onChange={(event) => setForm((previous) => ({ ...previous, accion: event.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary disabled:opacity-60"
              />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-medium text-tech-textMain">Observación</span>
              <textarea
                value={form.observacion}
                disabled={isSubmitting}
                onChange={(event) => setForm((previous) => ({ ...previous, observacion: event.target.value }))}
                rows={3}
                className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary disabled:opacity-60"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-tech-textMain">Responsable</span>
                <input
                  value={form.responsable}
                  disabled={isSubmitting}
                  onChange={(event) => setForm((previous) => ({ ...previous, responsable: event.target.value }))}
                  className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary disabled:opacity-60"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-tech-textMain">Fecha de seguimiento</span>
                <input
                  type="date"
                  value={form.fecha}
                  disabled={isSubmitting}
                  onChange={(event) => setForm((previous) => ({ ...previous, fecha: event.target.value }))}
                  className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary disabled:opacity-60"
                />
              </label>
            </div>
          </div>
        </AlertActionModal>
      ) : null}

      {selectedAlert?.state === "Atendida" ? (
        <AlertActionModal
          title={`Atención registrada: ${selectedAlert.studentName}`}
          description="Detalle de la atención almacenada durante el escenario administrativo."
          confirmLabel="Cerrar"
          onCancel={closeAlert}
          onConfirm={closeAlert}
          hideCancel
          eyebrow="Seguimiento registrado"
        >
          {selectedAlert.attention ? (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-tech-bg p-3 sm:col-span-2">
                <dt className="font-semibold text-tech-textMain">Acción realizada</dt>
                <dd className="mt-1 text-tech-textSecond">{selectedAlert.attention.action}</dd>
              </div>
              <div className="rounded-lg bg-tech-bg p-3 sm:col-span-2">
                <dt className="font-semibold text-tech-textMain">Observación</dt>
                <dd className="mt-1 text-tech-textSecond">{selectedAlert.attention.note ?? "Sin observación adicional"}</dd>
              </div>
              <div className="rounded-lg bg-tech-bg p-3">
                <dt className="font-semibold text-tech-textMain">Responsable</dt>
                <dd className="mt-1 text-tech-textSecond">{selectedAlert.attention.responsible}</dd>
              </div>
              <div className="rounded-lg bg-tech-bg p-3">
                <dt className="font-semibold text-tech-textMain">Fecha de seguimiento</dt>
                <dd className="mt-1 text-tech-textSecond">{selectedAlert.attention.followUpDate}</dd>
              </div>
              <div className="rounded-lg bg-tech-bg p-3 sm:col-span-2">
                <dt className="font-semibold text-tech-textMain">Atendida en</dt>
                <dd className="mt-1 text-tech-textSecond">{selectedAlert.attention.attendedAt}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-tech-textSecond">No hay detalle de atención disponible para este caso.</p>
          )}
        </AlertActionModal>
      ) : null}
    </PageShell>
  );
}
