import type { AdmissionDocument, AdmissionStep, Career, Metric } from "../types";
import type { CampusMapLocation } from "../types/campusMap";

export const aspiranteMetrics: Metric[] = [
  {
    label: "Programas disponibles",
    value: "18",
    trend: "+3 este ciclo",
    trendDirection: "up"
  },
  {
    label: "Becas activas",
    value: "12",
    trend: "2 nuevas convocatorias",
    trendDirection: "up"
  },
  {
    label: "Tiempo promedio de respuesta",
    value: "48h",
    trend: "Mejorado 12%",
    trendDirection: "up"
  }
];

export const landingBenefits = [
  {
    icon: "check-circle",
    title: "Seguimiento claro de admisión",
    description: "Conoce en tiempo real el estado de tu expediente."
  },
  {
    icon: "book-open",
    title: "Información de carreras",
    description: "Explora programas, modalidades y oportunidades de formación."
  },
  {
    icon: "file-check",
    title: "Documentos organizados",
    description: "Carga, descarga y verifica el estatus de todos tus documentos."
  },
  {
    icon: "message-square",
    title: "Orientación con asistente virtual",
    description: "Chatbot disponible 24/7 para resolver tus dudas."
  }
];

export const procesosSteps = [
  { number: 1, title: "Explora la oferta educativa", description: "Conoce todas las carreras disponibles." },
  { number: 2, title: "Registra tus datos", description: "Completa el formulario de solicitud." },
  { number: 3, title: "Da seguimiento a tu proceso", description: "Monitorea cada etapa de admisión." },
  { number: 4, title: "Completa tus documentos", description: "Sube todos los archivos requeridos." },
  { number: 5, title: "Recibe orientación y avisos", description: "Contacto directo con asesor académico." }
];

export const careers: Career[] = [
  {
    id: "ing-software",
    name: "Ingeniería en Software",
    area: "Tecnología",
    duration: "8 semestres",
    modality: "Presencial + híbrido",
    status: "activo",
    summary: "Desarrollo de soluciones digitales, arquitectura y productos SaaS.",
    highlights: ["Laboratorio cloud", "Prácticas en empresa", "Ruta IA aplicada"]
  },
  {
    id: "data-analytics",
    name: "Licenciatura en Analítica de Datos",
    area: "Ciencias Aplicadas",
    duration: "8 semestres",
    modality: "Presencial",
    status: "activo",
    summary: "Análisis de datos, visualización y toma de decisiones institucionales.",
    highlights: ["Rutas Python", "Business Intelligence", "Proyecto con datos reales"]
  },
  {
    id: "diseno-digital",
    name: "Diseño Digital Interactivo",
    area: "Creatividad y Tecnología",
    duration: "8 semestres",
    modality: "Híbrido",
    status: "en_revision",
    summary: "Experiencia de usuario, productos digitales y narrativa multimedia.",
    highlights: ["UX/UI studio", "Prototipado avanzado", "Vinculación con startups"]
  },
  {
    id: "gestion-educativa",
    name: "Gestión Educativa y Liderazgo",
    area: "Sociales",
    duration: "8 semestres",
    modality: "En línea",
    status: "aprobado",
    summary: "Planeación, innovación y mejora continua en instituciones educativas.",
    highlights: ["Gestión estratégica", "Planeación académica", "Gobernanza institucional"]
  }
];

export const admissionSteps: AdmissionStep[] = [
  {
    id: "paso-1",
    title: "Registro de aspirante",
    detail: "Completa el formulario inicial de datos personales.",
    status: "completado"
  },
  {
    id: "paso-2",
    title: "Carga de documentos",
    detail: "Sube acta, certificado previo e identificación oficial.",
    status: "en_revision"
  },
  {
    id: "paso-3",
    title: "Entrevista diagnóstica",
    detail: "Agenda y realiza entrevista con asesor académico.",
    status: "pendiente"
  },
  {
    id: "paso-4",
    title: "Resultado y asignación",
    detail: "Publicación de dictamen de admisión.",
    status: "pendiente"
  }
];

export const admissionDocuments: AdmissionDocument[] = [
  {
    id: "doc-1",
    name: "Certificado de bachillerato",
    dueDate: "28 mayo 2026",
    status: "en_revision"
  },
  {
    id: "doc-2",
    name: "Identificación oficial",
    dueDate: "28 mayo 2026",
    status: "aprobado"
  },
  {
    id: "doc-3",
    name: "Comprobante de domicilio",
    dueDate: "30 mayo 2026",
    status: "pendiente"
  }
];

export const aspiranteFAQ = [
  {
    question: "¿Cómo inicio mi proceso de admisión?",
    answer:
      "Desde el módulo Registro puedes iniciar tu solicitud y continuarla en Mi proceso de admisión."
  },
  {
    question: "¿Qué documentos necesito subir?",
    answer:
      "Acta de nacimiento, certificado de estudios previos, identificación y comprobante de domicilio."
  },
  {
    question: "¿Puedo cambiar de carrera antes de finalizar?",
    answer:
      "Sí, el cambio puede solicitarse antes de la entrevista diagnóstica en tu panel de aspirante."
  }
];

export const aspiranteMapLocations: CampusMapLocation[] = [
  {
    id: "applicant-admisiones",
    name: "Oficina de Admisiones",
    mapLabel: "Admisiones",
    type: "Administrativo",
    zone: "Zona administrativa",
    description: "Registro de aspirantes, entrevistas, orientacion inicial y seguimiento de solicitudes.",
    schedule: "08:30 - 17:30",
    responsible: "Vinculacion y Admision",
    orientation: "Entra por acceso principal y avanza al primer bloque del lado izquierdo.",
    estimatedTime: "2 min desde entrada",
    position: { x: 19, y: 41 },
    accessPoint: { x: 24.5, y: 47 },
    footprint: { x: 8, y: 38, w: 25, h: 13 },
    visibility: ["Aspirante", "Interno"]
  },
  {
    id: "applicant-servicios",
    name: "Servicios Escolares",
    mapLabel: "Servicios Escolares",
    type: "Administrativo",
    zone: "Zona administrativa",
    description: "Entrega de documentos, validacion de expediente y consultas de proceso escolar.",
    schedule: "09:00 - 16:00",
    responsible: "Control Escolar",
    orientation: "Ala poniente del edificio administrativo, junto a admisiones.",
    estimatedTime: "2 min desde entrada",
    position: { x: 18, y: 26 },
    accessPoint: { x: 24.5, y: 47 },
    footprint: { x: 8, y: 17, w: 22, h: 14 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  },
  {
    id: "applicant-direccion",
    name: "Direccion",
    mapLabel: "Direccion",
    type: "Administrativo",
    zone: "Zona administrativa",
    description: "Atencion institucional y orientacion para asuntos administrativos generales.",
    schedule: "08:30 - 17:00",
    responsible: "Direccion General",
    orientation: "Segundo nivel del bloque administrativo, acceso por escaleras internas.",
    estimatedTime: "4 min desde entrada",
    position: { x: 38, y: 18 },
    accessPoint: { x: 34, y: 47 },
    footprint: { x: 32, y: 11, w: 14, h: 13 },
    visibility: ["Aspirante", "Interno"]
  },
  {
    id: "applicant-biblioteca",
    name: "Biblioteca Central",
    mapLabel: "Biblioteca",
    type: "Servicios",
    zone: "Servicios y vida campus",
    description: "Recorrido de salas de estudio, consulta de recursos y servicios para nuevos ingresos.",
    schedule: "07:00 - 20:00",
    responsible: "Biblioteca",
    orientation: "Centro del campus, siguiendo el corredor principal.",
    estimatedTime: "5 min desde entrada",
    position: { x: 45, y: 58 },
    accessPoint: { x: 50, y: 58 },
    footprint: { x: 36, y: 52, w: 25, h: 15 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  },
  {
    id: "applicant-labs",
    name: "Laboratorios",
    mapLabel: "Labs",
    type: "Laboratorio",
    zone: "Zona academica",
    description: "Espacios de practica con equipo tecnologico para demostraciones y recorridos.",
    schedule: "08:00 - 18:00",
    responsible: "Centro de Computo",
    orientation: "Costado este del Edificio B, acceso por el corredor azul.",
    estimatedTime: "7 min desde entrada",
    position: { x: 83, y: 41 },
    accessPoint: { x: 70.5, y: 47 },
    footprint: { x: 75, y: 34, w: 17, h: 13 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  },
  {
    id: "applicant-auditorio",
    name: "Auditorio Principal",
    mapLabel: "Auditorio",
    type: "Servicios",
    zone: "Servicios y vida campus",
    description: "Charlas informativas, sesiones de induccion y eventos de bienvenida.",
    schedule: "Segun agenda de admision",
    responsible: "Difusion Institucional",
    orientation: "Sur del campus, siguiendo el corredor desde Biblioteca Central.",
    estimatedTime: "9 min desde entrada",
    position: { x: 30, y: 78 },
    accessPoint: { x: 30, y: 82 },
    footprint: { x: 19, y: 72, w: 23, h: 14 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  },
  {
    id: "applicant-cafeteria",
    name: "Cafeteria",
    mapLabel: "Cafeteria",
    type: "Recreativo",
    zone: "Servicios y vida campus",
    description: "Punto de descanso para visitantes, aspirantes y familias durante recorridos.",
    schedule: "06:30 - 19:00",
    responsible: "Servicios Generales",
    orientation: "Entre Biblioteca Central y Centro de Acompanamiento.",
    estimatedTime: "5 min desde entrada",
    position: { x: 66, y: 62 },
    accessPoint: { x: 70.5, y: 62 },
    footprint: { x: 64, y: 55, w: 16, h: 14 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  },
  {
    id: "applicant-entrada",
    name: "Entrada principal",
    mapLabel: "Entrada",
    type: "Servicios",
    zone: "Acceso",
    description: "Punto de llegada, orientacion inicial y referencia para rutas sugeridas.",
    schedule: "06:00 - 22:00",
    responsible: "Seguridad y recepcion",
    orientation: "Acceso principal del campus, punto base para todos los recorridos.",
    estimatedTime: "0 min desde entrada",
    position: { x: 10, y: 92 },
    accessPoint: { x: 10, y: 90 },
    footprint: { x: 5, y: 88, w: 18, h: 8 },
    visibility: ["Aspirante", "Estudiante", "Interno"]
  }
];

