import type { Status } from "../types";
import type { AdminStudentRecord } from "./adminStudents";

export interface FollowUpActionOption {
  key: "observacion" | "tutoria" | "alerta" | "recordatorio" | "tutor";
  label: string;
  title: string;
  helper: string;
  fields: Array<{ name: string; label: string; type: "text" | "date" | "textarea" }>;
}

export interface FollowUpResult {
  message: string;
  status: Status;
}

export const followUpActionOptions: FollowUpActionOption[] = [
  {
    key: "observacion",
    label: "Registrar observación",
    title: "Registrar observación",
    helper: "Agrega una nota breve al expediente del estudiante.",
    fields: [
      { name: "observacion", label: "Observación", type: "textarea" },
      { name: "responsable", label: "Responsable", type: "text" }
    ]
  },
  {
    key: "tutoria",
    label: "Programar tutoría",
    title: "Programar tutoría",
    helper: "Define fecha, horario y motivo de la tutoría.",
    fields: [
      { name: "fecha", label: "Fecha", type: "date" },
      { name: "detalle", label: "Motivo", type: "textarea" }
    ]
  },
  {
    key: "alerta",
    label: "Marcar alerta atendida",
    title: "Marcar alerta atendida",
    helper: "Confirma la atención y deja evidencia del seguimiento.",
    fields: [
      { name: "accion", label: "Acción realizada", type: "textarea" },
      { name: "observacion", label: "Observación", type: "textarea" }
    ]
  },
  {
    key: "recordatorio",
    label: "Enviar recordatorio",
    title: "Enviar recordatorio",
    helper: "Prepara un mensaje para reforzar seguimiento.",
    fields: [
      { name: "mensaje", label: "Mensaje", type: "textarea" },
      { name: "canal", label: "Canal", type: "text" }
    ]
  },
  {
    key: "tutor",
    label: "Cambiar tutor",
    title: "Cambiar tutor",
    helper: "Actualiza la persona responsable del seguimiento.",
    fields: [
      { name: "nuevoTutor", label: "Nuevo tutor", type: "text" },
      { name: "motivo", label: "Motivo", type: "textarea" }
    ]
  }
];

export function buildStudentFollowUpResult(student: AdminStudentRecord): FollowUpResult {
  if (student.risk === "alto") {
    return { message: `Seguimiento prioritario para ${student.name} registrado.`, status: "urgente" };
  }

  if (student.risk === "medio") {
    return { message: `Seguimiento preventivo para ${student.name} registrado.`, status: "en_revision" };
  }

  return { message: `Seguimiento actualizado para ${student.name}.`, status: "aprobado" };
}
