import { Bell, Check, Clock3, ShieldAlert, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { notices } from "../../data/estudiante.mock";

export function AvisosPage() {
  const [unreadIds, setUnreadIds] = useState<string[]>(notices.map((n) => n.id));
  const [selectedFilter, setSelectedFilter] = useState<string>("todas");

  const filters = [
    { id: "todas", label: "Todas" },
    { id: "no-leidas", label: "No leídas" },
    { id: "urgentes", label: "Urgentes" },
    { id: "academicas", label: "Académicas" },
    { id: "administrativas", label: "Administrativas" },
    { id: "becas", label: "Becas" }
  ];

  const filteredNotices = notices.filter((notice) => {
    if (selectedFilter === "todas") return true;
    if (selectedFilter === "no-leidas") return unreadIds.includes(notice.id);
    if (selectedFilter === "urgentes") return notice.priority === "urgente";
    if (selectedFilter === "academicas") return notice.category === "Académica";
    if (selectedFilter === "administrativas") return notice.category === "Administrativa";
    if (selectedFilter === "becas") return notice.category === "Becas";
    return false;
  });

  const handleMarkAsRead = (id: string) => {
    setUnreadIds((prev) => prev.filter((uid) => uid !== id));
  };

  const handleMarkAllAsRead = () => {
    setUnreadIds([]);
  };

  const handleDelete = (_id: string) => {
    // Simulated delete
  };

  return (
    <PageShell
      eyebrow="Notificaciones"
      title="Avisos y notificaciones"
      description="Consulta alertas, recordatorios y comunicados institucionales en un solo lugar."
    >
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div className="space-y-6">
          <SectionCard className="border border-tech-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Filtros</p>
                <p className="mt-1 text-sm text-tech-textSecond">Refina los avisos por tipo, prioridad o estado de lectura.</p>
              </div>
              {unreadIds.length > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="rounded-full border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary"
                >
                  Marcar todas como leídas
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedFilter === filter.id
                      ? "bg-tech-primary text-white shadow-sm"
                      : "bg-tech-bg text-tech-textSecond hover:bg-blue-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-3">
            {filteredNotices.length === 0 ? (
              <SectionCard title="Sin avisos" className="border border-tech-border">
                <div className="py-10 text-center">
                  <Bell className="mx-auto h-12 w-12 text-tech-primary/30" />
                  <p className="mt-3 text-tech-textSecond">No hay avisos que coincidan con el filtro.</p>
                </div>
              </SectionCard>
            ) : (
              filteredNotices.map((notice) => {
                const isUnread = unreadIds.includes(notice.id);
                return (
                  <SectionCard
                    key={notice.id}
                    className={`border border-tech-border ${
                      notice.priority === "urgente"
                        ? "bg-rose-50/70"
                        : notice.priority === "alta"
                          ? "bg-amber-50/70"
                          : "bg-white"
                    } ${isUnread ? "shadow-md" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold text-tech-textMain">{notice.title}</h3>
                          {isUnread && (
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-tech-primary"></span>
                          )}
                          <StatusBadge status={notice.status} />
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${notice.priority === "urgente" ? "bg-rose-100 text-rose-700" : notice.priority === "alta" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-tech-primary"}`}>
                            {notice.priority}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-tech-textSecond">{notice.summary}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-tech-textSecond">
                          <span className="inline-flex items-center gap-1"><ShieldAlert className="h-3.5 w-3.5 text-tech-primary" /> {notice.channel}</span>
                          <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5 text-tech-primary" /> Hoy</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {isUnread && (
                          <button
                            onClick={() => handleMarkAsRead(notice.id)}
                            className="rounded-lg border border-tech-border p-2 transition hover:bg-tech-bg"
                            title="Marcar como leído"
                          >
                            <Check className="h-4 w-4 text-tech-accent" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="rounded-lg border border-tech-border p-2 transition hover:bg-tech-bg"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-tech-accent" />
                        </button>
                      </div>
                    </div>
                  </SectionCard>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar con recordatorios importantes */}
        <aside className="space-y-4">
          <SectionCard title="Recordatorios" className="sticky top-4 border border-tech-border">
            <div className="space-y-3">
              <div className="rounded-2xl border border-tech-border bg-tech-bg p-4">
                <p className="text-sm font-semibold text-tech-textMain">Cierre de documentos</p>
                <p className="mt-1 text-xs text-tech-textSecond">28 de mayo de 2026</p>
              </div>

              <div className="rounded-2xl border border-tech-border bg-tech-bg p-4">
                <p className="text-sm font-semibold text-tech-textMain">Cierre de becas</p>
                <p className="mt-1 text-xs text-tech-textSecond">31 de mayo de 2026</p>
              </div>

              <div className="rounded-2xl border border-tech-border bg-tech-bg p-4">
                <p className="text-sm font-semibold text-tech-textMain">Tutoría programada</p>
                <p className="mt-1 text-xs text-tech-textSecond">Mié, 17 de mayo · 14:00</p>
              </div>

              <div className="rounded-2xl border border-tech-border bg-tech-bg p-4">
                <p className="text-sm font-semibold text-tech-textMain">Convocatoria nueva</p>
                <p className="mt-1 text-xs text-tech-textSecond">Hace 2 horas</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Estadísticas" className="border border-tech-border">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-tech-textSecond">No leídas</span>
                <span className="font-bold text-tech-textMain">{unreadIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tech-textSecond">Urgentes</span>
                <span className="font-bold text-rose-700">{notices.filter((n) => n.priority === "urgente").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-tech-textSecond">Total</span>
                <span className="font-bold text-slate-900">{notices.length}</span>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
