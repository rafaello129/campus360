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

const APPLICANTS_STORAGE_KEY = "campus360:applicants:v1";
const CURRENT_APPLICANT_STORAGE_KEY = "campus360:current-applicant:v1";
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

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
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
    const rawValue = window.localStorage.getItem(APPLICANTS_STORAGE_KEY);
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

function normalizeLabel(value: string | undefined, labels: Record<string, string>, fallback: string) {
  if (!value) return fallback;
  return labels[value] ?? value;
}

function buildApplicant(input: CreateApplicantInput): AdminApplicantRecord {
  const now = new Date();
  const year = now.getFullYear();
  const token = randomToken();
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
      { id: `doc-${token}-1`, name: "Acta de nacimiento", status: "pendiente", updatedAt: "Nunca" },
      { id: `doc-${token}-2`, name: "CURP", status: "pendiente", updatedAt: "Nunca" },
      { id: `doc-${token}-3`, name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
      { id: `doc-${token}-4`, name: "Identificación", status: "pendiente", updatedAt: "Nunca" },
      { id: `doc-${token}-5`, name: "Comprobante", status: "pendiente", updatedAt: "Nunca" }
    ]
  };
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

export function getCurrentApplicant(): AdminApplicantRecord | undefined {
  if (!canUseStorage()) return undefined;

  try {
    const currentId = window.localStorage.getItem(CURRENT_APPLICANT_STORAGE_KEY);
    return currentId ? getApplicantById(currentId) : undefined;
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
  const previousApplicantsValue = window.localStorage.getItem(APPLICANTS_STORAGE_KEY);
  const previousCurrentValue = window.localStorage.getItem(CURRENT_APPLICANT_STORAGE_KEY);
  const payload: ApplicantStoragePayload = {
    version: STORAGE_VERSION,
    applicants: [applicant, ...readStoredApplicants()]
  };

  try {
    window.localStorage.setItem(APPLICANTS_STORAGE_KEY, JSON.stringify(payload));
    if (options.setAsCurrent) {
      window.localStorage.setItem(CURRENT_APPLICANT_STORAGE_KEY, applicant.id);
    }
  } catch {
    try {
      if (previousApplicantsValue === null) {
        window.localStorage.removeItem(APPLICANTS_STORAGE_KEY);
      } else {
        window.localStorage.setItem(APPLICANTS_STORAGE_KEY, previousApplicantsValue);
      }

      if (previousCurrentValue === null) {
        window.localStorage.removeItem(CURRENT_APPLICANT_STORAGE_KEY);
      } else {
        window.localStorage.setItem(CURRENT_APPLICANT_STORAGE_KEY, previousCurrentValue);
      }
    } catch {
      // The original write error is the actionable failure for the UI.
    }

    throw new Error("No fue posible guardar la solicitud en este navegador. Intenta nuevamente.");
  }

  return applicant;
}
