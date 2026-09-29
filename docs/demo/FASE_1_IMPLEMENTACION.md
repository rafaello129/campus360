# Campus360 — Fase 1: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `4820ea9955259ed3744bb5931210feaf19920ca9`  
**Commit funcional:** `15a763148498c870caebacc819d245ab7110c068`  
**Mensaje:** `feat: add reliable demo session state`  
**Workflow funcional:** `Deploy Campus360 to GitHub Pages`  
**Resultado del workflow funcional:** `completed / success`

---

## 1. Objetivo cerrado

La Fase 1 introduce control explícito sobre el estado local de la demostración sin cambiar todavía el recorrido visible del registro de Ana.

Se implementó:

```text
configuración demo centralizada
-> claves de almacenamiento centralizadas
-> sesión demo
-> reset selectivo
-> recuperación por correo
-> saneamiento de referencia huérfana
-> evento de sincronización
-> resincronización de Captación
-> resincronización de Documentos
```

No se introdujo backend, Supabase ni estado global.

---

## 2. Archivos nuevos

```text
src/config/demo.ts
src/data/demoSession.ts
src/data/storageEvents.ts
```

---

## 3. Archivos modificados

```text
src/data/applicantStorage.ts
src/pages/RoleSelectorPage.tsx
src/pages/admin/CaptacionKanbanPage.tsx
src/pages/aspirante/DocumentsPage.tsx
```

---

## 4. Contrato programático del guion

`src/config/demo.ts` centraliza:

```text
Ana López
ana.lopez@example.com
Ingeniería en Software
ing-software
Presencial
Bachillerato
Página web
Quisiera conocer los requisitos de inscripción.
Lic. Brenda Salas
Se explicaron los requisitos de admisión
Contacto inicial
Certificado de bachillerato
```

También centraliza las claves:

```text
campus360:applicants:v1
campus360:current-applicant:v1
campus360:demo:v1
```

---

## 5. Sesión de demostración

Se agregó `src/data/demoSession.ts`.

API implementada:

```ts
getDemoSession()
setDemoSession()
isDemoApplicant()
getDemoApplicant()
markDemoApplicant()
hasActiveDemoSession()
resetDemoSession()
```

La sesión usa:

```text
campus360:demo:v1
```

con versión 1.

La clave de sesión queda preparada para ser utilizada por el flujo visible en Fase 2. La Fase 1 no altera todavía el formulario para marcar automáticamente a Ana.

---

## 6. Reset de simulación

El selector de roles incorpora:

```text
Herramientas de demostración
-> Reiniciar simulación
```

El reset requiere confirmación explícita.

Elimina únicamente:

```text
campus360:applicants:v1
campus360:current-applicant:v1
campus360:demo:v1
```

No utiliza:

```js
localStorage.clear()
```

Por tanto no afecta almacenamiento de otros sistemas o sitios.

También mantiene intactos:

- catálogo de carreras;
- aspirantes mock;
- estudiante mock;
- analítica;
- alertas.

---

## 7. Comportamiento transaccional del reset

Antes de eliminar las claves se conserva su valor previo.

Si una operación de limpieza falla, se realiza recuperación best-effort de los valores anteriores y el usuario recibe error.

Solo se muestra:

```text
Simulación reiniciada
```

cuando la operación completa termina correctamente.

---

## 8. Control de duplicados

Se agregó:

```ts
normalizeEmail()
findApplicantByEmail()
```

La normalización usa:

```ts
value.trim().toLowerCase()
```

Por tanto:

```text
ana.lopez@example.com
ANA.LOPEZ@example.com
 Ana.Lopez@example.com
```

se consideran equivalentes para recuperación.

La Fase 1 prepara la detección y garantiza que un reset elimina todos los aspirantes dinámicos de ensayos anteriores.

La integración del formulario para reutilizar o marcar automáticamente a Ana corresponde a Fase 2.

---

## 9. Aspirante actual

Se agregaron:

```ts
setCurrentApplicant()
clearCurrentApplicant()
```

`getCurrentApplicant()` ahora sanea una referencia huérfana:

```text
current applicant ID existe en clave
-> expediente ya no existe
-> devuelve undefined
-> elimina la referencia huérfana
```

El saneamiento se realiza silenciosamente para no generar un evento durante un ciclo de render.

---

## 10. Eventos de sincronización

Se agregó:

```text
campus360:storage-change
```

API:

```ts
emitCampusStorageChange()
subscribeToCampusStorageChange()
```

También se escucha el evento nativo `storage` para cambios provenientes de otra pestaña.

El evento propio se emite únicamente después de mutaciones exitosas.

---

## 11. Captación

`CaptacionKanbanPage` conserva:

```ts
useState(() => listApplicants())
```

pero ahora se suscribe a cambios de almacenamiento y ejecuta:

```ts
setApplicants(listApplicants())
```

cuando cambia el estado Campus360.

Esto elimina dependencia de una recarga manual para resincronizar el tablero.

La búsqueda avanzada por email, folio y carrera no se implementó porque pertenece a Fase 3.

---

## 12. Documentos

`DocumentsPage` ahora se suscribe al evento de almacenamiento.

Cuando cambia el expediente:

```ts
setCurrentApplicant(getCurrentApplicant())
```

permite actualizar la vista a partir del mismo registro persistido.

La lógica de upload y revisión no fue modificada.

---

## 13. Selector de roles

Se agregó:

- acción discreta de reinicio;
- modal de confirmación;
- cancelar;
- confirmar;
- bloqueo del botón durante ejecución;
- feedback de éxito;
- feedback de error.

Cambiar entre perfiles no ejecuta ningún reset.

---

## 14. Compatibilidad preservada

No se cambió el contrato de:

```ts
createApplicant()
updateApplicant()
updateApplicantDocument()
listApplicants()
getApplicantById()
getCurrentApplicant()
```

Se mantienen:

- folios;
- etapas;
- documentos;
- mocks;
- rutas;
- hash router;
- despliegue de GitHub Pages.

---

## 15. Validación

Para el commit funcional:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
Workflow: completed / success
```

El build ejecutado por CI sigue siendo:

```text
npm ci
npm run build
```

y `npm run build` ejecuta:

```text
tsc -b && vite build
```

No se introdujo todavía Vitest ni Playwright, de acuerdo con el plan maestro.

---

## 16. Limitación de QA

La validación realizada en esta fase incluye:

- revisión estática del código;
- compilación TypeScript;
- build Vite;
- publicación GitHub Pages.

No se ejecutó una suite automatizada de interacción de navegador porque esa infraestructura corresponde a Fase 8.

---

## 17. Criterios de aceptación

- [x] existe `src/config/demo.ts`;
- [x] claves de almacenamiento centralizadas;
- [x] existe `campus360:demo:v1`;
- [x] existe `resetDemoSession()`;
- [x] reset no usa `localStorage.clear()`;
- [x] reset elimina aspirantes dinámicos;
- [x] reset limpia aspirante actual;
- [x] reset limpia sesión demo;
- [x] mocks permanecen intactos;
- [x] existe búsqueda normalizada por email;
- [x] referencias huérfanas se limpian;
- [x] existe evento central de cambio;
- [x] Captación se resincroniza;
- [x] Documentos se resincroniza;
- [x] selector tiene reset con confirmación;
- [x] reset tiene bloqueo de acción;
- [x] existe feedback de éxito/error;
- [x] cambiar de perfil no resetea datos;
- [x] build pasa;
- [x] GitHub Pages despliega;
- [x] existe documentación de implementación.

---

## 18. Fuera de alcance y pendiente

Continúa pendiente:

- preselección de `ing-software`;
- integración visible de Ana con `markDemoApplicant()`;
- eliminación del mensaje falso de correo;
- actualización de fechas;
- búsqueda ampliada en Captación;
- mejoras del flujo documental;
- pruebas Vitest;
- E2E Playwright.

---

## 19. Puerta de entrada a Fase 2

La Fase 2 ya puede asumir:

```text
reset seguro disponible
estado de ensayo controlable
claves centralizadas
email normalizado
Ana recuperable por correo
aspirante actual saneado
pantallas sincronizables
```

El siguiente recorrido a implementar es:

```text
Carreras
-> Ingeniería en Software
-> Iniciar registro
-> carrera preseleccionada
-> registrar Ana
-> marcar sesión demo
-> mostrar folio
-> Ver mi proceso
```

**Siguiente fase:** Fase 2 — Escenas 1–3 del aspirante.
