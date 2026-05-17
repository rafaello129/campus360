import { Clock, Navigation, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { CampusMap2D } from "../../components/common/CampusMap2D";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { aspiranteMapLocations } from "../../data/aspirante.mock";

const filters = ["Todos", "Academico", "Administrativo", "Servicios", "Recreativo", "Laboratorio", "Atencion estudiantil"];

export function MapPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [selectedId, setSelectedId] = useState(aspiranteMapLocations[0]?.id ?? null);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return aspiranteMapLocations.filter((location) => {
      const matchesType = filter === "Todos" || location.type === filter;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [location.name, location.type, location.description, location.responsible, location.zone]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));

      return matchesType && matchesQuery;
    });
  }, [filter, query]);

  const selectedLocation =
    aspiranteMapLocations.find((location) => location.id === selectedId) ?? filteredLocations[0] ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  return (
    <PageShell
      eyebrow="Campus"
      title="Mapa para aspirantes"
      description="Ubica admisiones, servicios escolares y espacios clave para tu proceso de ingreso."
    >
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(20rem,0.75fr)]">
        <SectionCard title="Recorrido de admision" className="overflow-hidden border border-tech-border p-0">
          <div className="border-b border-tech-border bg-tech-bg px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Plano institucional</p>
                <p className="mt-1 text-sm text-tech-textSecond">
                  Selecciona un edificio para ver ruta, horario y orientacion desde entrada principal.
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
                <Navigation className="h-4 w-4" />
                Ver ruta sugerida
              </button>
            </div>
          </div>
          <div className="p-4">
            <CampusMap2D
              locations={filteredLocations}
              selectedLocationId={selectedLocation?.id ?? null}
              onSelectLocation={handleSelect}
              variant="aspirante"
            />
          </div>
        </SectionCard>

        <aside className="space-y-6">
          <SectionCard title="Buscar y filtrar" className="border border-tech-border">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por lugar, zona o responsable..."
                  className="w-full rounded-lg border border-tech-border bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      filter === item
                        ? "border-tech-primary bg-tech-primary text-white"
                        : "border-tech-border bg-white text-tech-textSecond hover:border-tech-primary hover:text-tech-primary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Lugares para aspirantes" className="border border-tech-border">
            <div className="space-y-3">
              {filteredLocations.length === 0 ? (
                <div className="rounded-lg bg-tech-bg p-4 text-center text-sm text-tech-textSecond">
                  No hay lugares que coincidan con tu busqueda.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() => handleSelect(location.id)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedLocation?.id === location.id
                        ? "border-tech-primary bg-blue-50"
                        : "border-tech-border bg-white hover:border-tech-primary"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-tech-textMain">{location.name}</p>
                        <p className="mt-1 text-xs text-tech-textSecond">{location.zone}</p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-tech-primary">
                        {location.estimatedTime}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-tech-textSecond">{location.description}</p>
                  </button>
                ))
              )}
            </div>
          </SectionCard>

          {selectedLocation ? (
            <SectionCard title="Detalle seleccionado" className="border border-tech-border">
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-semibold text-tech-textMain">{selectedLocation.name}</p>
                  <p className="mt-1 text-sm leading-6 text-tech-textSecond">{selectedLocation.description}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Horario</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedLocation.schedule}</p>
                  </div>
                  <div className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <UserRound className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Responsable</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedLocation.responsible ?? "Atencion institucional"}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-tech-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Orientacion</p>
                  <p className="mt-2 text-sm leading-6 text-tech-textSecond">{selectedLocation.orientation}</p>
                  <p className="mt-3 text-sm font-semibold text-tech-textMain">{selectedLocation.estimatedTime}</p>
                  <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
                    <Navigation className="h-4 w-4" />
                    Ver ruta sugerida
                  </button>
                </div>
              </div>
            </SectionCard>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}
