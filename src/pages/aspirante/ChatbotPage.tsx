import { Bot, Clock3, Loader, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Cuáles son los requisitos de admisión?",
    answer:
      "Necesitas tener certificado de bachillerato, identificación oficial, comprobante de domicilio y otros documentos que especificamos en el módulo de documentación. El proceso completo se detalla en tu panel de admisión."
  },
  {
    question: "¿Cuándo cierra la convocatoria?",
    answer: "La convocatoria 2026-A cierra el 30 de junio de 2026. Te recomendamos completar tu registro con anticipación para evitar inconvenientes."
  },
  {
    question: "¿Qué carreras ofrece Campus360?",
    answer:
      "Actualmente ofrecemos 18 programas académicos distribuidos en 5 áreas: Tecnología, Ciencias Aplicadas, Creatividad y Tecnología, Sociales y Administración. Puedes explorar todas en el módulo de carreras."
  },
  {
    question: "¿Hay becas disponibles?",
    answer: "Sí, contamos con 12 becas activas en diferentes modalidades: académicas, deportivas y de responsabilidad social. Puedes solicitar información detallada en el módulo de convocatorias."
  },
  {
    question: "¿Dónde subo mis documentos?",
    answer: "Todos tus documentos se cargan en el módulo de Documentación de Admisión. Encontrarás instrucciones claras para cada uno y podrás ver el estado de tu expediente en tiempo real."
  },
  {
    question: "¿Cómo contacto a un asesor?",
    answer:
      "Una vez registrado, se te asignará un asesor académico. Podrás contactarle directamente por correo o teléfono. Sus datos aparecerán en tu panel de proceso de admisión."
  },
  {
    question: "¿Cuánto tiempo tarda la revisión?",
    answer: "El tiempo promedio de revisión es 48 horas. Sin embargo, esto puede variar según la época del año. Recibirás notificaciones en cada etapa de tu proceso."
  },
  {
    question: "¿Puedo cambiar de carrera?",
    answer: "Sí, puedes solicitar cambio de carrera antes de la etapa de evaluación. Debes hacerlo a través de tu panel de admisión o contactando a tu asesor."
  }
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-0",
      sender: "bot",
      text: "Soy el asistente virtual de admisión de Campus360. Puedo orientarte sobre requisitos, carreras, documentos y seguimiento del proceso con respuestas simuladas.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionClick = (faq: FAQ) => {
    // Agregar pregunta del usuario
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: faq.question,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);

    // Simular respuesta del bot
    setIsLoading(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: `msg-${Date.now()}-bot`,
        sender: "bot",
        text: faq.answer,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simular respuesta del bot
    setIsLoading(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: `msg-${Date.now()}-bot`,
        sender: "bot",
        text:
          "Gracias por tu pregunta. Para consultas específicas no cubiertas aquí, te recomiendo contactar directamente a tu asesor académico o enviar un correo a admisiones@campus360.edu. Estaremos encantados de ayudarte.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <PageShell
      eyebrow="Soporte"
      title="Asistente virtual de admisión"
      description="Obtén respuestas rápidas sobre admisión, carreras, documentación y seguimiento del proceso."
    >
      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
        <div className="space-y-6">
          <SectionCard title="Conversación institucional" className="flex h-full flex-col border border-tech-border">
            <div className="mb-4 flex items-center justify-between rounded-2xl bg-tech-bg px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Canal activo</p>
                <p className="mt-1 text-sm text-tech-textSecond">Canal institucional simulado para dudas de admisión y documentación.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-tech-primary">
                <Bot className="h-4 w-4" /> Campus360 Admisiones
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[31rem]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-tech-bg text-tech-primary">
                      <Bot className="h-5 w-5" />
                    </div>
                  )}
                  <div
                    className={`max-w-xl rounded-2xl p-4 text-sm leading-6 shadow-sm ${
                      msg.sender === "user"
                        ? "rounded-br-md bg-tech-primary text-white"
                        : "rounded-bl-md border border-tech-border bg-white text-tech-textMain"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-tech-bg text-tech-primary">
                    <Loader className="h-4 w-4 animate-spin" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-tech-border bg-white p-4 shadow-sm">
                    <p className="text-sm text-tech-textSecond">Escribiendo respuesta...</p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="mt-4 border-t border-tech-border pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta sobre admisión..."
                  className="flex-1 rounded-2xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
                >
                  <Send className="h-4 w-4" />
                  Enviar
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Canales de contacto" className="border border-tech-border">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: Mail, title: "Correo", text: "admisiones@campus360.edu" },
                { icon: Phone, title: "Teléfono", text: "+56 9 XXXX XXXX" },
                { icon: Clock3, title: "Horario", text: "Lun-Vie, 09:00 - 18:00" },
                { icon: MapPin, title: "Ubicación", text: "Campus Central, Edificio Admisiones" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-tech-border bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Icon className="h-4 w-4" />
                      <p className="text-sm font-semibold text-tech-textMain">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Preguntas frecuentes" className="border border-tech-border">
            <div className="space-y-2">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(faq)}
                className="w-full rounded-2xl border border-tech-border bg-white p-4 text-left text-sm font-medium text-tech-textMain transition hover:border-tech-primary hover:bg-tech-bg"
              >
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-tech-bg text-xs font-semibold text-tech-primary">FAQ</span> {faq.question}
              </button>
            ))}
            </div>
          </SectionCard>

          <SectionCard title="Acciones rápidas" className="border border-tech-border">
            <div className="space-y-3 text-sm text-tech-textSecond">
              <p>Usa estas opciones para respuestas comunes o cambia a una consulta específica en el chat.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => handleQuestionClick(faqs[0])} className="rounded-full bg-tech-bg px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-100">Requisitos</button>
                <button onClick={() => handleQuestionClick(faqs[2])} className="rounded-full bg-tech-bg px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-100">Carreras</button>
                <button onClick={() => handleQuestionClick(faqs[3])} className="rounded-full bg-tech-bg px-3 py-2 text-xs font-semibold text-tech-primary transition hover:bg-blue-100">Becas</button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
