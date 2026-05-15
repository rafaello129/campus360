// React import not required with modern JSX runtime
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  position: string;
  area: string;
  subjects: string[];
  email: string;
  phone: string;
  location: string;
  hours: string;
  available: boolean;
}

interface Props {
  contact: Contact;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function DirectoryContactCard({ contact, onView, onEdit }: Props) {
  return (
    <article className="surface-card p-4 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{contact.name}</h4>
          <p className="mt-1 text-sm text-slate-600">{contact.position} — {contact.area}</p>
          {contact.subjects.length > 0 && <p className="mt-2 text-xs text-slate-500">Materias: {contact.subjects.join(', ')}</p>}
          <div className="mt-2 flex flex-col gap-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {contact.email}</span>
            <span className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {contact.phone}</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> {contact.location}</span>
            <span className="inline-flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> {contact.hours}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-sm text-slate-500">{contact.available ? 'Disponible' : 'No disponible'}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => onView(contact.id)} className="btn-ghost btn-sm rounded-lg px-3 py-1">Ver perfil</button>
            <button onClick={() => onEdit(contact.id)} className="btn-ghost btn-sm rounded-lg px-3 py-1">Editar</button>
          </div>
        </div>
      </div>
    </article>
  );
}
