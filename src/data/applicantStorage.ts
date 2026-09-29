import {
  adminApplicants,
  adminApplicantStages,
  type AdminApplicantRecord,
  type ApplicantDocumentItem,
  type ApplicantPriority,
  type ApplicantTimelineItem
} from "./adminApplicants";
import { careers } from "./careers";
import type { Status } from "../types";
import { CAMPUS360_STORAGE_KEYS } from "../config/demo";
import { emitCampusStorageChange } from "./storageEvents";

const STORAGE_VERSION = 1;

interface ApplicantStoragePayload {
  version: typeof STORAGE_VERSION;
  applicants: AdminApplicantRecord[];
}

export interface CreateApplicantInput {
  name: string;
  email: string;
  phone: string;
  career: string;
  modality?: string;
  education?: string;
  source?: string;
  comments?: string;
  origin: "public" | "admin";
}

interface CreateApplicantOptions {
  setAsCurrent?: boolean;
}

export interface TimelineEventInput {
  title: string;
  detail: string;
  status?: Status;
}

interface UpdateDocumentOptions {
  timelineEvent?: TimelineEventInput;
}

interface UpdateApplicantOptions {
  timelineEvent?: TimelineEventInput;
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

const validStatuses = new Set<Status>([
  "pendiente",
  "activo",
  "completado",
  "urgente",
  "aprobado",
  "rechazado",
  "en_revision"
]);
const validPriorities = new Set<ApplicantPriority>(["alta", "media", "baja"]);

function isStatus(value: unknown): value is Status {
  return typeof value === "string" && validStatuses.has(value as Status);
}

function isTimelineItem(value: unknown): value is ApplicantTimelineItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ApplicantTimelineItem>;
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.detail === "string" &&
    typeof item.time === "string" &&
    isStatus(item.status)
  );
}

function isDocumentItem(value: unknown): value is ApplicantDocumentItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ApplicantDocumentItem>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.updatedAt === "string" &&
    (item.description === undefined || typeof item.description === "string") &&
    (item.required === undefined || typeof item.required === "boolean") &&
    (item.dueDate === undefined || typeof item.dueDate === "string") &&
    (item.fileName === undefined || typeof item.fileName === "string") &&
    (item.fileSize === undefined || typeof item.fileSize === "string") &&
    (item.uploadedAt === undefined || typeof item.uploadedAt === "string") &&
    (item.reviewNote === undefined || typeof item.reviewNote === "string") &&
    isStatus(item.status)
  );
}

function isApplicantRecord(value: unknown): value is AdminApplicantRecord {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<AdminApplicantRecord>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.folio === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.career === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.city === "string" &&
    typeof candidate.modality === "string" &&
    (candidate.education === undefined || typeof candidate.education === "string") &&
    typeof candidate.source === "string" &&
    (candidate.comments === undefined || typeof candidate.comments === "string") &&
    typeof candidate.lastContact === "string" &&
    typeof candidate.owner === "string" &&
    typeof candidate.priority === "string" &&
    validPriorities.has(candidate.priority as ApplicantPriority) &&
    isStatus(candidate.documentStatus) &&
    typeof candidate.stage === "string" &&
    adminApplicantStages.includes(candidate.stage as AdminApplicantRecord["stage"]) &&
    isStatus(candidate.status) &&
    typeof candidate.registeredAt === "string" &&
    typeof candidate.conversionProbability === "number" &&
    typeof candidate.nextAction === "string" &&
    typeof candidate.daysWithoutFollowUp === "number" &&
    typeof candidate.observations === "string" &&
    Array.isArray(candidate.timeline) &&
    candidate.timeline.every(isTimelineItem) &&
    Array.isArray(candidate.documents) &&
    candidate.documents.every(isDocumentItem)
  );
}

function readStoredApplicants(): AdminApplicantRecord[] {
  if (!canUseStorage()) return [];

  try {
    const rawValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants);
    if (!rawValue) return [];

    const payload = JSON.parse(rawValue) as Partial<ApplicantStoragePayload>;
    if (payload.version !== STORAGE_VERSION || !Array.isArray(payload.applicants)) return [];

    return payload.applicants.filter(isApplicantRecord);
  } catch {
    return [];
  }
}

function randomToken() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase();
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
}

function formatRegistrationDate(date: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatTimelineTime(date: Date) {
  const day = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
  const time = new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);

  return `${day} · ${time}`;
}

function formatShortDateTime(date: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function normalizeLabel(value: string | undefined, labels: Record<string, string>, fallback: string) {
  if (!value) return fallback;
  return labels[value] ?? value;
}

function buildApplicant(input: CreateApplicantInput): AdminApplicantRecord {
  const now = new Date();
  const year = now.getFullYear();
  const token = randomToken();
  const requiredDocumentsDueDate = formatRegistrationDate(addDays(now, 7));
  const addressDueDate = formatRegistrationDate(addDays(now, 14));
  const originDetail =
    input.origin === "public"
      ? "Solicitud enviada desde el portal de aspirantes."
      : "Alta manual desde el tablero de captación.";

  return {
    id: `APL-${year}-${token}`,
    folio: `ASP-${year}-${token.slice(-6)}`,
    name: input.name.trim(),
    career: careers.find((career) => career.id === input.career)?.name ?? input.career,
    email: input.email.trim(),
    phone: input.phone.trim() || "Por definir",
    city: "Por definir",
    modality: normalizeLabel(
      input.modality,
      { presencial: "Presencial", hibrido: "Híbrido", en_linea: "En línea" },
      "Por definir"
    ),
    education: input.education
      ? normalizeLabel(input.education, { bachillerato: "Bachillerato", tecnico: "Técnico", otro: "Otro" }, "")
      : undefined,
    source: normalizeLabel(
      input.source,
      {
        redes_sociales: "Redes sociales",
        amigos: "Recomendación de amigos",
        web: "Página web",
        evento: "Evento o charla",
        otro: "Otro"
      },
      "Portal web"
    ),
    comments: input.comments?.trim() || undefined,
    lastContact: "Sin contacto",
    owner: "Pendiente de asignación",
    priority: "media",
    documentStatus: "pendiente",
    stage: "Nuevo registro",
    status: "activo",
    registeredAt: formatRegistrationDate(now),
    conversionProbability: 48,
    nextAction: "Realizar primer contacto",
    daysWithoutFollowUp: 0,
    observations:
      input.comments?.trim() ||
      (input.origin === "public"
        ? "Solicitud creada desde el portal de aspirantes."
        : "Captura creada desde el panel administrativo."),
    timeline: [
      {
        id: `tl-${token}`,
        title: "Registro creado",
        detail: originDetail,
        time: formatTimelineTime(now),
        status: "activo"
      }
    ],
    documents: [
      {
        id: `doc-${token}-1`,
        name: "Acta de nacimiento",
        description: "Documento oficial de nacimiento",
        required: true,
        dueDate: requiredDocumentsDueDate,
        status: "pendiente",
        updatedAt: "Nunca"
      },
      {
        id: `doc-${token}-2`,
        name: "CURP",
        description: "Clave Única de Registro de Población",
        required: true,
        dueDate: requiredDocumentsDueDate,
        status: "pendiente",
        updatedAt: "Nunca"
      },
      {
        id: `doc-${token}-3`,
        name: "Certificado de bachillerato",
        description: "Certificado del nivel de educación anterior",
        required: true,
        dueDate: requiredDocumentsDueDate,
        status: "pendiente",
        updatedAt: "Nunca"
      },
      {
        id: `doc-${token}-4`,
        name: "Identificación oficial",
        description: "Credencial, pasaporte o documento de identidad",
        required: true,
        dueDate: requiredDocumentsDueDate,
        status: "pendiente",
        updatedAt: "Nunca"
      },
      {
        id: `doc-${token}-5`,
        name: "Comprobante de domicilio",
        description: "Recibo de servicios o documento equivalente",
        required: true,
        dueDate: addressDueDate,
        status: "pendiente",
        updatedAt: "Nunca"
      }
    ]
  };
}

function buildTimelineItem(event: TimelineEventInput): ApplicantTimelineItem {
  return {
    id: `tl-${randomToken()}`,
    title: event.title,
    detail: event.detail,
    time: formatTimelineTime(new Date()),
    status: event.status ?? "activo"
  };
}

function calculateDocumentStatus(documents: ApplicantDocumentItem[]): Status {
  const requiredDocuments = documents.filter((document) => document.required !== false);
  if (documents.some((document) => document.status === "rechazado")) return "rechazado";
  if (requiredDocuments.length > 0 && requiredDocuments.every((document) => document.status === "aprobado")) {
    return "aprobado";
  }
  if (documents.some((document) => document.status !== "pendiente")) return "en_revision";
  return "pendiente";
}

function writeStoredApplicants(applicants: AdminApplicantRecord[]) {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }

  const previousValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants);
  const payload: ApplicantStoragePayload = { version: STORAGE_VERSION, applicants };

  try {
    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.applicants, JSON.stringify(payload));
  } catch {
    try {
      if (previousValue === null) window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.applicants);
      else window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.applicants, previousValue);
    } catch {
      // Preserve the original storage failure for the calling UI.
    }
    throw new Error("No fue posible guardar los cambios en este navegador. Intenta nuevamente.");
  }

  emitCampusStorageChange();
}

export function listApplicants(): AdminApplicantRecord[] {
  const recordsById = new Map<string, AdminApplicantRecord>();

  for (const applicant of [...readStoredApplicants(), ...adminApplicants]) {
    if (!recordsById.has(applicant.id)) recordsById.set(applicant.id, applicant);
  }

  return Array.from(recordsById.values());
}

export function getApplicantById(id: string | undefined): AdminApplicantRecord | undefined {
  if (!id) return undefined;
  return listApplicants().find((applicant) => applicant.id === id);
}

export function findApplicantByEmail(email: string): AdminApplicantRecord | undefined {
  const normalizedEmail = normalizeEmail(email);
  return listApplicants().find((applicant) => normalizeEmail(applicant.email) === normalizedEmail);
}

export function setCurrentApplicant(id: string) {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }
  if (!getApplicantById(id)) {
    throw new Error("No se encontró el aspirante que deseas seleccionar.");
  }

  try {
    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.currentApplicant, id);
  } catch {
    throw new Error("No fue posible seleccionar el expediente en este navegador.");
  }

  emitCampusStorageChange();
}

export function clearCurrentApplicant() {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }

  try {
    window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.currentApplicant);
  } catch {
    throw new Error("No fue posible limpiar el expediente activo en este navegador.");
  }

  emitCampusStorageChange();
}

export function getCurrentApplicant(): AdminApplicantRecord | undefined {
  if (!canUseStorage()) return undefined;

  try {
    const currentId = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.currentApplicant);
    if (!currentId) return undefined;

    const applicant = getApplicantById(currentId);
    if (applicant) return applicant;

    // Heal a stale pointer without emitting during a read/render cycle.
    window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.currentApplicant);
    return undefined;
  } catch {
    return undefined;
  }
}

export function createApplicant(
  input: CreateApplicantInput,
  options: CreateApplicantOptions = {}
): AdminApplicantRecord {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }

  const applicant = buildApplicant(input);
  const previousApplicantsValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants);
  const previousCurrentValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.currentApplicant);
  const payload: ApplicantStoragePayload = {
    version: STORAGE_VERSION,
    applicants: [applicant, ...readStoredApplicants()]
  };

  try {
    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.applicants, JSON.stringify(payload));
    if (options.setAsCurrent) {
      window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.currentApplicant, applicant.id);
    }
  } catch {
    try {
      if (previousApplicantsValue === null) {
        window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.applicants);
      } else {
        window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.applicants, previousApplicantsValue);
      }

      if (previousCurrentValue === null) {
        window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.currentApplicant);
      } else {
        window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.currentApplicant, previousCurrentValue);
      }
    } catch {
      // The original write error is the actionable failure for the UI.
    }

    throw new Error("No fue posible guardar la solicitud en este navegador. Intenta nuevamente.");
  }

  emitCampusStorageChange();
  return applicant;
}

export function updateApplicant(
  id: string,
  changes: Partial<Omit<AdminApplicantRecord, "id">>,
  options: UpdateApplicantOptions = {}
): AdminApplicantRecord {
  const currentApplicant = getApplicantById(id);
  if (!currentApplicant) throw new Error("No se encontró el aspirante que deseas actualizar.");

  const updatedApplicant: AdminApplicantRecord = {
    ...currentApplicant,
    ...changes,
    id,
    timeline: options.timelineEvent
      ? [...(changes.timeline ?? currentApplicant.timeline), buildTimelineItem(options.timelineEvent)]
      : (changes.timeline ?? currentApplicant.timeline)
  };
  const storedApplicants = readStoredApplicants();
  writeStoredApplicants([
    updatedApplicant,
    ...storedApplicants.filter((applicant) => applicant.id !== id)
  ]);
  return updatedApplicant;
}

export function addTimelineEvent(id: string, event: TimelineEventInput): AdminApplicantRecord {
  return updateApplicant(id, {}, { timelineEvent: event });
}

export function updateApplicantDocument(
  applicantId: string,
  documentId: string,
  changes: Partial<Omit<ApplicantDocumentItem, "id">>,
  options: UpdateDocumentOptions = {}
): AdminApplicantRecord {
  const applicant = getApplicantById(applicantId);
  if (!applicant) throw new Error("No se encontró el aspirante que deseas actualizar.");
  const documentExists = applicant.documents.some((document) => document.id === documentId);
  if (!documentExists) throw new Error("No se encontró el documento que deseas actualizar.");

  const documents = applicant.documents.map((document) =>
    document.id === documentId ? { ...document, ...changes, id: document.id } : document
  );
  const timeline = options.timelineEvent
    ? [...applicant.timeline, buildTimelineItem(options.timelineEvent)]
    : applicant.timeline;

  return updateApplicant(applicantId, {
    documents,
    documentStatus: calculateDocumentStatus(documents),
    timeline
  });
}

export function getDocumentUpdatedLabel() {
  return formatShortDateTime(new Date());
}
