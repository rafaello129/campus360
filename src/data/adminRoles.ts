export const adminRoles = [
  { id: 'r1', name: 'Administrador general', description: 'Acceso completo al panel administrativo', users: 3, modules: ['Dashboard','Captación','Estudiantes','Seguimiento','Alertas','Difusión','Documentos','Analítica','Roles'], active: true },
  { id: 'r2', name: 'Captación', description: 'Gestiona procesos de captación y seguimiento', users: 2, modules: ['Captación','Analítica'], active: true },
  { id: 'r3', name: 'Servicios escolares', description: 'Gestiona documentos y estudiantes', users: 4, modules: ['Estudiantes','Documentos'], active: true },
  { id: 'r4', name: 'Difusión institucional', description: 'Gestiona canales y publicaciones', users: 2, modules: ['Difusión','Documentos'], active: true }
];
