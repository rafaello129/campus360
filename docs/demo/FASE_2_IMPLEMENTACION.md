# Campus360 — Fase 2: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `02d7d735c74184059bb624944d1c2362b8b6680f`  
**Commit funcional principal:** `5050bf4ea94b7f3f71278e53a8101df84b2ec5c4`  
**Corrección visual final:** `7558bdbd5f680fe1565d5f2ad8a4dd7d48942120`  
**Workflow validado:** `Deploy Campus360 to GitHub Pages`  
**Run validado:** `36623466357`  
**Resultado:** `completed / success`

---

## 1. Objetivo cerrado

La Fase 2 cierra las escenas 1–3 del guion:

```text
Selector
-> Aspirante
-> Carreras
-> Ingeniería en Software
-> Detalle de carrera
-> Iniciar registro
-> carrera preseleccionada
-> Ana López
-> Enviar solicitud
-> folio
-> Ver mi proceso
-> Registro recibido
```

El mismo expediente queda disponible para las fases administrativas posteriores.

---

## 2. Archivos modificados

```text
src/router/paths.ts
src/pages/aspirante/CareerDetailPage.tsx
src/pages/aspirante/RegistrationPage.tsx
src/pages/aspirante/ProcessPage.tsx
src/data/applicantStorage.ts
src/data/demoSession.ts
```

---

## 3. Navegación carrera → registro

Se agregó:

```ts
registroCarrera: (careerId: string) =>
  `/aspirante/registro?career=${encodeURIComponent(careerId)}`
```

Los dos CTA de `CareerDetailPage` usan ahora el helper.

Para Ingeniería en Software:

```text
/aspirante/carreras/ing-software
-> /aspirante/registro?career=ing-software
```

El acceso general:

```text
/aspirante/registro
```

se conserva.

---

## 4. Carrera preseleccionada

`RegistrationPage` usa:

```ts
useSearchParams()
```

La función:

```ts
getValidCareerId()
```

valida el query contra `careers.ts`.

Una carrera válida se inicializa en el select.

Un ID inexistente se ignora y deja el select vacío.

Esto conserva el comportamiento tras refresh porque la selección proviene de la URL.

---

## 5. Registro idempotente de Ana López

Se agregó a `demoSession.ts`:

```ts
createOrResumeDemoApplicant()
```

Resultado:

```ts
{
  applicant,
  created
}
```

Flujo:

```text
email demo
-> buscar expediente existente

si existe:
   setCurrentApplicant()
   markDemoApplicant()
   devolver created=false

si no existe:
   createApplicant(..., setAsCurrent=true)
   markDemoApplicant()
   devolver created=true
```

El correo se compara con la normalización implementada en Fase 1.

---

## 6. Protección contra doble envío

`RegistrationPage` incorpora:

```text
isSubmitting
submittingRef
```

El ref bloquea reentradas incluso antes de que React alcance a renderizar el botón deshabilitado.

Por lo tanto la protección no depende únicamente del estado visual del botón.

Durante la operación se muestra:

```text
Enviando...
```

---

## 7. Usuarios no demo

Los correos diferentes de:

```text
ana.lopez@example.com
```

siguen utilizando:

```ts
createApplicant()
```

No se convierte el registro general en un singleton.

La idempotencia especial se limita al aspirante oficial del guion.

---

## 8. Modal de confirmación

El modal conserva:

```text
Folio de admisión
Ver mi proceso de admisión
```

Si la solicitud es nueva:

```text
¡Registro completado!
```

Si Ana ya existía:

```text
Solicitud recuperada
```

y se reutiliza el folio del expediente existente.

---

## 9. Eliminación del correo ficticio

Se eliminó:

```text
Te hemos enviado un correo de confirmación con instrucciones.
```

El prototipo no dispone de servicio de correo.

El copy ahora indica:

```text
Guarda tu folio para consultar y dar seguimiento a tu proceso.
```

---

## 10. Acción secundaria del modal

El antiguo botón:

```text
Volver al inicio
```

solo cerraba el modal.

Ahora se llama:

```text
Seguir explorando
```

y navega explícitamente a:

```text
/aspirante
```

---

## 11. Proceso sin expediente

Se eliminó el fallback funcional de:

```text
Carlos Alberto Morales
ASP-2026-0148
```

Si no existe aspirante actual, `ProcessPage` muestra:

```text
Aún no tienes una solicitud activa
```

con CTA:

```text
Iniciar registro
```

Esto evita mostrar un expediente ficticio como si perteneciera al usuario.

---

## 12. Proceso después del registro

Con un expediente real se utilizan exclusivamente sus datos persistidos.

Para un registro nuevo:

```text
stage = Nuevo registro
```

se representa públicamente como:

```text
Registro recibido
```

El historial proviene de:

```text
currentApplicant.timeline
```

y los documentos de:

```text
currentApplicant.documents
```

---

## 13. Asesor inicial

Mientras el expediente contiene:

```text
owner = Pendiente de asignación
```

la vista pública mantiene ese estado y utiliza el correo institucional de admisiones.

No se asignó todavía:

```text
Lic. Brenda Salas
```

porque eso corresponde a Fase 3.

---

## 14. Fechas dinámicas

Los documentos nuevos ya no se crean con fechas fijas de febrero/marzo de 2026.

Se agregó:

```ts
addDays()
```

Reglas:

```text
Acta de nacimiento            registro + 7 días
CURP                          registro + 7 días
Certificado de bachillerato   registro + 7 días
Identificación oficial        registro + 7 días
Comprobante de domicilio      registro + 14 días
```

El formato utiliza la misma lógica `Intl.DateTimeFormat("es-MX")` del expediente.

Los registros antiguos no son migrados.

---

## 15. Validaciones estáticas realizadas

Se verificó sobre el `main` funcional:

- helper `registroCarrera` presente;
- ambos CTA utilizan `career.id`;
- `RegistrationPage` usa `useSearchParams`;
- existe `createOrResumeDemoApplicant`;
- existe guardia de doble submit;
- el copy falso de correo ya no existe en el archivo actual;
- `ProcessPage` ya no contiene a Carlos Alberto Morales;
- existe el EmptyState sin expediente;
- el constructor de aspirantes ya no contiene las fechas fijas de febrero/marzo;
- el texto de acción requerida quedó sin comillas visuales accidentales.

---

## 16. Validación de CI

Commit exacto validado:

```text
7558bdbd5f680fe1565d5f2ad8a4dd7d48942120
```

Workflow:

```text
Deploy Campus360 to GitHub Pages
```

Run:

```text
36623466357
```

Resultado:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
Workflow: completed / success
```

El build ejecuta:

```text
tsc -b && vite build
```

---

## 17. Criterios de aceptación

- [x] ambos CTA transportan `careerId`;
- [x] URL usa `?career=...`;
- [x] refresh conserva selección por URL;
- [x] query inválido se ignora de forma segura;
- [x] Ana se reconoce por correo normalizado;
- [x] Ana existente se reutiliza;
- [x] Ana nueva queda como current applicant;
- [x] Ana queda marcada como demo applicant;
- [x] doble submit protegido;
- [x] usuario no demo conserva creación normal;
- [x] folio real visible;
- [x] eliminado mensaje de correo inexistente;
- [x] CTA abre Mi proceso;
- [x] proceso usa expediente real;
- [x] Nuevo registro mapea a Registro recibido;
- [x] sin expediente existe EmptyState;
- [x] eliminado fallback de Carlos;
- [x] fechas nuevas son dinámicas;
- [x] Fase 1 permanece compatible;
- [x] TypeScript/Vite build pasa;
- [x] GitHub Pages despliega.

---

## 18. Fuera de alcance preservado

No se implementó todavía:

- asignación de Lic. Brenda Salas;
- registro de llamada;
- cambio a Contacto inicial;
- búsqueda admin ampliada;
- carga/revisión del PDF;
- aprobación documental;
- pruebas Vitest;
- Playwright;
- backend;
- autenticación;
- correo real.

---

## 19. Puerta de entrada a Fase 3

Fase 3 puede asumir un expediente único y persistido:

```text
name = Ana López
email = ana.lopez@example.com
career = Ingeniería en Software
stage = Nuevo registro
owner = Pendiente de asignación
currentApplicant = Ana
demoApplicantId = Ana
```

Siguiente recorrido:

```text
Administrador
-> Captación
-> localizar Ana
-> expediente
-> asignar Lic. Brenda Salas
-> registrar llamada
-> cambiar estatus a Contacto inicial
-> Aspirante
-> Mi proceso
-> Contacto inicial
```

**Siguiente fase:** Fase 3 — seguimiento administrativo de Ana.
