import { expect, type Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { gotoRoute } from "./navigation";

export const demoCertificatePath = fileURLToPath(
  new URL("../../fixtures/certificado-demo.pdf", import.meta.url)
);

export async function preparePresentation(page: Page) {
  await gotoRoute(page, "/");
  await page.getByRole("button", { name: "Preparar presentación" }).click();
  const dialog = page.getByRole("dialog", { name: "Preparar presentación" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Preparar", exact: true }).click();
  await expect(page.getByText(/Presentación preparada/i)).toBeVisible();
}

export async function registerAna(page: Page) {
  await gotoRoute(page, "/aspirante/carreras");

  const careerCard = page.locator("article").filter({ hasText: "Ingeniería en Software" }).first();
  await expect(careerCard).toBeVisible();
  await careerCard.getByRole("link", { name: "Ver detalles" }).click();
  await page.getByRole("link", { name: "Iniciar registro" }).click();

  await expect(page.getByLabel("Carrera de interés")).toHaveValue("ing-software");
  await page.getByLabel("Nombre completo").fill("Ana López");
  await page.getByLabel("Correo electrónico").fill("ana.lopez@example.com");
  await page.getByLabel("Modalidad preferida").selectOption("presencial");
  await page.getByLabel("Último nivel de estudios").selectOption("bachillerato");
  await page.getByLabel("¿Cómo te enteraste de nosotros?").selectOption("web");
  await page
    .getByLabel("Comentarios o dudas")
    .fill("Quisiera conocer los requisitos de inscripción.");

  await page.getByRole("button", { name: "Enviar solicitud" }).click();

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("¡Registro completado!")).toBeVisible();
  const folioNode = dialog.getByText(/^ASP-\d{4}-/);
  await expect(folioNode).toBeVisible();
  const folio = (await folioNode.textContent()) ?? "";

  await dialog.getByRole("button", { name: "Ver mi proceso de admisión" }).click();
  await expect(page.getByText("Registro recibido")).toBeVisible();

  return folio;
}

export async function openAnaFromCaptacion(page: Page) {
  await gotoRoute(page, "/admin/captacion");
  await page
    .getByPlaceholder("Buscar por nombre, correo, folio o carrera")
    .fill("ana.lopez@example.com");

  const card = page.locator("article").filter({ hasText: "Ana López" }).first();
  await expect(card).toBeVisible();
  await card.getByRole("link", { name: "Ver perfil" }).click();
  await expect(page.getByRole("heading", { name: "Ana López" })).toBeVisible();
}

export async function completeAnaFollowUp(page: Page) {
  await page.getByRole("button", { name: "Asignar responsable" }).click();
  await page.getByLabel("Responsable").selectOption("Lic. Brenda Salas");
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByRole("heading", { name: "Asignar responsable" })).toBeHidden();

  await page.getByRole("button", { name: "Registrar llamada" }).click();
  await page
    .getByLabel(/^Comentario/)
    .fill("Se explicaron los requisitos de admisión");
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByRole("heading", { name: "Registrar llamada" })).toBeHidden();

  await page.getByRole("button", { name: "Cambiar estatus" }).click();
  await page.getByLabel("Nueva etapa").selectOption("Contacto inicial");
  await page.getByRole("button", { name: "Confirmar" }).click();
  await expect(page.getByRole("heading", { name: "Cambiar estatus" })).toBeHidden();

  await expect(page.getByText("Lic. Brenda Salas").first()).toBeVisible();
  await expect(page.getByText("Llamada registrada")).toBeVisible();
  await expect(page.getByText("Contacto inicial").first()).toBeVisible();
}

export async function uploadDemoCertificate(page: Page) {
  await gotoRoute(page, "/aspirante/documentos");

  const uploadButton = page.getByRole("button", {
    name: "Subir Certificado de bachillerato"
  });
  const fileChooserPromise = page.waitForEvent("filechooser");
  await uploadButton.click();
  const chooser = await fileChooserPromise;
  await chooser.setFiles(demoCertificatePath);

  const dialog = page.getByRole("dialog", { name: "Carga completada" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("En revisión")).toBeVisible();
  await dialog.getByRole("button", { name: "Entendido" }).click();

  await expect(page.getByText("certificado-demo.pdf").first()).toBeVisible();
}

export async function approveDemoCertificate(page: Page) {
  await openAnaFromCaptacion(page);

  await page
    .getByRole("button", { name: "Revisar Certificado de bachillerato" })
    .click();

  const dialog = page.getByRole("dialog", { name: "Certificado de bachillerato" });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Resultado").selectOption("aprobado");
  await dialog.getByRole("button", { name: "Guardar revisión" }).click();
  await expect(dialog).toBeHidden();
}

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]