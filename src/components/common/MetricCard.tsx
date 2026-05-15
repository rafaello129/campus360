import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metric, TrendDirection } from "../../types";

interface MetricCardProps {
  metric: Metric;
}

const trendClassNames: Record<TrendDirection, string> = {
  up: "text-emerald-600",
  down: "text-rose-600",
  neutral: "text-slate-500"
};

const trendIcons: Record<TrendDirection, typeof ArrowUpRight> = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  neutral: ArrowRight
};

export function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = trendIcons[metric.trendDirection];

  return (
    <article className="surface-card p-4">
      <p className="text-sm text-slate-500">{metric.label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
      <p className={`mt-3 inline-flex items-center gap-1 text-xs ${trendClassNames[metric.trendDirection]}`}>
        <TrendIcon className="h-3.5 w-3.5" />
        {metric.trend}
      </p>
    </article>
  );
}

