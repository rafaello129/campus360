import type { Status } from "../../types";
import { statusStyles } from "../../data/statuses";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
}

