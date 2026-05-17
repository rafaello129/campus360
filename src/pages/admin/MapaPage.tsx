import { Eye, Layers3, MapPinned, Pencil, Plus, Search, ShieldCheck, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import AdminCampusMap from "../../components/admin/AdminCampusMap";
import { SectionCard } from "../../components/common/SectionCard";
import { SectionHeader } from "../../components/common/SectionHeader";
import { adminCampusSpaces } from "../../data/adminCampusMap";

const typeFilters = ["Todos", "Academico", "Administrativo", "Servicios", "Recreativo", "Laboratorio", "Atencion estudiantil"];
const adminFilters = ["Todos", "Visible para aspirantes", "Visible para estudiantes", "Interno", "En revision", "Restringido"];

export default function MapaPage() {
  const [selectedId, setSelectedId] = useState(adminCampusSpaces[0]?.id ?? null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [adminFilter, setAdminFilter] = useState("Todos");

  const filteredSpaces = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return adminCampusSpaces.filter((space) => {
      const matchesType = typeFilter === "Todos" || space.type === typeFilter;
      const matchesAdminFilter =
        adminFilter === "Todos" ||
        (adminFilter === "Visible para aspirantes" && space.visibility?.includes("Aspirante")) ||
        (adminFilter === "Visible para estudiantes" && space.visibility?.includes("Estudiante")) ||
        (adminFilter === "Interno" && space.visibility?.includes("Interno")) ||
        (adminFilter === "En revision" && space.status === "En revision") ||
        (adminFilter === "Restringido" && space.status === "Restringido");
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [space.name, space.type, space.zone, space.description, space.responsible, space.status]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedQuery));

      return matchesType && matchesAdminFilter && matchesQuery;
    });
  }, [adminFilter, query, typeFilter]);

  const selectedSpace = adminCampusSpaces.find((space) => space.id === selectedId) ?? filteredSpaces[0] ?? null;

  function handleSelect(id: string) {
    setSelectedId(id);
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Mapa y espacios del campus"
        description="Administra edificios, aulas, laboratorios y puntos de atencion visibles por rol."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
            <Plus className="h-4 w-4" />
            Agregar espacio
          </button>
        }
      />

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(20rem,0.75fr)]">
        <div className="min-w-0 space-y-4">
          <SectionCard title="Filtros operativos" className="border border-tech-border">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por espacio, responsable, estado o zona..."
                  className="w-full rounded-lg border border-tech-border bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-tech-primary">
                {filteredSpaces.length} espacios
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {typeFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTypeFilter(item)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      typeFilter === item
                        ? "border-tech-primary bg-tech-primary text-white"
                        : "border-tech-border bg-white text-tech-textSecond hover:border-tech-primary hover:text-tech-primary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {adminFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAdminFilter(item)}
                    className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      adminFilter === item
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

          <AdminCampusMap spaces={filteredSpaces} selectedSpaceId={selectedSpace?.id ?? null} onSelect={handleSelect} />
        </div>

        <aside className="space-y-6">
          <SectionCard title="Espacios administrables" className="border border-tech-border">
            <div className="space-y-3">
              {filteredSpaces.length === 0 ? (
                <div className="rounded-lg bg-tech-bg p-4 text-center text-sm text-tech-textSecond">
                  No hay espacios que coincidan con los filtros actuales.
                </div>
              ) : (
                filteredSpaces.map((space) => (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => handleSelect(space.id)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedSpace?.id === space.id
                        ? "border-tech-primary bg-blue-50"
                        : "border-tech-border bg-white hover:border-tech-primary"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-tech-textMain">{space.name}</p>
                        <p className="mt-1 text-xs text-tech-textSecond">
                          {space.type} · {space.zone}
                        </p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-tech-primary">
                        {space.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-tech-textSecond">Responsable: {space.responsible}</p>
                  </button>
                ))
              )}
            </div>
          </SectionCard>

          <SectionCard title="Leyenda de estados" className="border border-tech-border">
            <div className="grid gap-2 text-sm text-tech-textSecond">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-700" />
                Activo: visible y operativo
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-cyan-700" />
                En revision: requiere validacion
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-700" />
                Restringido: acceso limitado
              </span>
            </div>
          </SectionCard>

          {selectedSpace ? (
            <SectionCard title="Detalle del espacio" className="border border-tech-border">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-tech-primary">
                      <MapPinned className="h-4 w-4" />
                      <p className="text-xs font-semibold uppercase tracking-[0.18em]">Seleccionado</p>
                    </div>
                    <h4 className="mt-2 text-lg font-semibold text-tech-textMain">{selectedSpace.name}</h4>
                    <p className="text-sm text-tech-textSecond">{selectedSpace.type} · {selectedSpace.zone}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-tech-primary">
                    {selectedSpace.status}
                  </span>
                </div>
                <p className="text-sm leading-6 text-tech-textSecond">{selectedSpace.description}</p>
                <div className="grid gap-3">
                  <div className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <UserRound className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Responsable</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedSpace.responsible}</p>
                  </div>
                  <div className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Layers3 className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Horario</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedSpace.schedule}</p>
                  </div>
                  <div className="rounded-lg bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Visibilidad</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(selectedSpace.visibility ?? ["Interno"]).map((visibility) => (
                        <span key={visibility} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-tech-primary">
                          {visibility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-tech-border bg-white p-4">
                  <div className="flex items-center gap-2 text-tech-primary">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-semibold text-tech-textMain">Orientacion operativa</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-tech-textSecond">{selectedSpace.orientation}</p>
                  <p className="mt-3 text-sm font-semibold text-tech-textMain">{selectedSpace.estimatedTime}</p>
                  <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
                    <Pencil className="h-4 w-4" />
                    Editar espacio
                  </button>
                </div>
              </div>
            </SectionCard>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
