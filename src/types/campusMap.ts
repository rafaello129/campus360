export type CampusMapVariant = "aspirante" | "estudiante" | "admin";

export type CampusMapCategory =
  | "Academico"
  | "Administrativo"
  | "Servicios"
  | "Recreativo"
  | "Laboratorio"
  | "Atencion estudiantil";

export type CampusVisibility = "Aspirante" | "Estudiante" | "Interno";
export type CampusSpaceStatus = "Activo" | "En revision" | "Restringido";

export interface CampusMapLocation {
  id: string;
  name: string;
  mapLabel?: string;
  type: CampusMapCategory;
  zone: string;
  description: string;
  schedule: string;
  responsible?: string;
  orientation: string;
  estimatedTime: string;
  position: { x: number; y: number };
  accessPoint?: { x: number; y: number };
  footprint: { x: number; y: number; w: number; h: number };
  visibility?: CampusVisibility[];
  status?: CampusSpaceStatus;
  related?: string;
}
