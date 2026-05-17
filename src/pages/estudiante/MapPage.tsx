import { Compass, MapPin, Navigation, Search } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { studentMapLocations } from "../../data/estudiante.mock";

export function MapPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("Todos");
  const [selected, setSelected] = useState<string | null>(studentMapLocations[0]?.id ?? null);

  const filters = ["Todos", "Académico", "Administrativo", "Servicios", "Recreativo"];

  const filtered = studentMapLocations.filter((loc) => {
    if (filter !== "Todos" && loc.type !== filter) return false;
    if (!query) return true;
    return loc.name.toLowerCase().includes(query.toLowerCase()) || loc.description.toLowerCase().includes(query.toLowerCase());
  });

  const selectedLocation = studentMapLocations.find((loc) => loc.id === selected) ?? null;

  return (
    <PageShell eyebrow="Campus" title="Mapa del campus" description="Encuentra edificios, servicios y espacios con una interfaz más clara.">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <SectionCard title="Mapa interactivo" className="overflow-hidden border border-tech-border p-0">
          <div className="border-b border-tech-border bg-tech-bg px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Navegación</p>
                <p className="mt-1 text-sm text-tech-textSecond">Selecciona un lugar para ver ruta, horario y contexto.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-tech-primary">
                <Compass className="h-4 w-4" /> Mapa 2D
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar lugar..."
                  className="w-full rounded-2xl border border-tech-border py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-2xl border border-tech-border bg-white px-3 py-3 text-sm outline-none focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
              >
                {filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-tech-border bg-white p-4 shadow-sm">
              <div className="relative h-[420px] rounded-3xl border border-tech-border bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eff6ff_100%)]">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
                {studentMapLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelected(loc.id)}
                    title={loc.name}
                    style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl p-2 text-sm transition ${selected === loc.id ? 'bg-tech-primary text-white shadow-lg' : 'bg-white text-tech-primary shadow-sm'}`}
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <aside className="space-y-6">
          <SectionCard title="Lugares" className="border border-tech-border">
            <div className="space-y-3">
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelected(loc.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition hover:bg-blue-50 ${selected === loc.id ? 'border-tech-primary bg-blue-50' : 'border-tech-border bg-white'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-tech-textMain">{loc.name}</p>
                      <p className="text-xs text-tech-textSecond">{loc.type} · {loc.hours}</p>
                    </div>
                    <div className="text-xs font-semibold text-tech-primary">{loc.estimatedTime}</div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {selectedLocation && (
            <SectionCard title="Detalle" className="sticky top-4 border border-tech-border">
              <div className="space-y-4">
                <p className="font-semibold text-tech-textMain">{selectedLocation.name}</p>
                <p className="text-sm leading-6 text-tech-textSecond">{selectedLocation.description}</p>
                <div className="grid gap-2 text-xs text-tech-textSecond">
                  <p>{selectedLocation.hours}</p>
                  <p>{selectedLocation.directions}</p>
                </div>
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 rounded-2xl bg-tech-primary px-4 py-3 text-sm font-semibold text-white">
                    <Navigation className="h-4 w-4" /> Indicaciones
                  </button>
                  <button className="rounded-2xl border border-tech-border px-4 py-3 text-sm font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">Ver eventos</button>
                </div>
              </div>
            </SectionCard>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
