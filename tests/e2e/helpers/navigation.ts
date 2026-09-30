import type { Page } from "@playwright/test";

export async function gotoRoute(page: Page, path = "/") {
  await page.goto(`./#${path}`);
}

export async function clearCampusState(page: Page) {
  await gotoRoute(page, "/");
  await page.evaluate(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.reload();
}

export async function switchRole(
  page: Page,
  role: "Aspirante" | "Estudiante" | "Administrativo"
) {
  const roots = {
    Aspirante: "#/aspirante",
    Estudiante: "#/estudiante",
    Administrativo: "#/admin"
  } as const;

  await gotoRoute(page, "/");
  await page
    .locator(`a[href="${roots[role]}"]`)
    .filter({ hasText: role })
    .click();
}

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]