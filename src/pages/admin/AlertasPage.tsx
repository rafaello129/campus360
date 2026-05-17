import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertActionModal } from "../../components/admin/AlertActionModal";
import { FilterPill } from "../../components/common/FilterPill";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { adminAlerts, alertAttentionStats, alertFilters, alertMetrics, type AdminAlertRecord, type AlertRisk } from "../../data/adminAlerts";
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
  const [alerts, setAlerts] = useState(adminAlerts);
  const [filter, setFilter] = useState("Todas");
  const [selectedAlert, setSelectedAlert] = useState<AdminAlertRecord | null>(null);
  const [form, setForm] = useState<AttentionForm>(emptyForm);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
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
    });
  }, [alerts, filter]);

  const attendAlert = () => {
    if (!selectedAlert) return;
    setAlerts((previous) =>
      previous.map((item) =>
        item.id === selectedAlert.id
          ? { ...item, state: "Atendida", status: "aprobado" }
          : item
      )
    );
    setConfirmation(`Alerta de ${selectedAlert.studentName} atendida correctamente.`);
    setSelectedAlert(null);
    setForm(emptyForm);
  };

  return (
    <PageShell
      title="Alertas institucionales"
      description="Priorización de casos académicos, administrativos y documentales que requieren seguimiento."
      eyebrow="Monitoreo"
    >
      <section className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          {alertMetrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="border-l-2 border-tech-primary/30 pl-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-tech-textMain">{metric.value}</p>
              <p className="text-xs text-tech-textSecond">{metric.trend}</p>
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
        <SectionCard title="Casos priorizados" description="Lista operativa sin desbordes horizontales">
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
                    <p className="mt-1 text-xs text-tech-textSecond">{alert.enrollment} · {alert.type} · Detectada {alert.detectedAt}</p>
                    <p className="mt-3 text-sm leading-6 text-tech-textSecond">{alert.description}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAlert(alert);
                        setForm({ ...emptyForm, responsable: alert.owner });
                      }}
                      className="rounded-lg border border-tech-primary/30 px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-50"
                    >
                      Atender
                    </button>
                    <Link to={paths.admin.estudiantePerfil(alert.studentId)} className="rounded-lg border border-tech-border px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:bg-tech-bg">
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
        </SectionCard>

        <aside className="space-y-4">
          <SectionCard title="Alertas críticas">
            <div className="space-y-3">
              {alerts.filter((alert) => alert.critical).map((alert) => (
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
          </SectionCard>

          <SectionCard title="Atención institucional">
            <div className="space-y-4 text-sm text-tech-textSecond">
              <div>
                <p className="text-3xl font-bold text-tech-textMain">{alertAttentionStats.avgAttentionTime}</p>
                <p className="mt-1">{alertAttentionStats.weekClosed} alertas cerradas esta semana</p>
              </div>
              <div className="rounded-lg bg-tech-bg p-3">
                <p className="font-semibold text-tech-textMain">Criterio operativo</p>
                <p className="mt-1 leading-6">Atender primero riesgo alto, después alertas documentales y seguimiento académico.</p>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>

      {selectedAlert ? (
        <AlertActionModal
          title={`Atender alerta: ${selectedAlert.studentName}`}
          description={selectedAlert.description}
          confirmLabel="Guardar atención"
          onCancel={() => setSelectedAlert(null)}
          onConfirm={attendAlert}
        >
          <div className="space-y-3">
            <label className="block space-y-1 text-sm">
              <span className="font-medium text-tech-textMain">Acción realizada</span>
              <textarea value={form.accion} onChange={(event) => setForm((previous) => ({ ...previous, accion: event.target.value }))} rows={3} className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary" />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-medium text-tech-textMain">Observación</span>
              <textarea value={form.observacion} onChange={(event) => setForm((previous) => ({ ...previous, observacion: event.target.value }))} rows={3} className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-tech-textMain">Responsable</span>
                <input value={form.responsable} onChange={(event) => setForm((previous) => ({ ...previous, responsable: event.target.value }))} className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary" />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-tech-textMain">Fecha de seguimiento</span>
                <input type="date" value={form.fecha} onChange={(event) => setForm((previous) => ({ ...previous, fecha: event.target.value }))} className="w-full rounded-lg border border-tech-border px-3 py-2 outline-none focus:border-tech-primary" />
              </label>
            </div>
          </div>
        </AlertActionModal>
      ) : null}
    </PageShell>
  );
}
