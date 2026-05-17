import { Bell } from "lucide-react";
import type { NotificationItem } from "../../types/campus";
import { StatusBadge } from "./StatusBadge";

interface NotificationCardProps {
  item: NotificationItem;
}

export function NotificationCard({ item }: NotificationCardProps) {
  return (
    <article className="rounded-lg border border-tech-border bg-white p-4 hover:shadow-md transition duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-blue-50 p-2.5 text-tech-primary flex-shrink-0">
            <Bell className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-tech-textMain">{item.title}</h3>
            <p className="mt-0.5 text-xs text-tech-textSecond line-clamp-2">{item.message}</p>
            <p className="mt-1 text-xs text-tech-textSecond/70">
              {item.channel} · {item.time}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={item.status} />
        </div>
      </div>
    </article>
  );
}

