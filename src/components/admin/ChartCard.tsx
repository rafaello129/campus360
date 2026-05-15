import type { ReactNode } from "react";
import { SectionCard } from "../common/SectionCard";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className }: ChartCardProps) {
  return (
    <SectionCard title={title} description={description} className={className ?? ""}>
      {children}
    </SectionCard>
  );
}
