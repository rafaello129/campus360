import { useState } from 'react';
import { AlertActionModal } from './AlertActionModal';

interface Role {
  id?: string;
  name: string;
  description?: string;
  modules?: string[];
}

interface Props {
  role?: Role;
  onClose: () => void;
  onSave: (role: Role) => void;
}

export default function RoleModal({ role, onClose, onSave }: Props) {
  const [name, setName] = useState(role?.name ?? '');
  const [description, setDescription] = useState(role?.description ?? '');

  return (
    <AlertActionModal
      title={role ? 'Editar rol' : 'Crear rol'}
      description={role ? `Editar ${role.name}` : 'Nuevo rol'}
      onCancel={onClose}
      onConfirm={() => { onSave({ id: role?.id, name, description, modules: role?.modules ?? [] }); onClose(); }}
      confirmLabel="Guardar"
    >
      <div className="mt-3 grid gap-3">
        <div>
          <label className="text-sm font-medium text-tech-textSecond">Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label className="text-sm font-medium text-tech-textSecond">Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full rounded-xl border border-tech-border px-3 py-2.5 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100" rows={3} />
        </div>
      </div>
    </AlertActionModal>
  );
}
