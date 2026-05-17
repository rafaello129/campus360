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
      actions={
        <div className="rounded-2xl border border-tech-border bg-surface-card px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Programas visibles</p>
          <p className="mt-1 text-2xl font-semibold text-tech-textMain">{filteredCareers.length}</p>
        </div>
      }
    >
      <div className="mb-6 rounded-2xl border border-tech-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-tech-textSecond" />
          <input
            type="text"
            placeholder="Buscar carrera..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-tech-border bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
          />
          </div>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedArea === area
                    ? "bg-tech-primary text-white"
                    : "border border-tech-border bg-surface-card text-tech-textSecond hover:bg-blue-50"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCareers.length === 0 ? (
        <div className="rounded-2xl border border-tech-border bg-surface-card p-8 text-center">
          <p className="text-tech-textSecond">No encontramos carreras que coincidan con tu búsqueda.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedArea("Todos");
            }}
            className="mt-3 text-sm font-semibold text-tech-primary hover:text-tech-mid transition"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredCareers.map((career) => (
            <article key={career.id} className="flex flex-col rounded-2xl border border-tech-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-primary">
                    {career.area}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-tech-textMain">{career.name}</h2>
                </div>
                <button
                  onClick={() => toggleFavorite(career.id)}
                  className={`flex-shrink-0 transition ${
                    favorites.includes(career.id) ? "text-rose-500" : "text-tech-textSecond hover:text-rose-500"
                  }`}
                >
                  <Heart className="h-5 w-5" fill={favorites.includes(career.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <p className="mb-4 text-sm text-tech-textSecond">{career.description}</p>

              {career.highlights && career.highlights.length > 0 && (
                <ul className="mb-4 space-y-1 text-sm text-tech-textSecond">
                  {career.highlights.map((item) => (
                    <li key={item} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-tech-primary" />{item}</li>
                  ))}
                </ul>
              )}

              <div className="mb-4 flex flex-wrap gap-2 border-t border-tech-border pt-4">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-tech-primary">
                  {career.duration}
                </span>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-tech-primary">
                  {career.modality}
                </span>
              </div>

              <div className="mt-auto flex gap-2">
                <Link
                  to={paths.aspirante.carreraDetalle(career.id)}
                  className="flex-1 rounded-xl bg-tech-primary px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-tech-mid"
                >
                  Ver detalles
                </Link>
                <button className="rounded-xl border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50 transition">
                  Me interesa
                </button>
              </div>

              <StatusBadge status={career.status} />
            </article>
          ))}
        </section>
      )}

      {filteredCareers.length > 0 && (
        <div className="mt-6 text-center text-sm text-tech-textSecond">
          Se muestran <span className="font-semibold">{filteredCareers.length}</span> de{" "}
          <span className="font-semibold">{careers.length}</span> carreras disponibles.
        </div>
      )}
    </PageShell>
  );
}

