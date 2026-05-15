import type { ApplicantRecord } from "../types/campus";

export const applicants: ApplicantRecord[] = [
  {
    id: "APL-2026-001",
    name: "María Torres",
    career: "Ingeniería en Software",
    stage: "Documentos",
    score: 88,
    status: "en_revision"
  },
  {
    id: "APL-2026-002",
    name: "Jesús Pineda",
    career: "Analítica de Datos",
    stage: "Entrevista",
    score: 92,
    status: "activo"
  },
  {
    id: "APL-2026-003",
    name: "Fernanda Ruiz",
    career: "Diseño Digital Interactivo",
    stage: "Dictamen",
    score: 84,
    status: "pendiente"
  },
  {
    id: "APL-2026-004",
    name: "Óscar Ramírez",
    career: "Gestión Educativa",
    stage: "Admitido",
    score: 90,
    status: "aprobado"
  }
];

