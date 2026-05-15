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
  Activa: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Borrador: "bg-amber-100 text-amber-800 border-amber-200",
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
        <Link to={paths.admin.crearPublicacion} className="inline-flex items-center gap-2 rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800">
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
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
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
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredPublications.map((publication) => (
              <article key={publication.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-slate-900">{publication.title}</h3>
                      {publication.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-petrol-50 px-2.5 py-1 text-xs font-semibold text-petrol-700"><Sparkles className="h-3.5 w-3.5" />Destacada</span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{publication.description}</p>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${stateClasses[publication.status]}`}>
                    {publication.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <p><span className="font-semibold text-slate-900">Tipo:</span> {publication.type}</p>
                  <p><span className="font-semibold text-slate-900">Fecha:</span> {publication.date}</p>
                  <p><span className="font-semibold text-slate-900">Lugar:</span> {publication.location}</p>
                  <p><span className="font-semibold text-slate-900">Público:</span> {publication.audience}</p>
                  <p><span className="font-semibold text-slate-900">Alcance:</span> {publication.reach}</p>
                  <p><span className="font-semibold text-slate-900">Interesados:</span> {publication.interested}</p>
                  <p><span className="font-semibold text-slate-900">Responsable:</span> {publication.owner}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" onClick={() => setSelectedPublication(publication)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Ver detalle
                  </button>
                  <button type="button" onClick={() => setFeedback(`Edición simulada para ${publication.title}.`)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <PencilLine className="mr-1 inline h-4 w-4" />Editar
                  </button>
                  <button type="button" onClick={() => toggleState(publication)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <Power className="mr-1 inline h-4 w-4" />{publication.status === "Activa" ? "Pausar" : "Publicar"}
                  </button>
                  <button type="button" onClick={() => duplicatePublication(publication)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
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
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-petrol-700">Detalle de publicación</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">{selectedPublication.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{selectedPublication.description}</p>
              </div>
              <button type="button" onClick={() => setSelectedPublication(null)} className="text-sm font-semibold text-slate-500">Cerrar</button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Requisitos</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {selectedPublication.requirements.map((item) => <li key={item} className="rounded-lg bg-white px-3 py-2">{item}</li>)}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Métricas de alcance</p>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>Alcance estimado: <span className="font-semibold text-slate-900">{selectedPublication.reach}</span></p>
                  <p>Interesados: <span className="font-semibold text-slate-900">{selectedPublication.interested}</span></p>
                  <p>Público objetivo: <span className="font-semibold text-slate-900">{selectedPublication.audience}</span></p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Canales de publicación</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPublication.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">{channel}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
