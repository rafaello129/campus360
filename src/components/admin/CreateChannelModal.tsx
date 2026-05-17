import { useState } from 'react';
import { AlertActionModal } from './AlertActionModal';
import type { Status } from '../../types';

interface NewChannel {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  owner?: string;
  audience?: string;
  status?: Status;
}

interface Props {
  onClose: () => void;
  onCreate: (channel: NewChannel) => void;
}

export default function CreateChannelModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Académicos');
  const [owner, setOwner] = useState('Coordinación');
  const audience = 'Estudiantes';

  return (
    <AlertActionModal
      title="Crear canal"
      description="Define un canal para publicar comunicados y convocatorias institucionales."
      onCancel={onClose}
      onConfirm={() => { onCreate({ name, description, category, owner, audience, status: 'activo' }); onClose(); }}
      confirmLabel="Crear"
    >
      <div className="mt-3 grid gap-3">
        <div>
          <label className="text-sm font-medium text-tech-textSecond">Nombre</label>
          <input value={name} onChange={(e) => setName(e.currentTarget.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label className="text-sm font-medium text-tech-textSecond">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100" rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium text-tech-textSecond">Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.currentTarget.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100">
              <option>Académicos</option>
              <option>Becas</option>
              <option>Cultura</option>
              <option>Deportes</option>
              <option>Servicios escolares</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-tech-textSecond">Responsable</label>
            <input value={owner} onChange={(e)=>setOwner(e.currentTarget.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>
      </div>
    </AlertActionModal>
  );
}
