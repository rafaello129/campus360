import { Send } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

const FAQS = [
  { q: "¿Dónde solicito una constancia?", a: "Ingresa a Documentos, selecciona Solicitar constancia y confirma tus datos. La respuesta simulada queda marcada para revisión de Servicios Escolares." },
  { q: "¿Cómo veo eventos disponibles?", a: "Abre Eventos desde el menú principal. Puedes filtrar por tutorías, talleres y actividades institucionales antes de registrarte." },
  { q: "¿Dónde está Servicios Escolares?", a: "Está en el edificio principal, planta baja. También puedes ubicarlo desde el mapa del campus y revisar su horario de atención." },
  { q: "¿Cómo contacto a mi tutor?", a: "En Trayectoria aparece tu tutor asignado, correo institucional y la siguiente acción recomendada según tu avance académico." },
  { q: "¿Qué hago si tengo una alerta?", a: "Revisa el motivo en Avisos, agenda seguimiento con tu tutor y confirma si debes entregar documentos o asistir a una asesoría." }
];

export function ChatbotPage() {
  const [history, setHistory] = useState<{ q: string; a: string }[]>([
    {
      q: "Inicio de conversación",
      a: "Este canal simulado responde dudas frecuentes sobre trámites, eventos, documentos y servicios del campus."
    }
  ]);
  const [input, setInput] = useState("");

  const handleAsk = (text: string) => {
    const found = FAQS.find((f) => f.q.toLowerCase() === text.toLowerCase());
    const answer = found
      ? found.a
      : "No encontré una coincidencia exacta en las respuestas simuladas. Revisa Servicios Escolares, Trayectoria o Avisos según el tipo de trámite.";
    setHistory((h) => [...h, { q: text, a: answer }]);
    setInput("");
  };

  return (
    <PageShell eyebrow="Ayuda" title="Chatbot institucional" description="Canal simulado para resolver dudas operativas de vida estudiantil.">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <SectionCard title="Conversación" className="border border-tech-border">
          <div className="flex min-h-[32rem] flex-col">
            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Respuesta simulada</p>
              <p className="mt-1 text-sm leading-6 text-tech-textSecond">
                El asistente usa respuestas locales para orientar trámites frecuentes sin conectarse a servicios externos.
              </p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {history.map((item, index) => (
                <div key={`${item.q}-${index}`} className="space-y-2">
                  <div className="ml-auto max-w-[82%] rounded-lg bg-tech-primary px-4 py-3 text-sm font-medium leading-6 text-white">
                    {item.q}
                  </div>
                  <div className="max-w-[86%] rounded-lg border border-tech-border bg-white px-4 py-3 text-sm leading-6 text-tech-textMain shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-primary">Campus360</p>
                    <p className="mt-1">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-tech-divider pt-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {FAQS.slice(0, 3).map((faq) => (
                  <button key={faq.q} onClick={() => handleAsk(faq.q)} className="rounded-full border border-tech-border bg-tech-bg px-3 py-1.5 text-xs font-semibold text-tech-primary transition hover:border-tech-primary/40 hover:bg-blue-50">
                    {faq.q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Escribe tu duda institucional..."
                  className="min-w-0 flex-1 rounded-lg border border-tech-border px-4 py-3 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
                <button onClick={() => input.trim() && handleAsk(input.trim())} className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
                  <Send className="h-4 w-4" />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </SectionCard>

        <aside className="space-y-4">
          <SectionCard title="Temas frecuentes" className="border border-tech-border">
            <div className="space-y-2">
              {FAQS.map((faq) => (
                <button key={faq.q} onClick={() => handleAsk(faq.q)} className="w-full rounded-lg border border-tech-border bg-white p-3 text-left text-sm font-semibold text-tech-textMain transition hover:border-tech-primary/40 hover:bg-blue-50">
                  {faq.q}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Contexto institucional" className="border border-tech-border">
            <div className="space-y-3 text-sm text-tech-textSecond">
              <p><span className="font-semibold text-tech-textMain">Canal:</span> soporte estudiantil simulado</p>
              <p><span className="font-semibold text-tech-textMain">Horario:</span> lunes a viernes, 09:00 a 18:00</p>
              <p><span className="font-semibold text-tech-textMain">Derivación:</span> tutor o Servicios Escolares según el caso</p>
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
