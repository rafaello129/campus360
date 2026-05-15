export const paths = {
  roleSelector: "/",
  aspirante: {
    root: "/aspirante",
    carreras: "/aspirante/carreras",
    carreraDetalle: (careerId: string) => `/aspirante/carreras/${careerId}`,
    registro: "/aspirante/registro",
    proceso: "/aspirante/proceso",
    documentos: "/aspirante/documentos",
    chatbot: "/aspirante/chatbot",
    mapa: "/aspirante/mapa",
    procesoAdmision: "/aspirante/proceso",
    documentacion: "/aspirante/documentos"
  },
  estudiante: {
    root: "/estudiante",
    agenda: "/estudiante/agenda",
    avisos: "/estudiante/avisos",
    canales: "/estudiante/canales",
    eventos: "/estudiante/eventos",
    eventoDetalle: (eventId: string) => `/estudiante/eventos/${eventId}`,
    trayectoria: "/estudiante/trayectoria",
    documentos: "/estudiante/documentos",
    profesores: "/estudiante/profesores",
    mapa: "/estudiante/mapa",
    chat: "/estudiante/chat",
    asistente: "/estudiante/asistente",
    chatbot: "/estudiante/chatbot",
    directorio: "/estudiante/profesores",
    chatGrupo: "/estudiante/chat"
  },
  admin: {
    root: "/admin",
    captacion: "/admin/captacion",
    aspirantePerfil: (aspiranteId: string) => `/admin/aspirantes/${aspiranteId}`,
    aspirantesDemo: "/admin/aspirantes/APL-2026-001",
    estudiantes: "/admin/estudiantes",
    seguimiento: "/admin/seguimiento",
    estudiantePerfil: (studentId: string) => `/admin/seguimiento?estudiante=${studentId}`,
    alertas: "/admin/alertas",
    difusion: "/admin/difusion",
    crearPublicacion: "/admin/publicaciones/nueva",
    canales: "/admin/canales",
    documentos: "/admin/documentos",
    directorio: "/admin/directorio",
    mapa: "/admin/mapa",
    analitica: "/admin/analitica",
    roles: "/admin/roles",
    documentosTramites: "/admin/documentos",
    mapaEspacios: "/admin/mapa",
    rolesConfig: "/admin/roles"
  }
};

