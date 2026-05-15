import { Bell } from "lucide-react";
import type { NotificationItem } from "../../types/campus";
import { StatusBadge } from "./StatusBadge";

interface NotificationCardProps {
  item: NotificationItem;
}

export function NotificationCard({ item }: NotificationCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-petrol-50 p-2 text-petrol-700">
            <Bell className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.message}</p>
            <p className="mt-2 text-xs text-slate-500">
              {item.channel} · {item.time}
            </p>
          </div>
        </div>
        <StatusBadge status={item.status} />
      </div>
    </article>
  );
}

