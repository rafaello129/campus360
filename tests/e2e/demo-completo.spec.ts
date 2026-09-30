import { expect, test } from "@playwright/test";
import {
  approveDemoCertificate,
  completeAnaFollowUp,
  preparePresentation,
  registerAna,
  uploadDemoCertificate,
  openAnaFromCaptacion
} from "./helpers/demo";
import { clearCampusState, gotoRoute, switchRole } from "./helpers/navigation";

test.beforeEach(async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "El recorrido completo se valida en viewport desktop.");
  await clearCampusState(page);
});

test("recorre las siete escenas de Campus360 de extremo a extremo", async ({ page }) => {
  await preparePresentation(page);
  await expect(page.getByRole("button", { name: /Escena 1 de 7/i })).toBeVisible();

  await page.getByRole("link", { name: /Aspirante/i }).click();
  await page.getByRole("link", { name: "Carreras", exact: true }).click();

  const folio = await registerAna(page);
  expect(folio).toMatch(/^ASP-\d{4}-/);

  await switchRole(page, "Administrativo");
  await openAnaFromCaptacion(page);
  await completeAnaFollowUp(page);

  await switchRole(page, "Aspirante");
  await gotoRoute(page, "/aspirante/proceso");
  await expect(page.getByText("Contacto inicial").first()).toBeVisible();

  await uploadDemoCertificate(page);

  await switchRole(page, "Administrativo");
  await approveDemoCertificate(page);

  await switchRole(page, "Aspirante");
  await gotoRoute(page, "/aspirante/documentos");
  const certificate = page
    .getByText("Certificado de bachillerato", { exact: true })
    .locator("xpath=ancestor::div[contains(@class,'rounded-2xl')][1]");
  await expect(certificate).toContainText("Aprobado");

  await switchRole(page, "Estudiante");
  await expect(page.getByText("María Elena Rodríguez").first()).toBeVisible();
  await expect(page.getByText("Ingeniería en Software").first()).toBeVisible();

  await page.getByRole("link", { name: "Agenda", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Mi agenda" })).toBeVisible();
  await expect(page.getByText(/Octubre 2026/i)).toBeVisible();

  await page.getByRole("link", { name: "Avisos", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Avisos y notificaciones" })).toBeVisible();

  await page.getByRole("link", { name: "Trayectoria", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Mi trayectoria" })).toBeVisible();
  await expect(page.getByText(/Feria de becas y financiamiento/i).first()).toBeVisible();

  await page.getByRole("link", { name: "Eventos", exact: true }).first().click();
  await expect(page.getByRole("heading", { name: "Feria de becas y financiamiento", level: 2 })).toBeVisible();
  const feriaLink = page.locator('a[href="#/estudiante/eventos/evt-feria"]');
  await expect(feriaLink).toBeVisible();
  await feriaLink.click();

  await expect(page.getByRole("heading", { name: "Feria de becas y financiamiento" })).toBeVisible();
  await page.getByRole("link", { name: "Ver en mapa" }).click();
  await expect(page.getByRole("heading", { name: "Mapa del campus" })).toBeVisible();
  await expect(page.getByText("Centro Estudiantil", { exact: true }).first()).toBeVisible();

  await switchRole(page, "Administrativo");
  await page.getByRole("link", { name: "Analítica", exact: true }).click();
  await expect(page.getByText("Corte octubre 2026").first()).toBeVisible();
  await expect(page.getByText(/47 señales/i).first()).toBeVisible();

  await page.getByRole("link", { name: "Revisar alertas" }).click();
  await expect(page.getByRole("heading", { name: "Alertas institucionales" })).toBeVisible();
  await expect(page.getByText(/4 casos representativos/i).first()).toBeVisible();
  await expect(page.getByText("Pendientes").first()).toBeVisible();
  await expect(page.getByText("Atendidas").first()).toBeVisible();
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]