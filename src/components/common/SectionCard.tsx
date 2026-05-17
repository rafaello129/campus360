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
      className={`rounded-lg border border-tech-border bg-white shadow-sm transition duration-200 hover:border-tech-primary/20 hover:shadow-md ${
        onClick ? "cursor-pointer" : ""
      } p-4 md:p-5 ${className}`}
    >
      {title ? (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full border border-blue-200 bg-blue-50 shadow-[inset_0_0_0_2px_white]"></div>
              <h2 className="text-base md:text-lg font-semibold text-tech-textMain">{title}</h2>
            </div>
            {description ? <p className="mt-2 text-xs md:text-sm text-tech-textSecond">{description}</p> : null}
          </div>
          {action ? <div className="flex-shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

