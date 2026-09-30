import {
  DEMO_ADVISOR,
  DEMO_CALL_NOTE,
  DEMO_DOCUMENT_NAME,
  DEMO_TARGET_STAGE
} from "../config/demo";
import { getDemoApplicant } from "./demoSession";

export interface PresentationReadiness {
  hasApplicant: boolean;
  hasAdvisor: boolean;
  hasCall: boolean;
  hasTargetStage: boolean;
  followUpComplete: boolean;
  documentStatus: "missing" | "pendiente" | "en_revision" | "aprobado" | "rechazado" | "otro";
  documentComplete: boolean;
  suggestedSceneId: number;
}

export function getPresentationReadiness(): PresentationReadiness {
  const applicant = getDemoApplicant();

  if (!applicant) {
    return {
      hasApplicant: false,
      hasAdvisor: false,
      hasCall: false,
      hasTargetStage: false,
      followUpComplete: false,
      documentStatus: "missing",
      documentComplete: false,
      suggestedSceneId: 1
    };
  }

  const hasAdvisor = applicant.owner === DEMO_ADVISOR;
  const hasCall = applicant.timeline.some(
    (item) =>
      item.title.toLowerCase().includes("llamada") &&
      (item.detail === DEMO_CALL_NOTE || item.detail.includes(DEMO_CALL_NOTE))
  );
  const hasTargetStage = applicant.stage === DEMO_TARGET_STAGE;
  const document = applicant.documents.find((item) => item.name === DEMO_DOCUMENT_NAME);
  const rawDocumentStatus = document?.status;

  const documentStatus: PresentationReadiness["documentStatus"] =
    rawDocumentStatus === undefined
      ? "missing"
      : rawDocumentStatus === "pendiente" ||
          rawDocumentStatus === "en_revision" ||
          rawDocumentStatus === "aprobado" ||
          rawDocumentStatus === "rechazado"
        ? rawDocumentStatus
        : "otro";

  const followUpComplete = hasAdvisor && hasCall && hasTargetStage;
  const documentComplete = documentStatus === "aprobado";

  return {
    hasApplicant: true,
    hasAdvisor,
    hasCall,
    hasTargetStage,
    followUpComplete,
    documentStatus,
    documentComplete,
    suggestedSceneId: !followUpComplete ? 4 : !documentComplete ? 5 : 6
  };
}

export function getPresentationReadinessMessage(sceneId: number) {
  const readiness = getPresentationReadiness();

  if (sceneId === 4 && !readiness.hasApplicant) {
    return "Ana aún no está registrada. Puedes volver a la Escena 3 para crear el expediente.";
  }

  if (sceneId === 5) {
    if (!readiness.hasApplicant) {
      return "Ana aún no está registrada. Completa primero el registro y seguimiento.";
    }
    if (!readiness.followUpComplete) {
      return "El seguimiento administrativo aún no está completo. Revisa Brenda, llamada y Contacto inicial.";
    }
    if (readiness.documentStatus === "en_revision") {
      return "El certificado ya está en revisión. Continúa desde Admin para aprobarlo.";
    }
    if (readiness.documentStatus === "aprobado") {
      return "La escena documental ya está completada: el certificado figura como Aprobado.";
    }
    return "Listo para cargar el Certificado de bachillerato desde el portal Aspirante.";
  }

  return undefined;
}
