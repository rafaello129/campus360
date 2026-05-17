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
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-semibold transition duration-200 ${
        active
          ? "border-tech-primary bg-tech-primary text-white"
          : "border-tech-border bg-white text-tech-textSecond hover:border-tech-primary/25 hover:text-tech-textMain"
      } ${className}`}
      {...props}
    >
      {label}
      {typeof count === "number" ? (
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${active ? "bg-white/20 text-white" : "bg-tech-bg text-tech-textSecond"}`}>
          {count}
        </span>
      ) : null}
    </button>
  );
}

