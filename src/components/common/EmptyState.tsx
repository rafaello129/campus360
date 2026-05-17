import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-tech-divider bg-tech-bg/50 px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-tech-textMain">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-tech-textSecond">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

