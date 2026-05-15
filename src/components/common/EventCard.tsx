import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { CampusEventRecord } from "../../types/campus";
import { StatusBadge } from "./StatusBadge";

interface EventCardProps {
  event: CampusEventRecord;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{event.category}</p>
        <StatusBadge status={event.status} />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{event.description}</p>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-petrol-700" />
          {event.date}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-petrol-700" />
          {event.time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-petrol-700" />
          {event.location}
        </p>
      </div>
    </article>
  );
}

