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
