import { Search, Eye, Share2, Users } from "lucide-react";
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
      description="Acceso a información organizada por categorías y servicios."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lista de canales */}
        <div className="lg:col-span-1">
          <SectionCard title="Canales" className="p-0 overflow-hidden sticky top-4">
            {/* Búsqueda */}
            <div className="border-b border-slate-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar canal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                />
              </div>
            </div>

            {/* Lista de canales */}
            <div className="max-h-96 overflow-y-auto">
              {filteredChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`w-full border-b border-slate-100 px-4 py-3 text-left transition ${
                    selectedChannel === channel.id ? "bg-petrol-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{channel.icon}</span>
                    <div className="flex-1">
                      <p className={`font-semibold ${selectedChannel === channel.id ? "text-petrol-900" : "text-slate-900"}`}>
                        {channel.name}
                      </p>
                      <p className="text-xs text-slate-600">{channel.publications} publicaciones</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Detalles del canal */}
        <div className="lg:col-span-2">
          {selectedChannelData ? (
            <div className="space-y-4">
              {/* Header del canal */}
              <SectionCard title="Canal" className="border-l-4" style={{ borderColor: selectedChannelData.color.split(" ")[1] }}>
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{selectedChannelData.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900">{selectedChannelData.name}</h2>
                    <p className="mt-1 text-slate-600">{selectedChannelData.description}</p>
                    <div className="mt-3 flex gap-4 text-sm text-slate-600">
                      <span>
                        <Users className="inline h-4 w-4 mr-1" />
                        {selectedChannelData.publications} publicaciones
                      </span>
                      <span>Actualizado {selectedChannelData.lastUpdate}</span>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Publicaciones */}
                <div className="space-y-3">
                <h3 className="font-bold text-slate-900">Últimas publicaciones</h3>
                {publications.map((pub) => (
                  <SectionCard key={pub.id} title={pub.title} className="hover:shadow-md transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{pub.title}</h4>
                          {pub.isNew && (
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                              NUEVO
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{pub.description}</p>
                        <div className="mt-3 flex gap-3 text-xs text-slate-500">
                          <span>{pub.author}</span>
                          <span>•</span>
                          <span>{pub.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100">
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>
                        <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100">
                          <Share2 className="h-4 w-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          ) : (
            <SectionCard>
              <div className="text-center py-12">
                <span className="text-6xl">📢</span>
                <p className="mt-4 text-slate-600">Selecciona un canal para ver sus publicaciones</p>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </PageShell>
  );
}
