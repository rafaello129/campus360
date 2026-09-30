import { describe, expect, it, vi } from "vitest";
import { PRESENTATION_CHANGE_EVENT, PRESENTATION_STORAGE_KEY } from "../../src/config/presentationDemo";
import {
  disablePresentation,
  enablePresentation,
  getPresentationSession,
  nextPresentationScene,
  previousPresentationScene,
  resetPresentationGuide,
  setPresentationScene,
  subscribeToPresentationChanges
} from "../../src/data/presentationSession";

describe("presentationSession", () => {
  it("habilita y navega escenas respetando los límites 1..7", () => {
    expect(enablePresentation().currentSceneId).toBe(1);
    expect(setPresentationScene(4).currentSceneId).toBe(4);
    expect(nextPresentationScene().currentSceneId).toBe(5);
    expect(previousPresentationScene().currentSceneId).toBe(4);

    setPresentationScene(1);
    expect(previousPresentationScene().currentSceneId).toBe(1);

    setPresentationScene(7);
    expect(nextPresentationScene().currentSceneId).toBe(7);
  });

  it("usa escena 1 como fallback al habilitar con un id inválido", () => {
    expect(enablePresentation(99).currentSceneId).toBe(1);
  });

  it("puede reiniciar la guía a escena 1", () => {
    enablePresentation(6);
    expect(resetPresentationGuide().currentSceneId).toBe(1);
  });

  it("suscribe y desuscribe cambios del modo presentación", () => {
    const callback = vi.fn();
    const unsubscribe = subscribeToPresentationChanges(callback);

    enablePresentation(2);
    expect(callback).toHaveBeenCalledTimes(1);

    unsubscribe();
    setPresentationScene(3);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("rechaza escenas inexistentes", () => {
    expect(() => setPresentationScene(99)).toThrow("La escena de presentación indicada no existe.");
  });

  it("descarta sesión corrupta o incompatible", () => {
    window.sessionStorage.setItem(PRESENTATION_STORAGE_KEY, "{invalid");
    expect(getPresentationSession()).toBeUndefined();

    window.sessionStorage.setItem(
      PRESENTATION_STORAGE_KEY,
      JSON.stringify({ version: 1, enabled: true, currentSceneId: 99 })
    );
    expect(getPresentationSession()).toBeUndefined();
    expect(window.sessionStorage.getItem(PRESENTATION_STORAGE_KEY)).toBeNull();
  });

  it("emite cambios y disable elimina únicamente el estado de presentación", () => {
    const listener = vi.fn();
    window.addEventListener(PRESENTATION_CHANGE_EVENT, listener);
    window.sessionStorage.setItem("external:session", "keep");

    enablePresentation(2);
    disablePresentation();

    expect(listener).toHaveBeenCalledTimes(2);
    expect(getPresentationSession()).toBeUndefined();
    expect(window.sessionStorage.getItem("external:session")).toBe("keep");
    window.removeEventListener(PRESENTATION_CHANGE_EVENT, listener);
  });
});