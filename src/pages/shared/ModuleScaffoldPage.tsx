import { useState } from "react";
import { PageHeader } from "../../components/common/PageHeader";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import type { ModuleScaffoldData } from "../../types";

interface ModuleScaffoldPageProps {
  data: ModuleScaffoldData;
}

export function ModuleScaffoldPage({ data }: ModuleScaffoldPageProps) {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title={data.title}
        description={data.description}
        actions={
          <>
            <button
              type="button"
              onClick={() => setLastAction(`${data.actionLabel} ejecutada`)}
              className="rounded-lg bg-petrol-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800"
            >
              {data.actionLabel}
            </button>
            {data.secondaryActionLabel ? (
              <button
                type="button"
                onClick={() => setLastAction(`${data.secondaryActionLabel} ejecutada`)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                {data.secondaryActionLabel}
              </button>
            ) : null}
          </>
        }
      />

      {lastAction ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {lastAction} (simulado en frontend con estado local).
        </div>
      ) : null}

      <SectionCard title="Resumen del módulo" description={data.helperText}>
        <div className="grid gap-3 md:grid-cols-2">
          {data.highlights.map((item) => (
            <article key={item.id} className="surface-muted p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                {item.status ? <StatusBadge status={item.status} /> : null}
              </div>
              <p className="text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

