import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CAMPUS360_STORAGE_KEYS, DEMO_APPLICANT } from "../../src/config/demo";
import { createOrResumeDemoApplicant } from "../../src/data/demoSession";
import { RegistrationPage } from "../../src/pages/aspirante/RegistrationPage";

const demoInput = {
  name: DEMO_APPLICANT.name,
  email: DEMO_APPLICANT.email,
  phone: "",
  career: DEMO_APPLICANT.careerId,
  modality: DEMO_APPLICANT.modality,
  education: DEMO_APPLICANT.education,
  source: DEMO_APPLICANT.source,
  comments: DEMO_APPLICANT.comments,
  origin: "public" as const
};

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/aspirante/registro?career=ing-software"]}>
      <Routes>
        <Route path="/aspirante/registro" element={<RegistrationPage />} />
        <Route path="/aspirante/proceso" element={<div>Proceso mock</div>} />
        <Route path="/aspirante" element={<div>Inicio mock</div>} />
      </Routes>
    </MemoryRouter>
  );
}

async function fillDemoForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Nombre completo"), DEMO_APPLICANT.name);
  await user.type(screen.getByLabelText("Correo electrónico"), DEMO_APPLICANT.email);
  await user.selectOptions(screen.getByLabelText("Modalidad preferida"), "presencial");
  await user.selectOptions(screen.getByLabelText("Último nivel de estudios"), "bachillerato");
  await user.selectOptions(screen.getByLabelText("¿Cómo te enteraste de nosotros?"), "web");
  await user.type(screen.getByLabelText("Comentarios o dudas"), DEMO_APPLICANT.comments);
  return user;
}

describe("RegistrationPage", () => {
  it("preselecciona Ingeniería en Software y registra a Ana", async () => {
    renderPage();

    expect(screen.getByLabelText("Carrera de interés")).toHaveValue("ing-software");
    const user = await fillDemoForm();
    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("¡Registro completado!")).toBeInTheDocument();
    expect(within(dialog).getByText(/^ASP-2026-/)).toBeInTheDocument();

    const payload = JSON.parse(
      window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants) ?? "{}"
    );
    expect(payload.applicants).toHaveLength(1);
    expect(payload.applicants[0].email).toBe(DEMO_APPLICANT.email);

    await user.click(within(dialog).getByRole("button", { name: "Ver mi proceso de admisión" }));
    expect(await screen.findByText("Proceso mock")).toBeInTheDocument();
  });

  it("recupera a Ana sin crear un duplicado", async () => {
    const original = createOrResumeDemoApplicant(demoInput).applicant;
    renderPage();

    const user = await fillDemoForm();
    await user.click(screen.getByRole("button", { name: "Enviar solicitud" }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("Solicitud recuperada")).toBeInTheDocument();
    expect(within(dialog).getByText(original.folio)).toBeInTheDocument();

    const payload = JSON.parse(
      window.localStorage.getItem(CAMPUS360_STORAGE_KEYS.applicants) ?? "{}"
    );
    expect(payload.applicants).toHaveLength(1);
    expect(payload.applicants[0].id).toBe(original.id);
  });
});