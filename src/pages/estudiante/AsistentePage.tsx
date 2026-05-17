import { Brain, ClipboardCheck, ListTodo, Send, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

const actions = [
  "Analizar mi semana",
  "Recomendar taller",
  "Revisar pendientes",
  "Sugerir plan de estudio",
  "Detectar áreas de mejora"
];

const replies: Record<string, string> = {
  "Analizar mi semana": "Tienes 3 entregas, 2 eventos institucionales y una ventana libre el jueves. Prioriza Programación Web antes de asistir al taller.",
  "Recomendar taller": "El taller de Git y GitHub avanzado es el más alineado con tus materias actuales y tu proyecto integrador.",
  "Revisar pendientes": "Hay 1 documento pendiente y 2 tareas próximas. Conviene cerrar el documento hoy y reservar una tutoría para la tarea de mayor riesgo.",
  "Sugerir plan de estudio": "Distribuye 6 horas: 3 para práctica guiada, 2 para avance del proyecto y 1 para preparar dudas de tutoría.",
  "Detectar áreas de mejora": "La señal de riesgo está en Programación Web. Recomiendo práctica de componentes, revisión con tutor y una entrega parcial antes del viernes."
};

export function AsistentePage() {
  const [messages, setMessages] = useState<{ id: string; from: string; text: string }[]>([
    { id: "m1", from: "Asistente académico", text: "Puedo ayudarte a ordenar pendientes, revisar señales de riesgo y proponer un plan semanal con datos simulados." }
  ]);

  const handleAction = (label: string) => {
    const reply = replies[label] ?? "No tengo una recomendación concreta para esa acción.";
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, from: "Estudiante", text: label },
      { id: `r-${Date.now()}`, from: "Asistente académico", text: reply }
    ]);
  };

  return (
    <PageShell eyebrow="Acompañamiento" title="Asistente académico" description="Recomendaciones simuladas para organizar estudio, tutorías y pendientes.">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <SectionCard title="Plan de acompañamiento" className="border border-tech-border">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="flex min-h-[31rem] flex-col rounded-lg border border-tech-divider bg-tech-bg/60 p-4">
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {messages.map((message) => (
                  <div key={message.id} className={`rounded-lg p-4 ${message.from === "Estudiante" ? "ml-auto max-w-[82%] bg-tech-primary text-white" : "max-w-[88%] border border-tech-border bg-white text-tech-textMain"}`}>
                    <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${message.from === "Estudiante" ? "text-blue-100" : "text-tech-primary"}`}>{message.from}</p>
                    <p className="mt-2 text-sm leading-6">{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-tech-divider pt-4">
                <div className="flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <button key={action} onClick={() => handleAction(action)} className="rounded-full border border-tech-border bg-white px-3 py-1.5 text-xs font-semibold text-tech-primary transition hover:border-tech-primary/40 hover:bg-blue-50">
                      {action}
                    </button>
                  ))}
                </div>
                <button onClick={() => handleAction("Sugerir plan de estudio")} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid">
                  <Send className="h-4 w-4" />
                  Generar recomendación
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: ListTodo, title: "Pendientes detectados", text: "1 documento y 2 entregas próximas" },
                { icon: Target, title: "Riesgo académico", text: "Moderado en Programación Web" },
                { icon: ClipboardCheck, title: "Próxima acción", text: "Agendar tutoría antes del viernes" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-lg border border-tech-border bg-white p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Icon className="h-4 w-4" />
                      <p className="text-sm font-semibold text-tech-textMain">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-tech-textSecond">{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionCard>

        <aside className="space-y-4">
          <SectionCard title="Plan sugerido" className="border border-tech-border">
            <div className="space-y-3">
              {[
                { icon: Brain, title: "Lunes a miércoles", text: "2 horas de práctica por materia crítica." },
                { icon: TrendingUp, title: "Jueves", text: "Tutoría y revisión del proyecto integrador." },
                { icon: Target, title: "Viernes", text: "Cierre de pendientes y ajuste de prioridades." }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Icon className="h-4 w-4" />
                      <p className="text-sm font-semibold text-tech-textMain">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-tech-textSecond">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
