import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}

export function SectionHeader({ title, description, eyebrow, actions }: SectionHeaderProps) {
  return (
    <header className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-1.5 rounded-full bg-tech-primary"></div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-textSecond">
              {eyebrow}
            </p>
          </div>
        ) : null}
        <h1 className="mt-0 break-words text-3xl font-bold tracking-tight text-tech-textMain md:text-[2.5rem]">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl break-words text-sm leading-relaxed text-tech-textSecond">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

