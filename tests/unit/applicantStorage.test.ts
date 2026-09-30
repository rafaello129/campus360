import { beforeEach, describe, expect, it, vi } from "vitest";
import { CAMPUS360_STORAGE_KEYS } from "../../src/config/demo";
import {
  createApplicant,
  getCurrentApplicant,
  normalizeEmail,
  updateApplicant,
  updateApplicantDocument
} from "../../src/data/applicantStorage";

const input = {
  name: "Persona Prueba",
  email: "persona@example.com",
  phone: "9980000000",
  career: "ing-software",
  modality: "presencial",
  education: "bachillerato",
  source: "web",
  comments: "Comentario de prueba",
  origin: "public" as const
};

describe("applicantStorage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T14:00:00-05:00"));
  });

  it("normaliza correos de forma estable", () => {
    expect(normalizeEmail(" ANA.LOPEZ@EXAMPLE.COM ")).toBe("ana.lopez@example.com");
  });

  it("crea un expediente completo y lo puede marcar como actual", () => {
    const applicant = createApplicant(input, { setAsCurrent: true });

    expect(applicant.id).toMatch(/^APL-2026-/);
    expect(applicant.folio).toMatch(/^ASP-2026-/);
    expect(applicant.career).toBe("Ingeniería en Software");
    expect(applicant.modality).toBe("Presencial");
    expect(applicant.source).toBe("Página web");
    expect(applicant.documents).toHaveLength(5);
    expect(applicant.timeline[0].title).toBe("Registro creado");
    expect(getCurrentApplicant()?.id).toBe(applicant.id);
  });

  it("sanea un puntero huérfano de aspirante actual", () => {
    window.localStorage.setItem(CAMPUS360_STORAGE_KEYS.currentApplicant, "APL-NO-EXISTE");
    expect(getCurrentApplicant()).toBeUndefined();
    expect(window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.currentApplicant)).toBeNull();
  });

  it("actualiza responsable, etapa y timeline sin cambiar el id", () => {
    const applicant = createApplicant(input);
    const updated = updateApplicant(
      applicant.id,
      { owner: "Lic. Brenda Salas", stage: "Contacto inicial" },
      {
        timelineEvent: {
          title: "Llamada registrada",
          detail: "Se explicaron los requisitos de admisión"
        }
      }
    );

    expect(updated.id).toBe(applicant.id);
    expect(updated.owner).toBe("Lic. Brenda Salas");
    expect(updated.stage).toBe("Contacto inicial");
    expect(updated.timeline.at(-1)?.title).toBe("Llamada registrada");
  });

  it("marca el estado global como rechazado si cualquier documento es rechazado", () => {
    const applicant = createApplicant(input);
    const certificate = applicant.documents.find((item) => item.name === "Certificado de bachillerato")!;
    const rejected = updateApplicantDocument(applicant.id, certificate.id, { status: "rechazado" });
    expect(rejected.documentStatus).toBe("rechazado");
  });

  it("mantiene estado global en revisión mientras quedan documentos requeridos pendientes", () => {
    const applicant = createApplicant(input);
    const certificate = applicant.documents.find((item) => item.name === "Certificado de bachillerato");
    expect(certificate).toBeDefined();

    const reviewing = updateApplicantDocument(applicant.id, certificate!.id, {
      status: "en_revision",
      fileName: "certificado-demo.pdf",
      fileSize: "12 KB",
      uploadedAt: "5 oct 2026",
      updatedAt: "5 oct 2026"
    });

    expect(reviewing.documentStatus).toBe("en_revision");
    expect(reviewing.documents.find((item) => item.id === certificate!.id)?.fileName).toBe("certificado-demo.pdf");

    const approved = updateApplicantDocument(applicant.id, certificate!.id, {
      status: "aprobado",
      reviewNote: "Documento validado"
    });

    expect(approved.documents.find((item) => item.id === certificate!.id)?.status).toBe("aprobado");
    expect(approved.documentStatus).toBe("en_revision");
  });
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]