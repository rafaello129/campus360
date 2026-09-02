import { useState } from 'react';
import { AlertActionModal } from './AlertActionModal';
import type { AdminDocumentRecord } from '../../data/adminDocuments';

interface Props {
  doc: AdminDocumentRecord;
  onClose: () => void;
  onSave: (id: string, status: string, note?: string) => void;
}

export default function DocumentReviewModal({ doc, onClose, onSave }: Props) {
  const [status, setStatus] = useState(doc.status);
  const [note, setNote] = useState(doc.note || '');
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if ((status === 'Rechazado' || status === 'Solicitar corrección') && !note.trim()) {
      setError('Agrega una observación para explicar el rechazo o la corrección solicitada.');
      return;
    }
    onSave(doc.id, status, note.trim());
    onClose();
  };

  return (
    <AlertActionModal
      title={`Revisar documento — ${doc.documentType}`}
      description={`${doc.applicantName} · ${doc.userType} · ${doc.folio}`}
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Guardar"
    >
      <div className="mt-3 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
            <option>Pendiente</option>
            <option>En revisión</option>
            <option>Aprobado</option>
            <option>Rechazado</option>
            <option>Solicitar corrección</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-600">Observaciones</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2" rows={4} />
        </div>
        {error ? <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800">{error}</div> : null}
      </div>
    </AlertActionModal>
  );
}
