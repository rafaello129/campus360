import type {
  AgendaItem,
  CampusEvent,
  DocumentRequest,
  Metric,
  Notice,
  Professor,
  TrajectoryMilestone
} from "../types";

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
export const studentMapLocations = [
  {
    id: "loc-1",
    name: "Edificio A - Aulas",
    type: "Académico",
    description: "Aulas de clase y oficinas de profesores",
    hours: "07:00 - 21:00",
    directions: "Zona norte del campus",
    estimatedTime: "3 minutos desde entrada",
    position: { x: 25, y: 30 }
  },
  {
    id: "loc-2",
    name: "Laboratorios de Cómputo",
    type: "Académico",
    description: "Labs para cursos tecnológicos y prácticas",
    hours: "08:00 - 19:00",
    directions: "Edificio B, pisos 2 y 3",
    estimatedTime: "7 minutos desde entrada",
    position: { x: 65, y: 35 }
  },
  {
    id: "loc-3",
    name: "Biblioteca Central",
    type: "Académico",
    description: "Recursos, libros, computadores y salas de estudio",
    hours: "07:00 - 20:00",
    directions: "Centro del campus",
    estimatedTime: "5 minutos desde entrada",
    position: { x: 50, y: 50 }
  },
  {
    id: "loc-4",
    name: "Servicios Escolares",
    type: "Administrativo",
    description: "Trámites, documentos, registro",
    hours: "09:00 - 16:00",
    directions: "Edificio Principal, planta baja",
    estimatedTime: "2 minutos desde entrada",
    position: { x: 20, y: 20 }
  },
  {
    id: "loc-5",
    name: "Centro de Acompañamiento",
    type: "Servicios",
    description: "Tutorías, asesoría académica, bienestar",
    hours: "08:00 - 17:00",
    directions: "Edificio de Servicios, ala sur",
    estimatedTime: "8 minutos desde entrada",
    position: { x: 70, y: 60 }
  },
  {
    id: "loc-6",
    name: "Cafetería",
    type: "Recreativo",
    description: "Alimentos, bebidas y espacios de descanso",
    hours: "06:30 - 19:00",
    directions: "Planta baja, sector central",
    estimatedTime: "4 minutos desde entrada",
    position: { x: 45, y: 55 }
  },
  {
    id: "loc-7",
    name: "Auditorio Principal",
    type: "Recreativo",
    description: "Conferencias, eventos, presentaciones",
    hours: "Bajo demanda",
    directions: "Edificio de Auditorios, sur",
    estimatedTime: "10 minutos desde entrada",
    position: { x: 40, y: 75 }
  },
  {
    id: "loc-8",
    name: "Centro de Innovación",
    type: "Académico",
    description: "Hackathons, workshops, laboratorios creativos",
    hours: "08:00 - 20:00",
    directions: "Edificio C, piso 1",
    estimatedTime: "9 minutos desde entrada",
    position: { x: 60, y: 70 }
  },
  {
    id: "loc-9",
    name: "Canchas deportivas",
    type: "Recreativo",
    description: "Canchas de fútbol, voleibol y baloncesto",
    hours: "06:00 - 20:00",
    directions: "Sector sur-oeste del campus",
    estimatedTime: "12 minutos desde entrada",
    position: { x: 15, y: 65 }
  },
  {
    id: "loc-10",
    name: "Centro de Cómputo",
    type: "Académico",
    description: "Área de acceso libre con computadores y wifi",
    hours: "24/7",
    directions: "Biblioteca Central, piso 2",
    estimatedTime: "6 minutos desde entrada",
    position: { x: 52, y: 48 }
  }
];


