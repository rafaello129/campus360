# Campus360 — Fase 7: Implementación

**Estado:** Implementada  
**Repositorio:** `rafaello129/campus360`  
**Rama:** `main`  
**Commit de entrada:** `c07841a0fe63aedfe44fd81b1213dab792f23109`

## Commits funcionales

```text
c94bea757cf9bf97a172a62da4d5ef6e2a82fd13
feat: add Campus360 presentation mode

bec633d33b74faac08c2dd829eb1452e20426ea7
fix: align demo navigation and presentation chrome

02b1d515a3c721c7ba9efd78c5d5431cdbd9f7ce
feat: prepare guided seven-scene demo flow

d7b4fd329c2c5ff700f7029925c7a3528d06e693
fix: keep selector scene links in sync
```

**Workflow funcional validado:** `Deploy Campus360 to GitHub Pages`  
**Run funcional:** `36714091594`  
**Resultado:** `completed / success`

---

## 1. Objetivo cerrado

Fase 7 convierte las siete escenas funcionales de Campus360 en un recorrido de presentación controlado:

```text
Preparar presentación
-> Escena 1
-> guía colapsable
-> escenas 1–7
-> recuperación
-> salida del modo presentación
```

No se añadió un nuevo dominio de negocio.

---

## 2. Modo presentación opt-in

El modo normal de Campus360 sigue funcionando sin controles adicionales.

El modo presentación solo aparece después de activarlo explícitamente.

La guía no:

- crea aspirantes;
- asigna responsables;
- modifica etapas;
- sube documentos;
- aprueba documentos;
- atiende alertas.

Las operaciones del guion continúan realizándose en las pantallas reales.

---

## 3. Estado por pestaña

Se creó:

```text
src/data/presentationSession.ts
```

El estado usa:

```text
sessionStorage
```

y la clave:

```text
campus360:presentation:v1
```

Modelo:

```ts
interface PresentationSession {
  version: 1;
  enabled: boolean;
  currentSceneId: number;
}
```

El estado sobrevive a refresh dentro de la pestaña, pero no se mezcla con el dominio persistente de Ana.

---

## 4. Configuración canónica de escenas

Se creó:

```text
src/config/presentationDemo.ts
```

con siete escenas:

```text
1 Inicio del recorrido
2 Exploración académica
3 Registro de Ana
4 Seguimiento administrativo
5 Control documental
6 Vida universitaria
7 Analítica y alertas
```

Cada escena define:

- ID;
- título;
- rol;
- ruta de entrada;
- checklist.

---

## 5. Escena 3

La entrada utiliza:

```text
/aspirante/registro?career=ing-software
```

y el checklist reutiliza el contrato de:

```text
Ana López
ana.lopez@example.com
Ingeniería en Software
Presencial
Bachillerato
Página web
Quisiera conocer los requisitos de inscripción.
```

No se duplicó un segundo contrato manual.

---

## 6. Escena 4

El checklist conserva:

```text
Lic. Brenda Salas
Se explicaron los requisitos de admisión
Contacto inicial
```

y entra por:

```text
/admin/captacion
```

---

## 7. Escena 5

El recorrido documental utiliza:

```text
Certificado de bachillerato
```

y entra inicialmente por:

```text
/aspirante/documentos
```

---

## 8. Escena 6

La escena Estudiante inicia en:

```text
/estudiante/agenda
```

y guía:

```text
Agenda
Avisos
Trayectoria
Eventos
Feria de becas
Detalle
Mapa
```

---

## 9. Escena 7

La escena final inicia en:

```text
/admin/analitica
```

y guía hacia:

```text
47 señales institucionales
-> Revisar alertas
-> 4 casos representativos
```

Atender una alerta queda como demostración opcional.

---

## 10. PresentationDock

Se creó:

```text
src/components/demo/PresentationDock.tsx
```

Estado colapsado:

```text
Escena N de 7
Título de escena
```

Estado expandido:

- rol;
- checklist;
- Anterior;
- Reiniciar;
- Siguiente;
- Volver al selector;
- Salir de presentación;
- acceso directo a escenas 1–7.

---

## 11. Reiniciar escena

`Reiniciar` únicamente navega a:

```text
scene.entryPath
```

No modifica el estado de Ana.

---

## 12. Navegación entre escenas

`Anterior` y `Siguiente`:

```text
actualizan currentSceneId
+
navegan a entryPath
```

No realizan ninguna operación de negocio.

---

## 13. Sin autoavance

Registrar Ana no cambia automáticamente:

```text
Escena 3 -> Escena 4
```

Subir o aprobar el certificado tampoco cambia la escena.

El expositor conserva el control del ritmo de presentación.

---

## 14. Navegación manual desde selector

La lista de escenas del selector actualiza:

```text
presentationSession.currentSceneId
```

antes de navegar.

Por tanto, el resaltado del selector y el Dock permanecen sincronizados.

---

## 15. Readiness de solo lectura

Se creó:

```text
src/data/presentationReadiness.ts
```

Consulta:

```text
getDemoApplicant()
```

y deriva:

- registro creado;
- Brenda asignada;
- llamada registrada;
- Contacto inicial;
- estado del certificado.

No llama:

```text
createApplicant
updateApplicant
updateApplicantDocument
```

---

## 16. Detección de seguimiento

El seguimiento se considera completo cuando:

```text
owner = Lic. Brenda Salas
+
timeline contiene llamada con DEMO_CALL_NOTE
+
stage = Contacto inicial
```

---

## 17. Readiness documental

Estados utilizados:

```text
Pendiente
En revisión
Aprobado
Rechazado
```

Ejemplos de ayuda:

```text
Ana aún no está registrada
Listo para cargar certificado
El certificado ya está en revisión
La escena documental ya está completada
```

Estas ayudas no bloquean navegación.

---

## 18. Preparar presentación

En `RoleSelectorPage` se añadió:

```text
Preparar presentación
```

Al confirmar:

```text
resetDemoSession()
enablePresentation(1)
```

Resultado:

```text
Ana limpia
expediente activo limpio
modo presentación activo
Escena 1
```

---

## 19. Reset independiente

Se conserva:

```text
Reiniciar datos
```

Este flujo sigue limpiando el estado dinámico de admisión sin ser sustituido por el modo presentación.

---

## 20. Continuar presentación

Si existe una sesión activa, el selector muestra:

```text
Continuar Escena N
```

con la ruta de entrada correspondiente.

---

## 21. Resumen persistente de Ana

El selector muestra:

```text
Registro
Seguimiento
Documento
```

con estados derivados del expediente real.

Si hay Ana pero no hay sesión de presentación, se muestra una sugerencia de recuperación.

---

## 22. Sugerencia de recuperación

Reglas:

```text
sin Ana
-> Escena 1

seguimiento incompleto
-> Escena 4

seguimiento completo + documento no aprobado
-> Escena 5

documento aprobado
-> Escena 6
```

La sesión manual activa siempre tiene prioridad.

---

## 23. RouteScrollReset

Se creó:

```text
src/components/navigation/RouteScrollReset.tsx
```

Al cambiar:

```text
pathname
search
```

reinicia:

```text
window scroll
+
contenedor [data-route-scroll]
```

Esto cubre rutas con query params como registro y mapa.

---

## 24. Integración en layouts

`PresentationDock` y `RouteScrollReset` se integraron en:

```text
AspiranteLayout
EstudianteLayout
AdminLayout
```

El Dock permanece oculto si el modo presentación está desactivado.

---

## 25. Identidad de Estudiante corregida

Antes:

```text
EstudianteLayout
-> students[0]
-> Andrea López
```

Ahora:

```text
EstudianteLayout
-> currentStudent
-> estudiante.mock.ts
-> María Elena Rodríguez
```

El header y las páginas del escenario Estudiante ya comparten identidad.

---

## 26. Cambiar rol en móvil Estudiante

El header móvil ahora ofrece:

```text
Cambiar rol
```

sin depender del sidebar desktop.

---

## 27. Admin sin búsqueda global muerta

Se eliminó del header global:

```text
SearchInput
Buscar aspirantes, estudiantes o documentos...
```

El header ahora muestra contexto real:

```text
Panel administrativo
2026-B
Corte octubre 2026
```

---

## 28. Campana Admin funcional

La campana dejó de ser un botón sin acción.

Ahora:

```text
Bell
-> /admin/alertas
```

Se eliminó el contador estático de 4.

---

## 29. Navegación Admin sin aspirante fijo

Se eliminó del menú:

```text
Aspirantes
-> /admin/aspirantes/APL-2026-001
```

La ruta sigue existiendo para compatibilidad.

El flujo real de la demo utiliza:

```text
Captación
-> expediente dinámico de Ana
```

---

## 30. Cambiar rol en móvil Admin

El menú móvil ahora incluye:

```text
Cambiar rol
```

y cierra el menú al navegar.

---

## 31. NotFound con recuperación

`NotFoundPage` detecta el modo presentación.

Con sesión activa muestra:

```text
Volver a la escena N
Ir al selector de rol
```

Sin sesión activa conserva el regreso al selector.

---

## 32. Copy del selector

Se eliminó:

```text
48 h
respuesta media
```

Las tarjetas ahora usan descripciones no contractuales:

```text
Registro y seguimiento
Vida campus
Gestión y analítica
```

---

## 33. AspiranteOverview

Se eliminó:

```text
Respuesta media 48 h
Ciclo 2026-A
Convocatoria 2026-A abierta
Cierre 30 de junio de 2026
```

Ahora:

```text
Seguimiento visible
Ciclo 2026-B
Registro de admisión disponible
```

sin deadline inventado.

---

## 34. CareerDetail

Se eliminó:

```text
Te contactaremos en menos de 48 horas
```

Ahora:

```text
Completa tu registro para generar un folio y dar seguimiento al proceso de admisión desde Campus360.
```

También se eliminó del modal secundario la promesa:

```text
próximas 24 horas
```

---

## 35. Deudas no bloqueantes

Fuera de las siete escenas oficiales siguen existiendo algunos copies legacy, entre ellos:

```text
Chatbot Aspirante -> 48 horas / convocatoria 2026-A
Documentos Estudiante -> 24-48 horas
```

No forman parte del recorrido oficial de Fase 7 y se mantienen fuera de alcance.

---

## 36. Z-index y convivencia con modales

El Dock colapsado y su panel usan un nivel inferior a los modales funcionales de la aplicación.

Los modales existentes permanecen por encima del modo presentación.

En móvil el botón colapsado utiliza:

```text
bottom-20
```

para no cubrir la barra inferior de Estudiante.

---

## 37. Validación estática

Sobre el commit funcional final se comprobó:

- existen siete escenas;
- Preparar presentación usa `resetDemoSession` + `enablePresentation(1)`;
- navegación manual sincroniza sceneId;
- PresentationDock no modifica datos de Ana;
- readiness no modifica datos;
- María proviene de `estudiante.mock.ts`;
- Estudiante móvil ofrece Cambiar rol;
- Admin ya no importa SearchInput global;
- campana Admin navega a Alertas;
- Admin móvil ofrece Cambiar rol;
- AspiranteOverview no contiene 48 h / 2026-A / junio;
- CareerDetail no contiene promesas de 48/24 horas en el flujo visible.

---

## 38. Validación CI

Commit funcional final:

```text
d7b4fd329c2c5ff700f7029925c7a3528d06e693
```

Run:

```text
36714091594
```

Resultado:

```text
Install dependencies: success
Build: success
Upload GitHub Pages artifact: success
Deploy to GitHub Pages: success
Workflow: completed / success
```

Build ejecutado:

```text
tsc -b && vite build
```

---

## 39. Criterios principales cerrados

- [x] configuración canónica de 7 escenas;
- [x] estado de presentación en sessionStorage;
- [x] modo normal sin Dock;
- [x] Preparar presentación limpia Ana y abre Escena 1;
- [x] Dock colapsado por defecto;
- [x] Anterior;
- [x] Reiniciar escena;
- [x] Siguiente;
- [x] acceso directo a escenas;
- [x] cero autoejecución de dominio;
- [x] readiness solo lectura;
- [x] selector muestra progreso de Ana;
- [x] refresh conserva sceneId;
- [x] María consistente en layout;
- [x] cambio de rol móvil Estudiante;
- [x] cambio de rol móvil Admin;
- [x] Admin sin búsqueda global muerta;
- [x] campana Admin funcional;
- [x] Admin sin aspirante fijo en nav;
- [x] scroll reset por ruta;
- [x] NotFound recuperable;
- [x] selector sin SLA 48 h;
- [x] AspiranteOverview en 2026-B;
- [x] sin deadline de junio;
- [x] CareerDetail sin promesa 48 h;
- [x] TypeScript/Vite correcto;
- [x] GitHub Pages correcto.

---

## 40. Fuera de alcance preservado

No se añadió:

- Playwright;
- Vitest;
- test runner;
- backend;
- autenticación;
- tour automático;
- atajos de teclado;
- persistencia de interacciones locales de Estudiante;
- persistencia de atención Admin tras refresh;
- limpieza completa de todos los módulos legacy.

---

## 41. Puerta de entrada a Fase 8

Con Fase 7, Campus360 ya tiene:

```text
funcionalidad de escenas
+
recorrido de presentación
+
estado de escena
+
recuperación
+
chrome consistente
```

Fase 8 puede enfocarse en:

```text
tests automatizados
regresión
rutas críticas
flujo completo de Ana
portal Estudiante
Analítica/Alertas
responsive básico
```

sin rediseñar nuevamente la experiencia de demo.

**Siguiente fase:** Fase 8 — pruebas automatizadas y QA.
