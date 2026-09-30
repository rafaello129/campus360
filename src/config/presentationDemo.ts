import { DEMO_APPLICANT, DEMO_ADVISOR, DEMO_CALL_NOTE, DEMO_DOCUMENT_NAME } from "./demo";
import { STUDENT_DEMO } from "./studentDemo";
import { paths } from "../router/paths";

export type PresentationRole = "Selector" | "Aspirante" | "Administrativo" | "Estudiante";

export interface PresentationScene {
  id: number;
  title: string;
  role: PresentationRole;
  entryPath: string;
  checklist: string[];
}

export const PRESENTATION_STORAGE_KEY = "campus360:presentation:v1";
export const PRESENTATION_CHANGE_EVENT = "campus360:presentation-change";

export const PRESENTATION_SCENES: PresentationScene[] = [
  {
    id: 1,
    title: "Inicio del recorrido",
    role: "Selector",
    entryPath: paths.roleSelector,
    checklist: [
      "Confirma que el estado de la simulación esté limpio.",
      "Presenta los tres perfiles de Campus360.",
      "Entra como Aspirante."
    ]
  },
  {
    id: 2,
    title: "Exploración académica",
    role: "Aspirante",
    entryPath: paths.aspirante.carreras,
    checklist: [
      `Localiza ${DEMO_APPLICANT.careerName}.`,
      "Abre el detalle de la carrera.",
      "Explica modalidad y duración.",
      "Selecciona Iniciar registro."
    ]
  },
  {
    id: 3,
    title: "Registro de Ana",
    role: "Aspirante",
    entryPath: paths.aspirante.registroCarrera(DEMO_APPLICANT.careerId),
    checklist: [
      `${DEMO_APPLICANT.name} · ${DEMO_APPLICANT.email}`,
      `${DEMO_APPLICANT.careerName} · Presencial · Bachillerato · Página web`,
      `Comentario: ${DEMO_APPLICANT.comments}`,
      "Envía la solicitud, muestra el folio y abre Mi proceso de admisión."
    ]
  },
  {
    id: 4,
    title: "Seguimiento administrativo",
    role: "Administrativo",
    entryPath: paths.admin.captacion,
    checklist: [
      `Busca a ${DEMO_APPLICANT.name} y abre su expediente.`,
      `Asigna a ${DEMO_ADVISOR}.`,
      `Registra la llamada: “${DEMO_CALL_NOTE}”.`,
      "Cambia el estatus a Contacto inicial.",
      "Vuelve como Aspirante y muestra el cambio en Mi proceso."
    ]
  },
  {
    id: 5,
    title: "Control documental",
    role: "Aspirante",
    entryPath: paths.aspirante.documentos,
    checklist: [
      `Carga un PDF en ${DEMO_DOCUMENT_NAME}.`,
      "Comprueba que quede En revisión.",
      "Cambia a Administrativo y aprueba el mismo documento.",
      "Regresa como Aspirante y muestra Aprobado."
    ]
  },
  {
    id: 6,
    title: "Vida universitaria",
    role: "Estudiante",
    entryPath: paths.estudiante.agenda,
    checklist: [
      "Muestra Agenda, Avisos y Trayectoria.",
      "Abre Eventos.",
      "Selecciona Feria de becas y financiamiento.",
      `Abre el detalle de ${STUDENT_DEMO.eventId} y después Ver en mapa.`
    ]
  },
  {
    id: 7,
    title: "Analítica y alertas",
    role: "Administrativo",
    entryPath: paths.admin.analitica,
    checklist: [
      "Explica el snapshot institucional y las 47 señales agregadas.",
      "Selecciona Revisar alertas.",
      "Aclara que la bandeja contiene 4 casos representativos.",
      "Opcional: atiende el caso crítico si el tiempo lo permite."
    ]
  }
];

export const PRESENTATION_SCENE_COUNT = PRESENTATION_SCENES.length;

export function getPresentationScene(sceneId: number | undefined) {
  return PRESENTATION_SCENES.find((scene) => scene.id === sceneId);
}
