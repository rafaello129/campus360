import type { Status } from "../types";

export type ApplicantPriority = "alta" | "media" | "baja";
export type ApplicantStage =
  | "Nuevo registro"
  | "Contacto inicial"
  | "Interés confirmado"
  | "Documentación pendiente"
  | "Evaluación / entrevista"
  | "Inscripción finalizada";

export interface ApplicantTimelineItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  status: Status;
}

export interface ApplicantDocumentItem {
  id: string;
  name: string;
  status: Status;
  updatedAt: string;
}

export interface AdminApplicantRecord {
  id: string;
  folio: string;
  name: string;
  career: string;
  email: string;
  phone: string;
  city: string;
  modality: string;
  source: string;
  lastContact: string;
  owner: string;
  priority: ApplicantPriority;
  documentStatus: Status;
  stage: ApplicantStage;
  status: Status;
  registeredAt: string;
  conversionProbability: number;
  nextAction: string;
  daysWithoutFollowUp: number;
  observations: string;
  timeline: ApplicantTimelineItem[];
  documents: ApplicantDocumentItem[];
}

export const adminApplicantStages: ApplicantStage[] = [
  "Nuevo registro",
  "Contacto inicial",
  "Interés confirmado",
  "Documentación pendiente",
  "Evaluación / entrevista",
  "Inscripción finalizada"
];

export const adminApplicants: AdminApplicantRecord[] = [
  {
    id: "APL-2026-001",
    folio: "ADM-26-1001",
    name: "María Torres",
    career: "Ingeniería en Software",
    email: "maria.torres@mail.com",
    phone: "812-555-0112",
    city: "Monterrey",
    modality: "Presencial",
    source: "Instagram / anuncios",
    lastContact: "Hoy 09:40",
    owner: "Lic. Brenda Salas",
    priority: "alta",
    documentStatus: "en_revision",
    stage: "Contacto inicial",
    status: "activo",
    registeredAt: "12 de mayo de 2026",
    conversionProbability: 78,
    nextAction: "Llamada para confirmar entrega de documentos",
    daysWithoutFollowUp: 1,
    observations: "Interesada en beca académica y horarios vespertinos.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Se capturó el formulario de interés.", time: "12 may · 08:20", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Se validó carrera y modalidad.", time: "12 may · 16:10", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Se compartió guía de documentos.", time: "13 may · 09:05", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Acta y certificado en revisión.", time: "14 may · 11:00", status: "activo" },
      { id: "tl-5", title: "Cita programada", detail: "Pendiente de agendar entrevista.", time: "Pendiente", status: "pendiente" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Se hará al completar documentos.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "en_revision", updatedAt: "Hoy" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Hoy" },
      { id: "doc-3", name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-4", name: "Identificación", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-5", name: "Comprobante", status: "en_revision", updatedAt: "Hace 2 días" }
    ]
  },
  {
    id: "APL-2026-002",
    folio: "ADM-26-1002",
    name: "Jesús Pineda",
    career: "Analítica de Datos",
    email: "jesus.pineda@mail.com",
    phone: "811-555-0183",
    city: "Guadalupe",
    modality: "Mixta",
    source: "Portal web",
    lastContact: "Ayer 18:15",
    owner: "Mtra. Daniela Cruz",
    priority: "media",
    documentStatus: "pendiente",
    stage: "Documentación pendiente",
    status: "en_revision",
    registeredAt: "9 de mayo de 2026",
    conversionProbability: 66,
    nextAction: "Recordatorio de entrega de certificado",
    daysWithoutFollowUp: 2,
    observations: "Pide información sobre plan de pagos y becas.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Dejó datos desde campaña digital.", time: "9 may · 10:30", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Se explicó proceso de admisión.", time: "10 may · 12:15", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Se compartió lista de requisitos.", time: "11 may · 08:45", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Falta certificado oficial.", time: "12 may · 13:00", status: "activo" },
      { id: "tl-5", title: "Cita programada", detail: "Entrevista pendiente de confirmación.", time: "Pendiente", status: "pendiente" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Esperando validación final.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-3", name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-4", name: "Identificación", status: "en_revision", updatedAt: "Hoy" },
      { id: "doc-5", name: "Comprobante", status: "pendiente", updatedAt: "Nunca" }
    ]
  },
  {
    id: "APL-2026-003",
    folio: "ADM-26-1003",
    name: "Fernanda Ruiz",
    career: "Diseño Digital Interactivo",
    email: "fernanda.ruiz@mail.com",
    phone: "818-555-0139",
    city: "San Pedro",
    modality: "Presencial",
    source: "Feria vocacional",
    lastContact: "Hoy 08:05",
    owner: "Lic. Adrián Mora",
    priority: "baja",
    documentStatus: "aprobado",
    stage: "Interés confirmado",
    status: "activo",
    registeredAt: "7 de mayo de 2026",
    conversionProbability: 84,
    nextAction: "Invitar a sesión informativa final",
    daysWithoutFollowUp: 0,
    observations: "Muy interesada en becas de talento creativo.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Captación en feria universitaria.", time: "7 may · 11:15", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Se validó perfil creativo.", time: "8 may · 09:20", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Compartió portafolio inicial.", time: "9 may · 14:30", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Expediente casi completo.", time: "10 may · 17:10", status: "completado" },
      { id: "tl-5", title: "Cita programada", detail: "Sesión informativa confirmada.", time: "14 may · 10:00", status: "activo" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Pendiente de entrevista final.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "aprobado", updatedAt: "Hace 2 días" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Hace 2 días" },
      { id: "doc-3", name: "Certificado", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-4", name: "Identificación", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-5", name: "Comprobante", status: "aprobado", updatedAt: "Hoy" }
    ]
  },
  {
    id: "APL-2026-004",
    folio: "ADM-26-1004",
    name: "Óscar Ramírez",
    career: "Gestión Educativa",
    email: "oscar.ramirez@mail.com",
    phone: "814-555-0198",
    city: "Apodaca",
    modality: "Mixta",
    source: "Recomendación docente",
    lastContact: "Hace 1 día",
    owner: "Mtra. Laura Treviño",
    priority: "media",
    documentStatus: "aprobado",
    stage: "Inscripción finalizada",
    status: "aprobado",
    registeredAt: "3 de mayo de 2026",
    conversionProbability: 95,
    nextAction: "Enviar bienvenida e instrucciones de inicio",
    daysWithoutFollowUp: 0,
    observations: "Listo para incorporarse al primer bloque.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Se registró por recomendación interna.", time: "3 may · 09:00", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Se explicó plan de estudios.", time: "4 may · 11:25", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Aceptó avanzar con expediente.", time: "5 may · 15:40", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Expediente completo.", time: "6 may · 10:50", status: "completado" },
      { id: "tl-5", title: "Cita programada", detail: "Entrevista final completada.", time: "8 may · 13:20", status: "completado" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Inscripción finalizada correctamente.", time: "12 may · 17:00", status: "completado" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "aprobado", updatedAt: "Hace 5 días" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Hace 5 días" },
      { id: "doc-3", name: "Certificado", status: "aprobado", updatedAt: "Hace 4 días" },
      { id: "doc-4", name: "Identificación", status: "aprobado", updatedAt: "Hace 4 días" },
      { id: "doc-5", name: "Comprobante", status: "aprobado", updatedAt: "Hace 3 días" }
    ]
  },
  {
    id: "APL-2026-005",
    folio: "ADM-26-1005",
    name: "Lucía Estrada",
    career: "Psicopedagogía",
    email: "lucia.estrada@mail.com",
    phone: "819-555-0144",
    city: "Santa Catarina",
    modality: "Presencial",
    source: "Facebook Ads",
    lastContact: "Hace 3 horas",
    owner: "Lic. Mariana Peña",
    priority: "alta",
    documentStatus: "pendiente",
    stage: "Nuevo registro",
    status: "activo",
    registeredAt: "14 de mayo de 2026",
    conversionProbability: 52,
    nextAction: "Enviar primer correo de seguimiento",
    daysWithoutFollowUp: 0,
    observations: "Quedó en revisar opciones de beca familiar.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Llegó desde campaña de Facebook.", time: "14 may · 07:40", status: "activo" },
      { id: "tl-2", title: "Llamada realizada", detail: "Pendiente de primer contacto.", time: "Pendiente", status: "pendiente" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Pendiente de envío.", time: "Pendiente", status: "pendiente" },
      { id: "tl-4", title: "Documento solicitado", detail: "Pendiente de checklist.", time: "Pendiente", status: "pendiente" },
      { id: "tl-5", title: "Cita programada", detail: "Pendiente de confirmación.", time: "Pendiente", status: "pendiente" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Pendiente de evolución.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-2", name: "CURP", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-3", name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-4", name: "Identificación", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-5", name: "Comprobante", status: "pendiente", updatedAt: "Nunca" }
    ]
  },
  {
    id: "APL-2026-006",
    folio: "ADM-26-1006",
    name: "Emiliano Ríos",
    career: "Ingeniería en Software",
    email: "emiliano.rios@mail.com",
    phone: "811-555-0122",
    city: "Monterrey",
    modality: "Mixta",
    source: "Evento virtual",
    lastContact: "Hace 5 horas",
    owner: "Lic. Brenda Salas",
    priority: "media",
    documentStatus: "en_revision",
    stage: "Evaluación / entrevista",
    status: "en_revision",
    registeredAt: "10 de mayo de 2026",
    conversionProbability: 71,
    nextAction: "Confirmar horario de entrevista",
    daysWithoutFollowUp: 1,
    observations: "Interesado en turno nocturno y residencia cercana.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Se registró tras evento virtual.", time: "10 may · 19:10", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Se acordó continuar por correo.", time: "11 may · 10:20", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Se compartió calendario de entrevistas.", time: "12 may · 08:30", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Expediente en revisión.", time: "13 may · 12:00", status: "activo" },
      { id: "tl-5", title: "Cita programada", detail: "Pendiente de confirmación.", time: "Pendiente", status: "pendiente" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Después de entrevista final.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-3", name: "Certificado", status: "en_revision", updatedAt: "Hoy" },
      { id: "doc-4", name: "Identificación", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-5", name: "Comprobante", status: "pendiente", updatedAt: "Nunca" }
    ]
  },
  {
    id: "APL-2026-007",
    folio: "ADM-26-1007",
    name: "Valeria Castillo",
    career: "Negocios Internacionales",
    email: "valeria.castillo@mail.com",
    phone: "812-555-0177",
    city: "San Nicolás",
    modality: "Presencial",
    source: "Stand en preparatoria",
    lastContact: "Ayer 09:10",
    owner: "Mtra. Daniela Cruz",
    priority: "baja",
    documentStatus: "aprobado",
    stage: "Documentación pendiente",
    status: "activo",
    registeredAt: "8 de mayo de 2026",
    conversionProbability: 74,
    nextAction: "Verificar certificado y programar cita",
    daysWithoutFollowUp: 1,
    observations: "Muy cercana a cerrar proceso si completa papeles.",
    timeline: [
      { id: "tl-1", title: "Registro creado", detail: "Captación en visita escolar.", time: "8 may · 08:50", status: "completado" },
      { id: "tl-2", title: "Llamada realizada", detail: "Solicitó seguimiento por WhatsApp.", time: "9 may · 13:15", status: "completado" },
      { id: "tl-3", title: "Mensaje enviado", detail: "Se remitió lista de documentos.", time: "10 may · 16:00", status: "completado" },
      { id: "tl-4", title: "Documento solicitado", detail: "Falta certificado oficial.", time: "11 may · 11:45", status: "activo" },
      { id: "tl-5", title: "Cita programada", detail: "Pendiente de confirmar horario.", time: "Pendiente", status: "pendiente" },
      { id: "tl-6", title: "Cambio de estatus", detail: "Pendiente de última revisión.", time: "Pendiente", status: "pendiente" }
    ],
    documents: [
      { id: "doc-1", name: "Acta de nacimiento", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-2", name: "CURP", status: "aprobado", updatedAt: "Ayer" },
      { id: "doc-3", name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
      { id: "doc-4", name: "Identificación", status: "aprobado", updatedAt: "Hoy" },
      { id: "doc-5", name: "Comprobante", status: "en_revision", updatedAt: "Hoy" }
    ]
  }
];
