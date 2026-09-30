# Campus360 — Fase 4: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `366fbd4664e2ef3d8f4dff1a57a66942d92e1c94`  
**Commit funcional:** `0774de7631949915b82ad3755fd673de6ab576f8`  
**Mensaje:** `feat: complete applicant document review flow`  
**Workflow funcional:** `Deploy Campus360 to GitHub Pages`  
**Run funcional:** `36655625739`  
**Resultado funcional:** `completed / success`

---

## 1. Objetivo cerrado

La Fase 4 cierra la Escena 5 del guion:

```text
Aspirante
-> Documentos
-> Certificado de bachillerato
-> subir archivo
-> En revisión

Administrador
-> Ana López
-> Certificado de bachillerato
-> Revisar
-> Aprobado

Aspirante
-> Certificado de bachillerato
-> Aprobado
```

La carga y la revisión actúan sobre el mismo documento del mismo expediente dinámico.

---

## 2. Archivos modificados

```text
src/pages/aspirante/DocumentsPage.tsx
src/pages/admin/AspirantePerfilPage.tsx
```

No fue necesario modificar:

```text
src/data/applicantStorage.ts
src/data/demoSession.ts
src/pages/aspirante/ProcessPage.tsx
```

La API existente de persistencia ya cubría el flujo.

---

## 3. Arquitectura metadata-only preservada

Campus360 continúa sin almacenar el binario del archivo.

Se persisten únicamente:

```text
fileName
fileSize
uploadedAt
updatedAt
status
reviewNote
```

No se agregó:

- backend de archivos;
- Supabase Storage;
- S3;
- Base64;
- blobs en localStorage;
- descarga ficticia.

La UI ahora explica explícitamente que la simulación conserva metadatos del archivo.

---

## 4. Eliminación del fallback documental ficticio

Se eliminó completamente:

```text
demoDocuments
```

de `DocumentsPage`.

Después de un reset, visitar Documentos ya no muestra:

- Acta aprobada ficticia;
- Certificado aprobado ficticio;
- Identificación en revisión ficticia;
- fechas antiguas de febrero/marzo.

---

## 5. Estado vacío sin expediente

Si no existe:

```ts
getCurrentApplicant()
```

la página muestra:

```text
Aún no tienes un expediente documental
```

con CTA:

```text
Iniciar registro
```

hacia:

```text
/aspirante/registro
```

---

## 6. Fuente única de documentos

Con expediente activo:

```text
currentApplicant.documents
```

es la única fuente de verdad.

No se mezclan mocks con Ana.

---

## 7. Documento oficial del guion

`DocumentsPage` consume:

```ts
DEMO_DOCUMENT_NAME
```

El documento:

```text
Certificado de bachillerato
```

se prioriza visualmente en la lista de requeridos para facilitar la simulación sin crear una ruta ni un ID especial.

---

## 8. Carga de archivo

Se mantienen los formatos:

```text
PDF
JPG
JPEG
PNG
```

y el límite:

```text
10 MB
```

Al registrar un archivo nuevo:

```text
status = en_revision
fileName = nombre real seleccionado
fileSize = tamaño calculado
uploadedAt = ahora
updatedAt = ahora
reviewNote = undefined
```

---

## 9. Reemplazo documental

Si el documento ya tenía un archivo y se carga otro:

```text
Documento reemplazado
```

se registra en el timeline.

Si no tenía archivo:

```text
Documento cargado
```

Esto mejora la trazabilidad.

---

## 10. Protección contra doble carga

Se agregaron:

```text
isUploading
uploadSubmittingRef
```

La carga utiliza guard de reentrada y los botones quedan deshabilitados mientras se registra el archivo.

Errores de extensión o tamaño:

```text
no persisten cambios
no generan timeline
```

---

## 11. Acciones por estado

### Pendiente

```text
Subir
```

### En revisión

```text
Reemplazar
```

### Rechazado

```text
Reemplazar
```

### Aprobado

No se muestra una acción de nueva carga.

Esto evita que una aprobación se revierta accidentalmente a `en_revision`.

---

## 12. Detalle documental honesto

La antigua sección:

```text
Vista previa de documento
```

se convirtió en:

```text
Detalle del documento
```

Se muestran:

- nombre lógico;
- archivo;
- tamaño;
- fecha de registro;
- fecha límite;
- estado;
- observación del revisor.

No se simula el contenido visual del PDF.

---

## 13. Descarga ficticia eliminada

Se eliminaron los controles de:

```text
Descargar
```

porque no existe un binario persistido.

No se crearon URLs temporales ni blobs locales que aparentaran una persistencia inexistente.

---

## 14. Confirmación de carga

El modal ahora comunica:

```text
El documento quedó registrado en tu expediente y está listo para revisión.
```

Se eliminó:

```text
Tiempo estimado de revisión: 24-48 horas
```

porque el prototipo no implementa un SLA real.

---

## 15. Sincronización del detalle abierto

`DocumentsPage` ya escuchaba:

```text
campus360:storage-change
```

La Fase 4 amplía ese comportamiento.

Si existe un documento seleccionado:

```text
currentApplicant cambia
-> buscar documento por ID
-> refrescar selectedDoc
```

Por tanto:

```text
En revisión
-> Admin aprueba
-> Aprobado
```

también se refleja en el detalle que permanezca abierto.

---

## 16. Revisión administrativa

La tabla de documentos de `AspirantePerfilPage` conserva:

```text
Documento
Estado
Actualizado
Acción
```

Para Ana, la acción `Revisar` requiere que exista:

```text
fileName
```

Los documentos pendientes sin carga muestran:

```text
Sin carga
```

Los aspirantes mock existentes conservan su comportamiento anterior.

---

## 17. Estados de revisión preservados

El modal mantiene:

```text
En revisión
Aprobado
Rechazado
Solicitar corrección
```

El guion utiliza:

```text
Aprobado
```

No existe autoaprobación.

---

## 18. Idempotencia de revisión

Antes de persistir se comparan:

```text
status
reviewNote
```

Si no existe un cambio real:

```text
No hay cambios para guardar.
```

y no se crea timeline.

El botón también queda deshabilitado cuando status y observación coinciden con el documento actual.

---

## 19. Protección contra doble revisión

Se agregaron:

```text
isDocumentReviewSubmitting
documentReviewSubmittingRef
```

Mientras se persiste:

```text
Guardar revisión
-> Guardando...
```

Los controles del modal permanecen deshabilitados.

---

## 20. Rechazo y corrección

Se conserva la validación existente:

```text
Rechazado
Solicitar corrección
-> observación obligatoria
```

Para:

```text
Aprobado
```

la observación permanece opcional.

---

## 21. Aprobación del certificado

Al seleccionar:

```text
Aprobado
```

se persiste:

```text
status = aprobado
updatedAt = ahora
reviewNote = undefined
```

Se conservan:

```text
fileName
fileSize
uploadedAt
```

---

## 22. Timeline esperado

Partiendo del cierre de Fase 3:

```text
Registro creado
Responsable asignado
Llamada registrada
Etapa actualizada
Documento cargado
Documento aprobado
```

Los guards añadidos evitan duplicados por doble confirmación.

---

## 23. Estado global de documentos

La lógica existente de `updateApplicantDocument()` permanece sin cambios.

Después de aprobar solo el certificado:

```text
Certificado = aprobado
otros 4 requeridos = pendiente
documentStatus = en_revision
```

Esto es correcto.

No se marca el expediente completo como aprobado.

---

## 24. Etapa del aspirante

La Fase 4 no modifica:

```text
stage = Contacto inicial
```

La revisión documental no avanza automáticamente la etapa.

---

## 25. Métricas esperadas

En un expediente recién creado con cinco documentos requeridos, después de aprobar únicamente el certificado:

```text
Aprobados = 1
En revisión = 0
Pendientes = 4
Completado = 20%
```

No se inyectan documentos aprobados artificialmente.

---

## 26. Accesibilidad

Los modales modificados incluyen:

```text
role="dialog"
aria-modal="true"
aria-labelledby
```

Los botones quedan deshabilitados durante persistencia.

---

## 27. Validaciones estáticas realizadas

Sobre el commit funcional se confirmó:

- no existe `demoDocuments`;
- existe EmptyState documental;
- se usa `DEMO_DOCUMENT_NAME`;
- existe guard de doble carga;
- existe evento `Documento reemplazado`;
- no existe botón/icono de descarga;
- no existe copy de 24–48 horas;
- existe copy de almacenamiento por metadatos;
- selectedDoc se resincroniza;
- existe guard de revisión;
- existe detección de cambios reales;
- el botón de revisión se deshabilita sin cambios;
- el modal administrativo tiene semántica de diálogo;
- desapareció el fallback `Documento demo`.

---

## 28. Validación de CI

Commit funcional:

```text
0774de7631949915b82ad3755fd673de6ab576f8
```

Run:

```text
36655625739
```

Resultado:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
```

El build sigue ejecutando:

```text
tsc -b && vite build
```

---

## 29. Limitación de QA

No existe todavía una suite E2E automatizada.

La validación actual cubre:

- revisión estática;
- TypeScript;
- Vite build;
- despliegue Pages.

Los tests automáticos de navegador siguen reservados para Fase 8.

---

## 30. Criterios de aceptación cerrados

- [x] eliminado `demoDocuments`;
- [x] EmptyState sin expediente;
- [x] documentos provienen solo del expediente real;
- [x] `DEMO_DOCUMENT_NAME` utilizado;
- [x] PDF/JPG/PNG conservados;
- [x] límite 10 MB conservado;
- [x] carga registra metadatos;
- [x] carga pone `en_revision`;
- [x] reemplazo tiene evento diferenciado;
- [x] doble carga protegida;
- [x] aprobado no puede recargarse accidentalmente;
- [x] detalle muestra metadatos reales;
- [x] no existe descarga ficticia;
- [x] no existe SLA ficticio;
- [x] selectedDoc se resincroniza;
- [x] Ana no puede revisar documentos sin archivo;
- [x] Aprobado conserva archivo/tamaño/fecha de carga;
- [x] revisión sin cambios bloqueada;
- [x] doble revisión protegida;
- [x] rechazo/corrección exige observación;
- [x] `documentStatus` continúa calculándose globalmente;
- [x] stage no cambia automáticamente;
- [x] modales modificados tienen semántica accesible;
- [x] TypeScript/Vite build pasa;
- [x] GitHub Pages despliega.

---

## 31. Fuera de alcance preservado

No se añadió:

- almacenamiento real de archivo;
- preview real de PDF;
- descarga real;
- OCR;
- antivirus;
- historial de versiones binario;
- cambio automático de etapa;
- backend;
- auth;
- tests Vitest/Playwright.

---

## 32. Puerta de entrada a Fase 5

El recorrido de admisión ya permite demostrar:

```text
registro
-> seguimiento Admin
-> carga documental
-> revisión Admin
-> reflejo al Aspirante
```

Fase 5 puede concentrarse únicamente en la Escena 6:

```text
Estudiante
-> Agenda
-> Avisos
-> Trayectoria
-> Eventos
-> detalle de convocatoria
-> Mapa
```

sin modificar el expediente de Ana.

**Siguiente fase:** Fase 5 — Portal Estudiante.
