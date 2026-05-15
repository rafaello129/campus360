import { Search, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "../../components/common/PageShell";
import { StatusBadge } from "../../components/common/StatusBadge";
import { careers } from "../../data/careers";
import { paths } from "../../router/paths";

const AREAS = ["Todos", "Tecnología", "Ciencias Aplicadas", "Creatividad y Tecnología", "Sociales"];

export function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCareers = careers.filter((career) => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "Todos" || career.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const toggleFavorite = (careerId: string) => {
    setFavorites((prev) =>
      prev.includes(careerId) ? prev.filter((id) => id !== careerId) : [...prev, careerId]
    );
  };

  return (
    <PageShell
      eyebrow="Oferta académica"
      title="Explora nuestras carreras"
      description="Encuentra el programa académico que mejor se adapte a tu perfil y objetivos."
    >
      {/* Búsqueda */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar carrera..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
          />
        </div>

        {/* Filtros por área */}
        <div className="flex flex-wrap gap-2">
          {AREAS.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                selectedArea === area
                  ? "bg-petrol-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados */}
      {filteredCareers.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-slate-600">No encontramos carreras que coincidan con tu búsqueda.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todos");
            }}
            className="mt-3 text-sm font-semibold text-petrol-700 hover:text-petrol-800"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCareers.map((career) => (
            <article key={career.id} className="surface-card flex flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {career.area}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">{career.name}</h2>
                </div>
                <button
                  onClick={() => toggleFavorite(career.id)}
                  className={`flex-shrink-0 transition ${
                    favorites.includes(career.id) ? "text-rose-500" : "text-slate-400 hover:text-rose-500"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={favorites.includes(career.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <p className="mb-4 text-sm text-slate-600">{career.description}</p>

              {career.highlights && career.highlights.length > 0 && (
                <ul className="mb-4 space-y-1 text-sm text-slate-600">
                  {career.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              )}

              <div className="mb-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {career.duration}
                </span>
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {career.modality}
                </span>
              </div>

              <div className="mt-auto flex gap-2">
                <Link
                  to={paths.aspirante.carreraDetalle(career.id)}
                  className="flex-1 rounded-lg bg-petrol-50 px-3 py-2 text-center text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100"
                >
                  Ver detalles
                </Link>
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                  Me interesa
                </button>
              </div>

              <StatusBadge status={career.status} />
            </article>
          ))}
        </section>
      )}

      {filteredCareers.length > 0 && (
        <div className="mt-6 text-center text-sm text-slate-600">
          Se muestran <span className="font-semibold">{filteredCareers.length}</span> de{" "}
          <span className="font-semibold">{careers.length}</span> carreras disponibles.
        </div>
      )}
    </PageShell>
  );
}

