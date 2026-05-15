import type { ModuleScaffoldData } from "../types";

export const aspiranteScaffolds: Record<string, ModuleScaffoldData> = {
  registro: {
    title: "Registro de aspirante",
    description:
      "Formulario guiado para crear un expediente inicial y avanzar en admisiones.",
    helperText:
      "La experiencia final incluirá validaciones por etapa, carga de evidencia y confirmación de envío.",
    actionLabel: "Simular envío de registro",
    secondaryActionLabel: "Guardar como borrador",
    highlights: [
      {
        id: "ar-1",
        title: "Datos personales capturados",
        description: "Nombre, contacto y carrera de interés.",
        status: "completado"
      },
      {
        id: "ar-2",
        title: "Carga de expediente",
        description: "2 de 4 documentos listos.",
        status: "en_revision"
      },
      {
        id: "ar-3",
        title: "Confirmación institucional",
        description: "Pendiente de generar folio de seguimiento.",
        status: "pendiente"
      }
    ]
  },
  procesoAdmision: {
    title: "Mi proceso de admisión",
    description:
      "Panel de seguimiento para cada hito de admisión con estados claros y próximos pasos.",
    helperText:
      "Aquí se concentrarán notificaciones, observaciones de revisión y evidencias pendientes.",
    actionLabel: "Actualizar estado simulado",
    highlights: [
      {
        id: "ap-1",
        title: "Expediente académico",
        description: "Revisión documental en curso.",
        status: "en_revision"
      },
      {
        id: "ap-2",
        title: "Entrevista diagnóstica",
        description: "Disponible para agendar la próxima semana.",
        status: "activo"
      },
      {
        id: "ap-3",
        title: "Dictamen final",
        description: "Sin emisión todavía.",
        status: "pendiente"
      }
    ]
  },
  documentacion: {
    title: "Documentación de admisión",
    description:
      "Checklist de evidencias requeridas con control de fechas y formato esperado.",
    helperText:
      "Se agregará una vista de previsualización y validación de documentos en próximas iteraciones.",
    actionLabel: "Marcar documento como cargado",
    highlights: [
      {
        id: "ad-1",
        title: "Identificación oficial",
        description: "Documento validado.",
        status: "aprobado"
      },
      {
        id: "ad-2",
        title: "Certificado previo",
        description: "Archivo con observaciones de legibilidad.",
        status: "rechazado"
      },
      {
        id: "ad-3",
        title: "Comprobante de domicilio",
        description: "Carga aún no iniciada.",
        status: "pendiente"
      }
    ]
  },
  chatbot: {
    title: "Chatbot informativo",
    description:
      "Asistente conversacional para dudas de admisión, becas, costos y calendario.",
    helperText:
      "El comportamiento está simulado con respuestas predefinidas para demo de hackathon.",
    actionLabel: "Simular respuesta del bot",
    secondaryActionLabel: "Limpiar conversación",
    highlights: [
      {
        id: "ac-1",
        title: "FAQ de admisiones",
        description: "Respuestas rápidas para etapas y requisitos.",
        status: "activo"
      },
      {
        id: "ac-2",
        title: "Escalamiento a asesor",
        description: "Flujo de atención humana disponible.",
        status: "pendiente"
      }
    ]
  },
  mapa: {
    title: "Mapa del campus para aspirantes",
    description:
      "Vista de espacios clave para recorridos guiados y orientación de primera visita.",
    helperText:
      "Incluye hotspots de áreas académicas, admisiones y servicios estudiantiles.",
    actionLabel: "Simular recorrido guiado",
    highlights: [
      {
        id: "am-1",
        title: "Puntos destacados",
        description: "Admisiones, biblioteca y laboratorios.",
        status: "activo"
      },
      {
        id: "am-2",
        title: "Ruta accesible",
        description: "Disponible para movilidad reducida.",
        status: "aprobado"
      }
    ]
  }
};

aspiranteScaffolds.proceso = aspiranteScaffolds.procesoAdmision;
aspiranteScaffolds.documentos = aspiranteScaffolds.documentacion;

export const estudianteScaffolds: Record<string, ModuleScaffoldData> = {
  agenda: {
    title: "Agenda estudiantil",
    description:
      "Calendario académico con clases, tutorías, entregas y recordatorios institucionales.",
    helperText:
      "En módulos siguientes se añadirán filtros por materia, color por tipo y sincronización.",
    actionLabel: "Agregar recordatorio simulado",
    highlights: [
      {
        id: "ea-1",
        title: "Entrega de proyecto parcial",
        description: "Arquitectura de Software - viernes 14:00.",
        status: "urgente"
      },
      {
        id: "ea-2",
        title: "Tutoría de permanencia",
        description: "Reunión confirmada con tutor académico.",
        status: "activo"
      }
    ]
  },
  avisos: {
    title: "Avisos y notificaciones",
    description:
      "Bandeja institucional centralizada para alertas, comunicados y recordatorios.",
    helperText:
      "Se contempla priorización por urgencia y trazabilidad de lectura.",
    actionLabel: "Marcar aviso como leído",
    highlights: [
      {
        id: "ev-1",
        title: "Cierre de reinscripción",
        description: "Faltan 4 días para finalizar ventana.",
        status: "urgente"
      },
      {
        id: "ev-2",
        title: "Mantenimiento LMS",
        description: "Ventana programada sin impacto crítico.",
        status: "activo"
      }
    ]
  },
  canales: {
    title: "Canales institucionales",
    description:
      "Espacios temáticos para mensajes oficiales por facultad, servicio y comunidad.",
    helperText:
      "Ideal para reemplazar mensajes dispersos y mejorar trazabilidad de comunicación.",
    actionLabel: "Unirme a canal simulado",
    highlights: [
      {
        id: "ec-1",
        title: "Canal Vida universitaria",
        description: "Convocatorias y bienestar estudiantil.",
        status: "activo"
      },
      {
        id: "ec-2",
        title: "Canal Tutorías",
        description: "Soporte para riesgo académico.",
        status: "aprobado"
      }
    ]
  },
  trayectoria: {
    title: "Mi trayectoria",
    description:
      "Seguimiento del avance académico, hitos de permanencia y logros formativos.",
    helperText:
      "Se integrarán recomendaciones automáticas según desempeño y asistencia.",
    actionLabel: "Actualizar hito de trayectoria",
    highlights: [
      {
        id: "et-1",
        title: "Hito de tutoría",
        description: "Seguimiento mensual completado.",
        status: "completado"
      },
      {
        id: "et-2",
        title: "Solicitud de beca",
        description: "Pendiente de dictamen.",
        status: "en_revision"
      }
    ]
  },
  documentos: {
    title: "Documentos y trámites",
    description:
      "Centro de solicitudes para constancias, historial, cartas y trámites internos.",
    helperText:
      "El flujo está diseñado para reducir filas y mejorar la visibilidad del estado de cada trámite.",
    actionLabel: "Generar trámite simulado",
    highlights: [
      {
        id: "ed-1",
        title: "Constancia de estudios",
        description: "Lista para descarga.",
        status: "aprobado"
      },
      {
        id: "ed-2",
        title: "Carta de no adeudo",
        description: "En cola de validación administrativa.",
        status: "pendiente"
      }
    ]
  },
  directorio: {
    title: "Directorio de profesores",
    description:
      "Consulta rápida de docentes, materias y horarios de atención para asesorías.",
    helperText:
      "Se agregará mensajería contextual para reservar espacios de atención.",
    actionLabel: "Solicitar asesoría simulada",
    highlights: [
      {
        id: "ep-1",
        title: "Dra. Elena Ponce",
        description: "Arquitectura de Software - disponibilidad abierta.",
        status: "activo"
      },
      {
        id: "ep-2",
        title: "Ing. Carla Medina",
        description: "Cupos de asesoría casi llenos.",
        status: "pendiente"
      }
    ]
  },
  mapa: {
    title: "Mapa del campus",
    description:
      "Navegación de espacios académicos, servicios y rutas de movilidad interna.",
    helperText:
      "El mapa será una herramienta transversal para alumnos y personal administrativo.",
    actionLabel: "Buscar espacio simulado",
    highlights: [
      {
        id: "em-1",
        title: "Laboratorio de innovación",
        description: "Disponible para prácticas por bloque.",
        status: "activo"
      },
      {
        id: "em-2",
        title: "Centro de cómputo",
        description: "Mantenimiento parcial esta semana.",
        status: "en_revision"
      }
    ]
  },
  chatGrupo: {
    title: "Chat por grupo y materia",
    description:
      "Mensajería segmentada por cohortes y asignaturas con contexto académico.",
    helperText:
      "Se busca reducir ruido y mantener una comunicación ordenada dentro de Campus360.",
    actionLabel: "Enviar mensaje simulado",
    highlights: [
      {
        id: "eg-1",
        title: "Grupo Arquitectura de Software",
        description: "14 mensajes nuevos en las últimas 24h.",
        status: "activo"
      },
      {
        id: "eg-2",
        title: "Grupo Bases de Datos",
        description: "Aviso pendiente de lectura.",
        status: "pendiente"
      }
    ]
  },
  asistente: {
    title: "Asistente académico",
    description:
      "Asistente inteligente para planeación de carga, hábitos de estudio y alertas tempranas.",
    helperText:
      "En el demo se muestran recomendaciones simuladas basadas en indicadores de trayectoria.",
    actionLabel: "Solicitar recomendación simulada",
    highlights: [
      {
        id: "es-1",
        title: "Recomendación de estudio",
        description: "Incrementar 2h semanales en materia crítica.",
        status: "activo"
      },
      {
        id: "es-2",
        title: "Riesgo de inasistencia",
        description: "Seguimiento preventivo sugerido.",
        status: "urgente"
      }
    ]
  },
  chatbot: {
    title: "Chatbot general",
    description:
      "Canal de ayuda inmediata para soporte académico, trámites y vida universitaria.",
    helperText:
      "Asistente con respuestas orientadas a autoservicio y escalamiento a áreas institucionales.",
    actionLabel: "Simular respuesta de ayuda",
    highlights: [
      {
        id: "eb-1",
        title: "Consulta de trámites",
        description: "Guías rápidas para documentos frecuentes.",
        status: "activo"
      },
      {
        id: "eb-2",
        title: "Escalamiento a mesa de ayuda",
        description: "Disponibilidad de soporte humano por horario.",
        status: "pendiente"
      }
    ]
  }
};

estudianteScaffolds.profesores = estudianteScaffolds.directorio;
estudianteScaffolds.chat = estudianteScaffolds.chatGrupo;

export const adminScaffolds: Record<string, ModuleScaffoldData> = {
  alertas: {
    title: "Alertas institucionales",
    description:
      "Monitoreo de alertas académicas, de permanencia y comunicación prioritaria.",
    helperText:
      "Este módulo conecta indicadores críticos con acciones preventivas por área.",
    actionLabel: "Emitir alerta simulada",
    highlights: [
      {
        id: "aa-1",
        title: "Primer semestre con riesgo de abandono",
        description: "Se detectó incremento de inasistencia.",
        status: "urgente"
      },
      {
        id: "aa-2",
        title: "Seguimiento financiero",
        description: "Casos en observación para retención.",
        status: "en_revision"
      }
    ]
  },
  difusion: {
    title: "Difusión institucional",
    description:
      "Planeación de campañas, avisos y publicaciones para toda la comunidad.",
    helperText:
      "Permite coordinar mensajes por audiencia y medir su alcance de forma centralizada.",
    actionLabel: "Programar publicación simulada",
    secondaryActionLabel: "Ir a crear publicación",
    highlights: [
      {
        id: "adf-1",
        title: "Campaña de reinscripción",
        description: "Publicación multicanal pendiente de aprobación.",
        status: "en_revision"
      },
      {
        id: "adf-2",
        title: "Convocatoria de becas",
        description: "Mensaje aprobado para envío institucional.",
        status: "aprobado"
      }
    ]
  },
  crearPublicacion: {
    title: "Crear publicación",
    description:
      "Editor base para redactar avisos institucionales y definir audiencia objetivo.",
    helperText:
      "La versión final incluirá plantillas por tipo de comunicado y calendario editorial.",
    actionLabel: "Guardar borrador simulado",
    secondaryActionLabel: "Publicar ahora (simulado)",
    highlights: [
      {
        id: "acp-1",
        title: "Segmentación por rol",
        description: "Aspirantes, estudiantes y personal.",
        status: "activo"
      },
      {
        id: "acp-2",
        title: "Control de revisión",
        description: "Borrador sujeto a validación de coordinación.",
        status: "pendiente"
      }
    ]
  },
  canales: {
    title: "Gestión de canales",
    description:
      "Administración de canales oficiales por área, facultad y nivel de prioridad.",
    helperText:
      "Objetivo: consolidar comunicación institucional y evitar duplicidad de mensajes.",
    actionLabel: "Crear canal simulado",
    highlights: [
      {
        id: "agc-1",
        title: "Canal Servicios escolares",
        description: "Operando con comunicación periódica.",
        status: "activo"
      },
      {
        id: "agc-2",
        title: "Canal Bienestar estudiantil",
        description: "Pendiente de nuevos moderadores.",
        status: "pendiente"
      }
    ]
  },
  documentos: {
    title: "Documentos y trámites administrativos",
    description:
      "Seguimiento central de solicitudes, tiempos de respuesta y cargas operativas.",
    helperText:
      "Se priorizan cuellos de botella para mejorar eficiencia de servicios escolares.",
    actionLabel: "Asignar responsable simulado",
    highlights: [
      {
        id: "agd-1",
        title: "Constancias pendientes",
        description: "14 solicitudes en cola.",
        status: "en_revision"
      },
      {
        id: "agd-2",
        title: "Certificados liberados",
        description: "29 trámites completados esta semana.",
        status: "completado"
      }
    ]
  },
  directorio: {
    title: "Directorio institucional",
    description:
      "Consulta y actualización de responsables académicos y administrativos.",
    helperText:
      "Permite mapear responsables clave para atención y escalamiento de casos.",
    actionLabel: "Actualizar contacto simulado",
    highlights: [
      {
        id: "agi-1",
        title: "Coordinación académica",
        description: "Información confirmada y vigente.",
        status: "aprobado"
      },
      {
        id: "agi-2",
        title: "Mesa de permanencia",
        description: "Pendiente de actualización de extensión telefónica.",
        status: "pendiente"
      }
    ]
  },
  mapa: {
    title: "Mapa y espacios del campus",
    description:
      "Visualización institucional de aulas, laboratorios y áreas estratégicas.",
    helperText:
      "El objetivo es gestionar capacidad, mantenimiento y planificación de uso.",
    actionLabel: "Reservar espacio simulado",
    highlights: [
      {
        id: "agm-1",
        title: "Laboratorio de cómputo A",
        description: "Uso al 90% en horario matutino.",
        status: "urgente"
      },
      {
        id: "agm-2",
        title: "Auditorio central",
        description: "Disponible para eventos internos.",
        status: "activo"
      }
    ]
  },
  roles: {
    title: "Configuración de roles",
    description:
      "Gestión de permisos por rol para mantener orden operativo y trazabilidad.",
    helperText:
      "Define qué puede consultar o ejecutar cada perfil dentro de Campus360.",
    actionLabel: "Aplicar cambio de rol simulado",
    highlights: [
      {
        id: "agr-1",
        title: "Rol Aspirante",
        description: "Permisos básicos de captación y seguimiento.",
        status: "activo"
      },
      {
        id: "agr-2",
        title: "Rol Administrativo",
        description: "Política de permisos en revisión.",
        status: "en_revision"
      }
    ]
  }
};

adminScaffolds.seguimiento = {
  title: "Seguimiento integral",
  description:
    "Visor transversal para casos académicos, financieros y de permanencia por cohorte.",
  helperText:
    "Centraliza acciones de tutoría, coordinación y mesa de apoyo para cada estudiante.",
  actionLabel: "Asignar seguimiento simulado",
  secondaryActionLabel: "Generar reporte rápido",
  highlights: [
    {
      id: "asg-1",
      title: "Casos prioritarios",
      description: "8 estudiantes con intervención activa esta semana.",
      status: "urgente"
    },
    {
      id: "asg-2",
      title: "Citas de tutoría",
      description: "14 sesiones confirmadas para los próximos 3 días.",
      status: "activo"
    },
    {
      id: "asg-3",
      title: "Acciones cerradas",
      description: "26 seguimientos marcados como completados este mes.",
      status: "completado"
    }
  ]
};
