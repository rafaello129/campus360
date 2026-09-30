import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AlertasPage } from "../../src/pages/admin/AlertasPage";

function metric(label: string) {
  const labelNode = screen.getAllByText(label).find((node) => node.tagName === "P");
  const container = labelNode?.parentElement;
  if (!container) throw new Error("No se encontró contenedor para " + label);
  return container;
}

describe("AlertasPage", () => {
  it("valida la atención y recalcula métricas al atender a Sofía", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AlertasPage />
      </MemoryRouter>
    );

    expect(metric("Pendientes")).toHaveTextContent("2");
    expect(metric("Riesgo alto pendiente")).toHaveTextContent("1");
    expect(metric("Riesgo medio pendiente")).toHaveTextContent("1");
    expect(metric("Atendidas")).toHaveTextContent("2");

    const sofiaName = screen.getAllByText("Sofía Prieto").find((node) => node.tagName === "H3");
    const sofia = sofiaName?.closest("article");
    expect(sofia).not.toBeNull();
    await user.click(within(sofia!).getByRole("button", { name: "Atender" }));

    const dialog = screen.getByRole("dialog", { name: /Atender alerta: Sofía Prieto/i });
    await user.click(within(dialog).getByRole("button", { name: "Guardar atención" }));
    expect(within(dialog).getByText(/Describe la acción realizada/i)).toBeInTheDocument();

    await user.type(
      within(dialog).getByLabelText("Acción realizada"),
      "Programar tutoría inmediata"
    );
    await user.clear(within(dialog).getByLabelText("Responsable"));
    await user.click(within(dialog).getByRole("button", { name: "Guardar atención" }));
    expect(within(dialog).getByText(/Indica el responsable/i)).toBeInTheDocument();

    await user.type(within(dialog).getByLabelText("Responsable"), "Mtra. Carla Medina");
    await user.click(within(dialog).getByRole("button", { name: "Guardar atención" }));
    expect(within(dialog).getByText(/Selecciona una fecha/i)).toBeInTheDocument();

    fireEvent.change(within(dialog).getByLabelText("Fecha de seguimiento"), {
      target: { value: "2026-10-12" }
    });
    await user.click(within(dialog).getByRole("button", { name: "Guardar atención" }));

    expect(await screen.findByText(/Alerta de Sofía Prieto atendida correctamente/i)).toBeInTheDocument();
    expect(metric("Pendientes")).toHaveTextContent("1");
    expect(metric("Riesgo alto pendiente")).toHaveTextContent("0");
    expect(metric("Atendidas")).toHaveTextContent("3");
    expect(screen.getByText("Sin alertas críticas pendientes")).toBeInTheDocument();

    const updatedSofiaName = screen.getAllByText("Sofía Prieto").find((node) => node.tagName === "H3");
    const updatedSofia = updatedSofiaName?.closest("article");
    expect(within(updatedSofia!).getByRole("button", { name: "Ver atención" })).toBeInTheDocument();
  });
});

[executed on device: localhost.localdomain (9efb35a7-f471-4803-9cf5-53e66e022ee9)]