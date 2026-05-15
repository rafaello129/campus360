import { useState } from 'react';
import { SectionHeader } from '../../components/common/SectionHeader';
import AdminCampusMap from '../../components/admin/AdminCampusMap';
import { adminCampusSpaces } from '../../data/adminCampusMap';

export default function MapaPage(){
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <SectionHeader title="Mapa y espacios del campus" description="Gestiona edificios, aulas, laboratorios y puntos de atención visibles para aspirantes y estudiantes." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminCampusMap spaces={adminCampusSpaces} onSelect={(id)=>setSelected(adminCampusSpaces.find(s=>s.id===id) ?? null)} />
        </div>
        <aside className="space-y-3">
          {adminCampusSpaces.map((s)=> (
            <div key={s.id} className="surface-card p-3 rounded-lg">
              <h5 className="font-semibold">{s.name}</h5>
              <p className="text-xs text-slate-500">{s.type} · {s.coordinator}</p>
            </div>
          ))}
        </aside>
      </div>

      {selected && (
        <div className="surface-card p-4 rounded-lg">
          <h4 className="font-semibold">{selected.name}</h4>
          <p className="text-sm text-slate-600">{selected.type} · {selected.hours}</p>
          <p className="mt-2 text-sm text-slate-500">Responsable: {selected.coordinator}</p>
        </div>
      )}
    </div>
  );
}
