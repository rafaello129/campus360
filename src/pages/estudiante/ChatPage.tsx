import { Send, Paperclip } from "lucide-react";
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
    <PageShell eyebrow="Comunicación" title="Chat académico" description="Chats por grupo y materia (simulado).">
      <div className="grid gap-6 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <SectionCard title="Conversaciones" className="p-0 overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {chatChannels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`w-full text-left px-4 py-3 transition border-b border-slate-100 ${selected === c.id ? "bg-petrol-50" : "hover:bg-slate-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.lastMessage}</p>
                    </div>
                    <div className="text-xs text-slate-500">{c.lastMessageTime}</div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </aside>

        <main className="lg:col-span-2">
          <SectionCard title={chatChannels.find((c) => c.id === selected)?.name ?? "Chat"}>
            <div className="flex h-96 flex-col gap-3 overflow-y-auto p-2">
              {(selected ? messages[selected] : []).map((m) => (
                <div key={m.id} className={`max-w-[80%] ${m.from === "Tú" ? "ml-auto bg-petrol-700 text-white" : "bg-slate-100"} rounded-lg px-3 py-2`}> 
                  <div className="text-xs font-semibold">{m.from}</div>
                  <div className="mt-1 text-sm">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 p-2">
                <Paperclip className="h-4 w-4 text-slate-600" />
              </button>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 py-2 px-3 text-sm outline-none"
                placeholder="Escribe un mensaje..."
              />
              <button onClick={send} className="rounded-lg bg-petrol-700 px-3 py-2 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </SectionCard>
        </main>

        <aside className="lg:col-span-1">
          <SectionCard title="Participantes" className="sticky top-4">
            <div className="text-sm text-slate-600">Lista de participantes simulados y archivos compartidos.</div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Ana Torres</p>
                  <p className="text-xs text-slate-500">Estudiante · 5° semestre</p>
                </div>
                <div className="text-xs text-slate-500">En línea</div>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 text-xs">Archivos compartidos: proyecto.zip · apuntes.pdf</div>
            </div>
          </SectionCard>
        </aside>
      </div>

      <div className="mt-3 text-xs text-slate-500">Chat institucional simulado para prototipo. No envía mensajes reales.</div>
    </PageShell>
  );
}
