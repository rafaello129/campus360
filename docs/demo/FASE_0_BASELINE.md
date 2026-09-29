# Campus360 — Fase 0: Baseline y contrato de demostración

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit base auditado:** `3b3e459bb490a25b3ccfdb0fe6c9f545cd4ca91f`  
**Mensaje del commit base:** `feat: persist admissions workflow actions`  
**Fecha del commit base:** 2026-09-02  
**Guion funcional de referencia:** Guion de simulación de Campus360  
**Objetivo de la fase:** fijar una línea base verificable antes de introducir cambios funcionales.

---

## 1. Regla de esta fase

La Fase 0 no modifica comportamiento del producto.

No se implementan todavía:

- reset de simulación;
- prevención de duplicados;
- preselección de carrera;
- backend;
- autenticación;
- Supabase;
- cambios de UI;
- pruebas automáticas;
- cambios de GitHub Actions.

La única modificación de esta fase es esta documentación de baseline.

---

## 2. Estado Git y despliegue

### Rama

`main`

### Commit base

`3b3e459bb490a25b3ccfdb0fe6c9f545cd4ca91f`

### Estado de protección

La rama `main` no está protegida.

### Último workflow verificado antes de esta fase

Workflow:

`Deploy Campus360 to GitHub Pages`

Resultado del commit base:

```text
status: completed
conclusion: success
```

El workflow ejecuta:

```text
actions/checkout
-> Node 22
-> npm ci
-> npm run build
-> upload-pages-artifact
-> deploy-pages
```

El build actual definido en `package.json` es:

```text
tsc -b && vite build
```

---

## 3. Stack técnico base

### Dependencias principales

- React 18.3
- React DOM 18.3
- React Router DOM 6.30
- TypeScript ~5.6
- Vite 5.4
- Tailwind CSS 3.4
- Recharts 2.15
- Lucide React

### Scripts actuales

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

### No existe actualmente

- backend propio;
- Supabase;
- API REST;
- autenticación real;
- JWT;
- base de datos remota;
- Vitest;
- Playwright;
- suite E2E;
- script de lint;
- script separado de typecheck.

---

## 4. Arquitectura de navegación

Campus360 utiliza `createHashRouter`.

Vite utiliza:

```ts
base: "/campus360/"
```

Esto es compatible con el despliegue actual en GitHub Pages.

### Selector de perfiles

```text
/
```

### Aspirante

```text
/aspirante
/aspirante/carreras
/aspirante/carreras/:careerId
/aspirante/registro
/aspirante/proceso
/aspirante/documentos
```

Ruta crítica:

```text
/aspirante/carreras/ing-software
```

### Estudiante

```text
/estudiante
/estudiante/agenda
/estudiante/avisos
/estudiante/trayectoria
/estudiante/eventos
/estudiante/eventos/:eventId
/estudiante/mapa
```

### Administrador

```text
/admin
/admin/captacion
/admin/aspirantes/:id
/admin/alertas
/admin/analitica
```

---

## 5. Contrato oficial de demostración

Los siguientes valores quedan congelados para las fases posteriores.

### Aspirante principal

```text
Nombre completo: Ana López
Correo: ana.lopez@example.com
Carrera: Ingeniería en Software
Carrera ID: ing-software
Modalidad: Presencial
Último nivel de estudios: Bachillerato
Fuente: Página web
Comentarios: Quisiera conocer los requisitos de inscripción.
```

El teléfono no forma parte del guion y se considera opcional.

### Responsable oficial de la demostración

```text
Lic. Brenda Salas
```

Asesores disponibles actualmente:

```text
Lic. Brenda Salas
Mtra. Daniela Cruz
Lic. Adrián Mora
Mtra. Laura Treviño
Lic. Mariana Peña
```

### Nota exacta de llamada

```text
Se explicaron los requisitos de admisión
```

### Etapa objetivo

```text
Contacto inicial
```

### Documento objetivo

```text
Certificado de bachillerato
```

Flujo documental esperado:

```text
Pendiente
-> En revisión
-> Aprobado
```

---

## 6. Persistencia actual

La simulación de admisión se basa en `localStorage`.

### Claves existentes

```text
campus360:applicants:v1
campus360:current-applicant:v1
```

### Aspirantes

`campus360:applicants:v1` contiene:

```ts
{
  version: 1,
  applicants: AdminApplicantRecord[]
}
```

### Aspirante actual

`campus360:current-applicant:v1` contiene el ID del aspirante que se muestra como solicitud activa en el portal público.

### Regla para fases posteriores

Nunca usar:

```js
localStorage.clear()
```

Un futuro reset deberá eliminar únicamente claves propiedad de Campus360.

---

## 7. Fuente de verdad

| Dato | Fuente actual |
|---|---|
| Carreras | `src/data/careers.ts` |
| Aspirantes demo | `src/data/adminApplicants.ts` |
| Aspirantes creados durante la demo | `localStorage` vía `applicantStorage.ts` |
| Aspirante activo | `campus360:current-applicant:v1` |
| Etapa de Ana | registro persistido de Ana |
| Responsable | registro persistido de Ana |
| Historial | `timeline` del registro de Ana |
| Documentos | `documents` del registro de Ana |
| Estudiante | datos mock |
| Analítica | datos mock |
| Alertas | datos mock |

Regla de arquitectura:

> Las pantallas del flujo dinámico de Ana no deben sustituir su información con mocks cuando exista una solicitud persistida válida.

---

## 8. Modelo de etapas actual

Etapas administrativas:

```text
Nuevo registro
Contacto inicial
Interés confirmado
Documentación pendiente
Evaluación / entrevista
Inscripción finalizada
```

Mapeo público actual:

| Etapa administrativa | Paso público |
|---|---|
| Nuevo registro | Registro recibido |
| Contacto inicial | Contacto inicial |
| Interés confirmado | Contacto inicial |
| Documentación pendiente | Documentación |
| Evaluación / entrevista | Evaluación |
| Inscripción finalizada | Inscripción |

El stepper público tiene además un paso visual de `Resultado`, pero actualmente no existe una etapa administrativa independiente con ese nombre.

No afecta el guion actual.

---

## 9. Archivos críticos

### Núcleo

```text
src/router/routes.tsx
src/router/paths.ts
src/data/applicantStorage.ts
src/data/adminApplicants.ts
src/data/careers.ts
src/types/
```

### Selector

```text
src/pages/RoleSelectorPage.tsx
```

### Aspirante

```text
src/pages/aspirante/CareersPage.tsx
src/pages/aspirante/CareerDetailPage.tsx
src/pages/aspirante/RegistrationPage.tsx
src/pages/aspirante/ProcessPage.tsx
src/pages/aspirante/DocumentsPage.tsx
```

### Administración

```text
src/pages/admin/CaptacionKanbanPage.tsx
src/pages/admin/AspirantePerfilPage.tsx
src/pages/admin/AnaliticaPage.tsx
src/pages/admin/AlertasPage.tsx
```

### Estudiante

```text
src/pages/estudiante/AgendaPage.tsx
src/pages/estudiante/AvisosPage.tsx
src/pages/estudiante/TrayectoriaPage.tsx
src/pages/estudiante/EventosPage.tsx
src/pages/estudiante/EventoDetallePage.tsx
src/pages/estudiante/MapPage.tsx
```

---

## 10. Estado de las escenas del guion

| Escena | Estado base | Observaciones |
|---|---|---|
| 1. Selector de roles | OK | Existen Aspirante, Estudiante y Administrativo. |
| 2. Consulta de carreras | PARCIAL | Ingeniería en Software existe y tiene detalle, pero el registro no recibe la carrera preseleccionada. |
| 3. Registro de solicitud | MAYORMENTE OK | Guarda aspirante, genera folio, persiste y abre proceso. No evita duplicados y contiene un mensaje de correo no real. |
| 4. Seguimiento administrativo | MAYORMENTE OK | Responsable, llamada y estatus persisten. Debe reforzarse refresco y búsqueda. |
| 5. Documentos | MAYORMENTE OK | Carga simulada, metadatos, revisión y aprobación ya existen. |
| 6. Estudiante | DISPONIBLE COMO DEMO | Agenda, Avisos, Trayectoria, Eventos y Mapa son un escenario separado basado en mocks. |
| 7. Analítica y Alertas | DISPONIBLE COMO DEMO | Ambas rutas existen y usan información demostrativa. |

---

## 11. Brechas confirmadas

### B1 — Carrera no heredada

Desde el detalle de Ingeniería en Software:

```text
Iniciar registro
-> /aspirante/registro
```

Actualmente no se transmite `ing-software` al formulario.

**Resolver en:** Fase 2.

---

### B2 — Registros duplicados

`createApplicant()` crea un nuevo registro cada vez.

No existe control específico por:

```text
ana.lopez@example.com
```

**Resolver en:** Fase 1.

---

### B3 — No existe reset de simulación

Los ensayos anteriores pueden dejar:

- Ana duplicada;
- etapas adelantadas;
- responsable asignado;
- documentos cargados;
- documento aprobado.

**Resolver en:** Fase 1.

---

### B4 — Mensaje de correo no real

El modal de registro contiene un mensaje indicando que se envió un correo de confirmación.

El sistema no dispone de integración de correo.

**Resolver en:** Fase 2.

---

### B5 — Fechas antiguas en documentos nuevos

Los documentos generados actualmente incluyen fechas fijas como:

```text
28 febrero 2026
5 marzo 2026
```

Estas fechas pueden resultar incoherentes durante la presentación.

**Resolver en:** Fase 2 / Fase 4.

---

### B6 — Búsqueda de Captación

La búsqueda actual está orientada principalmente al nombre.

Para el guion es conveniente localizar por:

- nombre;
- correo;
- folio;
- carrera.

**Resolver en:** Fase 3.

---

### B7 — Estado visual entre perfiles

La persistencia existe, pero las páginas deben garantizar que releen el estado correcto al entrar de nuevo después de una acción administrativa.

**Resolver en:** Fase 1 / Fase 3.

---

## 12. Riesgos

| ID | Riesgo | Impacto | Solución prevista |
|---|---|---:|---|
| R1 | Varias Ana López después de ensayos | Alto | Fase 1 |
| R2 | Estado visual desactualizado | Alto | Fase 1 / 3 |
| R3 | Carrera no preseleccionada | Medio | Fase 2 |
| R4 | Mensaje de correo inexistente | Medio | Fase 2 |
| R5 | Fechas antiguas | Medio | Fase 2 / 4 |
| R6 | Documento previo contamina demo | Alto | Fase 1 |
| R7 | Búsqueda limitada en Captación | Medio | Fase 3 |
| R8 | Sin tests automáticos | Alto | Fase 8 |
| R9 | `main` sin protección | Bajo para esta demo | Fase 9 |
| R10 | Artefactos generados versionados | Bajo | Saneamiento posterior |

---

## 13. Comportamientos ya implementados que deben preservarse

### Registro

`createApplicant()`:

- genera ID;
- genera folio;
- resuelve nombre de carrera;
- normaliza modalidad;
- normaliza educación;
- normaliza fuente;
- crea historial inicial;
- crea checklist documental;
- puede marcar el nuevo aspirante como actual.

### Seguimiento

`updateApplicant()` permite:

- cambiar etapa;
- asignar responsable;
- actualizar último contacto;
- agregar evento al historial;
- conservar persistencia.

### Documentos

`updateApplicantDocument()`:

- actualiza metadatos;
- cambia estado;
- recalcula estado documental general;
- puede registrar evento en historial.

Estos comportamientos son parte del baseline y no deben romperse en fases posteriores.

---

## 14. Build y evidencia de ejecución

### Build base verificado por CI

El commit base:

```text
3b3e459bb490a25b3ccfdb0fe6c9f545cd4ca91f
```

pasó el workflow:

```text
Deploy Campus360 to GitHub Pages
```

con:

```text
conclusion: success
```

El workflow ejecutó `npm ci` y `npm run build`.

### Limitación de esta auditoría

No fue posible ejecutar un smoke test visual independiente contra GitHub Pages desde el navegador disponible en esta sesión, porque el host público no fue accesible mediante la herramienta de navegación.

Por lo tanto:

- rutas: verificadas estáticamente en el router;
- build: verificado mediante GitHub Actions;
- interacción visual completa: pendiente de QA navegable posterior.

Esto queda registrado de forma explícita para no confundir evidencia estática con validación manual.

---

## 15. Puerta de entrada a Fase 1

La Fase 1 deberá iniciar desde este baseline y podrá modificar por primera vez comportamiento.

Objetivos inmediatos ya autorizados por el plan maestro:

1. centralizar constantes de demostración;
2. implementar sesión de demo;
3. implementar reset selectivo;
4. evitar contaminación entre ensayos;
5. resolver duplicados de Ana;
6. garantizar aspirante actual consistente;
7. preparar refresco confiable del estado.

---

## 16. Criterios de aceptación de Fase 0

- [x] commit base registrado;
- [x] último deploy base documentado;
- [x] stack documentado;
- [x] scripts documentados;
- [x] rutas críticas inventariadas;
- [x] claves de almacenamiento identificadas;
- [x] contrato de Ana congelado;
- [x] asesor oficial elegido;
- [x] nota exacta de llamada registrada;
- [x] etapa objetivo registrada;
- [x] documento objetivo registrado;
- [x] siete escenas clasificadas;
- [x] riesgos registrados;
- [x] mocks y datos dinámicos diferenciados;
- [x] build base confirmado por CI;
- [x] limitación de smoke visual documentada;
- [x] no se introdujeron cambios funcionales;
- [x] existe `docs/demo/FASE_0_BASELINE.md`.

---

## 17. Conclusión

Campus360 ya contiene una base funcional importante para ejecutar el guion.

El núcleo existente permite:

```text
crear aspirante
-> persistir solicitud
-> mostrarla en administración
-> registrar seguimiento
-> actualizar etapa
-> cargar metadatos de documentos
-> revisar documentos
-> reflejar resultados
```

El trabajo posterior no debe rehacer el sistema.

Las siguientes fases deben concentrarse en hacer este flujo:

```text
determinista
repetible
limpio entre ensayos
coherente visualmente
verificable por pruebas
```

**Siguiente fase:** Fase 1 — Sesión de simulación y persistencia confiable.
