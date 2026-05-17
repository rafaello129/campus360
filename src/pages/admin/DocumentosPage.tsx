import { useMemo, useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { adminDocuments } from '../../data/adminDocuments';
import DocumentReviewModal from '../../components/admin/DocumentReviewModal';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterPill } from '../../components/common/FilterPill';
import { EmptyState } from '../../components/common/EmptyState';

export default function DocumentosPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<any | null>(null);
  const [docs, setDocs] = useState(adminDocuments);

  const metrics = useMemo(() => ({
    received: docs.length,
    reviewing: docs.filter(d=>d.status==='En revisión').length,
    approved: docs.filter(d=>d.status==='Aprobado').length,
    rejected: docs.filter(d=>d.status==='Rechazado').length
  }), [docs]);

  const list = useMemo(() => docs.filter((d)=>{
    if (filter !== 'Todos' && d.userType !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return d.applicantName.toLowerCase().includes(q) || d.folio.toLowerCase().includes(q) || d.documentType.toLowerCase().includes(q);
  }), [docs, query, filter]);

  function handleSave(id: string, status: string, note?: string) {
    setDocs((prev) => prev.map((p) => (p.id === id ? { ...p, status, note: note ?? p.note } : p)));
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Gestión documental" description="Revisa, valida y da seguimiento a documentos institucionales enviados por aspirantes y estudiantes." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="surface-card rounded-2xl border border-tech-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Documentos recibidos</p>
          <p className="mt-2 text-2xl font-semibold text-tech-textMain">{metrics.received}</p>
        </div>
        <div className="surface-card rounded-2xl border border-tech-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">En revisión</p>
          <p className="mt-2 text-2xl font-semibold text-tech-primary">{metrics.reviewing}</p>
        </div>
        <div className="surface-card rounded-2xl border border-tech-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Aprobados</p>
          <p className="mt-2 text-2xl font-semibold text-tech-textMain">{metrics.approved}</p>
        </div>
        <div className="surface-card rounded-2xl border border-tech-border p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Rechazados</p>
          <p className="mt-2 text-2xl font-semibold text-tech-textMain">{metrics.rejected}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-tech-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <SearchInput value={query} onChange={(e)=>setQuery(e.currentTarget.value)} placeholder="Buscar por nombre, matrícula o documento..." />
          <div className="flex flex-wrap gap-2">
            {['Todos','Aspirantes','Estudiantes','Pendientes','En revisión','Aprobados','Rechazados','Críticos'].map(f=> <FilterPill key={f} label={f} active={filter===f} onClick={()=>setFilter(f)} />)}
          </div>
        </div>
      </div>

      <div>
        {list.length === 0 ? <EmptyState title="No hay documentos" description="No se encontraron documentos con los filtros seleccionados." /> : (
          <div className="grid grid-cols-1 gap-3">
            {list.map((d)=> (
              <div key={d.id} className="surface-card flex items-center justify-between rounded-2xl border border-tech-border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <p className="font-semibold text-tech-textMain">{d.applicantName} <span className="text-sm text-tech-textSecond">· {d.userType}</span></p>
                  <p className="text-sm text-tech-textSecond">{d.documentType} · {d.folio}</p>
                  <p className="text-xs text-tech-textSecond">Área: {d.area} · Enviado: {d.submittedAt} · Vence: {d.dueDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-tech-textMain">{d.status}</p>
                  <button onClick={()=>setSelected(d)} className="rounded-full border border-tech-border px-3 py-1 text-sm font-semibold text-tech-primary hover:bg-blue-50">Revisar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && <DocumentReviewModal doc={selected} onClose={()=>setSelected(null)} onSave={handleSave} />}

    </div>
  );
}
