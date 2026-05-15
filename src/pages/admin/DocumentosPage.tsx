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
        <div className="surface-card p-4"><p className="text-sm text-slate-500">Documentos recibidos</p><p className="mt-2 text-2xl font-semibold">{metrics.received}</p></div>
        <div className="surface-card p-4"><p className="text-sm text-slate-500">En revisión</p><p className="mt-2 text-2xl font-semibold">{metrics.reviewing}</p></div>
        <div className="surface-card p-4"><p className="text-sm text-slate-500">Aprobados</p><p className="mt-2 text-2xl font-semibold">{metrics.approved}</p></div>
        <div className="surface-card p-4"><p className="text-sm text-slate-500">Rechazados</p><p className="mt-2 text-2xl font-semibold">{metrics.rejected}</p></div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SearchInput value={query} onChange={(e)=>setQuery(e.currentTarget.value)} placeholder="Buscar por nombre, matrícula o documento..." />
          <div className="flex gap-2">
            {['Todos','Aspirantes','Estudiantes','Pendientes','En revisión','Aprobados','Rechazados','Críticos'].map(f=> <FilterPill key={f} label={f} active={filter===f} onClick={()=>setFilter(f)} />)}
          </div>
        </div>
      </div>

      <div>
        {list.length === 0 ? <EmptyState title="No hay documentos" description="No se encontraron documentos con los filtros seleccionados." /> : (
          <div className="grid grid-cols-1 gap-3">
            {list.map((d)=> (
              <div key={d.id} className="surface-card p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{d.applicantName} <span className="text-sm text-slate-500">· {d.userType}</span></p>
                  <p className="text-sm text-slate-500">{d.documentType} · {d.folio}</p>
                  <p className="text-xs text-slate-400">Área: {d.area} · Enviado: {d.submittedAt} · Vence: {d.dueDate}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-slate-700">{d.status}</p>
                  <button onClick={()=>setSelected(d)} className="btn-ghost btn-sm rounded-lg px-3 py-1">Revisar</button>
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
