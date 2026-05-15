import { MapPin, Clock, Navigation, Search } from "lucide-react";
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
  {
    id: "loc-1",
    name: "Oficina de Admisiones",
    description: "Trámites de inscripción, solicitudes y aclaraciones de admisión.",
    hours: "Lunes a viernes, 08:30 - 17:30",
    directions: "Planta baja, ala norte del Edificio Principal",
    estimatedTime: "2 minutos desde la entrada principal",
    position: { x: 20, y: 30 },
    category: "admisiones"
  },
  {
    id: "loc-2",
    name: "Biblioteca Central",
    description: "Recursos académicos, libros, computadores y salas de estudio.",
    hours: "Lunes a viernes, 07:00 - 20:00 | Sábado, 09:00 - 14:00",
    directions: "Edificio de Biblioteca, bloque central del campus",
    estimatedTime: "5 minutos desde la entrada principal",
    position: { x: 50, y: 25 },
    category: "educacion"
  },
  {
    id: "loc-3",
    name: "Servicios Escolares",
    description: "Documentación, certificados, historiales académicos.",
    hours: "Lunes a viernes, 09:00 - 16:00",
    directions: "Planta baja, Edificio Principal, ala central",
    estimatedTime: "3 minutos desde la entrada principal",
    position: { x: 25, y: 50 },
    category: "servicios"
  },
  {
    id: "loc-4",
    name: "Laboratorios de Cómputo",
    description: "Equipos y software especializado para cursos tecnológicos.",
    hours: "Lunes a viernes, 08:00 - 18:00",
    directions: "Piso 2 y 3, ala tecnológica",
    estimatedTime: "8 minutos desde la entrada principal",
    position: { x: 75, y: 35 },
    category: "educacion"
  },
  {
    id: "loc-5",
    name: "Auditorio Principal",
    description: "Conferencias, eventos y actos institucionales.",
    hours: "Bajo demanda",
    directions: "Edificio de Auditorios, sur del campus",
    estimatedTime: "10 minutos desde la entrada principal",
    position: { x: 45, y: 70 },
    category: "recreacion"
  },
  {
    id: "loc-6",
    name: "Cafetería",
    description: "Alimentos, bebidas y espacios de descanso.",
    hours: "Lunes a viernes, 06:30 - 19:00 | Sábado, 08:00 - 14:00",
    directions: "Planta baja, sector central del campus",
    estimatedTime: "4 minutos desde la entrada principal",
    position: { x: 50, y: 50 },
    category: "recreacion"
  },
  {
    id: "loc-7",
    name: "Dirección General",
    description: "Gestión administrativa y atención a consultas generales.",
    hours: "Lunes a viernes, 08:30 - 17:00",
    directions: "Piso 3, Edificio Principal",
    estimatedTime: "5 minutos desde la entrada principal",
    position: { x: 30, y: 20 },
    category: "soporte"
  },
  {
    id: "loc-8",
    name: "Departamento de Bienestar",
    description: "Apoyo psicológico, médico y orientación estudiantil.",
    hours: "Lunes a viernes, 09:00 - 17:00",
    directions: "Planta baja, ala sur, Edificio de Servicios",
    estimatedTime: "7 minutos desde la entrada principal",
    position: { x: 65, y: 60 },
    category: "soporte"
  }
];

export function MapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "admisiones", label: "Admisiones", color: "bg-blue-100 text-blue-700" },
    { id: "servicios", label: "Servicios", color: "bg-purple-100 text-purple-700" },
    { id: "educacion", label: "Educación", color: "bg-green-100 text-green-700" },
    { id: "recreacion", label: "Recreación", color: "bg-orange-100 text-orange-700" },
    { id: "soporte", label: "Soporte", color: "bg-red-100 text-red-700" }
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageShell
      eyebrow="Campus"
      title="Mapa del campus"
      description="Ubica todas las áreas importantes y servicios del campus."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Mapa Visual */}
        <div className="lg:col-span-2">
          <SectionCard title="Campus Interactivo" className="p-0 overflow-hidden">
            <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-50">
              {/* Grid de fondo */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: "linear-gradient(0deg, #000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}></div>
              </div>

              {/* Entrada principal */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-400"></div>
              <p className="absolute bottom-1 left-2 text-xs font-bold text-slate-600">ENTRADA</p>

              {/* Ubicaciones en el mapa */}
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`absolute flex h-8 w-8 items-center justify-center rounded-full transition transform hover:scale-125 ${
                    selectedLocation?.id === loc.id
                      ? "ring-2 ring-petrol-500 ring-offset-2"
                      : ""
                  }`}
                  style={{
                    left: `${loc.position.x}%`,
                    top: `${loc.position.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  title={loc.name}
                >
                  <div className={`h-full w-full rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    loc.category === "admisiones" ? "bg-blue-500" :
                    loc.category === "servicios" ? "bg-purple-500" :
                    loc.category === "educacion" ? "bg-green-500" :
                    loc.category === "recreacion" ? "bg-orange-500" :
                    "bg-red-500"
                  }`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Leyenda */}
            <div className="p-4 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-600 mb-2">Categorías</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      selectedCategory === cat.id
                        ? cat.color
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Barra lateral con listado */}
        <div className="lg:col-span-2 space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
            />
          </div>

          {/* Lista de ubicaciones */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredLocations.length === 0 ? (
              <div className="rounded-lg bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-600">No se encontraron ubicaciones.</p>
              </div>
            ) : (
              filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full rounded-lg border-2 p-3 text-left transition ${
                    selectedLocation?.id === loc.id
                      ? "border-petrol-500 bg-petrol-50"
                      : "border-slate-200 bg-white hover:border-petrol-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`mt-1 h-3 w-3 rounded-full flex-shrink-0 ${
                      loc.category === "admisiones" ? "bg-blue-500" :
                      loc.category === "servicios" ? "bg-purple-500" :
                      loc.category === "educacion" ? "bg-green-500" :
                      loc.category === "recreacion" ? "bg-orange-500" :
                      "bg-red-500"
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{loc.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{loc.description}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Detalle de ubicación seleccionada */}
      {selectedLocation && (
        <SectionCard title={selectedLocation.name} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">Descripción</h4>
                <p className="text-sm text-slate-600">{selectedLocation.description}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
                  <Clock className="h-4 w-4 text-petrol-700" />
                  Horario
                </div>
                <p className="text-sm text-slate-600">{selectedLocation.hours}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-1">
                  <Navigation className="h-4 w-4 text-petrol-700" />
                  Ubicación
                </div>
                <p className="text-sm text-slate-600">{selectedLocation.directions}</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 mb-2">Tiempo estimado desde entrada principal</p>
                <p className="text-2xl font-bold text-petrol-700">{selectedLocation.estimatedTime}</p>
              </div>
              <button className="mt-4 w-full rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800">
                Ver ruta en mapa
              </button>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Recomendaciones */}
      <SectionCard title="Tips de navegación" className="mt-6">
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">1.</span>
            <p>Ingresa al campus por la entrada principal. Ahí encontrarás orientadores disponibles.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">2.</span>
            <p>Usa este mapa interactivo para ubicar los servicios que necesites.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">3.</span>
            <p>Los horarios pueden variar en períodos vacacionales. Verifica con anticipación.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">4.</span>
            <p>Si necesitas ayuda en el campus, acércate a cualquier miembro del personal.</p>
          </div>
        </div>
      </SectionCard>
    </PageShell>
  );
}
