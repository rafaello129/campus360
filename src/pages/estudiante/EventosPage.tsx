import { Search, Calendar, MapPin, Users, Bookmark } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { campusEvents } from "../../data/estudiante.mock";

export function EventosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [registered, setRegistered] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const types = [
    { id: "todos", label: "Todos" },
    { id: "evento", label: "Eventos" },
    { id: "taller", label: "Talleres" },
    { id: "club", label: "Clubs" }
  ];

  const filteredEvents = campusEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "todos" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const selectedEventData = campusEvents.find((e) => e.id === selectedEvent);

  const toggleRegister = (eventId: string) => {
    setRegistered((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  return (
    <PageShell
      eyebrow="Campus"
      title="Eventos y convocatorias"
      description="Descubre actividades, talleres, cursos y oportunidades en tu institución."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Listado */}
        <div className="lg:col-span-2">
          {/* Búsqueda y filtros */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedType === type.id
                      ? "bg-petrol-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eventos */}
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <SectionCard title="Sin eventos">
                <div className="text-center py-8">
                  <p className="text-slate-600">No se encontraron eventos que coincidan con tu búsqueda.</p>
                </div>
              </SectionCard>
            ) : (
              filteredEvents.map((event) => {
                const isRegistered = registered.includes(event.id);
                const spotsLeft = (event.capacity ?? 0) - (event.registered ?? 0);
                return (
                  <SectionCard
                    key={event.id}
                    className={`cursor-pointer transition hover:shadow-md ${
                      selectedEvent === event.id ? "ring-2 ring-petrol-500" : ""
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  title={event.title}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-bold text-slate-900">{event.title}</h3>
                          <StatusBadge status={isRegistered ? "aprobado" : event.status} />
                        </div>

                        <p className="text-sm text-slate-600">{event.summary}</p>

                        <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm text-slate-600">
                          <p>
                            <Calendar className="inline h-4 w-4 mr-1" />
                            {event.date} · {event.time}
                          </p>
                          <p>
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {event.location}
                          </p>
                          <p>
                            <Users className="inline h-4 w-4 mr-1" />
                            {event.registered ?? 0}/{event.capacity ?? 0} inscritos
                          </p>
                          <p className="text-xs">
                            {spotsLeft > 0 ? `${spotsLeft} lugares disponibles` : "Sin disponibilidad"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRegister(event.id);
                        }}
                        className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          isRegistered
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-petrol-700 text-white hover:bg-petrol-800"
                        }`}
                      >
                        {isRegistered ? "✓ Inscrito" : "Inscribirse"}
                      </button>
                    </div>
                  </SectionCard>
                );
              })
            )}
          </div>
        </div>

        {/* Detalle del evento seleccionado */}
        <aside className="lg:col-span-1">
          {selectedEventData ? (
            <SectionCard title="Detalles" className="sticky top-4">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600">EVENTO</p>
                  <p className="mt-1 font-bold text-slate-900">{selectedEventData.title}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600">CATEGORÍA</p>
                  <p className="mt-1 text-sm text-slate-900">{selectedEventData.category}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600">FECHA Y HORA</p>
                  <p className="mt-1 text-sm text-slate-900">{selectedEventData.date}</p>
                  <p className="text-sm text-slate-900">{selectedEventData.time}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600">UBICACIÓN</p>
                  <p className="mt-1 text-sm text-slate-900">{selectedEventData.location}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600">DISPONIBILIDAD</p>
                  <p className="mt-1 text-sm text-slate-900">
                    {selectedEventData.registered ?? 0}/{selectedEventData.capacity ?? 0}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <button
                    onClick={() => toggleRegister(selectedEventData.id)}
                    className={`w-full rounded-lg px-4 py-3 text-sm font-bold transition ${
                      registered.includes(selectedEventData.id)
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-petrol-700 text-white hover:bg-petrol-800"
                    }`}
                  >
                    {registered.includes(selectedEventData.id)
                      ? "✓ Ya estás inscrito"
                      : "Inscribirse en este evento"}
                  </button>
                </div>

                <button className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Bookmark className="inline h-4 w-4 mr-2" />
                  Guardar
                </button>
              </div>
            </SectionCard>
          ) : (
            <SectionCard>
              <div className="text-center py-8">
                <span className="text-4xl">🎪</span>
                <p className="mt-2 text-sm text-slate-600">Selecciona un evento para ver detalles</p>
              </div>
            </SectionCard>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
