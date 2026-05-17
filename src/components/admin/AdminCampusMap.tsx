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

const positions = [
  { x: 12, y: 18, w: 24, h: 18 },
  { x: 44, y: 14, w: 22, h: 20 },
  { x: 72, y: 20, w: 16, h: 24 },
  { x: 16, y: 54, w: 22, h: 22 },
  { x: 48, y: 52, w: 20, h: 24 },
  { x: 74, y: 58, w: 18, h: 18 }
];

function statusClass(status: string) {
  if (status.toLowerCase().includes("mantenimiento")) return "border-amber-300 bg-amber-50 text-amber-800";
  if (status.toLowerCase().includes("cerrado")) return "border-rose-300 bg-rose-50 text-rose-800";
  return "border-blue-200 bg-white text-tech-primary";
}

export default function AdminCampusMap({ spaces, onSelect }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
      <div className="border-b border-tech-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Mapa administrativo</p>
        <p className="mt-1 text-sm text-tech-textSecond">Vista 2D simulada para ubicar espacios, responsables y visibilidad por rol.</p>
      </div>
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-h-[32rem] overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eff6ff_100%)] p-4">
          <div className="relative h-full min-h-[30rem] rounded-lg border border-blue-100 bg-white shadow-inner">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.28) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
            <div className="absolute left-[8%] right-[8%] top-[45%] h-10 -translate-y-1/2 rounded-full border border-blue-100 bg-blue-50/80" />
            <div className="absolute bottom-[16%] left-[10%] right-[10%] h-8 rounded-full border border-blue-100 bg-blue-50/70" />
            <div className="absolute bottom-[10%] left-[44%] top-[12%] w-10 rounded-full border border-blue-100 bg-blue-50/60" />

            {spaces.map((space, index) => {
              const pos = positions[index % positions.length];

              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => onSelect(space.id)}
                  className={`absolute rounded-lg border p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-tech-primary hover:shadow-md ${statusClass(space.status)}`}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.w}%`, minHeight: `${pos.h}%` }}
                >
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-tech-primary">
                    {space.type}
                  </span>
                  <h5 className="mt-2 text-sm font-bold leading-5 text-tech-textMain">{space.name}</h5>
                  <p className="mt-1 text-[11px] leading-4 text-tech-textSecond">{space.coordinator}</p>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 rounded-lg border border-tech-border bg-white/95 px-3 py-2 text-[11px] font-semibold text-tech-textSecond shadow-sm">
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-tech-primary" /> Visible</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500" /> Revisión</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" /> Restringido</span>
            </div>
          </div>
        </div>

        <aside className="border-t border-tech-border bg-surface-card p-4 xl:border-l xl:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Espacios administrables</p>
          <div className="mt-4 max-h-[29rem] space-y-3 overflow-y-auto pr-1">
            {spaces.map((space) => (
              <button
                key={space.id}
                type="button"
                onClick={() => onSelect(space.id)}
                className="w-full rounded-lg border border-tech-border bg-white p-3 text-left transition hover:border-tech-primary/40 hover:bg-blue-50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-tech-textMain">{space.name}</p>
                    <p className="mt-1 text-xs text-tech-textSecond">{space.hours}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-tech-primary">
                    {space.visibleToApplicants ? "Aspirante" : "Interno"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-tech-textSecond">{space.status} · {space.coordinator}</p>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
