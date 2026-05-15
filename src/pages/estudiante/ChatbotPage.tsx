import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

const FAQS = [
  { q: "¿Dónde solicito una constancia?", a: "En el módulo de Servicios Escolares, menú Documentos → Solicitar constancia." },
  { q: "¿Cómo veo eventos disponibles?", a: "Ingresa a la sección Eventos desde el menú principal o el dashboard." },
  { q: "¿Dónde está servicios escolares?", a: "En el edificio principal, planta baja — también en el mapa del campus." },
  { q: "¿Cómo contacto a mi tutor?", a: "En la sección Trayectoria o en tu perfil aparece el contacto del tutor asignado." },
  { q: "¿Dónde subo documentos?", a: "En Documentos → Enviar documento. Adjunta el archivo y espera revisión." },
  { q: "¿Cómo me inscribo a un taller?", a: "En Eventos selecciona el taller y usa el botón Inscribirme." },
  { q: "¿Dónde veo mis notificaciones?", a: "En Avisos encontrarás todas tus notificaciones y alertas." },
  { q: "¿Qué hago si tengo una alerta?", a: "Contacta a tu tutor o a Servicios Escolares; revisa la recomendación en Trayectoria." }
];

export function ChatbotPage() {
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const [input, setInput] = useState("");

  const handleAsk = (text: string) => {
    const found = FAQS.find((f) => f.q.toLowerCase() === text.toLowerCase());
    const answer = found ? found.a : "Lo siento, no tengo una respuesta exacta. Contacta a soporte institucional.";
    setHistory((h) => [...h, { q: text, a: answer }]);
    setInput("");
  };

  return (
    <PageShell eyebrow="Ayuda" title="Chatbot institucional" description="Resuelve dudas frecuentes sobre trámites y servicios.">
      <div className="grid gap-6 lg:grid-cols-3">
        <main className="lg:col-span-2">
          <SectionCard title="Preguntas frecuentes">
            <div className="grid gap-2">
              {FAQS.map((f) => (
                <button key={f.q} onClick={() => handleAsk(f.q)} className="text-left rounded-lg border border-slate-100 p-3 hover:bg-slate-50">
                  <p className="font-semibold text-slate-900">{f.q}</p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Conversación">
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="text-sm text-slate-600">Haz una pregunta usando las FAQs o escribe en el campo abajo.</div>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-sm font-semibold">Tú: {h.q}</div>
                    <div className="rounded-lg bg-slate-50 p-3 text-sm">Respuesta: {h.a}</div>
                  </div>
                ))
              )}

              <div className="mt-4 flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta..." className="flex-1 rounded-lg border border-slate-200 py-2 px-3" />
                <button onClick={() => input.trim() && handleAsk(input.trim())} className="rounded-lg bg-petrol-700 px-3 py-2 text-white">Preguntar</button>
              </div>
            </div>
          </SectionCard>
        </main>

        <aside>
          <SectionCard title="Soporte institucional" className="sticky top-4">
            <div className="text-sm text-slate-600">
              <p>Contacto: soporte@campus360.edu</p>
              <p className="mt-2">Teléfono: +56 2 1234 5678</p>
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
