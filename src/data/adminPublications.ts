export type PublicationType = "Evento" | "Taller" | "Curso" | "Convocatoria" | "Aviso" | "Beca";
export type PublicationMode = "Presencial" | "Virtual" | "Híbrida";
export type PublicationState = "Activa" | "Borrador" | "Cerrada";

export interface PublicationRecord {
  id: string;
  title: string;
  type: PublicationType;
  category: string;
  description: string;
  date: string;
  location: string;
  modality: PublicationMode;
  audience: string;
  status: PublicationState;
  reach: string;
  interested: number;
  owner: string;
  requirements: string[];
  channels: string[];
  banner: string;
  featured: boolean;
  startDate: string;
  endDate: string;
  time: string;
  capacity: number;
}

export interface PublicationSummaryMetric {
  label: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
}

export const publicationMetrics: PublicationSummaryMetric[] = [
  { label: "Publicaciones activas", value: "14", trend: "+3 esta semana", trendDirection: "up" },
  { label: "Eventos próximos", value: "6", trend: "2 en próximos 7 días", trendDirection: "neutral" },
  { label: "Convocatorias abiertas", value: "4", trend: "+1 nueva", trendDirection: "up" },
  { label: "Participación registrada", value: "1,420", trend: "+11% mensual", trendDirection: "up" },
  { label: "Alcance estimado", value: "18.4k", trend: "+2.3k usuarios", trendDirection: "up" }
];

export const publicationFilters = [
  "Todas",
  "Eventos",
  "Talleres",
  "Cursos",
  "Convocatorias",
  "Avisos",
  "Becas",
  "Activas",
  "Borradores",
  "Cerradas"
];

export const publicationTypes = ["Evento", "Taller", "Curso", "Convocatoria", "Aviso", "Beca"] as const;
export const publicationCategories = ["Académica", "Bienestar", "Admisiones", "Difusión", "Servicios"];
export const publicationModes = ["Presencial", "Virtual", "Híbrida"] as const;
export const publicationAudiences = ["Todos los estudiantes", "Por carrera", "Por semestre", "Por canal", "Por grupo"];

export const publicationChannels = ["Home estudiante", "Canal de avisos", "Correo institucional", "Push móvil", "Portal académico"];

export const adminPublications: PublicationRecord[] = [
  {
    id: "PUB-001",
    title: "Taller de productividad académica",
    type: "Taller",
    category: "Académica",
    description: "Sesión para organizar tareas, hábitos y seguimiento de entregas.",
    date: "18 mayo 2026",
    location: "Sala híbrida 3",
    modality: "Híbrida",
    audience: "Todos los estudiantes",
    status: "Activa",
    reach: "6.2k",
    interested: 420,
    owner: "Coordinación académica",
    requirements: ["Registro previo", "Cupo limitado", "Asistencia puntual"],
    channels: ["Home estudiante", "Correo institucional"],
    banner: "Taller de productividad",
    featured: true,
    startDate: "18 mayo 2026",
    endDate: "18 mayo 2026",
    time: "16:00",
    capacity: 120
  },
  {
    id: "PUB-002",
    title: "Convocatoria de beca excelencia",
    type: "Beca",
    category: "Bienestar",
    description: "Programa de apoyo para estudiantes con desempeño destacado.",
    date: "20 mayo 2026",
    location: "Portal institucional",
    modality: "Virtual",
    audience: "Por semestre",
    status: "Activa",
    reach: "8.1k",
    interested: 310,
    owner: "Bienestar estudiantil",
    requirements: ["Promedio mínimo 90", "Carta de motivos", "Expediente completo"],
    channels: ["Home estudiante", "Push móvil", "Correo institucional"],
    banner: "Convocatoria beca excelencia",
    featured: true,
    startDate: "20 mayo 2026",
    endDate: "03 junio 2026",
    time: "08:00",
    capacity: 0
  },
  {
    id: "PUB-003",
    title: "Foro de liderazgo estudiantil",
    type: "Evento",
    category: "Difusión",
    description: "Diálogo con representantes y clubes para fortalecer comunidad.",
    date: "24 mayo 2026",
    location: "Auditorio principal",
    modality: "Presencial",
    audience: "Por grupo",
    status: "Activa",
    reach: "4.8k",
    interested: 210,
    owner: "Vida universitaria",
    requirements: ["Registro previo", "Credencial activa"],
    channels: ["Home estudiante", "Canal de avisos"],
    banner: "Foro liderazgo",
    featured: false,
    startDate: "24 mayo 2026",
    endDate: "24 mayo 2026",
    time: "11:00",
    capacity: 250
  },
  {
    id: "PUB-004",
    title: "Aviso de cierre de reinscripción",
    type: "Aviso",
    category: "Servicios",
    description: "Recordatorio institucional para completar el proceso a tiempo.",
    date: "Hoy",
    location: "Portal académico",
    modality: "Virtual",
    audience: "Todos los estudiantes",
    status: "Cerrada",
    reach: "12.0k",
    interested: 0,
    owner: "Servicios escolares",
    requirements: ["Ninguno"],
    channels: ["Correo institucional", "Canal de avisos"],
    banner: "Aviso reinscripción",
    featured: false,
    startDate: "14 mayo 2026",
    endDate: "15 mayo 2026",
    time: "Todo el día",
    capacity: 0
  },
  {
    id: "PUB-005",
    title: "Curso introductorio de analítica",
    type: "Curso",
    category: "Académica",
    description: "Curso corto para estudiantes interesados en datos y visualización.",
    date: "28 mayo 2026",
    location: "Laboratorio B",
    modality: "Presencial",
    audience: "Por carrera",
    status: "Borrador",
    reach: "3.1k",
    interested: 95,
    owner: "Facultad de ingeniería",
    requirements: ["Registro", "Cuenta institucional"],
    channels: ["Home estudiante"],
    banner: "Curso analítica",
    featured: false,
    startDate: "28 mayo 2026",
    endDate: "12 junio 2026",
    time: "14:00",
    capacity: 35
  }
];

export const publicationStateOptions: PublicationState[] = ["Activa", "Borrador", "Cerrada"];

export interface PublicationDraft {
  title: string;
  type: PublicationType;
  category: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  modality: PublicationMode;
  audience: string;
  cupo: string;
  material: string;
  owner: string;
  contactEmail: string;
  publishNow: boolean;
  featured: boolean;
  notify: boolean;
}

export const defaultPublicationDraft: PublicationDraft = {
  title: "",
  type: "Evento",
  category: "Académica",
  description: "",
  startDate: "",
  endDate: "",
  time: "",
  location: "",
  modality: "Presencial",
  audience: "Todos los estudiantes",
  cupo: "",
  material: "",
  owner: "",
  contactEmail: "",
  publishNow: true,
  featured: false,
  notify: true
};
