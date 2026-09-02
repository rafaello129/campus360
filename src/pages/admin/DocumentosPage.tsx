import { useMemo, useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { adminDocuments, type AdminDocumentRecord } from '../../data/adminDocuments';
import DocumentReviewModal from '../../components/admin/DocumentReviewModal';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterPill } from '../../components/common/FilterPill';
import { EmptyState } from '../../components/common/EmptyState';
import {
  getDocumentUpdatedLabel,
  listApplicants,
  updateApplicantDocument
} from '../../data/applicantStorage';

function statusLabel(status: string) {
  if (status === 'aprobado') return 'Aprobado';
  if (status === 'rechazado') return 'Rechazado';
  if (status === 'en_revision') return 'En revisión';
  return 'Pendiente';
}

function getApplicantDocuments(): AdminDocumentRecord[] {
  return listApplicants().flatMap((applicant) =>
    applicant.documents
      .filter((document) => Boolean(document.fileName))
      .map((document) => ({
        id: `${applicant.id}::${document.id}`,
        applicantName: applicant.name,
        userType: 'Aspirante',
        folio: applicant.folio,
        documentType: document.name,
        status: statusLabel(document.status),
        submittedAt: document.uploadedAt ?? document.updatedAt,
        dueDate: document.dueDate ?? 'Por definir',
        area: 'Admisiones',
        note: document.reviewNote ?? '',
        applicantId: applicant.id,
        sourceDocumentId: document.id
      }))
  );
}

export default function DocumentosPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<AdminDocumentRecord | null>(null);
  const [legacyDocs, setLegacyDocs] = useState(adminDocuments);
  const [applicantDocs, setApplicantDocs] = useState(() => getApplicantDocuments());
  const [saveError, setSaveError] = useState<string | null>(null);
  const docs = [...applicantDocs, ...legacyDocs];

  const metrics = useMemo(() => ({
    received: docs.length,
    reviewing: docs.filter(d=>d.status==='En revisión').length,
    approved: docs.filter(d=>d.status==='Aprobado').length,
    rejected: docs.filter(d=>d.status==='Rechazado').length
  }), [docs]);

  const list = useMemo(() => docs.filter((d)=>{
    if (filter === 'Aspirantes' && d.userType !== 'Aspirante') return false;
    if (filter === 'Estudiantes' && d.userType !== 'Estudiante') return false;
    if (filter === 'Pendientes' && d.status !== 'Pendiente') return false;
    if (filter === 'En revisión' && d.status !== 'En revisión') return false;
    if (filter === 'Aprobados' && d.status !== 'Aprobado') return false;
    if (filter === 'Rechazados' && d.status !== 'Rechazado') return false;
    if (filter === 'Críticos' && d.status !== 'Rechazado' && d.status !== 'Pendiente') return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return d.applicantName.toLowerCase().includes(q) || d.folio.toLowerCase().includes(q) || d.documentType.toLowerCase().includes(q);
  }), [docs, query, filter]);

  function handleSave(id: string, status: string, note?: string) {
    const document = docs.find((item) => item.id === id);
    if (!document) return;

    if (document.applicantId && document.sourceDocumentId) {
      try {
        const persistedStatus = status === 'Aprobado'
          ? 'aprobado'
          : status === 'En revisión'
            ? 'en_revision'
            : status === 'Pendiente' ? 'pendiente' : 'rechazado';
        const actionTitle = status === 'Aprobado'
          ? 'Documento aprobado'
          : status === 'Solicitar corrección'
            ? 'Corrección solicitada'
            : status === 'Rechazado'
              ? 'Documento rechazado'
              : status === 'Pendiente' ? 'Documento marcado como pendiente' : 'Documento en revisión';
        updateApplicantDocument(
          document.applicantId,
          document.sourceDocumentId,
          {
            status: persistedStatus,
            updatedAt: getDocumentUpdatedLabel(),
            reviewNote: note || undefined
          },
          {
            timelineEvent: {
              title: actionTitle,
              detail: `${document.documentType}${note ? `: ${note}` : ''}`,
              status: persistedStatus
            }
          }
        );
        setApplicantDocs(getApplicantDocuments());
        setSaveError(null);
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'No fue posible guardar la revisión.');
      }
      return;
    }

    setLegacyDocs((previous) => previous.map((item) => item.id === id ? { ...item, status, note: note ?? item.note } : item));
  }

  return (
    <div className="space-y-6">
      <SectionHeader title="Gestión documental" description="Revisa, valida y da seguimiento a documentos institucionales enviados por aspirantes y estudiantes." />

      {saveError ? <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{saveError}</div> : null}

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
