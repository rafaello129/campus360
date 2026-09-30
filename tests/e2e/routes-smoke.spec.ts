import { expect, test } from "@playwright/test";
import { clearCampusState, gotoRoute } from "./helpers/navigation";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "El smoke general de rutas se ejecuta en desktop.");
  await clearCampusState(page);
});

test("las entradas críticas renderizan sin caer en NotFound", async ({ page }) => {
  const routes = [
    "/",
    "/aspirante",
    "/aspirante/carreras",
    "/aspirante/registro",
    "/aspirante/proceso",
    "/aspirante/documentos",
    "/estudiante",
    "/estudiante/agenda",
    "/estudiante/avisos",
    "/estudiante/trayectoria",
    "/estudiante/eventos",
    "/estudiante/mapa",
    "/admin",
    "/admin/captacion",
    "/admin/alertas",
    "/admin/analitica"
  ];

  for (const route of routes) {
    await gotoRoute(page, route);
    await expect(page.getByText("Ruta no encontrada")).toHaveCount(0);
  }
});

test("rutas dinámicas inválidas muestran un estado controlado", async ({ page }) => {
  await gotoRoute(page, "/estudiante/eventos/no-existe");
  await expect(page.getByRole("heading", { name: "Evento no encontrado", level: 1 })).toBeVisible();

  await gotoRoute(page, "/aspirante/carreras/no-existe");
  await expect(page.getByText(/no encontrad/i).first()).toBeVisible();
});
