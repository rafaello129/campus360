# Campus360 — Fase 5: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `50c4b495c2dae30a8848b445328536a8c01935fc`

## Commits funcionales

```text
eb0fa2827dd1634db48b975fa3cf99baa44a6394
refactor: align student demo data

97c043c96e0bea279d46920253d6db3570091431
feat: make student agenda and notices interactive

96b3ab234b6066c9e1a5ab23db2888004e9633f4
feat: unify student events and campus map flow
```

**Workflow funcional validado:** `Deploy Campus360 to GitHub Pages`  
**Run funcional:** `36657772853`  
**Resultado:** `completed / success`

---

## 1. Objetivo cerrado

La Fase 5 cierra la Escena 6 del guion:

```text
Selector
-> Estudiante
-> Agenda
-> Avisos
-> Trayectoria
-> Eventos
-> Feria de becas y financiamiento
-> detalle de convocatoria
-> Mapa
```

El escenario Estudiante permanece independiente del expediente de Ana.

---

## 2. Identidad preservada

El portal continúa utilizando:

```text
María Elena Rodríguez
Ingeniería en Software
5° semestre
```

No se reutilizan:

```text
currentApplicant
demoApplicantId
campus360:applicants:v1
```

para esta experiencia.

---

## 3. Escenario temporal unificado

Los datos principales del portal Estudiante se alinearon a:

```text
octubre de 2026
```

Se actualizaron:

- Agenda;
- avisos;
- eventos;
- trayectoria;
- convocatoria destacada.

Se eliminó la dependencia visual principal de mayo de 2026.

---

## 4. Configuración de demo Estudiante

Se creó:

```text
src/config/studentDemo.ts
```

con:

```text
studentName = María Elena Rodríguez
eventId = evt-feria
referenceDateISO = 2026-10-05
```

La convocatoria canónica es:

```text
Feria de becas y financiamiento
```

---

## 5. Tipos ampliados

Se extendieron de manera compatible:

### AgendaItem

```ts
dateISO?: string
```

### Notice

```ts
unread?: boolean
```

### CampusEvent

```ts
description?: string
organizer?: string
requirements?: string[]
mapLocationId?: string
```

No se rompieron contratos existentes.

---

## 6. Agenda estructurada

La Agenda dejó de filtrar con:

```ts
item.date.includes(selectedDay.toString())
```

Ahora usa:

```text
dateISO
-> año
-> mes
-> día
```

Esto evita:

```text
día 5
=
día 15
```

y evita mezclar actividades de meses distintos.

---

## 7. Navegación mensual

Al cambiar de mes:

```text
currentDate cambia
selectedDay -> primer día con actividad
              o día 1
```

La lista del día se calcula únicamente con actividades del mes visible.

---

## 8. Días con actividad

El calendario muestra un indicador discreto en días con actividades.

Esto permite identificar rápidamente:

```text
clases
tutorías
entregas
talleres
eventos
```

---

## 9. Próximas actividades

La vista lateral de Agenda ya no depende de:

```ts
agendaItems.slice(0, 4)
```

sin criterio.

Los elementos se ordenan por:

```text
dateISO
hora
```

antes de tomar los próximos registros.

---

## 10. Recordatorios de Agenda

Se implementó estado local:

```text
Agregar recordatorio
-> Quitar recordatorio
```

La acción tiene respuesta visible.

No se añadió backend ni persistencia permanente.

---

## 11. Avisos: estado inicial

Los avisos definen explícitamente:

```text
unread
```

El escenario inicia con tres avisos no leídos.

El badge estático:

```text
3
```

se eliminó de la navegación porque no existe un store global que pueda mantenerlo sincronizado después de interactuar.

---

## 12. Lectura de Avisos

Se mantienen funcionales:

```text
Marcar como leído
Marcar todas como leídas
```

Los contadores se actualizan con el estado local.

---

## 13. Ocultar Avisos

La acción con icono de eliminar dejó de ser simulada.

Ahora usa:

```text
dismissedIds
```

y el aviso desaparece de la vista.

También se actualizan:

```text
Total
Urgentes
No leídas
```

según los avisos visibles.

No se elimina la fuente mock.

---

## 14. Recordatorios laterales

Los recordatorios de Avisos ahora se alinean con octubre de 2026:

```text
Feria de becas y financiamiento
12 de octubre

Cierre de reinscripción
16 de octubre

Movilidad académica
23 de octubre

Tutoría
6 de octubre
```

---

## 15. Trayectoria

Se mantiene la identidad y progreso de María.

Se actualizaron hitos recientes:

```text
Sep 2026 — Tutoría académica mensual
Oct 2026 — Seguimiento de becas y financiamiento
```

La recomendación de becas apunta al mismo ecosistema de Eventos y Avisos.

---

## 16. Participación mensual

La gráfica de participación ahora presenta:

```text
Jun
Jul
Ago
Sep
Oct
```

en lugar de terminar en mayo.

---

## 17. Fuente única de Eventos

Antes:

```text
EventosPage
-> estudiante.mock.ts

EventoDetallePage
-> data/events.ts
```

Después:

```text
EventosPage
-> campusEvents

EventoDetallePage
-> campusEvents
```

ambos desde:

```text
src/data/estudiante.mock.ts
```

---

## 18. IDs consistentes

El detalle ahora acepta los mismos IDs del listado:

```text
evt-hackathon
evt-mentor
evt-feria
evt-taller-git
evt-club-robotica
```

Por tanto:

```text
/estudiante/eventos/evt-feria
```

resuelve la Feria de becas y financiamiento.

---

## 19. Archivo legacy de Eventos

```text
src/data/events.ts
```

no fue eliminado.

La Fase 5 elimina su dependencia desde `EventoDetallePage`.

La limpieza física de código legacy puede hacerse en una fase de hardening posterior.

---

## 20. Búsqueda de Eventos

La búsqueda se normaliza y revisa:

```text
título
summary
categoría
ubicación
```

Se conservan filtros:

```text
Todos
Eventos
Talleres
Clubs
```

---

## 21. Navegación a convocatoria

Cada evento ofrece:

```text
Ver convocatoria
```

El panel lateral ofrece:

```text
Ver convocatoria completa
```

Ambos usan:

```ts
paths.estudiante.eventoDetalle(event.id)
```

---

## 22. EventoDetallePage

El detalle muestra desde el mismo objeto:

- título;
- descripción;
- fecha;
- horario;
- ubicación;
- categoría;
- organizador;
- disponibilidad;
- requisitos.

Un ID inválido muestra:

```text
Evento no encontrado
Volver a eventos
```

---

## 23. Inscripción local a Eventos

Se conserva estado React local.

```text
Inscribirse
-> Inscrito
```

El contador mostrado suma la inscripción local únicamente mientras la pantalla está viva.

No se modifica el dato base.

---

## 24. Aforo

Se protege:

```text
registered >= capacity
```

El usuario recibe:

```text
Sin cupo
```

y el botón queda deshabilitado.

Los lugares disponibles se limitan a mínimo cero.

---

## 25. Guardar Evento

El botón dejó de ser decorativo.

Ahora:

```text
Guardar
-> Guardado
```

mediante estado local.

---

## 26. Mapa conectado con Eventos

Los eventos pueden declarar:

```text
mapLocationId
```

El detalle ofrece:

```text
Ver en mapa
```

con una URL:

```text
/estudiante/mapa?location=<id>
```

---

## 27. Centro Estudiantil

Se agregó al mapa:

```text
student-centro-estudiantil
```

para que:

```text
Feria de becas y financiamiento
-> Ver en mapa
```

no navegue a una ubicación inexistente.

---

## 28. MapPage con query parameter

`MapPage` usa:

```ts
useSearchParams()
```

y reconoce:

```text
location
```

solo si el ID existe.

Un ID inválido vuelve a la selección normal.

---

## 29. Selección coherente con filtros

Antes:

```text
selectedLocation
-> podía provenir de studentMapLocations completo
```

Ahora:

```text
selectedLocation
-> filteredLocations
```

Por tanto:

```text
Biblioteca seleccionada
-> filtrar Laboratorio
-> Biblioteca deja de ser el detalle activo
```

---

## 30. Mapa sin resultados

Con cero resultados:

```text
selectedLocation = null
```

No se mantiene un detalle obsoleto fuera del filtro.

---

## 31. Overview Estudiante

La convocatoria destacada ya no está hardcodeada como:

```text
Becas 2026-B
Cierre: 31 de mayo
```

Ahora deriva de:

```text
STUDENT_DEMO.eventId
-> campusEvents
```

y enlaza directamente al detalle real.

---

## 32. Próximas actividades del Overview

Se ordenan por:

```text
dateISO
hora
```

antes de mostrarse.

---

## 33. Eventos recomendados del Overview

El CTA decorativo:

```text
Inscribirse
```

se sustituyó por:

```text
Ver evento
```

con navegación real al detalle.

---

## 34. Aislamiento respecto a Ana

La Fase 5 no modifica:

```text
applicantStorage
demoSession
config/demo.ts
Aspirante
Captación
AspirantePerfil
DocumentsPage
```

El recorrido Estudiante no escribe en las claves de admisión.

---

## 35. Validación estática

Sobre el commit funcional final se verificó:

- Agenda ya no contiene `item.date.includes(...)`;
- Agenda usa `parseAgendaDate`;
- recordatorios tienen acción reversible;
- Avisos utiliza `dismissedIds`;
- Eventos y Detalle importan la misma fuente;
- Detalle ya no importa `data/events.ts`;
- existe navegación a convocatoria completa;
- el detalle resuelve con `campusEvents.find`;
- Mapa usa selección sobre `filteredLocations`;
- Mapa usa `useSearchParams`.

---

## 36. Validación CI

Commit funcional final:

```text
96b3ab234b6066c9e1a5ab23db2888004e9633f4
```

Run:

```text
36657772853
```

Resultado:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
Workflow: completed / success
```

El build ejecutado:

```text
tsc -b && vite build
```

---

## 37. Limitación de QA

Todavía no existe una suite E2E automatizada.

La validación de esta fase cubre:

- revisión estática;
- compilación TypeScript;
- build Vite;
- despliegue GitHub Pages.

Vitest y Playwright continúan reservados para Fase 8.

---

## 38. Criterios de aceptación cerrados

- [x] María continúa siendo la estudiante demo;
- [x] escenario temporal movido a octubre 2026;
- [x] Agenda utiliza fecha estructurada;
- [x] Agenda no mezcla día 5 con día 15;
- [x] cambio de mes filtra por mes real;
- [x] recordatorio de Agenda funciona;
- [x] Avisos inicia con estado explícito de lectura;
- [x] badge estático de navegación eliminado;
- [x] marcar como leído funciona;
- [x] marcar todos funciona;
- [x] ocultar aviso funciona;
- [x] estadísticas se recalculan;
- [x] Trayectoria se alinea con octubre;
- [x] Eventos y Detalle tienen una única fuente;
- [x] IDs de eventos son compatibles;
- [x] evt-feria tiene detalle real;
- [x] ID inválido tiene regreso;
- [x] inscripción local funciona;
- [x] aforo está protegido;
- [x] Guardar tiene respuesta;
- [x] Mapa no mantiene selección fuera del filtro;
- [x] detalle de evento puede abrir ubicación en mapa;
- [x] Centro Estudiantil existe;
- [x] Overview deriva convocatoria de datos;
- [x] Estudiante permanece aislado de Ana;
- [x] TypeScript/Vite pasa;
- [x] GitHub Pages despliega.

---

## 39. Fuera de alcance preservado

No se añadió:

- autenticación real de estudiante;
- backend;
- base de datos;
- persistencia real de recordatorios;
- persistencia de avisos leídos;
- inscripción real a eventos;
- Google Calendar;
- push notifications;
- GPS;
- mapa externo;
- integración con el expediente de Ana;
- tests E2E.

---

## 40. Puerta de entrada a Fase 6

El guion ya puede demostrar:

```text
Escenas 1–5
-> Admisión completa

Escena 6
-> Portal Estudiante coherente
```

La Fase 6 puede centrarse en:

```text
Administrador
-> Analítica
-> Alertas
```

sin modificar Ana o María.

**Siguiente fase:** Fase 6 — Analítica y Alertas administrativas.
