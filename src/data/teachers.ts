import type { TeacherRecord } from "../types/campus";

export const teachers: TeacherRecord[] = [
  {
    id: "PRF-01",
    name: "Dra. Elena Ponce",
    subject: "Arquitectura de Software",
    office: "Edificio B · Cubículo 12",
    availability: "Lun y Mié · 16:00-18:00",
    status: "activo"
  },
  {
    id: "PRF-02",
    name: "Mtro. Luis Herrera",
    subject: "Bases de Datos",
    office: "Edificio C · Cubículo 4",
    availability: "Mar y Jue · 10:00-12:00",
    status: "activo"
  },
  {
    id: "PRF-03",
    name: "Ing. Carla Medina",
    subject: "Analítica aplicada",
    office: "Laboratorio de IA",
    availability: "Vie · 09:00-11:00",
    status: "pendiente"
  },
  {
    id: "PRF-04",
    name: "Mtra. Laura Castillo",
    subject: "Metodología de investigación",
    office: "Biblioteca · Piso 2",
    availability: "Lun · 13:00-15:00",
    status: "en_revision"
  }
];

