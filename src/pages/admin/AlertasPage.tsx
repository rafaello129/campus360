import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertActionModal } from "../../components/admin/AlertActionModal";
import { DataTable, type DataTableColumn } from "../../components/common/DataTable";
import { MetricCard } from "../../components/common/MetricCard";
import { PageShell } from "../../components/common/PageShell";
import { FilterPill } from "../../components/common/FilterPill";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { paths } from "../../router/paths";
import { adminAlerts, alertAttentionStats, alertFilters, alertMetrics, type AdminAlertRecord, type AlertRisk } from "../../data/adminAlerts";

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

  const columns: DataTableColumn<AdminAlertRecord>[] = [
    {
      id: "student",
      header: "Estudiante",
      render: (alert) => (
        <div>
          <p className="font-semibold text-slate-900">{alert.studentName}</p>
          <p className="text-xs text-slate-500">{alert.enrollment}</p>
        </div>
      )
    },
    { id: "type", header: "Tipo", render: (alert) => <span className="text-slate-700">{alert.type}</span> },
    {
      id: "risk",
      header: "Riesgo",
      render: (alert) => <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${riskClasses[alert.risk]}`}>{alert.risk}</span>
    },
    { id: "description", header: "Descripción", render: (alert) => <span className="text-slate-600">{alert.description}</span> },
    { id: "detected", header: "Detectada", render: (alert) => <span className="text-slate-600">{alert.detectedAt}</span> },
    { id: "owner", header: "Responsable", render: (alert) => <span className="text-slate-600">{alert.owner}</span> },
    { id: "state", header: "Estado", render: (alert) => <StatusBadge status={alert.status} /> },
    { id: "next", header: "Próxima acción", render: (alert) => <span className="text-slate-600">{alert.nextAction}</span> },
    {
      id: "actions",
      header: "Acciones",
      className: "whitespace-nowrap",
      render: (alert) => (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setSelectedAlert(alert); setForm({ ...emptyForm, responsable: alert.owner }); }} className="rounded-lg border border-petrol-200 px-3 py-1.5 text-xs font-semibold text-petrol-700 hover:bg-petrol-50">Atender</button>
          <Link to={paths.admin.estudiantePerfil(alert.studentId)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Ver estudiante</Link>
        </div>
      )
    }
  ];

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
      description="Detecta y prioriza casos que requieren atención académica o administrativa."
      eyebrow="Monitoreo"
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {alertMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      {confirmation ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {confirmation}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {alertFilters.map((item) => (
          <FilterPill key={item} label={item} active={filter === item} onClick={() => setFilter(item)} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <SectionCard title="Alertas registradas" description="Lista priorizada para atención operativa">
          <DataTable columns={columns} rows={filteredAlerts} rowKey={(alert) => alert.id} />
        </SectionCard>

        <aside className="space-y-4">
          <SectionCard title="Alertas críticas">
            <div className="space-y-3">
              {alerts.filter((alert) => alert.critical).map((alert) => (
                <article key={alert.id} className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-rose-900">{alert.studentName}</p>
                      <p className="mt-1 text-xs text-rose-700">{alert.nextAction}</p>
                    </div>
                    <StatusBadge status={alert.status} />
                  </div>
                </article>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Tiempo promedio de atención">
            <p className="text-3xl font-bold text-slate-900">{alertAttentionStats.avgAttentionTime}</p>
            <p className="mt-2 text-sm text-slate-600">{alertAttentionStats.weekClosed} alertas cerradas esta semana</p>
          </SectionCard>

          <SectionCard title="Recomendaciones institucionales">
            <ul className="space-y-2 text-sm text-slate-600">
              {alertFilters.slice(1, 5).map((item) => (
                <li key={item} className="rounded-lg bg-slate-50 px-3 py-2">{item}</li>
              ))}
            </ul>
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
              <span className="font-medium text-slate-700">Acción realizada</span>
              <textarea value={form.accion} onChange={(event) => setForm((previous) => ({ ...previous, accion: event.target.value }))} rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="font-medium text-slate-700">Observación</span>
              <textarea value={form.observacion} onChange={(event) => setForm((previous) => ({ ...previous, observacion: event.target.value }))} rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-700">Responsable</span>
                <input value={form.responsable} onChange={(event) => setForm((previous) => ({ ...previous, responsable: event.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-700">Fecha de seguimiento</span>
                <input type="date" value={form.fecha} onChange={(event) => setForm((previous) => ({ ...previous, fecha: event.target.value }))} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
            </div>
          </div>
        </AlertActionModal>
      ) : null}
    </PageShell>
  );
}

