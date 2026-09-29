import { CAMPUS360_STORAGE_KEYS } from "../config/demo";

export const CAMPUS_STORAGE_CHANGE_EVENT = "campus360:storage-change";

const campusStorageKeys = new Set<string>(Object.values(CAMPUS360_STORAGE_KEYS));

export function emitCampusStorageChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CAMPUS_STORAGE_CHANGE_EVENT));
}

export function subscribeToCampusStorageChange(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handleCampusChange = () => callback();
  const handleNativeStorage = (event: StorageEvent) => {
    if (event.key === null || campusStorageKeys.has(event.key)) callback();
  };

  window.addEventListener(CAMPUS_STORAGE_CHANGE_EVENT, handleCampusChange);
  window.addEventListener("storage", handleNativeStorage);

  return () => {
    window.removeEventListener(CAMPUS_STORAGE_CHANGE_EVENT, handleCampusChange);
    window.removeEventListener("storage", handleNativeStorage);
  };
}
