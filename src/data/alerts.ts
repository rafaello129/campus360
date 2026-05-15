import type { AlertRecord } from "../types/campus";

export const alerts: AlertRecord[] = [
  {
    id: "ALT-001",
    title: "Incremento de inasistencia en primer semestre",
    audience: "Primer ingreso",
    owner: "Coordinación académica",
    priority: "alta",
    status: "urgente"
  },
  {
    id: "ALT-002",
    title: "Casos con riesgo de baja por pagos retrasados",
    audience: "Finanzas + tutorías",
    owner: "Mesa de permanencia",
    priority: "media",
    status: "en_revision"
  },
  {
    id: "ALT-003",
    title: "Baja participación en canal de avisos",
    audience: "Estudiantes 3er semestre",
    owner: "Comunicación institucional",
    priority: "baja",
    status: "activo"
  },
  {
    id: "ALT-004",
    title: "Seguimiento a aspirantes sin documentos completos",
    audience: "Aspirantes nuevo ingreso",
    owner: "Admisiones",
    priority: "media",
    status: "pendiente"
  }
];

