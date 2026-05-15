import type { Status } from "../types";

export interface PriorityAction {
  id: string;
  title: string;
  description: string;
  status: Status;
  detail: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: Status;
}

export interface ModuleSummaryItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  status: Status;
  linkLabel: string;
}

export const priorityActions: PriorityAction[] = [
  {
    id: "action-1",
    title: "Contactar aspirantes sin seguimiento",
    description: "18 aspirantes llevan más de 72 horas sin contacto.",
    status: "urgente",
    detail: "Asignar llamadas prioritarias hoy"
  },
  {
    id: "action-2",
    title: "Revisar documentos pendientes",
    description: "12 expedientes esperan validación escolar.",
    status: "en_revision",
    detail: "Disminuir el tiempo de respuesta"
  },
  {
    id: "action-3",
    title: "Publicar convocatoria",
    description: "Convocatoria 2026-B lista para difundirse.",
    status: "activo",
    detail: "Programar publicación institucional"
  },
  {
    id: "action-4",
    title: "Atender alertas de estudiantes",
    description: "47 alertas activas requieren priorización.",
    status: "pendiente",
    detail: "Revisar con coordinación académica"
  }
];

export const recentActivity: RecentActivityItem[] = [
  {
    id: "activity-1",
    title: "Nuevo aspirante registrado",
    detail: "María Torres inició su expediente de admisión.",
    time: "Hace 5 min",
    status: "activo"
  },
  {
    id: "activity-2",
    title: "Documento enviado",
    detail: "Se recibió constancia de estudios para revisión.",
    time: "Hace 18 min",
    status: "en_revision"
  },
  {
    id: "activity-3",
    title: "Evento publicado",
    detail: "Se programó el taller de inducción académica.",
    time: "Hace 1 h",
    status: "completado"
  },
  {
    id: "activity-4",
    title: "Alerta generada",
    detail: "Se detectó riesgo de inasistencia en primer ingreso.",
    time: "Hace 2 h",
    status: "urgente"
  },
  {
    id: "activity-5",
    title: "Estudiante inscrito a taller",
    detail: "Andrea López confirmó su lugar en orientación.",
    time: "Hace 3 h",
    status: "aprobado"
  }
];

export const moduleSummaries: ModuleSummaryItem[] = [
  {
    id: "captacion",
    title: "Captación",
    description: "Seguimiento de aspirantes y conversiones.",
    metric: "1,284 activos",
    status: "activo",
    linkLabel: "Abrir módulo"
  },
  {
    id: "seguimiento",
    title: "Seguimiento",
    description: "Acompañamiento académico de estudiantes.",
    metric: "47 alertas",
    status: "en_revision",
    linkLabel: "Abrir módulo"
  },
  {
    id: "difusion",
    title: "Difusión",
    description: "Canales y publicaciones institucionales.",
    metric: "26 eventos",
    status: "completado",
    linkLabel: "Abrir módulo"
  },
  {
    id: "documentos",
    title: "Documentos",
    description: "Solicitudes y expedientes en revisión.",
    metric: "89 trámites",
    status: "pendiente",
    linkLabel: "Abrir módulo"
  },
  {
    id: "alertas",
    title: "Alertas",
    description: "Casos de riesgo y prioridades operativas.",
    metric: "17 críticas",
    status: "urgente",
    linkLabel: "Abrir módulo"
  },
  {
    id: "analitica",
    title: "Analítica",
    description: "Indicadores ejecutivos y tendencias.",
    metric: "83% participación",
    status: "aprobado",
    linkLabel: "Abrir módulo"
  }
];
