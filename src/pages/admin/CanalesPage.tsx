import { useMemo, useState } from 'react';
import { Radio, Sparkles } from 'lucide-react';
import { SectionHeader } from '../../components/common/SectionHeader';
import { MetricCard } from '../../components/common/MetricCard';
import ChannelAdminCard from '../../components/admin/ChannelAdminCard';
import { adminChannels } from '../../data/adminChannels';
import CreateChannelModal from '../../components/admin/CreateChannelModal';
import { SearchInput } from '../../components/common/SearchInput';
import { FilterPill } from '../../components/common/FilterPill';

export default function CanalesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  // selected channel state reserved for future panel/modal

  const [channelsState, setChannelsState] = useState(adminChannels);
  const [createOpen, setCreateOpen] = useState(false);

  const channels = useMemo(() => {
    return channelsState.filter((c) => {
      if (filter !== 'Todos' && c.category !== filter && (filter === 'Activos' ? c.status !== 'activo' : false)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q);
    });
  }, [channelsState, query, filter]);

  const metrics = {
    active: channelsState.filter((c) => c.status === 'activo').length,
    totalPublications: channelsState.reduce((s, c) => s + c.publications, 0),
    topChannel: channelsState.reduce((a, b) => ((a.interactions ?? 0) > (b.interactions ?? 0) ? a : b)).name,
    reach: channelsState.reduce((s, c) => s + (c.reach ?? 0), 0),
    featured: channelsState.filter((c) => c.featured).length
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Gestión de canales" description="Organiza la comunicación institucional por áreas, temas y públicos específicos." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <MetricCard metric={{ label: 'Canales activos', value: String(metrics.active), trend: '+3%', trendDirection: 'up' }} />
        <MetricCard metric={{ label: 'Publicaciones totales', value: String(metrics.totalPublications), trend: '+1%', trendDirection: 'neutral' }} />
        <MetricCard metric={{ label: 'Canal con mayor actividad', value: String(metrics.topChannel), trend: '+8%', trendDirection: 'up' }} />
        <MetricCard metric={{ label: 'Alcance estimado', value: String(metrics.reach), trend: '+2%', trendDirection: 'up' }} />
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-tech-border bg-white p-5 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={query} onChange={(e) => setQuery(e.currentTarget.value)} placeholder="Buscar canales..." />
          <div className="flex flex-wrap gap-2">
            {['Todos','Académicos','Administrativos','Becas','Cultura','Deportes','Tutorías','Servicios escolares','Activos','Inactivos'].map((f) => (
              <FilterPill key={f} label={f} active={filter===f} onClick={() => setFilter(f)} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-tech-textSecond">
          <span className="inline-flex items-center gap-2 rounded-full bg-tech-bg px-3 py-2"><Sparkles className="h-4 w-4 text-tech-primary" /> {metrics.featured} destacados</span>
          <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 rounded-2xl bg-tech-primary px-4 py-2.5 text-white transition hover:bg-tech-primary/90"><Radio className="h-4 w-4" /> Crear canal</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {channels.map((c) => (
          <ChannelAdminCard key={c.id} channel={c} onView={()=>{}} onEdit={()=>{}} onToggle={()=>{}} />
        ))}
      </div>

      {createOpen && (
        <CreateChannelModal
          onClose={() => setCreateOpen(false)}
          onCreate={(ch) => {
            const id = `c-${Date.now()}`;
            setChannelsState((prev) => [{ id, name: ch.name, description: ch.description ?? '', category: ch.category ?? 'Académicos', owner: ch.owner ?? 'Coordinación', publications: 0, lastUpdated: new Date().toISOString().split('T')[0], status: ch.status ?? 'activo', audience: ch.audience ?? 'Estudiantes', featured: false, reach: 0, interactions: 0 }, ...prev]);
            alert('Canal simulado creado correctamente.');
          }}
        />
      )}

    </div>
  );
}
