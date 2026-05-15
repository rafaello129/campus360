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
import { ArrowRight, BellRing, ClipboardList, Megaphone, Users, ChartColumnBig } from "lucide-react";
import { MetricCard } from "../../components/common/MetricCard";
import { SectionCard } from "../../components/common/SectionCard";
import { SectionHeader } from "../../components/common/SectionHeader";
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
      <SectionHeader
        eyebrow="Administración"
        title="Panel institucional"
        description="Monitorea captación, participación estudiantil, alertas y comunicación institucional desde un solo lugar."
        actions={
          <>
            <Link
              to={paths.admin.captacion}
              className="inline-flex items-center gap-2 rounded-lg border border-petrol-200 bg-white px-3 py-2 text-sm font-semibold text-petrol-800 transition hover:bg-petrol-50"
            >
              Ir a captación
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={paths.admin.analitica}
              className="rounded-lg bg-petrol-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800"
            >
              Ver analítica
            </Link>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminOverviewMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Conversión de aspirantes por etapa" description="Seguimiento del funnel institucional">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionByStage} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" stroke="#64748b" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="total" name="Total" fill="#184c66" radius={[6, 6, 0, 0]} />
                <Bar dataKey="converted" name="Convertidos" fill="#0f8b8d" radius={[6, 6, 0, 0]} />
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
                <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
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
                <Bar dataKey="total" fill="#184c66" radius={[0, 8, 8, 0]} />
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
                <Line type="monotone" dataKey="value" stroke="#0f8b8d" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard
          title="Acciones prioritarias"
          description="Tareas operativas que requieren atención hoy"
          action={<Link to={paths.admin.captacion} className="text-sm font-semibold text-petrol-700">Ir a captación</Link>}
        >
          <div className="space-y-3">
            {priorityActions.map((action) => (
              <article key={action.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{action.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{action.description}</p>
                    <p className="mt-2 text-xs text-slate-500">{action.detail}</p>
                  </div>
                  <StatusBadge status={action.status} />
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Actividad reciente" description="Movimientos más recientes de la operación institucional">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <article key={item.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.time}</p>
                </div>
                <StatusBadge status={item.status} />
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Resumen por módulo" description="Acceso rápido a las áreas operativas principales">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleSummaries.map((module) => {
            const Icon = moduleIcons[module.id];

            return (
              <article key={module.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-petrol-50 text-petrol-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{module.title}</h3>
                      <p className="text-xs text-slate-500">{module.metric}</p>
                    </div>
                  </div>
                  <StatusBadge status={module.status} />
                </div>
                <p className="text-sm text-slate-600">{module.description}</p>
                <Link to={moduleLinks[module.id]} className="mt-4 inline-flex text-sm font-semibold text-petrol-700">
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

