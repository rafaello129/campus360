import { BookOpen, Building2, Coffee, DoorOpen, Dumbbell, FlaskConical, GraduationCap, Landmark, Navigation, UsersRound } from "lucide-react";
import type { CampusMapLocation, CampusMapVariant } from "../../types/campusMap";

interface CampusMap2DProps {
  locations: CampusMapLocation[];
  selectedLocationId: string | null;
  onSelectLocation: (id: string) => void;
  variant: CampusMapVariant;
  emptyMessage?: string;
}

const categoryStyles: Record<string, { border: string; bg: string; text: string; pin: string }> = {
  Academico: { border: "border-blue-300", bg: "bg-blue-50", text: "text-blue-900", pin: "bg-blue-700" },
  Administrativo: { border: "border-sky-300", bg: "bg-sky-50", text: "text-sky-900", pin: "bg-sky-700" },
  Servicios: { border: "border-cyan-300", bg: "bg-cyan-50", text: "text-cyan-900", pin: "bg-cyan-700" },
  Recreativo: { border: "border-slate-300", bg: "bg-slate-50", text: "text-slate-900", pin: "bg-slate-700" },
  Laboratorio: { border: "border-indigo-300", bg: "bg-indigo-50", text: "text-indigo-900", pin: "bg-indigo-700" },
  "Atencion estudiantil": { border: "border-blue-200", bg: "bg-white", text: "text-blue-900", pin: "bg-blue-600" }
};

const statusStyles: Record<string, string> = {
  Activo: "border-blue-300 bg-blue-50",
  "En revision": "border-cyan-300 bg-cyan-50",
  Restringido: "border-slate-400 bg-slate-100"
};

const zones = [
  { label: "Zona administrativa", x: 5, y: 8, w: 34, h: 34 },
  { label: "Zona academica", x: 42, y: 8, w: 50, h: 36 },
  { label: "Servicios y vida campus", x: 18, y: 49, w: 44, h: 39 },
  { label: "Recreativa", x: 65, y: 50, w: 28, h: 38 }
];

function getLocationStyle(location: CampusMapLocation, isSelected: boolean, variant: CampusMapVariant) {
  const byStatus = variant === "admin" && location.status ? statusStyles[location.status] : "";
  const byCategory = categoryStyles[location.type] ?? categoryStyles.Servicios;

  return [
    byStatus || `${byCategory.border} ${byCategory.bg}`,
    byCategory.text,
    isSelected ? "z-30 border-tech-primary bg-white shadow-lg ring-4 ring-blue-100" : "z-20 shadow-sm hover:border-tech-primary hover:shadow-md"
  ].join(" ");
}

function getRoutePoints(location: CampusMapLocation) {
  const start = { x: 10, y: 90 };
  const mainVertical = 24.5;
  const centerHorizontal = 47;
  const lowerHorizontal = 82;
  const midVertical = 50;
  const rightVertical = 70.5;
  const target = location.accessPoint ?? location.position;

  if (target.x >= 72) {
    return [start, { x: mainVertical, y: lowerHorizontal }, { x: rightVertical, y: lowerHorizontal }, { x: rightVertical, y: centerHorizontal }, { x: target.x, y: centerHorizontal }, target];
  }

  if (target.x >= 42 && target.y <= 52) {
    return [start, { x: mainVertical, y: lowerHorizontal }, { x: mainVertical, y: centerHorizontal }, { x: midVertical, y: centerHorizontal }, { x: midVertical, y: target.y }, target];
  }

  if (target.x >= 42) {
    return [start, { x: mainVertical, y: lowerHorizontal }, { x: midVertical, y: lowerHorizontal }, { x: midVertical, y: target.y }, target];
  }

  if (target.y <= 52) {
    return [start, { x: mainVertical, y: lowerHorizontal }, { x: mainVertical, y: centerHorizontal }, { x: target.x, y: centerHorizontal }, target];
  }

  return [start, { x: mainVertical, y: lowerHorizontal }, { x: target.x, y: lowerHorizontal }, target];
}

function getLocationIcon(location: CampusMapLocation) {
  const name = location.name.toLowerCase();

  if (name.includes("biblioteca")) return BookOpen;
  if (name.includes("cafeteria")) return Coffee;
  if (name.includes("cancha")) return Dumbbell;
  if (name.includes("laboratorio") || name.includes("computo")) return FlaskConical;
  if (name.includes("acompanamiento")) return UsersRound;
  if (name.includes("servicios") || name.includes("admisiones") || name.includes("direccion")) return Landmark;
  if (location.type === "Academico") return GraduationCap;
  return Building2;
}

export function CampusMap2D({
  locations,
  selectedLocationId,
  onSelectLocation,
  variant,
  emptyMessage = "No hay espacios para mostrar con los filtros actuales."
}: CampusMap2DProps) {
  const selectedLocation = locations.find((location) => location.id === selectedLocationId) ?? null;
  const mapLabel = variant === "admin" ? "Plano operativo del campus" : "Plano institucional del campus";

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-tech-border bg-white">
      <div className="relative min-h-[430px] w-full max-w-full overflow-hidden bg-[#eef6ff] p-3 sm:min-h-[540px] sm:p-4 lg:min-h-[660px]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.13) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        <div className="absolute left-4 top-4 z-40 rounded-md border border-blue-100 bg-white/95 px-3 py-2 text-xs font-semibold text-tech-primary shadow-sm">
          {mapLabel}
        </div>

        <div className="absolute inset-3 rounded-lg border border-white/80 bg-white/45 shadow-inner sm:inset-4" />

        {zones.map((zone) => (
          <div
            key={zone.label}
            className="absolute rounded-lg border border-blue-100 bg-white/55"
            style={{ left: `${zone.x}%`, top: `${zone.y}%`, width: `${zone.w}%`, height: `${zone.h}%` }}
          >
            <span className="absolute left-3 top-2 max-w-[85%] truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
              {zone.label}
            </span>
          </div>
        ))}

        <div className="absolute left-[8%] right-[8%] top-[47%] z-10 h-8 rounded-full border border-blue-100 bg-blue-100/75" />
        <div className="absolute bottom-[15%] left-[12%] right-[12%] z-10 h-7 rounded-full border border-blue-100 bg-blue-100/70" />
        <div className="absolute bottom-[12%] left-[48%] top-[14%] z-10 w-8 rounded-full border border-blue-100 bg-blue-100/60" />
        <div className="absolute left-[26%] top-[18%] z-10 h-[58%] w-6 rounded-full border border-blue-100 bg-blue-50/90" />
        <div className="absolute left-[70%] top-[26%] z-10 h-[50%] w-6 rounded-full border border-blue-100 bg-blue-50/80" />
        <div className="absolute left-[22.5%] top-[80%] z-10 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_0_4px_rgba(191,219,254,0.65)]" />
        <div className="absolute left-[24%] top-[47%] z-10 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_0_4px_rgba(191,219,254,0.65)]" />
        <div className="absolute left-[50%] top-[47%] z-10 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_0_4px_rgba(191,219,254,0.65)]" />
        <div className="absolute left-[70%] top-[47%] z-10 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_0_4px_rgba(191,219,254,0.65)]" />
        <div className="absolute left-[70%] top-[82%] z-10 h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_0_4px_rgba(191,219,254,0.65)]" />
        <div className="absolute left-[53%] top-[50%] z-10 rounded-full border border-cyan-100 bg-cyan-50/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-800">
          Plaza central
        </div>
        <div className="absolute left-[73%] top-[74%] z-10 rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-800">
          Nodo sur
        </div>

        {selectedLocation ? (
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points={getRoutePoints(selectedLocation).map((point) => `${point.x},${point.y}`).join(" ")}
              fill="none"
              stroke="#1d4ed8"
              strokeDasharray="1.6 2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.7"
            />
          </svg>
        ) : null}

        <div className="absolute bottom-[6%] left-[6%] z-40 flex max-w-[11rem] items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-tech-primary shadow-sm">
          <DoorOpen className="h-4 w-4 flex-shrink-0" />
          <span>Entrada principal</span>
        </div>

        {locations.map((location) => {
          const isSelected = selectedLocationId === location.id;
          const style = categoryStyles[location.type] ?? categoryStyles.Servicios;
          const locationLabel = location.mapLabel ?? location.name.replace("Oficina de ", "").replace("Laboratorios de ", "Labs ");
          const Icon = getLocationIcon(location);

          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelectLocation(location.id)}
              className={`absolute inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border bg-white/95 px-2 py-1.5 text-left backdrop-blur transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${getLocationStyle(location, isSelected, variant)}`}
              style={{
                left: `${location.position.x}%`,
                top: `${location.position.y}%`
              }}
              title={location.name}
            >
              <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white shadow-sm ${style.pin} ${isSelected ? "ring-4 ring-blue-100" : ""}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block whitespace-nowrap text-[10px] font-bold leading-4 sm:text-[11px]">{locationLabel}</span>
                <span className="mt-0.5 block whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] text-tech-textSecond">
                  {location.type}
                </span>
              </span>
              {variant === "admin" && location.status ? (
                <span className="absolute -bottom-2 left-3 inline-flex max-w-full rounded-full bg-white px-1.5 py-0.5 text-[9px] font-semibold text-tech-primary shadow-sm">
                  {location.status}
                </span>
              ) : null}
            </button>
          );
        })}

        {locations.length === 0 ? (
          <div className="absolute inset-x-6 top-1/2 z-40 -translate-y-1/2 rounded-lg border border-tech-border bg-white/95 p-5 text-center text-sm font-medium text-tech-textSecond shadow-sm">
            {emptyMessage}
          </div>
        ) : null}
      </div>

      <div className="border-t border-tech-border bg-white px-4 py-3 text-[11px] shadow-sm">
        <div className="mb-2 flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-tech-primary sm:mb-0">
          <Navigation className="h-3.5 w-3.5" />
          Leyenda
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-tech-textSecond sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(categoryStyles).map(([label, style]) => (
            <span key={label} className="inline-flex min-w-0 items-center gap-1.5">
              <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${style.pin}`} />
              <span className="whitespace-nowrap">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
