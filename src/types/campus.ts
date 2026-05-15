import type { Status } from "./index";

export interface CareerRecord {
  id: string;
  name: string;
  area: string;
  duration: string;
  modality: string;
  description: string;
  highlights: string[];
  status: Status;
}

export interface ApplicantRecord {
  id: string;
  name: string;
  career: string;
  stage: string;
  score: number;
  status: Status;
}

export interface StudentProfile {
  id: string;
  name: string;
  career: string;
  semester: string;
  status: Status;
}

export interface CampusEventRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: Status;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  channel: string;
  time: string;
  status: Status;
}

export interface TeacherRecord {
  id: string;
  name: string;
  subject: string;
  office: string;
  availability: string;
  status: Status;
}

export interface DocumentRecord {
  id: string;
  name: string;
  owner: string;
  area: string;
  updatedAt: string;
  status: Status;
}

export interface AlertRecord {
  id: string;
  title: string;
  audience: string;
  owner: string;
  priority: "alta" | "media" | "baja";
  status: Status;
}

export interface ChannelRecord {
  id: string;
  name: string;
  audience: string;
  members: number;
  lastUpdate: string;
  status: Status;
}

export interface ProgressStep {
  id: string;
  title: string;
  detail: string;
  state: "completado" | "activo" | "pendiente";
}

