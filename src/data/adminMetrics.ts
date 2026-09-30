import type { Metric } from "../types";

export const enrollmentTrend = [
  { period: "Jun", aspirantes: 860, inscritos: 359 },
  { period: "Jul", aspirantes: 930, inscritos: 389 },
  { period: "Ago", aspirantes: 1040, inscritos: 435 },
  { period: "Sep", aspirantes: 1160, inscritos: 485 },
  { period: "Oct", aspirantes: 1284, inscritos: 537 }
];

export const retentionTrend = [
  { period: "2024-A", retencion: 82, egreso: 76 },
  { period: "2024-B", retencion: 84, egreso: 77 },
  { period: "2025-A", retencion: 86, egreso: 79 },
  { period: "2025-B", retencion: 88, egreso: 81 },
  { period: "2026-A", retencion: 89, egreso: 83 }
];

export const currentEnrollmentCut = enrollmentTrend[enrollmentTrend.length - 1];
export const currentConversionRate = Number(
  ((currentEnrollmentCut.inscritos / currentEnrollmentCut.aspirantes) * 100).toFixed(1)
);

export const adminOverviewMetrics: Metric[] = [
  {
    label: "Aspirantes activos",
    value: currentEnrollmentCut.aspirantes.toLocaleString("es-MX"),
    trend: "+14% vs ciclo anterior",
    trendDirection: "up"
  },
  {
    label: "Tasa de conversión",
    value: `${currentConversionRate}%`,
    trend: "+2.4 puntos en 30 días",
    trendDirection: "up"
  },
  {
    label: "Señales de riesgo",
    value: "47",
    trend: "-8 respecto a la semana pasada",
    trendDirection: "down"
  },
  {
    label: "Eventos publicados",
    value: "26",
    trend: "+5 eventos nuevos",
    trendDirection: "up"
  },
  {
    label: "Documentos en revisión",
    value: "89",
    trend: "12 requieren atención hoy",
    trendDirection: "neutral"
  },
  {
    label: "Participación estudiantil",
    value: "83%",
    trend: "+6 puntos en el semestre",
    trendDirection: "up"
  }
];

export const analyticsSummaryMetrics: Metric[] = [
  adminOverviewMetrics[0],
  {
    label: "Retención consolidada",
    value: "89%",
    trend: "+2.1 puntos",
    trendDirection: "up"
  },
  adminOverviewMetrics[2]
];

export const conversionByStage = [
  { stage: "Nuevo registro", total: 320, converted: 68 },
  { stage: "Contacto inicial", total: 248, converted: 102 },
  { stage: "Interés confirmado", total: 182, converted: 96 },
  { stage: "Documentación pendiente", total: 136, converted: 84 },
  { stage: "Evaluación / entrevista", total: 92, converted: 61 },
  { stage: "Inscripción finalizada", total: 64, converted: 64 }
];

export const applicantsByCareer = [
  { career: "Ingeniería en Software", total: 342 },
  { career: "Analítica de Datos", total: 268 },
  { career: "Diseño Digital Interactivo", total: 201 },
  { career: "Gestión Educativa", total: 164 },
  { career: "Psicopedagogía", total: 129 },
  { career: "Negocios Internacionales", total: 92 }
];

export const eventParticipationByMonth = [
  { month: "Jun", value: 72 },
  { month: "Jul", value: 75 },
  { month: "Ago", value: 78 },
  { month: "Sep", value: 81 },
  { month: "Oct", value: 83 }
];

export const alertRiskDistribution = [
  { name: "Alta", value: 17, color: "#e11d48" },
  { name: "Media", value: 21, color: "#f59e0b" },
  { name: "Baja", value: 9, color: "#0f8b8d" }
];

export const institutionalRiskTotal = alertRiskDistribution.reduce(
  (total, item) => total + item.value,
  0
);
