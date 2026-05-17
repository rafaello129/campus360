import type {
  AgendaItem,
  CampusEvent,
  DocumentRequest,
  Metric,
  Notice,
  Professor,
  TrajectoryMilestone
} from "../types";
import type { CampusMapLocation } from "../types/campusMap";

export const estudianteMetrics: Metric[] = [
  {
    label: "Materias activas",
    value: "6",
    trend: "1 asesoría pendiente",
    trendDirection: "neutral"
  },
  {
    label: "Asistencia acumulada",
    value: "92%",
    trend: "+4% frente al mes pasado",
    trendDirection: "up"
  },
  {
    label: "Estatus académico",
    value: "Regular",
    trend: "Sin alertas críticas",
    trendDirection: "up"
  }
];

// Mock current student data
export const currentStudent = {
  id: "EST-2024-0451",
  name: "María Elena Rodríguez",
  career: "Ingeniería en Software",
  semester: "5° semestre",
  enrollment: "2022-2024-EST-451",
  tutor: "Dr. Carlos Mendoza",
  status: "activo",
  academicLevel: "Regular",
  participationPercentage: 78,
  documentCompletion: 85,
  accompanimentLevel: "Acompañamiento activo"
};

export const agendaItems: AgendaItem[] = [
  {
    id: "ag-1",
    date: "15 mayo",
    time: "08:00",
    title: "Laboratorio de Bases de Datos",
    course: "Ingeniería en Software",
    location: "Edificio B - Lab 2",
    status: "activo",
    type: "clase"
  },
  {
    id: "ag-2",
    date: "16 mayo",
    time: "11:30",
    title: "Tutoría de seguimiento",
    course: "Programa de permanencia",
    location: "Centro de acompañamiento",
    status: "pendiente",
    type: "tutoria"
  },
  {
    id: "ag-3",
    date: "17 mayo",
    time: "14:00",
    title: "Entrega de proyecto parcial",
    course: "Arquitectura de Software",
    location: "Campus Virtual",
    status: "urgente",
    type: "entrega"
  },
  {
    id: "ag-4",
    date: "18 mayo",
    time: "10:00",
    title: "Sesión de refuerzo académico",
    course: "Programación Web",
    location: "Aula 305 - Edificio A",
    status: "activo",
    type: "clase"
  },
  {
    id: "ag-5",
    date: "19 mayo",
    time: "09:00",
    title: "Taller: Git y GitHub avanzado",
    course: "Desarrollo profesional",
    location: "Centro de innovación",
    status: "pendiente",
    type: "taller"
  },
  {
    id: "ag-6",
    date: "20 mayo",
    time: "09:00",
    title: "Hackathon Campus360",
    course: "Eventos",
    location: "Auditorio principal",
    status: "pendiente",
    type: "evento"
  }
];

export const notices: Notice[] = [
  {
    id: "av-1",
    title: "Mantenimiento de plataforma LMS",
    channel: "Canal TI",
    summary: "Intermitencia programada de 22:00 a 23:30.",
    status: "activo",
    priority: "normal",
    category: "Administrativa"
  },
  {
    id: "av-2",
    title: "Convocatoria de movilidad académica",
    channel: "Relaciones internacionales",
    summary: "Apertura de registro para intercambio 2026-B.",
    status: "aprobado",
    priority: "alta",
    category: "Académica"
  },
  {
    id: "av-3",
    title: "Recordatorio de reinscripción",
    channel: "Servicios escolares",
    summary: "Cierre de periodo en 4 días.",
    status: "urgente",
    priority: "urgente",
    category: "Administrativa"
  },
  {
    id: "av-4",
    title: "Abre inscripción para becas 2026-B",
    channel: "Bienestar estudiantil",
    summary: "Nuevo programa de apoyo económico disponible.",
    status: "aprobado",
    priority: "alta",
    category: "Becas"
  },
  {
    id: "av-5",
    title: "Cambio de horario - Tutoría académica",
    channel: "Acompañamiento",
    summary: "Tu asesor cambió su horario de atención.",
    status: "pendiente",
    priority: "normal",
    category: "Académica"
  }
];

export const campusEvents: CampusEvent[] = [
  {
    id: "evt-hackathon",
    title: "Hackathon Campus360",
    date: "20 mayo 2026",
    time: "09:00 - 18:00",
    location: "Auditorio principal",
    category: "Innovación",
    status: "activo",
    summary: "Reto colaborativo para soluciones de experiencia estudiantil.",
    capacity: 150,
    registered: 87,
    type: "evento"
  },
  {
    id: "evt-mentor",
    title: "Mentorías para primer ingreso",
    date: "22 mayo 2026",
    time: "12:00 - 14:00",
    location: "Biblioteca central",
    category: "Acompañamiento",
    status: "pendiente",
    summary: "Sesiones para fortalecer hábitos de estudio y adaptación universitaria.",
    capacity: 60,
    registered: 45,
    type: "taller"
  },
  {
    id: "evt-feria",
    title: "Feria de becas y financiamiento",
    date: "24 mayo 2026",
    time: "10:00 - 15:00",
    location: "Centro estudiantil",
    category: "Financiamiento",
    status: "aprobado",
    summary: "Stands informativos para apoyos económicos y programas externos.",
    capacity: 300,
    registered: 120,
    type: "evento"
  },
  {
    id: "evt-taller-git",
    title: "Taller: Git y GitHub avanzado",
    date: "19 mayo 2026",
    time: "09:00 - 12:00",
    location: "Centro de innovación",
    category: "Desarrollo profesional",
    status: "activo",
    summary: "Aprende flujos de trabajo colaborativo con control de versiones.",
    capacity: 40,
    registered: 28,
    type: "taller"
  },
  {
    id: "evt-club-robotica",
    title: "Club de Robótica - Reunión semanal",
    date: "21 mayo 2026",
    time: "17:00 - 19:00",
    location: "Laboratorio de electrónica",
    category: "Clubs",
    status: "activo",
    summary: "Diseño y construcción de robots competitivos.",
    capacity: 35,
    registered: 22,
    type: "club"
  }
];

export const trajectoryMilestones: TrajectoryMilestone[] = [
  {
    id: "tr-1",
    title: "Curso de inducción completado",
    period: "Ago 2025",
    status: "completado",
    note: "Aprobado con participación destacada."
  },
  {
    id: "tr-2",
    title: "Tutoría académica mensual",
    period: "Abr 2026",
    status: "activo",
    note: "Seguimiento activo sin riesgo académico."
  },
  {
    id: "tr-3",
    title: "Solicitud de beca institucional",
    period: "May 2026",
    status: "en_revision",
    note: "Expediente en evaluación."
  }
];

export const studentDocuments: DocumentRequest[] = [
  {
    id: "sd-1",
    name: "Constancia de estudios",
    area: "Servicios escolares",
    status: "aprobado",
    updatedAt: "Actualizado hoy"
  },
  {
    id: "sd-2",
    name: "Historial académico parcial",
    area: "Control escolar",
    status: "en_revision",
    updatedAt: "Actualizado hace 1 día"
  },
  {
    id: "sd-3",
    name: "Carta de no adeudo",
    area: "Finanzas",
    status: "pendiente",
    updatedAt: "Actualizado hace 2 días"
  }
];

export const professors: Professor[] = [
  {
    id: "pr-1",
    name: "Dra. Elena Ponce",
    subject: "Arquitectura de Software",
    availability: "Lun y Mié 16:00-18:00",
    status: "activo",
    email: "eponce@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    office: "Edificio A, Piso 2, Oficina 201"
  },
  {
    id: "pr-2",
    name: "Mtro. Luis Herrera",
    subject: "Bases de Datos",
    availability: "Mar y Jue 10:00-12:00",
    status: "activo",
    email: "lherrera@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    office: "Edificio B, Piso 1, Oficina 105"
  },
  {
    id: "pr-3",
    name: "Ing. Carla Medina",
    subject: "Analítica aplicada",
    availability: "Vie 09:00-11:00",
    status: "pendiente",
    email: "cmedina@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    office: "Edificio C, Piso 3, Oficina 310"
  },
  {
    id: "pr-4",
    name: "Dr. Roberto López",
    subject: "Programación Web",
    availability: "Lun, Mié, Vie 14:00-16:00",
    status: "activo",
    email: "rlopez@campus360.edu",
    phone: "+56 9 XXXX XXXX",
    office: "Edificio A, Piso 3, Oficina 305"
  }
];

// Canales institucionales
export const channels = [
  {
    id: "ch-1",
    name: "Avisos generales",
    description: "Notificaciones de la institución",
    publications: 24,
    lastUpdate: "Hace 2 horas",
    color: "bg-blue-100 text-blue-700",
    icon: "megaphone"
  },
  {
    id: "ch-2",
    name: "Becas",
    description: "Convocatorias y oportunidades de financiamiento",
    publications: 8,
    lastUpdate: "Hace 1 día",
    color: "bg-green-100 text-green-700",
    icon: "coins"
  },
  {
    id: "ch-3",
    name: "Deportes",
    description: "Eventos, torneos y entrenamientos",
    publications: 12,
    lastUpdate: "Hace 4 horas",
    color: "bg-orange-100 text-orange-700",
    icon: "activity"
  },
  {
    id: "ch-4",
    name: "Cultura",
    description: "Actividades culturales y artísticas",
    publications: 6,
    lastUpdate: "Hace 3 días",
    color: "bg-purple-100 text-purple-700",
    icon: "theater-masks"
  },
  {
    id: "ch-5",
    name: "Inglés",
    description: "Programas de idiomas y certificaciones",
    publications: 10,
    lastUpdate: "Hace 1 día",
    color: "bg-red-100 text-red-700",
    icon: "message-square"
  },
  {
    id: "ch-6",
    name: "Tutorías",
    description: "Acompañamiento académico y asesoría",
    publications: 15,
    lastUpdate: "Hoy",
    color: "bg-cyan-100 text-cyan-700",
    icon: "book-open"
  },
  {
    id: "ch-7",
    name: "Servicios escolares",
    description: "Trámites, documentos y procedimientos",
    publications: 18,
    lastUpdate: "Hace 2 días",
    color: "bg-yellow-100 text-yellow-700",
    icon: "clipboard"
  },
  {
    id: "ch-8",
    name: "Bolsa de trabajo",
    description: "Ofertas de empleo y pasantías",
    publications: 14,
    lastUpdate: "Hace 5 horas",
    color: "bg-indigo-100 text-indigo-700",
    icon: "briefcase"
  },
  {
    id: "ch-9",
    name: "Innovación y tecnología",
    description: "Hackathons, workshops y labs",
    publications: 9,
    lastUpdate: "Hace 2 días",
    color: "bg-pink-100 text-pink-700",
    icon: "rocket"
  },
  {
    id: "ch-10",
    name: "Actividades académicas",
    description: "Cursos, seminarios y congresos",
    publications: 20,
    lastUpdate: "Hoy",
    color: "bg-teal-100 text-teal-700",
    icon: "graduation-cap"
  }
];

// Chat channels simulados
export const chatChannels = [
  {
    id: "chat-1",
    name: "Grupo 5A",
    type: "grupo",
    unreadCount: 3,
    lastMessage: "¿Alguien puede ayudarme con la tarea?",
    lastMessageTime: "Hace 2 horas"
  },
  {
    id: "chat-2",
    name: "Programación Web",
    type: "materia",
    unreadCount: 0,
    lastMessage: "Los apuntes están listos en el drive",
    lastMessageTime: "Hace 5 horas"
  },
  {
    id: "chat-3",
    name: "Base de Datos",
    type: "materia",
    unreadCount: 2,
    lastMessage: "Recordatorio: entrega el proyecto antes de las 23:59",
    lastMessageTime: "Hace 1 día"
  },
  {
    id: "chat-4",
    name: "Tutoría Académica",
    type: "tutoria",
    unreadCount: 0,
    lastMessage: "¿Cómo va el semestre?",
    lastMessageTime: "Hace 2 días"
  },
  {
    id: "chat-5",
    name: "Club de Robótica",
    type: "club",
    unreadCount: 5,
    lastMessage: "Reunión de hoy: revisen lo que armamos.",
    lastMessageTime: "Hace 1 hora"
  }
];

// Campus locations for student map
export const studentMapLocations: CampusMapLocation[] = [
  {
    id: "student-aulas-a",
    name: "Edificio A - Aulas",
    mapLabel: "Edificio A",
    type: "Academico",
    zone: "Zona academica",
    description: "Aulas de clase, salas de profesores y puntos de consulta para materias activas.",
    schedule: "07:00 - 21:00",
    responsible: "Coordinacion Academica",
    orientation: "Bloque norte, entra por el pasillo central y gira a la derecha.",
    estimatedTime: "4 min desde entrada",
    related: "Agenda: Aula 305 - Edificio A",
    position: { x: 50, y: 24 },
    accessPoint: { x: 50, y: 47 },
    footprint: { x: 43, y: 15, w: 23, h: 19 }
  },
  {
    id: "student-labs",
    name: "Laboratorios de Computo",
    mapLabel: "Labs Computo",
    type: "Laboratorio",
    zone: "Zona academica",
    description: "Laboratorios para cursos tecnologicos, practicas guiadas y software especializado.",
    schedule: "08:00 - 19:00",
    responsible: "Centro de Computo",
    orientation: "Costado este del Edificio B, acceso por el corredor azul.",
    estimatedTime: "7 min desde entrada",
    related: "Agenda: Laboratorio de Bases de Datos",
    position: { x: 84, y: 43 },
    accessPoint: { x: 70.5, y: 47 },
    footprint: { x: 75, y: 36, w: 17, h: 15 }
  },
  {
    id: "student-biblioteca",
    name: "Biblioteca Central",
    mapLabel: "Biblioteca",
    type: "Servicios",
    zone: "Servicios y vida campus",
    description: "Recursos bibliograficos, salas de estudio, prestamos y equipos de consulta.",
    schedule: "07:00 - 20:00",
    responsible: "Biblioteca",
    orientation: "Centro del campus, frente al corredor principal.",
    estimatedTime: "5 min desde entrada",
    related: "Eventos: Mentorias para primer ingreso",
    position: { x: 45, y: 58 },
    accessPoint: { x: 50, y: 58 },
    footprint: { x: 36, y: 52, w: 25, h: 15 }
  },
  {
    id: "student-servicios",
    name: "Servicios Escolares",
    mapLabel: "Servicios Escolares",
    type: "Administrativo",
    zone: "Zona administrativa",
    description: "Tramites, constancias, documentos, registro y seguimiento de expediente.",
    schedule: "09:00 - 16:00",
    responsible: "Control Escolar",
    orientation: "Primer bloque despues de entrada principal, ala poniente.",
    estimatedTime: "2 min desde entrada",
    position: { x: 18, y: 26 },
    accessPoint: { x: 24.5, y: 47 },
    footprint: { x: 8, y: 17, w: 22, h: 14 }
  },
  {
    id: "student-acompanamiento",
    name: "Centro de Acompanamiento",
    mapLabel: "Acompanamiento",
    type: "Atencion estudiantil",
    zone: "Servicios y vida campus",
    description: "Tutorias, apoyo academico, orientacion psicopedagogica y seguimiento estudiantil.",
    schedule: "08:00 - 17:00",
    responsible: "Bienestar Estudiantil",
    orientation: "Sector sur central, junto a cafeteria.",
    estimatedTime: "7 min desde entrada",
    related: "Agenda: Tutoria de seguimiento",
    position: { x: 55, y: 80 },
    accessPoint: { x: 50, y: 82 },
    footprint: { x: 45, y: 73, w: 22, h: 14 }
  },
  {
    id: "student-cafeteria",
    name: "Cafeteria",
    mapLabel: "Cafeteria",
    type: "Recreativo",
    zone: "Servicios y vida campus",
    description: "Alimentos, bebidas, mesas de convivencia y descanso entre clases.",
    schedule: "06:30 - 19:00",
    responsible: "Servicios Generales",
    orientation: "Entre Biblioteca Central y Centro de Acompanamiento.",
    estimatedTime: "5 min desde entrada",
    position: { x: 66, y: 62 },
    accessPoint: { x: 70.5, y: 62 },
    footprint: { x: 64, y: 55, w: 16, h: 14 }
  },
  {
    id: "student-auditorio",
    name: "Auditorio Principal",
    mapLabel: "Auditorio",
    type: "Servicios",
    zone: "Servicios y vida campus",
    description: "Conferencias, eventos institucionales, presentaciones y actividades masivas.",
    schedule: "Segun agenda institucional",
    responsible: "Difusion Institucional",
    orientation: "Sur del campus, conectado al corredor de Biblioteca.",
    estimatedTime: "9 min desde entrada",
    related: "Eventos: Hackathon Campus360",
    position: { x: 30, y: 78 },
    accessPoint: { x: 30, y: 82 },
    footprint: { x: 19, y: 72, w: 23, h: 14 }
  },
  {
    id: "student-computo",
    name: "Centro de Computo",
    mapLabel: "Centro Computo",
    type: "Laboratorio",
    zone: "Zona academica",
    description: "Area de acceso libre con computadores, red institucional y soporte de conectividad.",
    schedule: "08:00 - 20:00",
    responsible: "Soporte TI",
    orientation: "Segundo nivel de Biblioteca Central, acceso por escaleras internas.",
    estimatedTime: "6 min desde entrada",
    position: { x: 58, y: 43 },
    accessPoint: { x: 50, y: 47 },
    footprint: { x: 52, y: 36, w: 14, h: 12 }
  },
  {
    id: "student-canchas",
    name: "Canchas",
    mapLabel: "Canchas",
    type: "Recreativo",
    zone: "Recreativa",
    description: "Canchas multiusos para torneos, entrenamiento y actividades deportivas.",
    schedule: "06:00 - 20:00",
    responsible: "Coordinacion Deportiva",
    orientation: "Extremo sureste del campus, despues del auditorio.",
    estimatedTime: "12 min desde entrada",
    position: { x: 80, y: 74 },
    accessPoint: { x: 70.5, y: 82 },
    footprint: { x: 70, y: 61, w: 22, h: 24 }
  }
];


