import {
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  LineChart,
  MessageCircle,
  Megaphone,
  Network,
  PenSquare,
  Sparkles,
  ShieldAlert,
  Send,
  Users,
  UserCog,
  UserSearch
} from "lucide-react";
import type { NavItem } from "../types";
import { paths } from "../router/paths";

export const aspiranteNavItems: NavItem[] = [
  { label: "Inicio", path: paths.aspirante.root, icon: Home },
  { label: "Carreras", path: paths.aspirante.carreras, icon: GraduationCap },
  { label: "Admisión", path: paths.aspirante.registro, icon: UserSearch },
  { label: "Chatbot", path: paths.aspirante.chatbot, icon: Bot },
  { label: "Mapa", path: paths.aspirante.mapa, icon: Compass }
];

export const estudianteNavItems: NavItem[] = [
  { label: "Inicio", path: paths.estudiante.root, icon: Home },
  { label: "Agenda", path: paths.estudiante.agenda, icon: CalendarDays },
  { label: "Avisos", path: paths.estudiante.avisos, icon: Bell, badge: "3" },
  { label: "Canales", path: paths.estudiante.canales, icon: Network },
  { label: "Eventos", path: paths.estudiante.eventos, icon: Megaphone },
  { label: "Trayectoria", path: paths.estudiante.trayectoria, icon: LineChart },
  { label: "Documentos", path: paths.estudiante.documentos, icon: FileText },
  { label: "Profesores", path: paths.estudiante.profesores, icon: Users },
  { label: "Mapa", path: paths.estudiante.mapa, icon: Compass },
  { label: "Chat", path: paths.estudiante.chat, icon: MessageCircle },
  { label: "Asistente", path: paths.estudiante.asistente, icon: Sparkles },
  { label: "Chatbot", path: paths.estudiante.chatbot, icon: Bot }
];

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", path: paths.admin.root, icon: LayoutDashboard },
  { label: "Captación", path: paths.admin.captacion, icon: UserSearch },
  { label: "Aspirantes", path: paths.admin.aspirantesDemo, icon: ClipboardList },
  { label: "Estudiantes", path: paths.admin.estudiantes, icon: GraduationCap },
  { label: "Seguimiento", path: paths.admin.seguimiento, icon: LineChart },
  { label: "Alertas", path: paths.admin.alertas, icon: ShieldAlert, badge: "Urgente" },
  { label: "Difusión", path: paths.admin.difusion, icon: Send },
  { label: "Crear publicación", path: paths.admin.crearPublicacion, icon: PenSquare },
  { label: "Canales", path: paths.admin.canales, icon: Network },
  { label: "Documentos", path: paths.admin.documentos, icon: FileText },
  { label: "Directorio", path: paths.admin.directorio, icon: Users },
  { label: "Mapa", path: paths.admin.mapa, icon: Compass },
  { label: "Analítica", path: paths.admin.analitica, icon: BarChart3 },
  { label: "Roles", path: paths.admin.roles, icon: UserCog }
];

