import type { CareerRecord } from "../types/campus";

export const careers: CareerRecord[] = [
  {
    id: "ing-software",
    name: "Ingeniería en Software",
    area: "Tecnología",
    duration: "8 semestres",
    modality: "Presencial + híbrido",
    description: "Construcción de productos digitales, backend, frontend e IA aplicada.",
    highlights: ["Laboratorio cloud", "Ruta IA aplicada", "Vinculación con empresas"],
    status: "activo"
  },
  {
    id: "analitica-datos",
    name: "Licenciatura en Analítica de Datos",
    area: "Ciencias Aplicadas",
    duration: "8 semestres",
    modality: "Presencial",
    description: "Modelado de datos, visualización y analítica para la toma de decisiones.",
    highlights: ["Business Intelligence", "Visualización avanzada", "Proyectos con datos reales"],
    status: "activo"
  },
  {
    id: "diseno-interactivo",
    name: "Diseño Digital Interactivo",
    area: "Creatividad y Medios",
    duration: "8 semestres",
    modality: "Híbrido",
    description: "Experiencia de usuario, interfaces y prototipos para productos digitales.",
    highlights: ["UX/UI Studio", "Prototipado", "Narrativa multimedia"],
    status: "en_revision"
  },
  {
    id: "gestion-educativa",
    name: "Gestión Educativa",
    area: "Administración",
    duration: "8 semestres",
    modality: "En línea",
    description: "Planeación estratégica y mejora continua en instituciones educativas.",
    highlights: ["Planeación académica", "Indicadores institucionales", "Gestión de calidad"],
    status: "aprobado"
  }
];

