import { Radio, Search, Eye, Share2, Users } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { channels } from "../../data/estudiante.mock";

export function CanalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const filteredChannels = channels.filter(
    (ch) =>
      ch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ch.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock publications for selected channel
  const getChannelPublications = (_channelId: string) => {
    return [
      {
        id: "pub-1",
        title: "Nueva beca disponible: Excelencia Académica 2026",
        description: "Se abre convocatoria para estudiantes de 4° semestre en adelante.",
        date: "Hoy",
        author: "Bienestar Estudiantil",
        isNew: true
      },
      {
        id: "pub-2",
        title: "Recordatorio: Reinscripción cierra en 4 días",
        description: "Completa tu registro académico antes del 31 de mayo.",
        date: "Hace 1 día",
        author: "Servicios Escolares",
        isNew: false
      },
      {
        id: "pub-3",
        title: "Taller de productividad: Aprende técnicas Pomodoro",
        description: "Sesión interactiva para mejorar tu gestión del tiempo.",
        date: "Hace 2 días",
        author: "Acompañamiento",
        isNew: false
      }
    ];
  };

  const selectedChannelData = channels.find((ch) => ch.id === selectedChannel);
  const publications = selectedChannel ? getChannelPublications(selectedChannel) : [];

  return (
    <PageShell
      eyebrow="Comunicación"
      title="Canales institucionales"
      description="Accede a información organizada por categorías, servicios y comunidades académicas."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <SectionCard title="Canales" className="sticky top-4 overflow-hidden border border-tech-border p-0">
          <div className="border-b border-tech-border bg-tech-bg p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
              <input
                type="text"
                placeholder="Buscar canal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-tech-border bg-white py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="max-h-[30rem] overflow-y-auto">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full border-b border-tech-border px-4 py-4 text-left transition ${
                    selectedChannel === channel.id ? "bg-blue-50" : "hover:bg-tech-bg"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-tech-primary shadow-sm">
                      <Radio className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${selectedChannel === channel.id ? "text-tech-primary" : "text-tech-textMain"}`}>
                        {channel.name}
                      </p>
                      <p className="mt-1 text-xs text-tech-textSecond">{channel.description}</p>
                      <p className="mt-2 text-xs font-semibold text-tech-primary">{channel.publications} publicaciones</p>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </SectionCard>

        <div className="space-y-6">
          {selectedChannelData ? (
            <div className="space-y-4">
              <SectionCard title="Canal seleccionado" className="border border-tech-border">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-tech-bg text-tech-primary shadow-sm">
                    <Radio className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-tech-textMain">{selectedChannelData.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-tech-textSecond">{selectedChannelData.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-tech-textSecond">
                      <span className="inline-flex items-center gap-2 rounded-full bg-tech-bg px-3 py-1"><Users className="h-4 w-4 text-tech-primary" /> {selectedChannelData.publications} publicaciones</span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-tech-bg px-3 py-1">Actualizado {selectedChannelData.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-primary">Últimas publicaciones</h3>
                {publications.map((pub) => (
                  <SectionCard key={pub.id} title={pub.title} className="border border-tech-border transition hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-tech-textMain">{pub.title}</h4>
                          {pub.isNew && (
                            <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-tech-primary">
                              NUEVO
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-tech-textSecond">{pub.description}</p>
                        <div className="mt-3 flex gap-3 text-xs text-tech-textSecond">
                          <span>{pub.author}</span>
                          <span>•</span>
                          <span>{pub.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-tech-border p-2 transition hover:bg-tech-bg">
                          <Eye className="h-4 w-4 text-tech-accent" />
                        </button>
                        <button className="rounded-lg border border-tech-border p-2 transition hover:bg-tech-bg">
                          <Share2 className="h-4 w-4 text-tech-accent" />
                        </button>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          ) : (
            <SectionCard className="border border-tech-border">
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-tech-bg text-tech-primary">
                  <Radio className="h-7 w-7" />
                </div>
                <p className="mt-4 text-tech-textSecond">Selecciona un canal para ver sus publicaciones</p>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </PageShell>
  );
}
