import { Search, Calendar, MapPin, Users, Bookmark, Music } from "lucide-react";
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
      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">
        <div>
          <div className="mb-6 rounded-2xl border border-tech-border bg-white p-4 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
              <input
                type="text"
                placeholder="Buscar evento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-tech-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedType === type.id
                      ? "bg-tech-primary text-white"
                      : "border border-tech-border bg-surface-card text-tech-textSecond hover:bg-blue-50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <SectionCard title="Sin eventos" description="Prueba con otro término o cambia el tipo de actividad.">
                <div className="py-8 text-center">
                  <p className="text-tech-textSecond">No se encontraron eventos que coincidan con tu búsqueda.</p>
                </div>
              </SectionCard>
            ) : (
              filteredEvents.map((event) => {
                const isRegistered = registered.includes(event.id);
                const spotsLeft = (event.capacity ?? 0) - (event.registered ?? 0);
                return (
                  <SectionCard
                    key={event.id}
                    className={`cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md ${
                      selectedEvent === event.id ? "ring-2 ring-tech-primary" : ""
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                    title={event.title}
                    description={event.summary}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-tech-textMain">{event.title}</h3>
                          <StatusBadge status={isRegistered ? "aprobado" : event.status} />
                        </div>

                        <p className="text-sm leading-6 text-tech-textSecond">{event.summary}</p>

                        <div className="mt-4 grid gap-2 rounded-2xl bg-surface-card p-4 text-sm text-tech-textSecond sm:grid-cols-2">
                          <p className="flex items-center gap-1.5">
                            <Calendar className="inline h-4 w-4 mr-1" />
                            {event.date} · {event.time}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <MapPin className="inline h-4 w-4 mr-1" />
                            {event.location}
                          </p>
                          <p className="flex items-center gap-1.5">
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
                        className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                          isRegistered
                            ? "border border-tech-border bg-blue-50 text-tech-primary hover:bg-blue-100"
                            : "bg-tech-primary text-white hover:bg-tech-mid"
                        }`}
                      >
                        {isRegistered ? "Inscrito" : "Inscribirse"}
                      </button>
                    </div>
                  </SectionCard>
                );
              })
            )}
          </div>
        </div>

        <aside>
          {selectedEventData ? (
            <SectionCard title="Detalles" description="Resumen rápido del evento seleccionado." className="sticky top-4">
              <div className="space-y-4">
                <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Evento</p>
                  <p className="mt-1 font-semibold text-tech-textMain">{selectedEventData.title}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Categoría</p>
                  <p className="mt-1 text-sm text-tech-textMain">{selectedEventData.category}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-tech-textSecond">FECHA Y HORA</p>
                  <p className="mt-1 text-sm text-tech-textMain">{selectedEventData.date}</p>
                  <p className="text-sm text-tech-textMain">{selectedEventData.time}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-tech-textSecond">UBICACIÓN</p>
                  <p className="mt-1 text-sm text-tech-textMain">{selectedEventData.location}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-tech-textSecond">DISPONIBILIDAD</p>
                  <p className="mt-1 text-sm text-tech-textMain">
                    {selectedEventData.registered ?? 0}/{selectedEventData.capacity ?? 0}
                  </p>
                </div>

                <div className="border-t border-tech-border pt-4">
                  <button
                    onClick={() => toggleRegister(selectedEventData.id)}
                    className={`w-full rounded-full px-4 py-3 text-sm font-semibold transition ${
                      registered.includes(selectedEventData.id)
                        ? "border border-tech-border bg-blue-50 text-tech-primary hover:bg-blue-100"
                        : "bg-tech-primary text-white hover:bg-tech-mid"
                    }`}
                  >
                    {registered.includes(selectedEventData.id)
                      ? "Ya estás inscrito"
                      : "Inscribirse en este evento"}
                  </button>
                </div>

                <button className="w-full rounded-full border border-tech-border px-4 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50 transition">
                  <Bookmark className="inline h-4 w-4 mr-2" />
                  Guardar
                </button>
              </div>
            </SectionCard>
          ) : (
            <SectionCard title="Detalle" description="Selecciona un evento del listado para ver más información.">
              <div className="py-8 text-center">
                <Music className="mx-auto mb-2 h-12 w-12 text-tech-divider" />
                <p className="mt-2 text-sm text-tech-textSecond">Selecciona un evento para ver detalles</p>
              </div>
            </SectionCard>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
