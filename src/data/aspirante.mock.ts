import type { AdmissionDocument, AdmissionStep, Career, Metric } from "../types";

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
    icon: "✓",
    title: "Seguimiento claro de admisión",
    description: "Conoce en tiempo real el estado de tu expediente."
  },
  {
    icon: "📚",
    title: "Información de carreras",
    description: "Explora programas, modalidades y oportunidades de formación."
  },
  {
    icon: "📋",
    title: "Documentos organizados",
    description: "Carga, descarga y verifica el estatus de todos tus documentos."
  },
  {
    icon: "💬",
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

