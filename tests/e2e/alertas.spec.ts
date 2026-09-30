import { expect, test } from "@playwright/test";
import { clearCampusState, gotoRoute } from "./helpers/navigation";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "La interacción completa de Alertas se cubre en desktop.");
  await clearCampusState(page);
});

test("atiende a Sofía y recalcula la bandeja", async ({ page }) => {
  await gotoRoute(page, "/admin/alertas");

  const sofia = page.locator("article").filter({ hasText: "Sofía Prieto" }).first();
  await sofia.getByRole("button", { name: "Atender" }).click();

  const dialog = page.getByRole("dialog", { name: /Atender alerta: Sofía Prieto/i });
  await dialog.getByRole("button", { name: "Guardar atención" }).click();
  await expect(dialog.getByText(/Describe la acción realizada/i)).toBeVisible();

  await dialog.getByLabel("Acción realizada").fill("Programar tutoría inmediata");
  await dialog.getByLabel("Responsable").fill("Mtra. Carla Medina");
  await dialog.getByLabel("Fecha de seguimiento").fill("2026-10-12");
  await dialog.getByRole("button", { name: "Guardar atención" }).click();

  await expect(page.getByText(/Alerta de Sofía Prieto atendida correctamente/i)).toBeVisible();
  await expect(page.getByText("Sin alertas críticas pendientes")).toBeVisible();

  const updated = page.locator("article").filter({ hasText: "Sofía Prieto" }).first();
  await expect(updated.getByRole("button", { name: "Ver atención" })).toBeVisible();
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]