import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
}

export function SectionHeader({ title, description, eyebrow, actions }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-petrol-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}

