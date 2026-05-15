import type { Status } from "../types";

export const statusStyles: Record<Status, { label: string; className: string }> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-800 border-amber-200"
  },
  activo: {
    label: "Activo",
    className: "bg-sky-100 text-sky-800 border-sky-200"
  },
  completado: {
    label: "Completado",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200"
  },
  urgente: {
    label: "Urgente",
    className: "bg-rose-100 text-rose-800 border-rose-200"
  },
  aprobado: {
    label: "Aprobado",
    className: "bg-teal-100 text-teal-800 border-teal-200"
  },
  rechazado: {
    label: "Rechazado",
    className: "bg-red-100 text-red-800 border-red-200"
  },
  en_revision: {
    label: "En revisión",
    className: "bg-violet-100 text-violet-800 border-violet-200"
  }
};

