import type {
  InstitutionAlert,
  KanbanColumn,
  Metric,
  RoleSetting,
  StudentRecord
} from "../types";

export const adminMetrics: Metric[] = [
  {
    label: "Aspirantes en ciclo actual",
    value: "1,284",
    trend: "+14% vs ciclo anterior",
    trendDirection: "up"
  },
  {
    label: "Retención semestral",
    value: "89%",
    trend: "+2.1 puntos",
    trendDirection: "up"
  },
  {
    label: "Alertas académicas abiertas",
    value: "47",
    trend: "-8 respecto a la semana pasada",
    trendDirection: "down"
  }
];

export const enrollmentTrend = [
  { period: "Ene", aspirantes: 620, inscritos: 410 },
  { period: "Feb", aspirantes: 740, inscritos: 525 },
  { period: "Mar", aspirantes: 810, inscritos: 590 },
  { period: "Abr", aspirantes: 940, inscritos: 680 },
  { period: "May", aspirantes: 1020, inscritos: 742 }
];

export const retentionTrend = [
  { period: "2024-A", retencion: 82, egreso: 76 },
  { period: "2024-B", retencion: 84, egreso: 77 },
  { period: "2025-A", retencion: 86, egreso: 79 },
  { period: "2025-B", retencion: 88, egreso: 81 },
  { period: "2026-A", retencion: 89, egreso: 83 }
];

export const adminKanbanColumns: KanbanColumn[] = [
  {
    id: "lead",
    title: "Leads",
    candidates: [
      {
        id: "asp-1001",
        name: "María Torres",
        program: "Ingeniería en Software",
        score: 86,
        status: "activo"
      },
      {
        id: "asp-1002",
        name: "Pedro Castañeda",
        program: "Analítica de Datos",
        score: 78,
        status: "pendiente"
      }
    ]
  },
  {
    id: "documents",
    title: "Documentos",
    candidates: [
      {
        id: "asp-1003",
        name: "Lucía Ramos",
        program: "Diseño Digital Interactivo",
        score: 91,
        status: "en_revision"
      },
      {
        id: "asp-1004",
        name: "Héctor Cabrera",
        program: "Gestión Educativa",
        score: 72,
        status: "rechazado"
      }
    ]
  },
  {
    id: "interview",
    title: "Entrevista",
    candidates: [
      {
        id: "asp-1005",
        name: "Ana Sofía Vega",
        program: "Ingeniería en Software",
        score: 94,
        status: "urgente"
      }
    ]
  },
  {
    id: "admitted",
    title: "Admitidos",
    candidates: [
      {
        id: "asp-1006",
        name: "Santiago Ruiz",
        program: "Analítica de Datos",
        score: 88,
        status: "aprobado"
      }
    ]
  }
];

export const studentRecords: StudentRecord[] = [
  {
    id: "std-2001",
    name: "Andrea López",
    program: "Ingeniería en Software",
    semester: "5°",
    advisor: "Dra. Elena Ponce",
    status: "activo"
  },
  {
    id: "std-2002",
    name: "Ricardo Mendoza",
    program: "Analítica de Datos",
    semester: "3°",
    advisor: "Mtro. Luis Herrera",
    status: "en_revision"
  },
  {
    id: "std-2003",
    name: "Sofía Prieto",
    program: "Diseño Digital Interactivo",
    semester: "2°",
    advisor: "Ing. Carla Medina",
    status: "urgente"
  }
];

export const institutionalAlerts: InstitutionAlert[] = [
  {
    id: "al-1",
    title: "Incremento de inasistencia en primer semestre",
    audience: "Primer ingreso",
    channel: "Coordinación académica",
    status: "urgente"
  },
  {
    id: "al-2",
    title: "Seguimiento de pagos retrasados",
    audience: "Finanzas + tutores",
    channel: "Mesa de permanencia",
    status: "en_revision"
  },
  {
    id: "al-3",
    title: "Acompañamiento para estudiantes transferidos",
    audience: "Servicios estudiantiles",
    channel: "Canal institucional",
    status: "activo"
  }
];

export const roleSettings: RoleSetting[] = [
  {
    id: "rl-1",
    role: "Aspirante",
    permissions: ["Ver carreras", "Cargar documentos", "Consultar proceso"],
    status: "activo"
  },
  {
    id: "rl-2",
    role: "Estudiante",
    permissions: ["Ver agenda", "Solicitar trámites", "Usar canales"],
    status: "aprobado"
  },
  {
    id: "rl-3",
    role: "Administrativo",
    permissions: ["Gestionar alertas", "Publicar avisos", "Configurar roles"],
    status: "en_revision"
  }
];

