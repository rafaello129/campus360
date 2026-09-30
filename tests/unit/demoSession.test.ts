import { beforeEach, describe, expect, it, vi } from "vitest";
import { CAMPUS360_STORAGE_KEYS, DEMO_APPLICANT } from "../../src/config/demo";
import { createApplicant } from "../../src/data/applicantStorage";
import {
  createOrResumeDemoApplicant,
  getDemoApplicant,
  getDemoSession,
  hasActiveDemoSession,
  isDemoApplicant,
  markDemoApplicant,
  resetDemoSession
} from "../../src/data/demoSession";

const demoInput = {
  name: DEMO_APPLICANT.name,
  email: DEMO_APPLICANT.email,
  phone: "",
  career: DEMO_APPLICANT.careerId,
  modality: DEMO_APPLICANT.modality,
  education: DEMO_APPLICANT.education,
  source: DEMO_APPLICANT.source,
  comments: DEMO_APPLICANT.comments,
  origin: "public" as const
};

describe("demoSession", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T14:00:00-05:00"));
  });

  it("reconoce a Ana ignorando espacios y mayúsculas", () => {
    expect(isDemoApplicant({ email: " ANA.LOPEZ@EXAMPLE.COM " })).toBe(true);
    expect(isDemoApplicant({ email: "otra@example.com" })).toBe(false);
  });

  it("crea a Ana una sola vez y luego reanuda el mismo expediente", () => {
    const first = createOrResumeDemoApplicant(demoInput);
    const second = createOrResumeDemoApplicant({
      ...demoInput,
      email: " ANA.LOPEZ@EXAMPLE.COM "
    });

    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect(second.applicant.id).toBe(first.applicant.id);
    expect(second.applicant.folio).toBe(first.applicant.folio);
    expect(getDemoApplicant()?.id).toBe(first.applicant.id);

    const payload = JSON.parse(window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants) ?? "{}");
    expect(payload.applicants).toHaveLength(1);
  });

  it("rechaza marcar como demo un expediente distinto", () => {
    const other = createApplicant({ ...demoInput, name: "Otra Persona", email: "otra@example.com" });
    expect(() => markDemoApplicant(other.id)).toThrow(
      "El expediente indicado no corresponde al aspirante de demostración."
    );
  });

  it("rechaza crear el demo con un correo que no sea el de Ana", () => {
    expect(() =>
      createOrResumeDemoApplicant({ ...demoInput, email: "otra@example.com" })
    ).toThrow("El registro indicado no corresponde al aspirante de demostración.");
  });

  it("tolera estado demo ausente, corrupto o incompatible", () => {
    expect(getDemoSession()).toBeUndefined();
    expect(hasActiveDemoSession()).toBe(false);

    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.demo, "{invalid");
    expect(getDemoSession()).toBeUndefined();

    window.localStorage.setItem(
      CAMPUS360_STORAGE_KEYS.demo,
      JSON.stringify({ version: 2, startedAt: 123, demoApplicantId: false })
    );
    expect(getDemoSession()).toBeUndefined();
  });

  it("detecta una sesión activa después de crear a Ana", () => {
    createOrResumeDemoApplicant(demoInput);
    expect(hasActiveDemoSession()).toBe(true);
  });

  it("reinicia solo las claves de Campus360 y conserva claves ajenas", () => {
    createOrResumeDemoApplicant(demoInput);
    window.localStorage.setItem("external:test", "keep");

    resetDemoSession();

    expect(window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants)).toBeNull();
    expect(window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.currentApplicant)).toBeNull();
    expect(window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.demo)).toBeNull();
    expect(window.localStorage.getItem("external:test")).toBe("keep");
  });
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]