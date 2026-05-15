import { CheckCircle2, CircleDot, CircleEllipsis } from "lucide-react";
import type { ProgressStep } from "../../types/campus";

interface ProgressStepperProps {
  steps: ProgressStep[];
}

const stateClasses: Record<ProgressStep["state"], string> = {
  completado: "text-emerald-600",
  activo: "text-petrol-700",
  pendiente: "text-slate-400"
};

const stateIcons: Record<ProgressStep["state"], typeof CheckCircle2> = {
  completado: CheckCircle2,
  activo: CircleDot,
  pendiente: CircleEllipsis
};

export function ProgressStepper({ steps }: ProgressStepperProps) {
  return (
    <ol className="space-y-4">
      {steps.map((step, index) => {
        const Icon = stateIcons[step.state];
        const hasLine = index < steps.length - 1;

        return (
          <li key={step.id} className="relative flex gap-3">
            <div className="flex flex-col items-center">
              <Icon className={`mt-0.5 h-5 w-5 ${stateClasses[step.state]}`} />
              {hasLine ? <span className="mt-1 h-8 w-px bg-slate-200" /> : null}
            </div>

            <div className="pb-2">
              <p className="text-sm font-semibold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

