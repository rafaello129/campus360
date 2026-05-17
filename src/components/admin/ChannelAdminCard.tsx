// React import not required with modern JSX runtime
import { User, Eye, Edit, Zap } from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import type { Status } from '../../types';

interface Channel {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  publications: number;
  lastUpdated: string;
  status: Status;
  audience: string;
}

interface Props {
  channel: Channel;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ChannelAdminCard({ channel, onView, onEdit, onToggle }: Props) {
  return (
    <article className="rounded-2xl border border-tech-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-tech-textMain">{channel.name}</h4>
              <StatusBadge status={channel.status} />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-tech-textSecond">{channel.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-tech-textSecond">
            <span className="inline-flex items-center gap-1 rounded-full bg-tech-bg px-3 py-1"><User className="h-3.5 w-3.5 text-tech-primary" /> {channel.owner}</span>
            <span className="rounded-full bg-tech-bg px-3 py-1">{channel.category}</span>
            <span className="rounded-full bg-tech-bg px-3 py-1">{channel.audience}</span>
          </div>
        </div>
        <div className="grid min-w-[220px] gap-3 text-sm text-tech-textSecond">
          <div className="rounded-2xl bg-tech-bg p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-tech-primary">Publicaciones</p>
            <p className="mt-2 text-2xl font-semibold text-tech-textMain">{channel.publications}</p>
            <p className="mt-1 text-xs">Última actualización: {channel.lastUpdated}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => onView(channel.id)} className="inline-flex items-center gap-2 rounded-xl border border-tech-border bg-white px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">
              <Eye className="h-4 w-4" /> Ver
            </button>
            <button onClick={() => onEdit(channel.id)} className="inline-flex items-center gap-2 rounded-xl border border-tech-border bg-white px-3 py-2 text-xs font-semibold text-tech-textSecond transition hover:border-tech-primary hover:text-tech-primary">
              <Edit className="h-4 w-4" /> Editar
            </button>
            <button onClick={() => onToggle(channel.id)} className="inline-flex items-center gap-2 rounded-xl bg-tech-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-tech-primary/90">
              <Zap className="h-4 w-4" /> Activar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
