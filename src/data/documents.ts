import type { DocumentRecord } from "../types/campus";

export const documents: DocumentRecord[] = [
  {
    id: "DOC-001",
    name: "Constancia de estudios",
    owner: "Andrea López",
    area: "Servicios escolares",
    updatedAt: "Actualizado hoy",
    status: "aprobado"
  },
  {
    id: "DOC-002",
    name: "Historial académico",
    owner: "Ricardo Mendoza",
    area: "Control escolar",
    updatedAt: "Actualizado hace 1 día",
    status: "en_revision"
  },
  {
    id: "DOC-003",
    name: "Carta de no adeudo",
    owner: "Sofía Prieto",
    area: "Finanzas",
    updatedAt: "Actualizado hace 2 días",
    status: "pendiente"
  },
  {
    id: "DOC-004",
    name: "Credencial institucional",
    owner: "Luis Aranda",
    area: "Servicios estudiantiles",
    updatedAt: "Actualizado esta semana",
    status: "activo"
  }
];

