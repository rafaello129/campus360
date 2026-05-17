import { Layers3, MapPinned } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import AdminCampusMap from '../../components/admin/AdminCampusMap';
import { adminCampusSpaces } from '../../data/adminCampusMap';

export default function MapaPage(){
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <SectionHeader title="Mapa y espacios del campus" description="Gestiona edificios, aulas, laboratorios y puntos de atención visibles para aspirantes y estudiantes." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <div>
          <AdminCampusMap spaces={adminCampusSpaces} onSelect={(id)=>setSelected(adminCampusSpaces.find(s=>s.id===id) ?? null)} />
        </div>
        <aside className="space-y-3">
          <div className="rounded-3xl border border-tech-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-tech-primary">
              <Layers3 className="h-4 w-4" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Espacios registrados</p>
            </div>
            <p className="mt-2 text-sm text-tech-textSecond">Vista resumida para revisión rápida de cobertura y responsables.</p>
          </div>
          {adminCampusSpaces.map((s)=> (
            <div key={s.id} className="rounded-3xl border border-tech-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-semibold text-tech-textMain">{s.name}</h5>
                <span className="rounded-full bg-tech-bg px-2 py-1 text-[11px] font-semibold text-tech-primary">{s.status}</span>
              </div>
              <p className="mt-2 text-xs text-tech-textSecond">{s.type} · {s.coordinator}</p>
              <p className="mt-2 text-xs text-tech-textSecond">Horario: {s.hours}</p>
            </div>
          ))}
        </aside>
      </div>

      {selected && (
        <div className="rounded-3xl border border-tech-border bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-tech-primary">
            <MapPinned className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">Detalle del espacio</p>
          </div>
          <h4 className="mt-2 text-lg font-semibold text-tech-textMain">{selected.name}</h4>
          <p className="text-sm text-tech-textSecond">{selected.type} · {selected.hours}</p>
          <p className="mt-2 text-sm text-tech-textSecond">Responsable: {selected.coordinator}</p>
        </div>
      )}
    </div>
  );
}
