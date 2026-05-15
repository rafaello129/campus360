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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        {children}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
            Cancelar
          </button>
          <button type="button" onClick={onConfirm} className="rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
