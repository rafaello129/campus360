import type { Status } from "../types";

export const statusStyles: Record<Status, { label: string; className: string }> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-blue-50 text-tech-mid border-blue-200"
  },
  activo: {
    label: "Activo",
    className: "bg-blue-100 text-tech-primary border-blue-200"
  },
  completado: {
    label: "Completado",
    className: "bg-blue-50 text-tech-mid border-blue-200"
  },
  urgente: {
    label: "Urgente",
    className: "bg-rose-100 text-rose-800 border-rose-200"
  },
  aprobado: {
    label: "Aprobado",
    className: "bg-blue-50 text-tech-primary border-blue-200"
  },
  rechazado: {
    label: "Rechazado",
    className: "bg-red-100 text-red-800 border-red-200"
  },
  en_revision: {
    label: "En revisión",
    className: "bg-blue-50 text-tech-mid border-blue-200"
  }
};

