import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { studentMapLocations } from "../../data/estudiante.mock";

export function MapPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("Todos");
  const [selected, setSelected] = useState<string | null>(null);

  const filters = ["Todos", "Académico", "Administrativo", "Servicios", "Recreativo"];

  const filtered = studentMapLocations.filter((loc) => {
    if (filter !== "Todos" && loc.type !== filter) return false;
    if (!query) return true;
    return (
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.description.toLowerCase().includes(query.toLowerCase())
    );
  });

  const canvasSize = { width: 600, height: 420 };

  return (
    <PageShell eyebrow="Campus" title="Mapa del campus" description="Encuentra edificios, servicios y espacios.">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Mapa interactivo">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar lugar..."
                  className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-3 text-sm outline-none"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white py-2 px-3 text-sm"
              >
                {filters.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-4">
              <div className="mx-auto max-w-4xl">
                <div className="mb-4 text-sm text-slate-600">Selecciona un punto para ver detalles</div>
                <div className="relative mx-auto" style={{ width: canvasSize.width }}>
                  <div className="h-[420px] w-full bg-gradient-to-b from-slate-50 to-white border border-slate-100 relative">
                    {studentMapLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setSelected(loc.id)}
                        title={loc.name}
                        style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 text-sm transition ${
                          selected === loc.id ? "bg-petrol-700 text-white" : "bg-white text-petrol-700 shadow"
                        }`}
                      >
                        <MapPin className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <aside>
          <SectionCard title="Lugares">
            <div className="space-y-3">
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelected(loc.id)}
                  className={`w-full text-left rounded-lg border border-slate-100 p-3 transition hover:bg-slate-50 ${
                    selected === loc.id ? "bg-petrol-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{loc.name}</p>
                      <p className="text-xs text-slate-600">{loc.type} · {loc.hours}</p>
                    </div>
                    <div className="text-xs text-slate-500">{loc.estimatedTime}</div>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {selected && (
            <SectionCard title="Detalle" className="sticky top-4">
              {(() => {
                const loc = studentMapLocations.find((l) => l.id === selected);
                if (!loc) return <div>Selecciona un lugar</div>;
                return (
                  <div>
                    <p className="font-semibold text-slate-900">{loc.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{loc.description}</p>
                    <div className="mt-3 text-xs text-slate-500">
                      <p>{loc.hours}</p>
                      <p>{loc.directions}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="rounded-lg bg-petrol-700 px-3 py-2 text-sm font-semibold text-white">Indicaciones</button>
                      <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm">Ver eventos</button>
                    </div>
                  </div>
                );
              })()}
            </SectionCard>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
