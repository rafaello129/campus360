import { Compass, MapPin, Clock, Navigation, Search } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";

interface CampusLocation {
  id: string;
  name: string;
  description: string;
  hours: string;
  directions: string;
  estimatedTime: string;
  position: { x: number; y: number };
  category: "admisiones" | "servicios" | "educacion" | "recreacion" | "soporte";
}

const locations: CampusLocation[] = [
  { id: "loc-1", name: "Oficina de Admisiones", description: "Trámites de inscripción, solicitudes y aclaraciones de admisión.", hours: "Lunes a viernes, 08:30 - 17:30", directions: "Planta baja, ala norte del Edificio Principal", estimatedTime: "2 minutos desde la entrada principal", position: { x: 20, y: 30 }, category: "admisiones" },
  { id: "loc-2", name: "Biblioteca Central", description: "Recursos académicos, libros, computadores y salas de estudio.", hours: "Lunes a viernes, 07:00 - 20:00 | Sábado, 09:00 - 14:00", directions: "Edificio de Biblioteca, bloque central del campus", estimatedTime: "5 minutos desde la entrada principal", position: { x: 50, y: 25 }, category: "educacion" },
  { id: "loc-3", name: "Servicios Escolares", description: "Documentación, certificados, historiales académicos.", hours: "Lunes a viernes, 09:00 - 16:00", directions: "Planta baja, Edificio Principal, ala central", estimatedTime: "3 minutos desde la entrada principal", position: { x: 25, y: 50 }, category: "servicios" },
  { id: "loc-4", name: "Laboratorios de Cómputo", description: "Equipos y software especializado para cursos tecnológicos.", hours: "Lunes a viernes, 08:00 - 18:00", directions: "Piso 2 y 3, ala tecnológica", estimatedTime: "8 minutos desde la entrada principal", position: { x: 75, y: 35 }, category: "educacion" },
  { id: "loc-5", name: "Auditorio Principal", description: "Conferencias, eventos y actos institucionales.", hours: "Bajo demanda", directions: "Edificio de Auditorios, sur del campus", estimatedTime: "10 minutos desde la entrada principal", position: { x: 45, y: 70 }, category: "recreacion" },
  { id: "loc-6", name: "Cafetería", description: "Alimentos, bebidas y espacios de descanso.", hours: "Lunes a viernes, 06:30 - 19:00 | Sábado, 08:00 - 14:00", directions: "Planta baja, sector central del campus", estimatedTime: "4 minutos desde la entrada principal", position: { x: 50, y: 50 }, category: "recreacion" },
  { id: "loc-7", name: "Dirección General", description: "Gestión administrativa y atención a consultas generales.", hours: "Lunes a viernes, 08:30 - 17:00", directions: "Piso 3, Edificio Principal", estimatedTime: "5 minutos desde la entrada principal", position: { x: 30, y: 20 }, category: "soporte" },
  { id: "loc-8", name: "Departamento de Bienestar", description: "Apoyo psicológico, médico y orientación estudiantil.", hours: "Lunes a viernes, 09:00 - 17:00", directions: "Planta baja, ala sur, Edificio de Servicios", estimatedTime: "7 minutos desde la entrada principal", position: { x: 65, y: 60 }, category: "soporte" }
];

export function MapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "admisiones", label: "Admisiones", color: "bg-blue-100 text-blue-700" },
    { id: "servicios", label: "Servicios", color: "bg-sky-100 text-sky-700" },
    { id: "educacion", label: "Educación", color: "bg-cyan-100 text-cyan-700" },
    { id: "recreacion", label: "Recreación", color: "bg-amber-100 text-amber-700" },
    { id: "soporte", label: "Soporte", color: "bg-slate-100 text-slate-700" }
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || loc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageShell eyebrow="Campus" title="Mapa interactivo del campus" description="Ubica áreas clave, servicios y puntos de atención con una vista institucional clara.">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <SectionCard title="Campus interactivo" className="overflow-hidden border border-tech-border p-0">
          <div className="border-b border-tech-border bg-tech-bg px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Vista general</p>
                <p className="mt-1 text-sm text-tech-textSecond">Toca una ubicación para ver horario, ruta y descripción.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-tech-primary">
                <Compass className="h-4 w-4" /> Navegación guiada
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_42%),linear-gradient(180deg,#f8fbff_0%,#eff6ff_100%)] p-5">
            <div className="absolute inset-5 rounded-[2rem] border border-white/70 bg-white/60 shadow-inner" />
            <div className="absolute inset-5 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-2xl border border-tech-border bg-white/90 px-4 py-3 text-xs font-medium text-tech-textSecond">
              <span>Entrada principal</span>
              <span>Orientación norte</span>
            </div>

            {filteredLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`absolute flex h-11 w-11 items-center justify-center rounded-2xl border transition hover:-translate-y-0.5 ${selectedLocation?.id === loc.id ? "border-tech-primary bg-tech-primary text-white shadow-lg shadow-blue-200" : "border-tech-border bg-white text-tech-primary shadow-sm hover:border-tech-primary"}`}
                style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%`, transform: "translate(-50%, -50%)" }}
                title={loc.name}
              >
                <MapPin className="h-5 w-5" />
              </button>
            ))}
          </div>

          <div className="border-t border-tech-border p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Categorías</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`rounded-2xl px-3 py-2 text-xs font-semibold transition ${selectedCategory === cat.id ? cat.color : "bg-tech-bg text-tech-textSecond hover:bg-blue-100"}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Buscar ubicación" className="border border-tech-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar ubicación..." className="w-full rounded-2xl border border-tech-border bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100" />
            </div>
          </SectionCard>

          <SectionCard title="Ubicaciones" className="border border-tech-border">
            <div className="max-h-[22rem] space-y-3 overflow-y-auto pr-1">
              {filteredLocations.length === 0 ? (
                <div className="rounded-2xl bg-tech-bg p-4 text-center text-sm text-tech-textSecond">No se encontraron ubicaciones.</div>
              ) : (
                filteredLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${selectedLocation?.id === loc.id ? "border-tech-primary bg-blue-50" : "border-tech-border bg-white hover:border-tech-primary"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 h-3.5 w-3.5 rounded-full flex-shrink-0 ${loc.category === "admisiones" ? "bg-blue-500" : loc.category === "servicios" ? "bg-sky-500" : loc.category === "educacion" ? "bg-cyan-500" : loc.category === "recreacion" ? "bg-amber-500" : "bg-slate-500"}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-tech-textMain">{loc.name}</h4>
                        <p className="mt-1 text-xs text-tech-textSecond">{loc.description}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </SectionCard>

          {selectedLocation && (
            <SectionCard title={selectedLocation.name} className="border border-tech-border">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Detalle</p>
                  <p className="mt-2 text-sm leading-6 text-tech-textSecond">{selectedLocation.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Horario</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedLocation.hours}</p>
                  </div>
                  <div className="rounded-2xl bg-tech-bg p-4">
                    <div className="flex items-center gap-2 text-tech-primary">
                      <Navigation className="h-4 w-4" />
                      <span className="text-sm font-semibold text-tech-textMain">Ruta</span>
                    </div>
                    <p className="mt-2 text-sm text-tech-textSecond">{selectedLocation.directions}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-tech-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Tiempo estimado</p>
                  <p className="mt-2 text-2xl font-semibold text-tech-textMain">{selectedLocation.estimatedTime}</p>
                  <button className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-primary/90">Ver ruta en mapa</button>
                </div>
              </div>
            </SectionCard>
          )}
        </div>
      </div>

      <SectionCard title="Tips de navegación" className="mt-6 border border-tech-border">
        <div className="space-y-3 text-sm text-tech-textSecond">
          <div className="flex gap-3"><span className="font-bold text-tech-primary">1.</span><p>Ingresa al campus por la entrada principal. Ahí encontrarás orientadores disponibles.</p></div>
          <div className="flex gap-3"><span className="font-bold text-tech-primary">2.</span><p>Usa este mapa interactivo para ubicar los servicios que necesites.</p></div>
          <div className="flex gap-3"><span className="font-bold text-tech-primary">3.</span><p>Los horarios pueden variar en períodos vacacionales. Verifica con anticipación.</p></div>
          <div className="flex gap-3"><span className="font-bold text-tech-primary">4.</span><p>Si necesitas ayuda en el campus, acércate a cualquier miembro del personal.</p></div>
        </div>
      </SectionCard>
    </PageShell>
  );
}
