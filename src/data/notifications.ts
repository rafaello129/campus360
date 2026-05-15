import type { NotificationItem } from "../types/campus";

export const notifications: NotificationItem[] = [
  {
    id: "NTF-001",
    title: "Reinscripción",
    message: "Tu periodo de reinscripción cierra en 4 días.",
    channel: "Servicios escolares",
    time: "Hace 2 horas",
    status: "urgente"
  },
  {
    id: "NTF-002",
    title: "Mantenimiento LMS",
    message: "Ventana programada hoy de 22:00 a 23:30.",
    channel: "Canal TI",
    time: "Hoy",
    status: "activo"
  },
  {
    id: "NTF-003",
    title: "Nueva convocatoria",
    message: "Se abrió la convocatoria de movilidad 2026-B.",
    channel: "Relaciones internacionales",
    time: "Ayer",
    status: "aprobado"
  },
  {
    id: "NTF-004",
    title: "Entrega de proyecto",
    message: "Arquitectura de Software: entrega final este viernes.",
    channel: "Docente titular",
    time: "Hace 1 día",
    status: "pendiente"
  }
];

