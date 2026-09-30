import { expect, test } from "@playwright/test";
import { preparePresentation } from "./helpers/demo";
import { clearCampusState, gotoRoute } from "./helpers/navigation";
import { readStorage } from "./helpers/storage";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "El modo presentación funcional se cubre en desktop.");
  await clearCampusState(page);
});

test("mantiene escena, permite reiniciar/anterior y no modifica el dominio", async ({ page }) => {
  await preparePresentation(page);

  await page.getByRole("button", { name: /Escena 1 de 7/i }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(page).toHaveURL(/#\/aspirante\/carreras/);

  await page.getByRole("button", { name: /Escena 2 de 7/i }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(page).toHaveURL(/#\/aspirante\/registro\?career=ing-software/);

  await page.reload();
  await expect(page.getByRole("button", { name: /Escena 3 de 7/i })).toBeVisible();

  await page.getByRole("button", { name: /Escena 3 de 7/i }).click();
  await page.getByRole("button", { name: "Reiniciar" }).click();
  await expect(page).toHaveURL(/#\/aspirante\/registro\?career=ing-software/);

  await page.getByRole("button", { name: /Escena 3 de 7/i }).click();
  await page.getByRole("button", { name: "Anterior" }).click();
  await expect(page).toHaveURL(/#\/aspirante\/carreras/);

  expect(await readStorage(page, "campus360:applicants:v1")).toBeNull();

  await page.getByRole("button", { name: /Escena 2 de 7/i }).click();
  await page.getByRole("button", { name: "Salir de presentación" }).click();
  await expect(page.getByRole("button", { name: /Escena 2 de 7/i })).toHaveCount(0);
});

test("NotFound permite volver a la escena actual", async ({ page }) => {
  await preparePresentation(page);
  await page.getByRole("button", { name: /Escena 1 de 7/i }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page).toHaveURL(/#\/admin\/captacion/);

  await gotoRoute(page, "/ruta-que-no-existe");
  await expect(page.getByRole("heading", { name: "Ruta no encontrada" })).toBeVisible();
  await page.getByRole("link", { name: "Volver a la escena 4" }).click();
  await expect(page).toHaveURL(/#\/admin\/captacion/);
});
