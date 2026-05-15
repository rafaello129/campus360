import { Bell, Check, Trash2 } from "lucide-react";
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
      description="Mantente informado de las últimas noticias y alertas importantes."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notificaciones */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedFilter === filter.id
                      ? "bg-petrol-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {unreadIds.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm font-semibold text-petrol-700 hover:text-petrol-800"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredNotices.length === 0 ? (
              <SectionCard title="Sin avisos">
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                  <p className="text-slate-600">No hay avisos que coincidan con el filtro.</p>
                </div>
              </SectionCard>
            ) : (
              filteredNotices.map((notice) => {
                const isUnread = unreadIds.includes(notice.id);
                return (
                  <SectionCard
                    key={notice.id}
                    className={`border-l-4 ${
                      notice.priority === "urgente"
                        ? "border-l-rose-500 bg-rose-50"
                        : notice.priority === "alta"
                          ? "border-l-amber-500 bg-amber-50"
                          : "border-l-slate-300 bg-white"
                    } ${isUnread ? "shadow-md" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="font-bold text-slate-900">{notice.title}</h3>
                          {isUnread && (
                            <span className="inline-flex h-2 w-2 rounded-full bg-petrol-700"></span>
                          )}
                          <StatusBadge status={notice.status} />
                        </div>
                        <p className="text-sm text-slate-600">{notice.summary}</p>
                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                          <span>{notice.channel}</span>
                          <span>Hace 2 horas</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {isUnread && (
                          <button
                            onClick={() => handleMarkAsRead(notice.id)}
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                            title="Marcar como leído"
                          >
                            <Check className="h-4 w-4 text-slate-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-slate-600" />
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
          <SectionCard title="Recordatorios importantes" className="sticky top-4">
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-l-rose-500 bg-rose-50 p-4">
                <p className="text-sm font-bold text-rose-900">📅 Cierre de documentos</p>
                <p className="mt-1 text-xs text-rose-800">28 de mayo de 2026</p>
              </div>

              <div className="rounded-lg border-l-4 border-l-amber-500 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-900">💰 Cierre de becas</p>
                <p className="mt-1 text-xs text-amber-800">31 de mayo de 2026</p>
              </div>

              <div className="rounded-lg border-l-4 border-l-teal-500 bg-teal-50 p-4">
                <p className="text-sm font-bold text-teal-900">🎓 Tutoría programada</p>
                <p className="mt-1 text-xs text-teal-800">Mié, 17 de mayo · 14:00</p>
              </div>

              <div className="rounded-lg border-l-4 border-l-green-500 bg-green-50 p-4">
                <p className="text-sm font-bold text-green-900">✨ Convocatoria nueva</p>
                <p className="mt-1 text-xs text-green-800">Hace 2 horas</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Estadísticas">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">No leídas</span>
                <span className="font-bold text-slate-900">{unreadIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Urgentes</span>
                <span className="font-bold text-rose-700">{notices.filter((n) => n.priority === "urgente").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Total</span>
                <span className="font-bold text-slate-900">{notices.length}</span>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>
    </PageShell>
  );
}
