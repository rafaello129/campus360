import { useState } from 'react';
import { AlertActionModal } from './AlertActionModal';

interface Contact {
  id?: string;
  name: string;
  position?: string;
  area?: string;
  email?: string;
  phone?: string;
  location?: string;
  hours?: string;
}

interface Props {
  onClose: () => void;
  onCreate: (contact: Contact) => void;
}

export default function CreateContactModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <AlertActionModal
      title="Agregar contacto"
      description="Registra un contacto institucional disponible para la comunidad académica."
      onCancel={onClose}
      onConfirm={() => { onCreate({ name, position, area, email, phone }); onClose(); }}
      confirmLabel="Agregar"
    >
      <div className="mt-3 grid gap-3">
        <div>
          <label className="text-sm text-slate-600">Nombre</label>
          <input value={name} onChange={(e)=>setName(e.currentTarget.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-slate-600">Cargo</label>
            <input value={position} onChange={(e)=>setPosition(e.currentTarget.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-slate-600">Área</label>
            <input value={area} onChange={(e)=>setArea(e.currentTarget.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm text-slate-600">Correo</label>
            <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
          <div>
            <label className="text-sm text-slate-600">Teléfono</label>
            <input value={phone} onChange={(e)=>setPhone(e.currentTarget.value)} className="mt-1 w-full rounded-lg border px-3 py-2" />
          </div>
        </div>
      </div>
    </AlertActionModal>
  );
}
