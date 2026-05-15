import { useState } from 'react';
import { AlertActionModal } from './AlertActionModal';

interface DocRecord {
  id: string;
  applicantName: string;
  userType: string;
  folio: string;
  documentType: string;
  status: string;
  submittedAt: string;
  dueDate: string;
  area: string;
  note: string;
}

interface Props {
  doc: DocRecord;
  onClose: () => void;
  onSave: (id: string, status: string, note?: string) => void;
}

export default function DocumentReviewModal({ doc, onClose, onSave }: Props) {
  const [status, setStatus] = useState(doc.status);
  const [note, setNote] = useState(doc.note || '');

  return (
    <AlertActionModal
      title={`Revisar documento — ${doc.documentType}`}
      description={`${doc.applicantName} · ${doc.userType} · ${doc.folio}`}
      onCancel={onClose}
      onConfirm={() => { onSave(doc.id, status, note); onClose(); }}
      confirmLabel="Guardar"
    >
      <div className="mt-3 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2">
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
      </div>
    </AlertActionModal>
  );
}
