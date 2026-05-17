import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, CircleDot, Filter, Gauge, Target } from "lucide-react";
import { SectionCard } from "../../components/common/SectionCard";
import { enrollmentTrend, retentionTrend } from "../../data/admin.mock";
import { adminMetrics } from "../../data/admin.mock";

const executiveFilters = ["Ciclo 2026-A", "Todos los campus", "Últimos 5 meses"];

const executiveInsights = [
  {
    title: "La mayor fuga está en documentación pendiente",
    description: "El seguimiento debe concentrarse en expedientes que no han pasado a validación.",
    tone: "up"
  },
  {
    title: "Tutorías concentran menor participación",
    description: "Conviene reforzar invitaciones desde canales estudiantiles antes del siguiente corte.",
    tone: "up"
  },
  {
    title: "Tres carreras concentran la demanda",
    description: "Software, datos y gestión requieren más capacidad de atención durante admisión.",
    tone: "down"
  }
];

const programRanking = [
  { name: "Ingeniería en Software", value: 94, detail: "alta demanda" },
  { name: "Analítica de Datos", value: 88, detail: "crecimiento estable" },
  { name: "Gestión Educativa", value: 81, detail: "retención fuerte" },
  { name: "Diseño Digital", value: 76, detail: "seguimiento medio" }
];

const conversionRate = Math.round(
  (enrollmentTrend[enrollmentTrend.length - 1].inscritos / enrollmentTrend[enrollmentTrend.length - 1].aspirantes) * 100
);

export function AnaliticaPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
        <div className="border-b border-tech-divider bg-gradient-to-r from-white via-blue-50/70 to-white px-5 py-5 md:px-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary shadow-sm">
                <BarChart3 className="h-3.5 w-3.5" />
                Inteligencia institucional
              </div>
              <h1 className="max-w-[20rem] text-3xl font-bold tracking-tight text-tech-textMain sm:max-w-3xl md:text-4xl">
                Analítica institucional para priorizar decisiones académicas.
              </h1>
              <p className="mt-3 max-w-[20rem] text-sm leading-6 text-tech-textSecond sm:max-w-2xl md:text-base">
                Lectura ejecutiva de captación, retención, egreso y alertas para anticipar riesgos y ajustar la operación del ciclo.
              </p>
            </div>

            <div className="grid gap-4 border-t border-tech-divider pt-4 sm:grid-cols-3 xl:w-[34rem] xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Conversión</p>
                <p className="mt-2 text-2xl font-bold text-tech-textMain">{conversionRate}%</p>
                <p className="mt-1 text-xs text-tech-textSecond">inscritos sobre aspirantes</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Retención</p>
                <p className="mt-2 text-2xl font-bold text-tech-primary">89%</p>
                <p className="mt-1 text-xs text-tech-textSecond">periodo 2026-A</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Focos</p>
                <p className="mt-2 text-2xl font-bold text-rose-700">3</p>
                <p className="mt-1 text-xs text-tech-textSecond">requieren lectura</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-tech-textMain">
            <Filter className="h-4 w-4 text-tech-primary" />
            Filtros de análisis
          </div>
          <div className="flex flex-wrap gap-2">
            {executiveFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-full border border-tech-border bg-tech-bg px-3 py-1.5 text-xs font-semibold text-tech-textSecond transition hover:border-tech-primary/30 hover:bg-blue-50 hover:text-tech-primary"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
        {adminMetrics.map((metric) => {
          const isDown = metric.trendDirection === "down";
          const TrendIcon = isDown ? ArrowDownRight : ArrowUpRight;

          return (
            <article key={metric.label} className="border-l-2 border-tech-primary/30 pl-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-textSecond">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-tech-textMain">{metric.value}</p>
                </div>
                <div className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${isDown ? "border-rose-200 bg-rose-50 text-rose-700" : "border-blue-200 bg-blue-50 text-tech-primary"}`}>
                  <TrendIcon className="mr-1 inline h-3.5 w-3.5" />
                  {metric.trend}
                </div>
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-tech-divider">
                <div className={`h-1.5 rounded-full ${isDown ? "bg-rose-500" : "bg-tech-primary"}`} style={{ width: isDown ? "62%" : "78%" }} />
              </div>
            </article>
          );
        })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <SectionCard
          title="Captación mensual"
          description="Tendencia de aspirantes e inscritos en el ciclo actual."
          className="p-5 md:p-6"
        >
          <div className="mb-4 grid gap-3 border-b border-tech-divider pb-4 sm:grid-cols-3">
            {[
              { label: "Aspirantes mayo", value: "1,020" },
              { label: "Inscritos mayo", value: "742" },
              { label: "Brecha operativa", value: "278" }
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-tech-primary/30 pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{item.label}</p>
                <p className="mt-1 text-xl font-bold text-tech-textMain">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend} margin={{ top: 8, right: 18, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
                <XAxis dataKey="period" stroke="#5F7085" tick={{ fontSize: 12 }} />
                <YAxis stroke="#5F7085" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="aspirantes" stroke="#0A4D8C" strokeWidth={3} dot={{ r: 4 }} name="Aspirantes" />
                <Line type="monotone" dataKey="inscritos" stroke="#1D84B5" strokeWidth={3} dot={{ r: 4 }} name="Inscritos" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <section className="rounded-lg border border-tech-border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Insights</p>
              <h2 className="mt-1 text-lg font-bold text-tech-textMain">Lectura ejecutiva</h2>
            </div>
            <Gauge className="h-5 w-5 text-tech-primary" />
          </div>
          <div className="space-y-3">
            {executiveInsights.map((insight) => (
              <article key={insight.title} className="rounded-lg border border-tech-divider bg-tech-bg/60 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${insight.tone === "down" ? "bg-rose-500" : "bg-tech-primary"}`} />
                  <h3 className="text-sm font-semibold text-tech-textMain">{insight.title}</h3>
                </div>
                <p className="text-sm leading-6 text-tech-textSecond">{insight.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard
          title="Ranking académico"
          description="Programas con mayor señal para seguimiento del ciclo."
          className="p-5 md:p-6"
        >
          <div className="space-y-4">
            {programRanking.map((program, index) => (
            <div key={program.name} className="border-b border-tech-divider pb-4 last:border-b-0 last:pb-0">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-tech-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-tech-textMain">{program.name}</p>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-tech-textSecond">{program.detail}</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-tech-textMain">{program.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-tech-divider">
                  <div className="h-1.5 rounded-full bg-tech-primary" style={{ width: `${program.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Retención y egreso por periodo"
          description="Comparativa semestral para identificar evolución académica."
          className="p-5 md:p-6"
        >
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <div className="border-l-2 border-tech-primary bg-blue-50/70 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-tech-primary">
                <Target className="h-4 w-4" />
                Objetivo de retención
              </div>
              <p className="mt-2 text-2xl font-bold text-tech-textMain">90%</p>
            </div>
            <div className="border-l-2 border-tech-primary/30 bg-tech-bg px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">
                <Activity className="h-4 w-4 text-tech-primary" />
                Tendencia
              </div>
              <p className="mt-2 text-2xl font-bold text-tech-textMain">+7 pts</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionTrend} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF2" />
                <XAxis dataKey="period" stroke="#5F7085" tick={{ fontSize: 12 }} />
                <YAxis stroke="#5F7085" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="retencion" fill="#0A4D8C" name="Retención %" radius={[6, 6, 0, 0]} />
                <Bar dataKey="egreso" fill="#1D84B5" name="Egreso %" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </section>

      <section className="rounded-lg border border-tech-border bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Prioridades sugeridas</p>
            <h2 className="mt-1 text-xl font-bold text-tech-textMain">Siguiente lectura para comité académico</h2>
          </div>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-tech-primary">
            Corte ejecutivo
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Revisar capacidad de atención para mayo y junio.",
            "Cruzar alertas académicas con programas de alta demanda.",
            "Preparar campaña de retención para primer ingreso."
          ].map((priority) => (
            <div key={priority} className="flex items-start gap-3 rounded-lg border border-tech-divider bg-tech-bg/50 p-4">
              <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-tech-primary" />
              <p className="text-sm font-medium leading-6 text-tech-textMain">{priority}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
