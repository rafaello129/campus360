import { CAMPUS360_STORAGE_KEYS, DEMO_APPLICANT } from "../config/demo";
import type { AdminApplicantRecord } from "./adminApplicants";
import {
  createApplicant,
  findApplicantByEmail,
  getApplicantById,
  normalizeEmail,
  setCurrentApplicant,
  type CreateApplicantInput
} from "./applicantStorage";
import { emitCampusStorageChange } from "./storageEvents";

const DEMO_SESSION_VERSION = 1;

interface DemoSessionState {
  version: typeof DEMO_SESSION_VERSION;
  startedAt?: string;
  demoApplicantId?: string;
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isDemoSessionState(value: unknown): value is DemoSessionState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<DemoSessionState>;
  return (
    state.version === DEMO_SESSION_VERSION &&
    (state.startedAt === undefined || typeof state.startedAt === "string") &&
    (state.demoApplicantId === undefined || typeof state.demoApplicantId === "string")
  );
}

export function getDemoSession(): DemoSessionState | undefined {
  if (!canUseStorage()) return undefined;

  try {
    const rawValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.demo);
    if (!rawValue) return undefined;

    const parsed = JSON.parse(rawValue) as unknown;
    return isDemoSessionState(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

export function setDemoSession(
  changes: Omit<Partial<DemoSessionState>, "version">
): DemoSessionState {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }

  const previousValue = window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.demo);
  const current = getDemoSession();
  const nextState: DemoSessionState = {
    version: DEMO_SESSION_VERSION,
    startedAt: current?.startedAt ?? new Date().toISOString(),
    ...current,
    ...changes
  };

  try {
    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.demo, JSON.stringify(nextState));
  } catch {
    try {
      if (previousValue === null) window.localStorage.removeItem(CAMPUS360_STORAGE_KEYS.demo);
      else window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.demo, previousValue);
    } catch {
      // Preserve the original storage failure.
    }
    throw new Error("No fue posible guardar el estado de la simulación.");
  }

  emitCampusStorageChange();
  return nextState;
}

export function isDemoApplicant(applicant: Pick<AdminApplicantRecord, "email">) {
  return normalizeEmail(applicant.email) === normalizeEmail(DEMO_APPLICANT.email);
}

export function getDemoApplicant(): AdminApplicantRecord | undefined {
  const session = getDemoSession();
  const applicantFromSession = session?.demoApplicantId
    ? getApplicantById(session.demoApplicantId)
    : undefined;

  if (applicantFromSession && isDemoApplicant(applicantFromSession)) {
    return applicantFromSession;
  }

  return findApplicantByEmail(DEMO_APPLICANT.email);
}

export function markDemoApplicant(applicantId: string): DemoSessionState {
  const applicant = getApplicantById(applicantId);
  if (!applicant || !isDemoApplicant(applicant)) {
    throw new Error("El expediente indicado no corresponde al aspirante de demostración.");
  }

  return setDemoSession({ demoApplicantId: applicant.id });
}

export interface DemoApplicantResult {
  applicant: AdminApplicantRecord;
  created: boolean;
}

export function createOrResumeDemoApplicant(
  input: CreateApplicantInput
): DemoApplicantResult {
  if (!isDemoApplicant(input)) {
    throw new Error("El registro indicado no corresponde al aspirante de demostración.");
  }

  const existingApplicant = getDemoApplicant();
  if (existingApplicant) {
    setCurrentApplicant(existingApplicant.id);
    markDemoApplicant(existingApplicant.id);
    return { applicant: existingApplicant, created: false };
  }

  const applicant = createApplicant(input, { setAsCurrent: true });
  markDemoApplicant(applicant.id);
  return { applicant, created: true };
}

export function hasActiveDemoSession() {
  return Boolean(getDemoSession() || getDemoApplicant());
}

export function resetDemoSession() {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento local no está disponible en este navegador.");
  }

  const keys = [
    CAMPUS360_STORAGE_KEYS.applicants,
    CAMPUS360_STORAGE_KEYS.currentApplicant,
    CAMPUS360_STORAGE_KEYS.demo
  ] as const;

  const previousValues = new Map<string, string | null>();
  for (const key of keys) {
    previousValues.set(key, window.localStorage.getItem(key));
  }

  try {
    for (const key of keys) window.localStorage.removeItem(key);
  } catch {
    try {
      for (const key of keys) {
        const previousValue = previousValues.get(key) ?? null;
        if (previousValue === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, previousValue);
      }
    } catch {
      // Preserve the reset failure; recovery is best effort.
    }

    throw new Error("No fue posible reiniciar completamente la simulación.");
  }

  emitCampusStorageChange();
}
