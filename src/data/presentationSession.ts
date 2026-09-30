import {
  PRESENTATION_CHANGE_EVENT,
  PRESENTATION_SCENE_COUNT,
  PRESENTATION_STORAGE_KEY,
  getPresentationScene
} from "../config/presentationDemo";

const PRESENTATION_SESSION_VERSION = 1;

export interface PresentationSession {
  version: typeof PRESENTATION_SESSION_VERSION;
  enabled: boolean;
  currentSceneId: number;
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

function isPresentationSession(value: unknown): value is PresentationSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<PresentationSession>;
  return (
    session.version === PRESENTATION_SESSION_VERSION &&
    session.enabled === true &&
    typeof session.currentSceneId === "number" &&
    Boolean(getPresentationScene(session.currentSceneId))
  );
}

function emitPresentationChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(PRESENTATION_CHANGE_EVENT));
}

export function getPresentationSession(): PresentationSession | undefined {
  if (!canUseStorage()) return undefined;

  try {
    const rawValue = window.sessionStorage.getItem(PRESENTATION_STORAGE_KEY);
    if (!rawValue) return undefined;
    const parsed = JSON.parse(rawValue) as unknown;
    if (!isPresentationSession(parsed)) {
      window.sessionStorage.removeItem(PRESENTATION_STORAGE_KEY);
      return undefined;
    }
    return parsed;
  } catch {
    return undefined;
  }
}

function writePresentationSession(session: PresentationSession) {
  if (!canUseStorage()) {
    throw new Error("El almacenamiento de sesión no está disponible en este navegador.");
  }

  try {
    window.sessionStorage.setItem(PRESENTATION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    throw new Error("No fue posible guardar el estado de la presentación.");
  }

  emitPresentationChange();
  return session;
}

export function enablePresentation(sceneId = 1) {
  const validSceneId = getPresentationScene(sceneId) ? sceneId : 1;
  return writePresentationSession({
    version: PRESENTATION_SESSION_VERSION,
    enabled: true,
    currentSceneId: validSceneId
  });
}

export function disablePresentation() {
  if (!canUseStorage()) return;
  try {
    window.sessionStorage.removeItem(PRESENTATION_STORAGE_KEY);
  } finally {
    emitPresentationChange();
  }
}

export function setPresentationScene(sceneId: number) {
  if (!getPresentationScene(sceneId)) {
    throw new Error("La escena de presentación indicada no existe.");
  }

  return writePresentationSession({
    version: PRESENTATION_SESSION_VERSION,
    enabled: true,
    currentSceneId: sceneId
  });
}

export function nextPresentationScene() {
  const current = getPresentationSession();
  const nextId = Math.min((current?.currentSceneId ?? 1) + 1, PRESENTATION_SCENE_COUNT);
  return setPresentationScene(nextId);
}

export function previousPresentationScene() {
  const current = getPresentationSession();
  const previousId = Math.max((current?.currentSceneId ?? 1) - 1, 1);
  return setPresentationScene(previousId);
}

export function resetPresentationGuide() {
  return setPresentationScene(1);
}

export function subscribeToPresentationChanges(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handler = () => callback();
  window.addEventListener(PRESENTATION_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(PRESENTATION_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
