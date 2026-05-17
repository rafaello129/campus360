import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { CampusEventRecord } from "../../types/campus";
import { StatusBadge } from "./StatusBadge";

interface EventCardProps {
  event: CampusEventRecord;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="rounded-lg border border-tech-border bg-white p-5 hover:shadow-md transition duration-200">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-tech-textSecond">{event.category}</p>
        <StatusBadge status={event.status} />
      </div>

      <h3 className="text-base font-semibold text-tech-textMain">{event.title}</h3>
      <p className="mt-2 text-sm text-tech-textSecond">{event.description}</p>

      <div className="mt-4 space-y-1.5 text-sm text-tech-textSecond">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-tech-accent flex-shrink-0" />
          {event.date}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-tech-accent flex-shrink-0" />
          {event.time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-tech-accent flex-shrink-0" />
          {event.location}
        </p>
      </div>
    </article>
  );
}

