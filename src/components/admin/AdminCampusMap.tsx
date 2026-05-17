import { CampusMap2D } from "../common/CampusMap2D";
import type { CampusMapLocation } from "../../types/campusMap";

interface Props {
  spaces: CampusMapLocation[];
  selectedSpaceId: string | null;
  onSelect: (id: string) => void;
}

export default function AdminCampusMap({ spaces, selectedSpaceId, onSelect }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
      <div className="border-b border-tech-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Mapa administrativo</p>
        <p className="mt-1 text-sm text-tech-textSecond">
          Vista 2D simulada para revisar espacios, estados, responsables y visibilidad por rol.
        </p>
      </div>
      <div className="p-4">
        <CampusMap2D
          locations={spaces}
          selectedLocationId={selectedSpaceId}
          onSelectLocation={onSelect}
          variant="admin"
          emptyMessage="No hay espacios administrables con los filtros actuales."
        />
      </div>
    </div>
  );
}
