import type { Metric } from "../types";

export const adminOverviewMetrics: Metric[] = [
  {
    label: "Aspirantes activos",
    value: "1,284",
    trend: "+14% vs ciclo anterior",
    trendDirection: "up"
  },
  {
    label: "Tasa de conversión",
    value: "41.8%",
    trend: "+2.4 puntos en 30 días",
    trendDirection: "up"
  },
  {
    label: "Estudiantes con alerta",
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
  { month: "Ene", value: 58 },
  { month: "Feb", value: 64 },
  { month: "Mar", value: 71 },
  { month: "Abr", value: 77 },
  { month: "May", value: 83 },
  { month: "Jun", value: 79 }
];

export const alertRiskDistribution = [
  { name: "Alta", value: 17, color: "#e11d48" },
  { name: "Media", value: 21, color: "#f59e0b" },
  { name: "Baja", value: 9, color: "#0f8b8d" }
];
