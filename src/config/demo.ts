export const DEMO_APPLICANT = {
  name: "Ana López",
  email: "ana.lopez@example.com",
  careerId: "ing-software",
  careerName: "Ingeniería en Software",
  modality: "presencial",
  education: "bachillerato",
  source: "web",
  comments: "Quisiera conocer los requisitos de inscripción."
} as const;

export const DEMO_ADVISOR = "Lic. Brenda Salas";
export const DEMO_CALL_NOTE = "Se explicaron los requisitos de admisión";
export const DEMO_TARGET_STAGE = "Contacto inicial";
export const DEMO_DOCUMENT_NAME = "Certificado de bachillerato";

export const CAMPUS360_STORAGE_KEYS = {
  applicants: "campus360:applicants:v1",
  currentApplicant: "campus360:current-applicant:v1",
  demo: "campus360:demo:v1"
} as const;
