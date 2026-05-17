import { Download, Upload, Eye, AlertCircle } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import type { DocumentRequest } from "../../types";

const documentTypes: DocumentRequest[] = [
  {
    id: "doc-1",
    name: "Constancia de estudios",
    status: "aprobado",
    area: "Servicios escolares",
    updatedAt: "Hoy",
    description: "Comprobante oficial de inscripción activa"
  },
  {
    id: "doc-2",
    name: "Kardex",
    status: "aprobado",
    area: "Control escolar",
    updatedAt: "Hace 1 semana",
    description: "Historial académico completo"
  },
  {
    id: "doc-3",
    name: "Credencial estudiantil",
    status: "aprobado",
    area: "Servicios escolares",
    updatedAt: "Hace 2 meses",
    description: "Identificación oficial para campus"
  },
  {
    id: "doc-4",
    name: "Comprobante de inscripción",
    status: "en_revision",
    area: "Control escolar",
    updatedAt: "Hace 3 días",
    description: "Inscripción al semestre actual"
  },
  {
    id: "doc-5",
    name: "Formato de beca",
    status: "pendiente",
    area: "Bienestar estudiantil",
    updatedAt: "Nunca",
    description: "Solicitud de apoyo económico"
  },
  {
    id: "doc-6",
    name: "Servicio social",
    status: "pendiente",
    area: "Vinculación",
    updatedAt: "Nunca",
    description: "Acreditación de servicio social"
  }
];

export function DocumentosPage() {
  const [showModal, setShowModal] = useState(false);

  const approvedCount = documentTypes.filter((d) => d.status === "aprobado").length;
  const percentage = Math.round((approvedCount / documentTypes.length) * 100);

  return (
    <PageShell
      eyebrow="Gestión"
      title="Documentos y trámites"
      description="Gestiona tus documentos escolares y solicita trámites."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Resumen documental" description="Estado general de tu expediente y sus pendientes.">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-tech-border bg-surface-card p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Aprobados</p>
              <p className="mt-2 text-3xl font-semibold text-tech-primary">{approvedCount}</p>
            </div>
            <div className="rounded-2xl border border-tech-border bg-surface-card p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">En revisión</p>
              <p className="mt-2 text-3xl font-semibold text-tech-textMain">
                {documentTypes.filter((d) => d.status === "en_revision").length}
              </p>
            </div>
            <div className="rounded-2xl border border-tech-border bg-surface-card p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Pendientes</p>
              <p className="mt-2 text-3xl font-semibold text-tech-textMain">
                {documentTypes.filter((d) => d.status === "pendiente").length}
              </p>
            </div>
            <div className="rounded-2xl border border-tech-border bg-blue-50 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Completado</p>
              <p className="mt-2 text-3xl font-semibold text-tech-primary">{percentage}%</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-tech-textSecond">Avance de documentación</span>
              <span className="text-sm font-semibold text-tech-primary">{percentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-tech-divider">
              <div
                className="h-full bg-tech-primary transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </SectionCard>

        {documentTypes.some((d) => d.status === "pendiente") && (
          <SectionCard title="Pendientes críticos" description="Atiende los documentos faltantes para no frenar tu expediente.">
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
            <div>
              <p className="font-bold text-rose-900">Documentos pendientes</p>
              <p className="text-sm text-rose-800 mt-1">
                Tienes {documentTypes.filter((d) => d.status === "pendiente").length} documento
                {documentTypes.filter((d) => d.status === "pendiente").length > 1 ? "s" : ""} por completar. Hazlo pronto para no afectar tu expediente.
              </p>
            </div>
          </div>
            </div>
          </SectionCard>
        )}
      </div>

      <SectionCard title="Mis documentos" description="Revisa el estado, descárgalos o sube archivos cuando corresponda.">
        <div className="space-y-3">
          {documentTypes.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-tech-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-tech-textMain">{doc.name}</h3>
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-tech-primary">
                      {doc.status === "pendiente" ? "Pendiente" : "Activo"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-tech-textSecond">{doc.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-tech-textSecond">
                    <span>{doc.area}</span>
                    <span>•</span>
                    <span>Actualizado: {doc.updatedAt}</span>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-2">
                  <StatusBadge status={doc.status} />
                  <div className="flex gap-2">
                    {doc.status !== "pendiente" && (
                      <>
                        <button
                          className="rounded-full border border-tech-border p-2 transition hover:bg-blue-50"
                          title="Ver documento"
                        >
                          <Eye className="h-4 w-4 text-tech-textSecond" />
                        </button>
                        <button
                          className="rounded-full border border-tech-border p-2 transition hover:bg-blue-50"
                          title="Descargar"
                        >
                          <Download className="h-4 w-4 text-tech-textSecond" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowModal(true)}
                      className="rounded-full bg-tech-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid"
                    >
                      <Upload className="inline h-4 w-4 mr-1" />
                      Subir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Trámites disponibles" description="Acciones rápidas para solicitar documentos o actualizar datos.">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { title: "Solicitar constancia", desc: "Comprobante de estudios" },
            { title: "Actualizar datos", desc: "Dirección, teléfono o correo" },
            { title: "Enviar documento", desc: "Carga archivo nuevo" },
            { title: "Revisar estado", desc: "Seguimiento de solicitudes" }
          ].map((tramite, index) => (
            <button
              key={index}
              className="rounded-2xl border border-tech-border bg-surface-card p-4 text-left transition hover:border-tech-primary hover:bg-blue-50"
            >
              <p className="font-semibold text-tech-textMain">{tramite.title}</p>
              <p className="mt-1 text-xs text-tech-textSecond">{tramite.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-tech-border bg-white p-8 shadow-2xl">
            <h3 className="text-xl font-semibold text-tech-textMain">Carga completada</h3>
            <p className="mt-2 text-tech-textSecond">Tu documento ha sido cargado exitosamente.</p>
            <div className="mt-6 space-y-2 rounded-2xl border border-tech-border bg-surface-card p-4">
              <p className="text-xs text-tech-textSecond">
                <span className="font-medium text-tech-textMain">Estado:</span> En revisión
              </p>
              <p className="text-xs text-tech-textSecond">
                <span className="font-medium text-tech-textMain">Tiempo de revisión:</span> 24-48 horas
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-full bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
