import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Activity, AlertTriangle, ArrowRight, BellRing, ChartColumnBig, ClipboardList, Megaphone, Users } from "lucide-react";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import {
  adminOverviewMetrics,
  alertRiskDistribution,
  applicantsByCareer,
  conversionByStage,
  eventParticipationByMonth
} from "../../data/adminMetrics";
import { moduleSummaries, priorityActions, recentActivity } from "../../data/adminActivity";
import { paths } from "../../router/paths";

const moduleLinks: Record<string, string> = {
  captacion: paths.admin.captacion,
  seguimiento: paths.admin.seguimiento,
  difusion: paths.admin.difusion,
  documentos: paths.admin.documentos,
  alertas: paths.admin.alertas,
  analitica: paths.admin.analitica
};

const moduleIcons: Record<string, typeof Users> = {
  captacion: Users,
  seguimiento: ClipboardList,
  difusion: Megaphone,
  documentos: ClipboardList,
  alertas: BellRing,
  analitica: ChartColumnBig
};

export function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
        <div className="grid gap-6 border-b border-tech-divider bg-gradient-to-r from-white via-blue-50/60 to-white p-5 md:p-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tech-primary">Resumen institucional</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-tech-textMain md:text-3xl">
              Operación institucional 2026-A
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-tech-textSecond">
              Seguimiento de captación, alertas, documentos, difusión y actividad reciente para atención diaria.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to={paths.admin.captacion}
                className="inline-flex items-center gap-2 rounded-lg border border-tech-primary bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid"
              >
                Seguimiento de captación
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={paths.admin.alertas}
                className="inline-flex items-center gap-2 rounded-lg border border-tech-border bg-white px-4 py-2.5 text-sm font-semibold text-tech-primary transition hover:bg-blue-50"
              >
                Casos que requieren atención
                <AlertTriangle className="h-4 w-4" />
              </Link>
              <Link
                to={paths.admin.analitica}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-tech-primary transition hover:bg-blue-100"
              >
                Analítica ejecutiva
                <ChartColumnBig className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-tech-border bg-white p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">
              <Activity className="h-4 w-4" />
              Operación del día
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {adminOverviewMetrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="flex items-center justify-between gap-4 border-b border-tech-divider pb-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-l sm:pl-3 xl:border-b xl:border-l-0 xl:pl-0">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-tech-textSecond">{metric.label}</p>
                    <p className="mt-1 text-sm text-tech-textSecond">{metric.trend}</p>
                  </div>
                  <p className="text-2xl font-bold text-tech-textMain">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid divide-y divide-tech-divider md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { label: "Prioridades operativas", value: priorityActions.length, detail: "acciones activas" },
            { label: "Módulos institucionales", value: moduleSummaries.length, detail: "áreas en seguimiento" },
            { label: "Actividad reciente", value: recentActivity.length, detail: "movimientos registrados" }
          ].map((item) => (
            <div key={item.label} className="px-5 py-4 md:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{item.label}</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-2xl font-bold text-tech-textMain">{item.value}</span>
                <span className="pb-1 text-xs text-tech-textSecond">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Prioridades operativas"
          description="Casos y tareas que requieren atención institucional"
          action={<Link to={paths.admin.captacion} className="text-sm font-semibold text-tech-primary">Ir a captación</Link>}
        >
          <div className="space-y-3">
            {priorityActions.map((action) => (
              <article key={action.id} className="rounded-lg border border-tech-border bg-surface-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-tech-textMain">{action.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-tech-textSecond">{action.description}</p>
                    <p className="mt-2 text-xs text-tech-textSecond">{action.detail}</p>
                  </div>
                  <StatusBadge status={action.status} />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Actividad reciente" description="Movimientos relevantes de operación institucional">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <article key={item.id} className="flex items-start justify-between gap-3 rounded-lg border border-tech-border bg-white p-4">
                <div>
                  <h3 className="font-semibold text-tech-textMain">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-tech-textSecond">{item.detail}</p>
                  <p className="mt-2 text-xs text-tech-textSecond">{item.time}</p>
                </div>
                <StatusBadge status={item.status} />
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Conversión de aspirantes por etapa" description="Funnel institucional del ciclo actual">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionByStage} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
                <XAxis dataKey="stage" stroke="#5F7085" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis stroke="#5F7085" />
                <Tooltip />
                <Bar dataKey="total" name="Total" fill="#0A4D8C" radius={[6, 6, 0, 0]} />
                <Bar dataKey="converted" name="Convertidos" fill="#1D84B5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Alertas por nivel de riesgo" description="Concentración de casos que requieren seguimiento">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={alertRiskDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={4}>
                    {alertRiskDistribution.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {alertRiskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg border border-tech-border bg-surface-card px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-tech-textMain">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-tech-textMain">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard title="Aspirantes por carrera" description="Distribución de interés académico por programa">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={applicantsByCareer} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="career" type="category" width={160} stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#0A4D8C" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Participación en eventos por mes" description="Asistencia registrada en actividades institucionales">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={eventParticipationByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1D84B5" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Estado de módulos" description="Acceso rápido a las áreas operativas principales">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {moduleSummaries.map((module) => {
            const Icon = moduleIcons[module.id];

            return (
              <article key={module.id} className="rounded-lg border border-tech-border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-tech-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-tech-textMain">{module.title}</h3>
                      <p className="text-xs text-tech-textSecond">{module.metric}</p>
                    </div>
                  </div>
                  <StatusBadge status={module.status} />
                </div>
                <p className="text-sm leading-6 text-tech-textSecond">{module.description}</p>
                <Link to={moduleLinks[module.id]} className="mt-4 inline-flex text-sm font-semibold text-tech-primary">
                  {module.linkLabel}
                </Link>
              </article>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
