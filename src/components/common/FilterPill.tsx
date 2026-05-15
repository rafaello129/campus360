import type { ButtonHTMLAttributes } from "react";

interface FilterPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  count?: number;
}

export function FilterPill({
  label,
  active = false,
  count,
  className = "",
  ...props
}: FilterPillProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-petrol-200 bg-petrol-50 text-petrol-800"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800"
      } ${className}`}
      {...props}
    >
      {label}
      {typeof count === "number" ? (
        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
          {count}
        </span>
      ) : null}
    </button>
  );
}

