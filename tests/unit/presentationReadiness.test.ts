import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEMO_ADVISOR, DEMO_APPLICANT, DEMO_CALL_NOTE, DEMO_DOCUMENT_NAME } from "../../src/config/demo";
import { updateApplicant, updateApplicantDocument } from "../../src/data/applicantStorage";
import { createOrResumeDemoApplicant } from "../../src/data/demoSession";
import {
  getPresentationReadiness,
  getPresentationReadinessMessage
} from "../../src/data/presentationReadiness";

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

describe("presentationReadiness", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T14:00:00-05:00"));
  });

  it("empieza en escena 1 cuando Ana no existe", () => {
    expect(getPresentationReadiness()).toMatchObject({
      hasApplicant: false,
      suggestedSceneId: 1
    });
    expect(getPresentationReadinessMessage(4)).toContain("Ana aún no está registrada");
  });

  it("sugiere seguimiento después del registro", () => {
    createOrResumeDemoApplicant(demoInput);
    expect(getPresentationReadiness()).toMatchObject({
      hasApplicant: true,
      followUpComplete: false,
      documentComplete: false,
      suggestedSceneId: 4
    });
  });

  it("detecta Brenda, llamada y Contacto inicial", () => {
    const { applicant } = createOrResumeDemoApplicant(demoInput);
    updateApplicant(
      applicant.id,
      { owner: DEMO_ADVISOR, stage: "Contacto inicial" },
      {
        timelineEvent: {
          title: "Llamada registrada",
          detail: DEMO_CALL_NOTE
        }
      }
    );

    expect(getPresentationReadiness()).toMatchObject({
      hasAdvisor: true,
      hasCall: true,
      hasTargetStage: true,
      followUpComplete: true,
      suggestedSceneId: 5
    });
  });

  it("avisa cuando la escena documental se abre antes de completar seguimiento", () => {
    createOrResumeDemoApplicant(demoInput);
    expect(getPresentationReadinessMessage(5)).toContain("seguimiento administrativo aún no está completo");
    expect(getPresentationReadinessMessage(7)).toBeUndefined();
  });

  it("distingue certificado pendiente, en revisión y aprobado", () => {
    const { applicant } = createOrResumeDemoApplicant(demoInput);
    updateApplicant(
      applicant.id,
      { owner: DEMO_ADVISOR, stage: "Contacto inicial" },
      {
        timelineEvent: {
          title: "Llamada registrada",
          detail: DEMO_CALL_NOTE
        }
      }
    );
    const certificate = applicant.documents.find((item) => item.name === DEMO_DOCUMENT_NAME)!;

    expect(getPresentationReadinessMessage(5)).toContain("Listo para cargar");

    updateApplicantDocument(applicant.id, certificate.id, { status: "en_revision" });
    expect(getPresentationReadiness()).toMatchObject({
      documentStatus: "en_revision",
      documentComplete: false,
      suggestedSceneId: 5
    });
    expect(getPresentationReadinessMessage(5)).toContain("ya está en revisión");

    updateApplicantDocument(applicant.id, certificate.id, { status: "aprobado" });
    expect(getPresentationReadiness()).toMatchObject({
      documentStatus: "aprobado",
      documentComplete: true,
      suggestedSceneId: 6
    });
    expect(getPresentationReadinessMessage(5)).toContain("ya está completada");
  });
});