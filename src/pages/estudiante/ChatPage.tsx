import { Clock3, MessageSquare, Paperclip, Send, Users } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { chatChannels } from "../../data/estudiante.mock";

export function ChatPage() {
  const [selected, setSelected] = useState<string | null>(chatChannels[0]?.id ?? null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Record<string, { id: string; from: string; text: string }[]>>(() => {
    const base: Record<string, { id: string; from: string; text: string }[]> = {};
    chatChannels.forEach((c) => {
      base[c.id] = [
        { id: `${c.id}-m1`, from: "Ana", text: "¿Alguien tiene el enlace del repositorio?" },
        { id: `${c.id}-m2`, from: "María", text: "Sí, lo subí al drive, lo comparto en un momento." }
      ];
    });
    return base;
  });

  const send = () => {
    if (!selected || !message.trim()) return;
    setMessages((prev) => ({
      ...prev,
      [selected]: [...(prev[selected] || []), { id: `${selected}-m${Date.now()}`, from: "Tú", text: message }]
    }));
    setMessage("");
  };

  return (
    <PageShell eyebrow="Comunicación" title="Chat académico" description="Chats por grupo y materia con una presentación institucional más clara.">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.4fr_0.85fr]">
        <aside>
          <SectionCard title="Conversaciones" className="overflow-hidden border border-tech-border p-0">
            <div className="border-b border-tech-border bg-tech-bg p-4">
              <div className="rounded-2xl bg-white px-4 py-3 text-sm text-tech-textSecond">Mensajes simulados por grupo y materia.</div>
            </div>
            <div className="max-h-[32rem] overflow-y-auto">
              {chatChannels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`w-full border-b border-tech-border px-4 py-4 text-left transition ${selected === c.id ? "bg-blue-50" : "hover:bg-tech-bg"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-tech-textMain">{c.name}</p>
                      <p className="mt-1 text-xs text-tech-textSecond">{c.lastMessage}</p>
                    </div>
                    <div className="text-xs font-semibold text-tech-primary">{c.lastMessageTime}</div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </aside>

        <main>
          <SectionCard title={chatChannels.find((c) => c.id === selected)?.name ?? "Chat"} className="border border-tech-border">
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-tech-bg px-4 py-3 text-sm text-tech-textSecond">
              <span className="inline-flex items-center gap-2"><MessageSquare className="h-4 w-4 text-tech-primary" /> Conversación activa</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-tech-primary" /> Sincronizado hace poco</span>
            </div>

            <div className="flex h-[32rem] flex-col gap-3 overflow-y-auto rounded-2xl border border-tech-border bg-tech-bg p-4">
              {(selected ? messages[selected] : []).map((m) => (
                <div key={m.id} className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${m.from === "Tú" ? "ml-auto bg-tech-primary text-white" : "bg-white text-tech-textMain"}`}>
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">{m.from}</div>
                  <div className="mt-1 text-sm leading-6">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="rounded-2xl border border-tech-border p-3 text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-2xl border border-tech-border px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                placeholder="Escribe un mensaje..."
              />
              <button onClick={send} className="inline-flex items-center gap-2 rounded-2xl bg-tech-primary px-4 py-3 text-white transition hover:bg-tech-primary/90">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </SectionCard>
        </main>

        <aside>
          <SectionCard title="Participantes" className="sticky top-4 border border-tech-border">
            <div className="text-sm text-tech-textSecond">Lista simulada de participantes y recursos compartidos.</div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-tech-bg p-3">
                <div>
                  <p className="font-semibold text-tech-textMain">Ana Torres</p>
                  <p className="text-xs text-tech-textSecond">Estudiante · 5° semestre</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-tech-primary"><Users className="h-3.5 w-3.5" /> En línea</div>
              </div>

              <div className="rounded-2xl border border-tech-border bg-white p-3 text-xs text-tech-textSecond">Archivos compartidos: proyecto.zip · apuntes.pdf</div>
            </div>
          </SectionCard>
        </aside>
      </div>

      <div className="mt-3 text-xs text-tech-textSecond">Chat institucional simulado para prototipo. No envía mensajes reales.</div>
    </PageShell>
  );
}
