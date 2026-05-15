import type { Status } from "../types";

export type StudentRisk = "alto" | "medio" | "bajo";
export type ParticipationBand = "alta" | "media" | "baja";
export type StudentState = "activo" | "en_revision" | "urgente" | "aprobado";

export interface AdminStudentRecord {
  id: string;
  name: string;
  enrollment: string;
  career: string;
  semester: string;
  tutor: string;
  email: string;
  phone: string;
  city: string;
  participation: number;
  participationBand: ParticipationBand;
  documentsComplete: number;
  documentsIncomplete: number;
  state: StudentState;
  risk: StudentRisk;
  lastActivity: string;
  alerts: number;
  pendingTutoring: number;
  lastTutoring: string;
  nextAction: string;
  academicInfo: string;
  activeAlerts: string[];
  strengths: Array<{ label: string; value: string }>;
  attentionAreas: Array<{ label: string; value: string }>;
  timeline: Array<{ id: string; title: string; detail: string; time: string; status: Status }>;
  metrics: {
    eventParticipation: number;
    tutoringAttended: number;
    documentsComplete: number;
    openIncidents: number;
    recentActivity: string;
  };
}

export const adminStudents: AdminStudentRecord[] = [
  {
    id: "STD-3001",
    name: "Andrea López",
    enrollment: "A2026-001",
    career: "Ingeniería en Software",
    semester: "5° semestre",
    tutor: "Dra. Elena Ponce",
    email: "andrea.lopez@mail.com",
    phone: "811-555-0101",
    city: "Monterrey",
    participation: 86,
    participationBand: "alta",
    documentsComplete: 5,
    documentsIncomplete: 0,
    state: "activo",
    risk: "bajo",
    lastActivity: "Hoy 08:15",
    alerts: 0,
    pendingTutoring: 1,
    lastTutoring: "Hace 4 días",
    nextAction: "Invitar a mentoría de proyecto final",
    academicInfo: "Promedio alto y asistencia estable durante el semestre.",
    activeAlerts: ["Sin alertas activas"],
    strengths: [
      { label: "Participación", value: "Alta" },
      { label: "Cumplimiento", value: "Excelente" },
      { label: "Comunicación", value: "Constante" },
      { label: "Actividad académica", value: "Sólida" }
    ],
    attentionAreas: [
      { label: "Baja participación", value: "No detectada" },
      { label: "Documento pendiente", value: "0" },
      { label: "Tutoría sin confirmar", value: "1" },
      { label: "Riesgo académico", value: "Bajo" }
    ],
    timeline: [
      { id: "a1", title: "Tutoría realizada", detail: "Revisión de avances del proyecto final.", time: "Hace 4 días", status: "completado" },
      { id: "a2", title: "Documento pendiente", detail: "Solicitud de constancia resuelta.", time: "Hace 7 días", status: "completado" },
      { id: "a3", title: "Participación en evento", detail: "Asistencia a hackathon institucional.", time: "Hace 2 semanas", status: "completado" },
      { id: "a4", title: "Alerta generada", detail: "No hubo incidencias recientes.", time: "Sin alerta", status: "activo" },
      { id: "a5", title: "Seguimiento registrado", detail: "Se actualizó expediente académico.", time: "Hace 1 mes", status: "completado" },
      { id: "a6", title: "Recomendación académica", detail: "Mantener constancia en tutorías de cierre.", time: "Hoy", status: "activo" }
    ],
    metrics: {
      eventParticipation: 91,
      tutoringAttended: 5,
      documentsComplete: 5,
      openIncidents: 0,
      recentActivity: "Actualización de expediente"
    }
  },
  {
    id: "STD-3002",
    name: "Ricardo Mendoza",
    enrollment: "A2026-014",
    career: "Analítica de Datos",
    semester: "3° semestre",
    tutor: "Mtro. Luis Herrera",
    email: "ricardo.mendoza@mail.com",
    phone: "812-555-0142",
    city: "Guadalupe",
    participation: 68,
    participationBand: "media",
    documentsComplete: 4,
    documentsIncomplete: 1,
    state: "en_revision",
    risk: "medio",
    lastActivity: "Ayer 17:40",
    alerts: 1,
    pendingTutoring: 2,
    lastTutoring: "Hace 9 días",
    nextAction: "Confirmar tutoría y revisar documento pendiente",
    academicInfo: "Mantiene avance aceptable, con variación en participación reciente.",
    activeAlerts: ["Documento incompleto", "Tutoría pendiente de confirmación"],
    strengths: [
      { label: "Participación", value: "Media" },
      { label: "Cumplimiento", value: "Correcto" },
      { label: "Comunicación", value: "Oportuna" },
      { label: "Actividad académica", value: "Estable" }
    ],
    attentionAreas: [
      { label: "Baja participación", value: "Moderada" },
      { label: "Documento pendiente", value: "1" },
      { label: "Tutoría sin confirmar", value: "2" },
      { label: "Riesgo académico", value: "Medio" }
    ],
    timeline: [
      { id: "r1", title: "Tutoría realizada", detail: "Se revisó avance de unidad 3.", time: "Hace 9 días", status: "completado" },
      { id: "r2", title: "Documento pendiente", detail: "Certificado digital por validar.", time: "Hace 6 días", status: "activo" },
      { id: "r3", title: "Participación en evento", detail: "Asistencia a charla de analítica.", time: "Hace 2 semanas", status: "completado" },
      { id: "r4", title: "Alerta generada", detail: "Seguimiento por inasistencias aisladas.", time: "Hace 4 días", status: "activo" },
      { id: "r5", title: "Seguimiento registrado", detail: "Bitácora actualizada por tutor.", time: "Hace 3 días", status: "completado" },
      { id: "r6", title: "Recomendación académica", detail: "Programar sesión de refuerzo en estadística.", time: "Hoy", status: "activo" }
    ],
    metrics: {
      eventParticipation: 74,
      tutoringAttended: 3,
      documentsComplete: 4,
      openIncidents: 1,
      recentActivity: "Revisión de documento"
    }
  },
  {
    id: "STD-3003",
    name: "Sofía Prieto",
    enrollment: "A2026-021",
    career: "Diseño Digital Interactivo",
    semester: "2° semestre",
    tutor: "Ing. Carla Medina",
    email: "sofia.prieto@mail.com",
    phone: "818-555-0156",
    city: "San Pedro",
    participation: 58,
    participationBand: "media",
    documentsComplete: 3,
    documentsIncomplete: 2,
    state: "urgente",
    risk: "alto",
    lastActivity: "Hace 2 días",
    alerts: 2,
    pendingTutoring: 3,
    lastTutoring: "Hace 16 días",
    nextAction: "Contactar por baja participación y programar tutoría",
    academicInfo: "Requiere acompañamiento para estabilizar asistencia y entregas.",
    activeAlerts: ["Baja participación", "Documentación incompleta"],
    strengths: [
      { label: "Participación", value: "Irregular" },
      { label: "Cumplimiento", value: "Parcial" },
      { label: "Comunicación", value: "Frecuente" },
      { label: "Actividad académica", value: "Variable" }
    ],
    attentionAreas: [
      { label: "Baja participación", value: "Alta" },
      { label: "Documento pendiente", value: "2" },
      { label: "Tutoría sin confirmar", value: "3" },
      { label: "Riesgo académico", value: "Alto" }
    ],
    timeline: [
      { id: "s1", title: "Tutoría realizada", detail: "Se revisó desempeño de entregas.", time: "Hace 16 días", status: "completado" },
      { id: "s2", title: "Documento pendiente", detail: "Falta carga de dos archivos.", time: "Hace 12 días", status: "activo" },
      { id: "s3", title: "Participación en evento", detail: "No ha asistido a últimos eventos.", time: "Hace 3 semanas", status: "pendiente" },
      { id: "s4", title: "Alerta generada", detail: "Riesgo por inasistencia y entregas tardías.", time: "Hace 4 días", status: "urgente" },
      { id: "s5", title: "Seguimiento registrado", detail: "Se dejó bitácora de intervención.", time: "Hace 2 días", status: "completado" },
      { id: "s6", title: "Recomendación académica", detail: "Requiere tutoría y recordatorio inmediato.", time: "Hoy", status: "activo" }
    ],
    metrics: {
      eventParticipation: 54,
      tutoringAttended: 2,
      documentsComplete: 3,
      openIncidents: 2,
      recentActivity: "Alerta por inasistencia"
    }
  },
  {
    id: "STD-3004",
    name: "Luis Aranda",
    enrollment: "A2026-033",
    career: "Gestión Educativa",
    semester: "6° semestre",
    tutor: "Mtra. Verónica Paredes",
    email: "luis.aranda@mail.com",
    phone: "814-555-0170",
    city: "Apodaca",
    participation: 79,
    participationBand: "alta",
    documentsComplete: 5,
    documentsIncomplete: 0,
    state: "activo",
    risk: "bajo",
    lastActivity: "Hoy 10:20",
    alerts: 0,
    pendingTutoring: 0,
    lastTutoring: "Hace 2 días",
    nextAction: "Confirmar participación en foro estudiantil",
    academicInfo: "Buen desempeño y colaboración constante en actividades institucionales.",
    activeAlerts: ["Sin alertas activas"],
    strengths: [
      { label: "Participación", value: "Alta" },
      { label: "Cumplimiento", value: "Completo" },
      { label: "Comunicación", value: "Fluida" },
      { label: "Actividad académica", value: "Estable" }
    ],
    attentionAreas: [
      { label: "Baja participación", value: "No detectada" },
      { label: "Documento pendiente", value: "0" },
      { label: "Tutoría sin confirmar", value: "0" },
      { label: "Riesgo académico", value: "Bajo" }
    ],
    timeline: [
      { id: "l1", title: "Tutoría realizada", detail: "Se cerró seguimiento del bimestre.", time: "Hace 2 días", status: "completado" },
      { id: "l2", title: "Documento pendiente", detail: "Expediente completo.", time: "Hace 1 semana", status: "completado" },
      { id: "l3", title: "Participación en evento", detail: "Asistió a foro de liderazgo.", time: "Hace 6 días", status: "completado" },
      { id: "l4", title: "Alerta generada", detail: "Sin incidencias recientes.", time: "Sin alerta", status: "activo" },
      { id: "l5", title: "Seguimiento registrado", detail: "Bitácora en orden.", time: "Hace 2 semanas", status: "completado" },
      { id: "l6", title: "Recomendación académica", detail: "Invitar a apoyo de mentoría.", time: "Hoy", status: "activo" }
    ],
    metrics: {
      eventParticipation: 88,
      tutoringAttended: 6,
      documentsComplete: 5,
      openIncidents: 0,
      recentActivity: "Cierre de seguimiento"
    }
  }
];

export const adminStudentFilters = {
  careers: ["Todas", ...new Set(adminStudents.map((student) => student.career))],
  semesters: ["Todos", ...new Set(adminStudents.map((student) => student.semester))],
  states: ["Todos", "activo", "en_revision", "urgente", "aprobado"],
  risks: ["Todos", "alto", "medio", "bajo"],
  participation: ["Todas", "alta", "media", "baja"]
};
