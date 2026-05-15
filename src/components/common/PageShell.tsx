import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

interface PageShellProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ title, description, eyebrow, actions, children }: PageShellProps) {
  return (
    <div className="space-y-6">
      <SectionHeader title={title} description={description} eyebrow={eyebrow} actions={actions} />
      <div className="space-y-6">{children}</div>
    </div>
  );
}

