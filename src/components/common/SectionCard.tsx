import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function SectionCard({
  title,
  description,
  action,
  className = "",
  children,
  onClick,
  style
}: SectionCardProps) {
  return (
    <section
      onClick={onClick}
      style={style}
      className={`surface-card p-5 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {title ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

