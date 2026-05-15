// React import not required with modern JSX runtime

interface Space {
  id: string;
  name: string;
  type: string;
  status: string;
  hours: string;
  coordinator: string;
  visibleToApplicants: boolean;
}

interface Props {
  spaces: Space[];
  onSelect: (id: string) => void;
}

export default function AdminCampusMap({ spaces, onSelect }: Props) {
  return (
    <div className="surface-card p-4 rounded-lg">
      <div className="h-64 w-full bg-slate-100 rounded-lg p-4 overflow-auto">
        <p className="text-sm text-slate-500">Mapa 2D administrativo (simulado)</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {spaces.map((s) => (
            <button key={s.id} onClick={() => onSelect(s.id)} className="rounded-lg border bg-white p-3 text-left hover:shadow">
              <h5 className="font-semibold text-slate-900">{s.name}</h5>
              <p className="text-xs text-slate-500">{s.type} • {s.coordinator}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
