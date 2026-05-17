import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, PencilLine, Power, Copy, Sparkles } from "lucide-react";
import { MetricCard } from "../../components/common/MetricCard";
import { PageShell } from "../../components/common/PageShell";
import { SearchInput } from "../../components/common/SearchInput";
import { SectionCard } from "../../components/common/SectionCard";
import { FilterPill } from "../../components/common/FilterPill";
import { EmptyState } from "../../components/common/EmptyState";
import { paths } from "../../router/paths";
import { adminPublications, publicationMetrics, type PublicationRecord, type PublicationState } from "../../data/adminPublications";

const stateClasses: Record<PublicationState, string> = {
  Activa: "bg-blue-50 text-tech-primary border-blue-100",
  Borrador: "bg-surface-card text-tech-textSecond border-tech-border",
  Cerrada: "bg-slate-100 text-slate-700 border-slate-200"
};

const categoryFilters = ["Todas", "Eventos", "Talleres", "Cursos", "Convocatorias", "Avisos", "Becas"];
const stateFilters = ["Activas", "Borradores", "Cerradas"];

export function DifusionPage() {
  const [publications, setPublications] = useState(adminPublications);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [stateFilter, setStateFilter] = useState("Todas");
  const [selectedPublication, setSelectedPublication] = useState<PublicationRecord | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const filteredPublications = useMemo(() => {
    return publications.filter((publication) => {
      const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) || publication.owner.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "Todas" || publication.type === categoryFilter.slice(0, -1) || publication.type === categoryFilter;
      const matchesState = stateFilter === "Todas" ||
        (stateFilter === "Activas" && publication.status === "Activa") ||
        (stateFilter === "Borradores" && publication.status === "Borrador") ||
        (stateFilter === "Cerradas" && publication.status === "Cerrada");

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [categoryFilter, publications, searchTerm, stateFilter]);

  const toggleState = (publication: PublicationRecord) => {
    const nextState: PublicationState = publication.status === "Activa" ? "Borrador" : "Activa";
    setPublications((previous) =>
      previous.map((item) => (item.id === publication.id ? { ...item, status: nextState } : item))
    );
    setFeedback(`${publication.title} cambió a estado ${nextState.toLowerCase()}.`);
  };

  const duplicatePublication = (publication: PublicationRecord) => {
    const copy: PublicationRecord = {
      ...publication,
      id: `${publication.id}-copy`,
      title: `${publication.title} (copia)`,
      status: "Borrador",
      interested: 0,
      reach: "0",
      featured: false
    };
    setPublications((previous) => [copy, ...previous]);
    setFeedback(`${publication.title} fue duplicada como borrador.`);
  };

  return (
    <PageShell
      title="Difusión institucional"
      description="Centraliza la publicación de eventos, convocatorias y avisos para la comunidad estudiantil."
      eyebrow="Comunicación institucional"
      actions={
        <Link to={paths.admin.crearPublicacion} className="inline-flex items-center gap-2 rounded-full bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid">
          <Megaphone className="h-4 w-4" />
          Crear publicación
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {publicationMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      {feedback ? (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-tech-primary">
          {feedback}
        </div>
      ) : null}

      <SectionCard title="Búsqueda y filtros" description="Busca publicaciones por título o responsable">
        <div className="space-y-4">
          <SearchInput value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar publicación" />
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((item) => (
              <FilterPill key={item} label={item} active={categoryFilter === item} onClick={() => setCategoryFilter(item)} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {stateFilters.map((item) => (
              <FilterPill key={item} label={item} active={stateFilter === item} onClick={() => setStateFilter(item)} />
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Publicaciones" description="Gestiona eventos, talleres, cursos y avisos">
        {filteredPublications.length === 0 ? (
          <EmptyState title="Sin publicaciones visibles" description="Prueba con otro filtro o crea una nueva publicación." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {filteredPublications.map((publication) => (
              <article key={publication.id} className="rounded-2xl border border-tech-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-tech-textMain">{publication.title}</h3>
                      {publication.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-tech-primary"><Sparkles className="h-3.5 w-3.5" />Destacada</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-tech-textSecond">{publication.description}</p>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${stateClasses[publication.status]}`}>
                    {publication.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 rounded-2xl bg-surface-card p-4 text-sm text-tech-textSecond sm:grid-cols-2">
                  <p><span className="font-semibold text-tech-textMain">Tipo:</span> {publication.type}</p>
                  <p><span className="font-semibold text-tech-textMain">Fecha:</span> {publication.date}</p>
                  <p><span className="font-semibold text-tech-textMain">Lugar:</span> {publication.location}</p>
                  <p><span className="font-semibold text-tech-textMain">Público:</span> {publication.audience}</p>
                  <p><span className="font-semibold text-tech-textMain">Alcance:</span> {publication.reach}</p>
                  <p><span className="font-semibold text-tech-textMain">Interesados:</span> {publication.interested}</p>
                  <p><span className="font-semibold text-tech-textMain">Responsable:</span> {publication.owner}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSelectedPublication(publication)} className="rounded-full border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50">
                    Ver detalle
                  </button>
                  <button type="button" onClick={() => setFeedback(`Edición simulada para ${publication.title}.`)} className="rounded-full border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50">
                    <PencilLine className="mr-1 inline h-4 w-4" />Editar
                  </button>
                  <button type="button" onClick={() => toggleState(publication)} className="rounded-full border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50">
                    <Power className="mr-1 inline h-4 w-4" />{publication.status === "Activa" ? "Pausar" : "Publicar"}
                  </button>
                  <button type="button" onClick={() => duplicatePublication(publication)} className="rounded-full border border-tech-border px-3 py-2 text-sm font-semibold text-tech-textSecond hover:bg-blue-50">
                    <Copy className="mr-1 inline h-4 w-4" />Duplicar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </SectionCard>

      {selectedPublication ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-tech-border bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-primary">Detalle de publicación</p>
                <h3 className="mt-1 text-2xl font-semibold text-tech-textMain">{selectedPublication.title}</h3>
                <p className="mt-1 text-sm text-tech-textSecond">{selectedPublication.description}</p>
              </div>
              <button type="button" onClick={() => setSelectedPublication(null)} className="text-sm font-semibold text-tech-textSecond">Cerrar</button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Requisitos</p>
                <ul className="mt-3 space-y-2 text-sm text-tech-textSecond">
                  {selectedPublication.requirements.map((item) => <li key={item} className="rounded-xl border border-tech-border bg-white px-3 py-2">{item}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Métricas de alcance</p>
                <div className="mt-3 space-y-2 text-sm text-tech-textSecond">
                  <p>Alcance estimado: <span className="font-semibold text-tech-textMain">{selectedPublication.reach}</span></p>
                  <p>Interesados: <span className="font-semibold text-tech-textMain">{selectedPublication.interested}</span></p>
                  <p>Público objetivo: <span className="font-semibold text-tech-textMain">{selectedPublication.audience}</span></p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-tech-border bg-surface-card p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Canales de publicación</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPublication.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-tech-textSecond">{channel}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
