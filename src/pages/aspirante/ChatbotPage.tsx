import { Send, Loader } from "lucide-react";
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
      text: "¡Hola! Soy el asistente virtual de Campus360. Estoy aquí para ayudarte con preguntas sobre el proceso de admisión, carreras, documentos y más. ¿En qué puedo asistirte hoy?",
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
      title="Asistente virtual"
      description="Obtén respuestas rápidas a tus preguntas sobre admisión, carreras y proceso de inscripción."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat */}
        <div className="lg:col-span-2">
          <SectionCard title="Conversación" className="flex h-full flex-col">
            {/* Mensajes */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96 mb-4 pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-petrol-100 flex items-center justify-center text-lg font-bold text-petrol-700">
                      C
                    </div>
                  )}
                  <div
                    className={`max-w-xs rounded-lg p-3 text-sm ${
                      msg.sender === "user"
                        ? "bg-petrol-700 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-petrol-100 flex items-center justify-center">
                    <Loader className="h-4 w-4 text-petrol-700 animate-spin" />
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3 rounded-bl-none">
                    <p className="text-sm text-slate-600">Escribiendo...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="border-t border-slate-200 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-petrol-700 p-2.5 text-white transition hover:bg-petrol-800"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </SectionCard>
        </div>

        {/* Sidebar con preguntas frecuentes */}
        <SectionCard title="Preguntas frecuentes">
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(faq)}
                className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left text-sm font-medium text-slate-900 transition hover:border-petrol-500 hover:bg-petrol-50"
              >
                <span className="text-petrol-700">→</span> {faq.question}
              </button>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Contacto directo */}
      <SectionCard title="¿No encontraste la respuesta?" className="mt-6">
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            Si tu pregunta no está cubierta, estamos aquí para ayudarte de otras formas:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-medium text-slate-900">📧 Correo electrónico</p>
              <p className="text-xs text-slate-600 mt-1">admisiones@campus360.edu</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-medium text-slate-900">📞 Teléfono</p>
              <p className="text-xs text-slate-600 mt-1">+56 9 XXXX XXXX</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-medium text-slate-900">🕐 Horario</p>
              <p className="text-xs text-slate-600 mt-1">Lun-Vie, 09:00 - 18:00</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="font-medium text-slate-900">📍 Ubicación</p>
              <p className="text-xs text-slate-600 mt-1">Campus Central, Edificio Admisiones</p>
            </div>
          </div>
        </div>
      </SectionCard>
    </PageShell>
  );
}
