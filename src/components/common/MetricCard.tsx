import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metric, TrendDirection } from "../../types";

interface MetricCardProps {
  metric: Metric;
}

const trendIcons: Record<TrendDirection, typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: ArrowRight
};

export function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = trendIcons[metric.trendDirection];

  return (
    <article className="rounded-lg border border-tech-border bg-white p-4 md:p-5 shadow-sm transition duration-200 hover:border-tech-primary/20 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tech-textSecond">{metric.label}</p>
          <p className="mt-2 text-3xl md:text-[2.5rem] font-bold text-tech-textMain">{metric.value}</p>
        </div>
        {metric.trendDirection !== "neutral" && (
          <div className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-1 text-xs font-semibold ${
            metric.trendDirection === "up" ? "border-blue-200 bg-blue-50 text-tech-primary" : "border-rose-200 bg-rose-50 text-rose-700"
          }`}>
            <TrendIcon className="h-3 w-3" />
            <span>{metric.trend}</span>
          </div>
        )}
      </div>
      {metric.trendDirection === "neutral" && (
        <p className="text-xs text-tech-textSecond">{metric.trend}</p>
      )}
    </article>
  );
}

