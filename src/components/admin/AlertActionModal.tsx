import type { ReactNode } from "react";

interface AlertActionModalProps {
  title: string;
  description: string;
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel: string;
  isSubmitting?: boolean;
  confirmDisabled?: boolean;
  hideCancel?: boolean;
  cancelLabel?: string;
  eyebrow?: string;
}

export function AlertActionModal({
  title,
  description,
  children,
  onCancel,
  onConfirm,
  confirmLabel,
  isSubmitting = false,
  confirmDisabled = false,
  hideCancel = false,
  cancelLabel = "Cancelar",
  eyebrow = "Formulario institucional"
}: AlertActionModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-action-modal-title"
        className="w-full max-w-lg rounded-3xl border border-tech-border bg-white p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]"
      >
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">{eyebrow}</p>
          <h3 id="alert-action-modal-title" className="mt-2 text-xl font-semibold text-tech-textMain">{title}</h3>
          <p className="mt-1 text-sm text-tech-textSecond">{description}</p>
        </div>
        {children}
        <div className="mt-5 flex justify-end gap-2">
          {!hideCancel ? (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="rounded-xl border border-tech-border px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cancelLabel}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirmDisabled || isSubmitting}
            className="rounded-xl bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Guardando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
