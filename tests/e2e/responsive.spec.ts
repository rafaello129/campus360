import { expect, test } from "@playwright/test";
import { preparePresentation } from "./helpers/demo";
import { clearCampusState, gotoRoute } from "./helpers/navigation";

test.beforeEach(async ({ page }) => {
  await clearCampusState(page);
});

test("chrome responsive mantiene cambio de rol y evita solapar el dock", async ({ page }, testInfo) => {
  await gotoRoute(page, "/estudiante/agenda");

  if (testInfo.project.name === "mobile") {
    await expect(page.getByRole("link", { name: "Cambiar rol" })).toBeVisible();
    const bottomNav = page.locator("nav.fixed");
    await expect(bottomNav).toBeVisible();

    await gotoRoute(page, "/");
    await preparePresentation(page);
    await page.getByRole("link", { name: /Estudiante/i }).click();

    const dock = page.getByRole("button", { name: /Escena 1 de 7/i });
    await expect(dock).toBeVisible();
    const dockBox = await dock.boundingBox();
    const navBox = await bottomNav.boundingBox();

    expect(dockBox).not.toBeNull();
    expect(navBox).not.toBeNull();
    expect(dockBox!.y + dockBox!.height).toBeLessThanOrEqual(navBox!.y);
  } else {
    await expect(page.getByRole("link", { name: "Volver al selector" })).toBeVisible();
    await expect(page.getByText("María Elena Rodríguez").first()).toBeVisible();

    await gotoRoute(page, "/admin");
    await expect(page.getByRole("link", { name: "Ir a alertas" })).toBeVisible();
  }
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]