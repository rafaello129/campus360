import type { Status } from "../types";

export type AlertType = "Académica" | "Administrativa" | "Participación" | "Documental";
export type AlertRisk = "alto" | "medio" | "bajo";
export type AlertState = "Atendida" | "Pendiente";

export interface AdminAlertRecord {
  id: string;
  studentId: string;
  studentName: string;
  enrollment: string;
  type: AlertType;
  risk: AlertRisk;
  description: string;
  detectedAt: string;
  owner: string;
  state: AlertState;
  nextAction: string;
  critical: boolean;
  channel: string;
  status: Status;
}

export const adminAlerts: AdminAlertRecord[] = [
  {
    id: "ALT-2026-01",
    studentId: "STD-3003",
    studentName: "Sofía Prieto",
    enrollment: "A2026-021",
    type: "Académica",
    risk: "alto",
    description: "Baja participación y dos documentos incompletos en expediente.",
    detectedAt: "Hoy 07:40",
    owner: "Mtra. Carla Medina",
    state: "Pendiente",
    nextAction: "Programar tutoría inmediata y enviar recordatorio",
    critical: true,
    channel: "Seguimiento académico",
    status: "urgente"
  },
  {
    id: "ALT-2026-02",
    studentId: "STD-3002",
    studentName: "Ricardo Mendoza",
    enrollment: "A2026-014",
    type: "Documental",
    risk: "medio",
    description: "Documento digital pendiente de validación final.",
    detectedAt: "Ayer 18:10",
    owner: "Lic. Admisiones",
    state: "Pendiente",
    nextAction: "Revisar certificado y marcar expediente",
    critical: false,
    channel: "Mesa de admisiones",
    status: "en_revision"
  },
  {
    id: "ALT-2026-03",
    studentId: "STD-3001",
    studentName: "Andrea López",
    enrollment: "A2026-001",
    type: "Participación",
    risk: "bajo",
    description: "Sin incidencias; solo seguimiento preventivo de mentoría.",
    detectedAt: "Hoy 09:25",
    owner: "Dra. Elena Ponce",
    state: "Atendida",
    nextAction: "Cerrar alerta y continuar monitoreo mensual",
    critical: false,
    channel: "Tutorías",
    status: "aprobado"
  },
  {
    id: "ALT-2026-04",
    studentId: "STD-3004",
    studentName: "Luis Aranda",
    enrollment: "A2026-033",
    type: "Administrativa",
    risk: "bajo",
    description: "Recordatorio de participación en foro institucional.",
    detectedAt: "Hace 2 días",
    owner: "Comunicación institucional",
    state: "Atendida",
    nextAction: "Mantener seguimiento semanal",
    critical: false,
    channel: "Difusión",
    status: "completado"
  }
];

export const alertFilters = [
  "Todas",
  "Riesgo alto",
  "Riesgo medio",
  "Riesgo bajo",
  "Académicas",
  "Administrativas",
  "Participación",
  "Documentales",
  "Atendidas",
  "Pendientes"
];

export const alertMetrics = [
  { label: "Alertas activas", value: "4", trend: "+1 esta semana", trendDirection: "up" as const },
  { label: "Riesgo alto", value: "1", trend: "Caso crítico", trendDirection: "neutral" as const },
  { label: "Riesgo medio", value: "1", trend: "Seguimiento preventivo", trendDirection: "neutral" as const },
  { label: "Pendientes de seguimiento", value: "2", trend: "Requieren atención", trendDirection: "up" as const },
  { label: "Atendidas esta semana", value: "2", trend: "Cierre oportuno", trendDirection: "down" as const }
];

export const alertRecommendations = [
  "Priorizar casos con riesgo alto y baja participación.",
  "Cerrar alertas atendidas para depurar la bandeja.",
  "Asignar responsable único en alertas documentales.",
  "Consolidar seguimiento semanal por tutoría." 
];

export const alertAttentionStats = {
  critical: 1,
  avgAttentionTime: "5.2 h",
  weekClosed: 2
};
