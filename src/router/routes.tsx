import { createHashRouter } from "react-router-dom";
// ModuleScaffoldPage removed for Part 3 replacements
import { paths } from "./paths";
import { RoleSelectorPage } from "../pages/RoleSelectorPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AspiranteLayout } from "../layouts/AspiranteLayout";
import { EstudianteLayout } from "../layouts/EstudianteLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { AspiranteOverviewPage } from "../pages/aspirante/AspiranteOverviewPage";
import { CareersPage } from "../pages/aspirante/CareersPage";
import { CareerDetailPage } from "../pages/aspirante/CareerDetailPage";
import { RegistrationPage } from "../pages/aspirante/RegistrationPage";
import { ProcessPage } from "../pages/aspirante/ProcessPage";
import { DocumentsPage } from "../pages/aspirante/DocumentsPage";
import { ChatbotPage as AspiranteChatbotPage } from "../pages/aspirante/ChatbotPage";
import { MapPage as AspiranteMapPage } from "../pages/aspirante/MapPage";
import { EstudianteOverviewPage } from "../pages/estudiante/EstudianteOverviewPage";
import { AgendaPage } from "../pages/estudiante/AgendaPage";
import { AvisosPage } from "../pages/estudiante/AvisosPage";
import { CanalesPage as EstudianteCanalesPage } from "../pages/estudiante/CanalesPage";
import { TrayectoriaPage } from "../pages/estudiante/TrayectoriaPage";
import { DocumentosPage as DocumentosEstPage } from "../pages/estudiante/DocumentosEstPage";
import { MapPage as EstudianteMapPage } from "../pages/estudiante/MapPage";
import { ChatPage } from "../pages/estudiante/ChatPage";
import { AsistentePage } from "../pages/estudiante/AsistentePage";
import { ChatbotPage as EstudianteChatbotPage } from "../pages/estudiante/ChatbotPage";
import { EventoDetallePage } from "../pages/estudiante/EventoDetallePage";
import { EventosPage } from "../pages/estudiante/EventosPage";
import { AdminOverviewPage } from "../pages/admin/AdminOverviewPage";
import { CaptacionKanbanPage } from "../pages/admin/CaptacionKanbanPage";
import { AspirantePerfilPage } from "../pages/admin/AspirantePerfilPage";
import { GestionEstudiantesPage } from "../pages/admin/GestionEstudiantesPage";
import { SeguimientoEstudiantePage } from "../pages/admin/SeguimientoEstudiantePage";
import { AnaliticaPage } from "../pages/admin/AnaliticaPage";
import { AlertasPage } from "../pages/admin/AlertasPage";
import { DifusionPage } from "../pages/admin/DifusionPage";
import { PublicacionNuevaPage } from "../pages/admin/PublicacionNuevaPage";
import { ProfesoresPage } from "../pages/estudiante/ProfesoresPage";
import CanalesPage from "../pages/admin/CanalesPage";
import DocumentosPage from "../pages/admin/DocumentosPage";
import DirectorioPage from "../pages/admin/DirectorioPage";
import MapaPage from "../pages/admin/MapaPage";
import RolesPage from "../pages/admin/RolesPage";

export const router = createHashRouter([
  {
    path: paths.roleSelector,
    element: <RoleSelectorPage />
  },
  {
    path: paths.aspirante.root,
    element: <AspiranteLayout />,
    children: [
      {
        index: true,
        element: <AspiranteOverviewPage />
      },
      {
        path: "carreras",
        element: <CareersPage />
      },
      {
        path: "carreras/:careerId",
        element: <CareerDetailPage />
      },
      {
        path: "registro",
        element: <RegistrationPage />
      },
      {
        path: "proceso",
        element: <ProcessPage />
      },
      {
        path: "documentos",
        element: <DocumentsPage />
      },
      {
        path: "chatbot",
        element: <AspiranteChatbotPage />
      },
      {
        path: "mapa",
        element: <AspiranteMapPage />
      }
    ]
  },
  {
    path: paths.estudiante.root,
    element: <EstudianteLayout />,
    children: [
      {
        index: true,
        element: <EstudianteOverviewPage />
      },
      { path: "agenda", element: <AgendaPage /> },
      { path: "avisos", element: <AvisosPage /> },
      { path: "canales", element: <EstudianteCanalesPage /> },
      {
        path: "eventos",
        element: <EventosPage />
      },
      {
        path: "eventos/:eventId",
        element: <EventoDetallePage />
      },
      { path: "trayectoria", element: <TrayectoriaPage /> },
      { path: "documentos", element: <DocumentosEstPage /> },
      {
        path: "profesores",
        element: <ProfesoresPage />
      },
      { path: "mapa", element: <EstudianteMapPage /> },
      { path: "chat", element: <ChatPage /> },
      { path: "asistente", element: <AsistentePage /> },
      { path: "chatbot", element: <EstudianteChatbotPage /> }
    ]
  },
  {
    path: paths.admin.root,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminOverviewPage />
      },
      {
        path: "captacion",
        element: <CaptacionKanbanPage />
      },
      {
        path: "aspirantes/:id",
        element: <AspirantePerfilPage />
      },
      {
        path: "estudiantes",
        element: <GestionEstudiantesPage />
      },
      {
        path: "seguimiento",
        element: <SeguimientoEstudiantePage />
      },
      {
        path: "alertas",
        element: <AlertasPage />
      },
      {
        path: "difusion",
        element: <DifusionPage />
      },
      {
        path: "publicaciones/nueva",
        element: <PublicacionNuevaPage />
      },
      { path: "canales", element: <CanalesPage /> },
      { path: "documentos", element: <DocumentosPage /> },
      { path: "directorio", element: <DirectorioPage /> },
      { path: "mapa", element: <MapaPage /> },
      {
        path: "analitica",
        element: <AnaliticaPage />
      },
      { path: "roles", element: <RolesPage /> }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
