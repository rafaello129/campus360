import type { LucideIcon } from "lucide-react";

export type Role = "aspirante" | "estudiante" | "administrativo";

export type Status =
  | "pendiente"
  | "activo"
  | "completado"
  | "urgente"
  | "aprobado"
  | "rechazado"
  | "en_revision";

export type TrendDirection = "up" | "down" | "neutral";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  description?: string;
  badge?: string;
}

export interface Metric {
  label: string;
  value: string;
  trend: string;
  trendDirection: TrendDirection;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  status?: Status;
  meta?: string;
}

export interface ModuleScaffoldData {
  title: string;
  description: string;
  helperText: string;
  actionLabel: string;
  secondaryActionLabel?: string;
  highlights: HighlightItem[];
}

export interface Career {
  id: string;
  name: string;
  area: string;
  duration: string;
  modality: string;
  status: Status;
  summary: string;
  highlights: string[];
}

export interface AdmissionStep {
  id: string;
  title: string;
  detail: string;
  status: Status;
}

export interface AdmissionDocument {
  id: string;
  name: string;
  dueDate: string;
  status: Status;
}

export interface AgendaItem {
  id: string;
  date: string;
  time: string;
  title: string;
  course: string;
  location: string;
  status: Status;
  type?: string;
}

export interface Notice {
  id: string;
  title: string;
  channel: string;
  summary: string;
  status: Status;
  category?: string;
  priority?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: Status;
  summary: string;
  type?: string;
  capacity?: number;
  registered?: number;
}

export interface TrajectoryMilestone {
  id: string;
  title: string;
  period: string;
  status: Status;
  note: string;
}

export interface DocumentRequest {
  id: string;
  name: string;
  area: string;
  status: Status;
  updatedAt: string;
  description?: string;
}

export interface Professor {
  id: string;
  name: string;
  subject: string;
  availability: string;
  status: Status;
  email?: string;
  phone?: string;
  office?: string;
}

export interface KanbanCandidate {
  id: string;
  name: string;
  program: string;
  score: number;
  status: Status;
}

export interface KanbanColumn {
  id: string;
  title: string;
  candidates: KanbanCandidate[];
}

export interface StudentRecord {
  id: string;
  name: string;
  program: string;
  semester: string;
  advisor: string;
  status: Status;
}

export interface InstitutionAlert {
  id: string;
  title: string;
  audience: string;
  channel: string;
  status: Status;
}

export interface RoleSetting {
  id: string;
  role: string;
  permissions: string[];
  status: Status;
}

