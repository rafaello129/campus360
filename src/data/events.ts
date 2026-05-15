import type { CampusEventRecord } from "../types/campus";

export const events: CampusEventRecord[] = [
  {
    id: "EVT-001",
    title: "Hackathon Campus360",
    date: "20 mayo 2026",
    time: "09:00 - 18:00",
    location: "Auditorio principal",
    category: "Innovación",
    description: "Reto colaborativo para resolver casos de experiencia estudiantil.",
    status: "activo"
  },
  {
    id: "EVT-002",
    title: "Jornada de mentorías",
    date: "22 mayo 2026",
    time: "12:00 - 14:00",
    location: "Biblioteca central",
    category: "Acompañamiento",
    description: "Mentorías con docentes para reforzar hábitos de estudio.",
    status: "pendiente"
  },
  {
    id: "EVT-003",
    title: "Feria de becas",
    date: "24 mayo 2026",
    time: "10:00 - 15:00",
    location: "Centro estudiantil",
    category: "Financiamiento",
    description: "Información de programas internos y externos de apoyo económico.",
    status: "aprobado"
  },
  {
    id: "EVT-004",
    title: "Foro de liderazgo estudiantil",
    date: "28 mayo 2026",
    time: "16:00 - 18:30",
    location: "Sala magna",
    category: "Comunidad",
    description: "Espacio de participación para representantes y clubes.",
    status: "activo"
  }
];

