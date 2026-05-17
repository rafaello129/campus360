import type { ReactNode } from "react";

interface AlertActionModalProps {
  title: string;
  description: string;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
}

export function AlertActionModal({
  title,
  description,
  children,
  onCancel,
  onConfirm,
  confirmLabel
}: AlertActionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-tech-border bg-white p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Formulario institucional</p>
          <h3 className="mt-2 text-xl font-semibold text-tech-textMain">{title}</h3>
          <p className="mt-1 text-sm text-tech-textSecond">{description}</p>
        </div>
        {children}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-xl border border-tech-border px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className="rounded-xl bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
