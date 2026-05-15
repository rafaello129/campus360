import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

export function AsistentePage() {
  const [messages, setMessages] = useState<{ id: string; from: string; text: string }[]>([
    { id: "m1", from: "Asistente", text: "Hola, puedo ayudarte a organizar tus pendientes, revisar tus áreas de mejora y sugerirte actividades." }
  ]);

  const actions = [
    "Analizar mi semana",
    "Recomendar taller",
    "Revisar pendientes",
    "Sugerir plan de estudio",
    "Detectar áreas de mejora"
  ];

  const handleAction = (label: string) => {
    const reply = {
      "Analizar mi semana": "Esta semana tienes 3 tareas pendientes y 2 eventos. Prioriza entregas urgentes.",
      "Recomendar taller": "Recomiendo el taller de Git y GitHub avanzado para mejorar colaboración.",
      "Revisar pendientes": "Tienes 1 documento pendiente y 2 tareas próximas. Agenda una tutoría si lo requieres.",
      "Sugerir plan de estudio": "Te propongo distribuir 6 horas semanales: 3 para teoría y 3 para práctica.",
      "Detectar áreas de mejora": "Notas bajas en Programación Web. Recomiendo tutoría y práctica guiada."
    }[label] || "Lo siento, no tengo una sugerencia concreta para eso.";

    setMessages((prev) => [...prev, { id: `u-${Date.now()}`, from: "Estudiante", text: label }, { id: `r-${Date.now()}`, from: "Asistente", text: reply }]);
  };

  return (
    <PageShell eyebrow="Apoyo" title="Asistente académico" description="Herramienta de apoyo simulada para organizar tu vida académica.">
      <div className="grid gap-6 lg:grid-cols-3">
        <main className="lg:col-span-2">
          <SectionCard title="Asistente virtual">
            <div className="space-y-3">
              <div className="text-sm text-slate-600">Selecciona una acción para que el asistente responda.</div>
              <div className="flex flex-wrap gap-2">
                {actions.map((a) => (
                  <button key={a} onClick={() => handleAction(a)} className="rounded-full bg-slate-100 px-4 py-2 text-sm hover:bg-slate-200">
                    {a}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`rounded-lg p-3 ${m.from === "Asistente" ? "bg-petrol-50" : "bg-white"}`}>
                    <div className="text-xs font-semibold text-slate-700">{m.from}</div>
                    <div className="mt-1 text-sm text-slate-900">{m.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Plan sugerido de esta semana" className="mt-6">
            <div>
              <p className="font-semibold">Lunes - Miércoles</p>
              <p className="text-sm text-slate-600">2 horas de práctica por materia crítica.</p>
              <div className="mt-3">
                <p className="font-semibold">Jueves</p>
                <p className="text-sm text-slate-600">Tutoría con tu asesor (revisión de proyecto).</p>
              </div>
            </div>
          </SectionCard>
        </main>

        <aside>
          <SectionCard title="Panel de estado" className="sticky top-4">
            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <p className="font-semibold">Pendientes detectados</p>
                <p>1 documento · 2 entregas próximas</p>
              </div>
              <div>
                <p className="font-semibold">Sugerencias de estudio</p>
                <p>Revisión semanal y práctica de problemas.</p>
              </div>
              <div>
                <p className="font-semibold">Nivel de riesgo académico</p>
                <p className="text-rose-700 font-bold">Moderado</p>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
