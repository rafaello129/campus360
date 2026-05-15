import type { ChannelRecord } from "../types/campus";

export const channels: ChannelRecord[] = [
  {
    id: "CH-001",
    name: "Vida universitaria",
    audience: "Comunidad estudiantil",
    members: 1220,
    lastUpdate: "Hoy 08:30",
    status: "activo"
  },
  {
    id: "CH-002",
    name: "Tutorías y permanencia",
    audience: "Estudiantes con seguimiento",
    members: 340,
    lastUpdate: "Ayer 18:10",
    status: "aprobado"
  },
  {
    id: "CH-003",
    name: "Aspirantes 2026",
    audience: "Aspirantes de nuevo ingreso",
    members: 980,
    lastUpdate: "Hoy 11:05",
    status: "activo"
  },
  {
    id: "CH-004",
    name: "Coordinación administrativa",
    audience: "Personal administrativo",
    members: 95,
    lastUpdate: "Hace 2 horas",
    status: "en_revision"
  }
];

