import type { Status } from "../types";

export type AlertType = "Académica" | "Administrativa" | "Participación" | "Documental";
export type AlertRisk = "alto" | "medio" | "bajo";
export type AlertState = "Atendida" | "Pendiente";

export interface AlertAttentionRecord {
  action: string;
  note?: string;
  responsible: string;
  followUpDate: string;
  attendedAt: string;
}

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
  attention?: AlertAttentionRecord;
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
    detectedAt: "5 oct 2026 · 07:40",
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
    detectedAt: "4 oct 2026 · 18:10",
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
    detectedAt: "5 oct 2026 · 09:25",
    owner: "Dra. Elena Ponce",
    state: "Atendida",
    nextAction: "Continuar monitoreo mensual",
    critical: false,
    channel: "Tutorías",
    status: "aprobado",
    attention: {
      action: "Cerrar seguimiento preventivo y mantener mentoría mensual.",
      note: "Sin señales adicionales de riesgo.",
      responsible: "Dra. Elena Ponce",
      followUpDate: "2026-11-05",
      attendedAt: "5 oct 2026 · 10:05"
    }
  },
  {
    id: "ALT-2026-04",
    studentId: "STD-3004",
    studentName: "Luis Aranda",
    enrollment: "A2026-033",
    type: "Administrativa",
    risk: "bajo",
    description: "Recordatorio de participación en foro institucional.",
    detectedAt: "3 oct 2026 · 12:20",
    owner: "Comunicación institucional",
    state: "Atendida",
    nextAction: "Mantener seguimiento semanal",
    critical: false,
    channel: "Difusión",
    status: "aprobado",
    attention: {
      action: "Confirmar recepción del recordatorio y cerrar el caso.",
      responsible: "Comunicación institucional",
      followUpDate: "2026-10-12",
      attendedAt: "4 oct 2026 · 09:15"
    }
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

export const alertAttentionStats = {
  avgAttentionTime: "5.2 h"
};
