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
    <article className="rounded-2xl border border-tech-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-tech-textMain">{contact.name}</h4>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${contact.available ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {contact.available ? 'Disponible' : 'No disponible'}
              </span>
            </div>
            <p className="mt-2 text-sm text-tech-textSecond">{contact.position} · {contact.area}</p>
          </div>
          {contact.subjects.length > 0 && <p className="text-xs text-tech-textSecond">Materias: {contact.subjects.join(', ')}</p>}
          <div className="grid gap-2 text-xs text-tech-textSecond sm:grid-cols-2">
            <span className="inline-flex items-center gap-2 rounded-xl bg-tech-bg px-3 py-2"><Mail className="h-3.5 w-3.5 text-tech-primary" /> {contact.email}</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-tech-bg px-3 py-2"><Phone className="h-3.5 w-3.5 text-tech-primary" /> {contact.phone}</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-tech-bg px-3 py-2"><MapPin className="h-3.5 w-3.5 text-tech-primary" /> {contact.location}</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-tech-bg px-3 py-2"><Clock className="h-3.5 w-3.5 text-tech-primary" /> {contact.hours}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onView(contact.id)} className="rounded-xl border border-tech-border bg-white px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">Ver perfil</button>
          <button onClick={() => onEdit(contact.id)} className="rounded-xl bg-tech-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-tech-primary/90">Editar</button>
        </div>
      </div>
    </article>
  );
}
