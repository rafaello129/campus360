# Campus360 — Fase 3: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `8e8ff271975ea5f234d35bc7ad5718fc19ea6536`  
**Commit funcional:** `04978192369021ce2be47d44fdfb7440c02cde3a`  
**Mensaje:** `feat: complete admin follow-up demo flow`  
**Workflow funcional:** `Deploy Campus360 to GitHub Pages`  
**Run funcional:** `36624466808`  
**Resultado funcional:** `completed / success`

---

## 1. Objetivo cerrado

La Fase 3 cierra la Escena 4 del guion:

```text
Administrador
-> Captación
-> localizar Ana
-> abrir expediente
-> asignar Lic. Brenda Salas
-> registrar llamada
-> cambiar estatus a Contacto inicial
-> volver a Aspirante
-> Mi proceso refleja el cambio
```

El mismo expediente dinámico creado en Fase 2 continúa siendo la única fuente de verdad.

---

## 2. Archivos modificados

```text
src/pages/admin/CaptacionKanbanPage.tsx
src/pages/admin/AspirantePerfilPage.tsx
src/pages/aspirante/ProcessPage.tsx
```

No se modificó la capa base de persistencia ni `demoSession.ts`.

---

## 3. Búsqueda ampliada en Captación

La búsqueda de Captación ahora normaliza una sola vez:

```ts
const query = searchTerm.trim().toLowerCase();
```

y busca en:

```text
nombre
correo
folio
carrera
```

Se mantienen los filtros existentes de:

```text
carrera
prioridad
```

El placeholder ahora describe las cuatro posibilidades de búsqueda.

---

## 4. Contrato demo administrativo

`AspirantePerfilPage` consume las constantes existentes:

```ts
DEMO_ADVISOR
DEMO_APPLICANT
DEMO_CALL_NOTE
DEMO_TARGET_STAGE
```

Esto elimina la dependencia accidental de que Brenda sea simplemente el primer elemento del arreglo.

---

## 5. Responsable oficial

Para el expediente demo:

```text
Pendiente de asignación
-> abrir Asignar responsable
-> Lic. Brenda Salas preseleccionada
```

La persistencia continúa usando `updateApplicant()`.

Timeline esperado:

```text
Responsable asignado
Lic. Brenda Salas quedó a cargo del seguimiento.
```

Si el mismo responsable ya está asignado, la UI no permite confirmar una mutación idéntica y el handler también mantiene una validación defensiva.

---

## 6. Registro de llamada

Para Ana López, el campo de comentario de:

```text
Registrar llamada
```

usa como ayuda:

```text
Se explicaron los requisitos de admisión
```

mediante `DEMO_CALL_NOTE`.

No se autocompleta; el presentador sigue escribiendo la nota como indica el guion.

Al confirmar, se conserva el comportamiento existente:

```text
lastContact = Hoy HH:mm
daysWithoutFollowUp = 0
```

y el timeline recibe:

```text
Llamada registrada
<nota escrita>
```

---

## 7. Cambio a Contacto inicial

Para Ana recién registrada en:

```text
Nuevo registro
```

al abrir:

```text
Cambiar estatus
```

se preselecciona explícitamente:

```text
Contacto inicial
```

mediante `DEMO_TARGET_STAGE`.

La configuración existente de la etapa permanece:

```text
status = activo
conversionProbability = 58
nextAction = Confirmar interés y resolver dudas
```

Timeline:

```text
Etapa actualizada
La solicitud avanzó a Contacto inicial.
```

---

## 8. Idempotencia de acciones

Se añadieron guardas para evitar eventos redundantes.

No se permite confirmar:

```text
responsable actual -> mismo responsable
etapa actual -> misma etapa
```

La validación existe tanto en UI como en el handler.

Por tanto, una reasignación o cambio de etapa sin cambios no genera una nueva entrada de timeline.

---

## 9. Protección contra doble confirmación

Se agregó:

```text
isActionSubmitting
actionSubmittingRef
```

El ref evita reentrada incluso antes de que React vuelva a renderizar.

Mientras la operación está activa:

```text
Confirmar -> Guardando...
```

y los controles de cierre/cancelación quedan deshabilitados.

Esto protege especialmente:

- llamada;
- cambio de etapa;
- responsable;
- cita;
- recordatorio;
- nota.

---

## 10. Sincronización del perfil administrativo

`AspirantePerfilPage` ahora se suscribe a:

```text
campus360:storage-change
```

mediante:

```ts
subscribeToCampusStorageChange()
```

Ante cambios:

```ts
setApplicant(getApplicantById(id))
```

La suscripción se limpia al desmontar o cambiar de ID.

---

## 11. Sincronización de Mi proceso

`ProcessPage` dejó de leer el aspirante solamente durante render.

Ahora utiliza:

```ts
useState(() => getCurrentApplicant())
```

y se suscribe al mismo evento de almacenamiento.

Resultado:

```text
Admin modifica Ana
-> almacenamiento emite evento
-> ProcessPage relee currentApplicant
-> UI pública refleja cambios
```

El listener nativo de `storage` implementado en Fase 1 mantiene además sincronización entre pestañas.

---

## 12. Tarjeta del responsable

Antes la tarjeta pública siempre mostraba:

```text
Asesor pendiente de asignación
```

aunque el owner ya fuera una persona real.

Ahora:

### Sin responsable

```text
Pendiente de asignación
Asesor pendiente de asignación
```

### Con responsable

```text
Lic. Brenda Salas
Responsable de admisiones
```

Se mantiene:

```text
admisiones@campus360.edu
```

como contacto institucional.

---

## 13. Próxima acción pública

El bloque de acción requerida en `ProcessPage` ahora usa:

```ts
currentApplicant.nextAction
```

Por tanto, después de avanzar a `Contacto inicial` se muestra:

```text
Siguiente paso: Confirmar interés y resolver dudas.
```

Esto evita que la vista siga diciendo que el primer contacto aún está pendiente.

---

## 14. Timeline compartido

No se creó un timeline público paralelo.

El portal Aspirante continúa usando:

```text
currentApplicant.timeline
```

Después de ejecutar el guion en orden, el mismo expediente puede contener:

```text
Registro creado
Responsable asignado
Llamada registrada
Etapa actualizada
```

---

## 15. Acciones no modificadas funcionalmente

Se preservaron:

```text
Enviar recordatorio
Programar cita
Agregar nota
Revisión documental
```

El guard de doble confirmación también protege las acciones rápidas compartidas, pero no se cambió su contrato funcional.

---

## 16. Validaciones estáticas realizadas

Sobre el commit funcional se verificó:

- búsqueda por nombre presente;
- búsqueda por correo presente;
- búsqueda por folio presente;
- búsqueda por carrera presente;
- `DEMO_ADVISOR` utilizado;
- `DEMO_CALL_NOTE` utilizado;
- `DEMO_TARGET_STAGE` utilizado;
- guard de mismo responsable presente;
- guard de misma etapa presente;
- guard de doble acción presente;
- sincronización del perfil administrativo presente;
- sincronización de `ProcessPage` presente;
- etiqueta `Responsable de admisiones` presente;
- siguiente acción pública derivada de `nextAction`.

---

## 17. Validación de CI

Commit funcional exacto:

```text
04978192369021ce2be47d44fdfb7440c02cde3a
```

Run:

```text
36624466808
```

Resultado:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
```

El build ejecutado sigue siendo:

```text
tsc -b && vite build
```

---

## 18. Limitación de QA

La validación de esta fase incluye:

- revisión estática del código resultante;
- compilación TypeScript;
- build Vite;
- despliegue GitHub Pages.

No existe todavía una suite automatizada E2E de navegador; esa infraestructura corresponde a Fase 8.

---

## 19. Criterios de aceptación

- [x] Captación busca por nombre;
- [x] Captación busca por correo;
- [x] Captación busca por folio;
- [x] Captación busca por carrera;
- [x] los filtros existentes permanecen;
- [x] Ana continúa usando su ID dinámico real;
- [x] `DEMO_ADVISOR` controla la preselección demo;
- [x] `DEMO_CALL_NOTE` se usa como ayuda;
- [x] `DEMO_TARGET_STAGE` controla la etapa objetivo demo;
- [x] mismo responsable no genera evento redundante;
- [x] misma etapa no genera evento redundante;
- [x] doble confirmación protegida;
- [x] llamada mantiene actualización de último contacto;
- [x] llamada reinicia días sin seguimiento;
- [x] Contacto inicial conserva probabilidad 58;
- [x] Contacto inicial conserva la siguiente acción correcta;
- [x] perfil Admin se sincroniza;
- [x] ProcessPage se sincroniza;
- [x] ProcessPage distingue responsable pendiente/asignado;
- [x] siguiente acción pública es dinámica;
- [x] timeline sigue siendo compartido;
- [x] build TypeScript/Vite pasa;
- [x] GitHub Pages despliega.

---

## 20. Fuera de alcance preservado

No se implementó todavía:

- upload del PDF;
- aprobación del Certificado de bachillerato como parte del guion;
- transición a Documentación pendiente;
- cambios del escenario Estudiante;
- Analítica;
- Alertas;
- Vitest;
- Playwright;
- backend;
- autenticación real;
- correo real;
- llamada real.

---

## 21. Puerta de entrada a Fase 4

Fase 4 puede asumir, después de ejecutar la Escena 4:

```text
Ana López
owner = Lic. Brenda Salas
stage = Contacto inicial
lastContact actualizado
daysWithoutFollowUp = 0
nextAction = Confirmar interés y resolver dudas
timeline administrativo persistido
```

Siguiente recorrido:

```text
Aspirante
-> Documentos
-> Certificado de bachillerato
-> cargar PDF

Administrador
-> expediente de Ana
-> revisar Certificado de bachillerato
-> Aprobado

Aspirante
-> Documentos
-> Aprobado visible
```

**Siguiente fase:** Fase 4 — flujo documental de Ana.
