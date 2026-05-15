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
    <article className="surface-card p-4 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-semibold text-slate-900">{channel.name}</h4>
          <p className="mt-1 text-sm text-slate-600">{channel.description}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{channel.owner}</span>
            <span>• {channel.category}</span>
            <span>• {channel.audience}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-sm text-slate-500">Publicaciones</p>
            <p className="text-xl font-semibold">{channel.publications}</p>
            <p className="text-xs text-slate-400">Última: {channel.lastUpdated}</p>
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={() => onView(channel.id)} className="btn-ghost btn-sm inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm">
              <Eye className="h-4 w-4" /> Ver publicaciones
            </button>
            <button onClick={() => onEdit(channel.id)} className="btn-ghost btn-sm inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm">
              <Edit className="h-4 w-4" /> Editar
            </button>
            <button onClick={() => onToggle(channel.id)} className="btn-ghost btn-sm inline-flex items-center gap-2 rounded-lg px-3 py-1 text-sm">
              <Zap className="h-4 w-4" /> Activar/Desactivar
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <StatusBadge status={channel.status} />
      </div>
    </article>
  );
}
