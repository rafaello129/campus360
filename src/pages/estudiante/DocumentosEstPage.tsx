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
      {/* Resumen */}
      <SectionCard title="Resumen documental">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">{approvedCount}</p>
            <p className="text-sm text-slate-600">Aprobados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-700">
              {documentTypes.filter((d) => d.status === "en_revision").length}
            </p>
            <p className="text-sm text-slate-600">En revisión</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-700">
              {documentTypes.filter((d) => d.status === "pendiente").length}
            </p>
            <p className="text-sm text-slate-600">Pendientes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-petrol-700">{percentage}%</p>
            <p className="text-sm text-slate-600">Completado</p>
          </div>
        </div>

        {/* Progreso */}
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Avance de documentación</span>
            <span className="text-sm font-bold text-petrol-700">{percentage}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-petrol-600 to-teal-600 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </SectionCard>

      {/* Alerta si hay pendientes */}
      {documentTypes.some((d) => d.status === "pendiente") && (
        <div className="rounded-lg border-l-4 border-l-rose-500 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-900">Documentos pendientes</p>
              <p className="text-sm text-rose-800 mt-1">
                Tienes {documentTypes.filter((d) => d.status === "pendiente").length} documento
                {documentTypes.filter((d) => d.status === "pendiente").length > 1 ? "s" : ""} por completar. Hazlo pronto para no afectar tu expediente.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de documentos */}
      <SectionCard title="Mis documentos">
        <div className="space-y-3">
          {documentTypes.map((doc) => (
            <div key={doc.id} className="rounded-lg border border-slate-200 p-4 hover:border-petrol-300 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{doc.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <span>{doc.area}</span>
                    <span>•</span>
                    <span>Actualizado: {doc.updatedAt}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <StatusBadge status={doc.status} />
                  <div className="flex gap-2">
                    {doc.status !== "pendiente" && (
                      <>
                        <button
                          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                          title="Ver documento"
                        >
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>
                        <button
                          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                          title="Descargar"
                        >
                          <Download className="h-4 w-4 text-slate-600" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setShowModal(true)}
                      className="rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100"
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

      {/* Trámites disponibles */}
      <SectionCard title="Trámites disponibles">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            { title: "Solicitar constancia", desc: "Comprobante de estudios" },
            { title: "Actualizar datos", desc: "Dirección, teléfono o correo" },
            { title: "Enviar documento", desc: "Carga archivo nuevo" },
            { title: "Revisar estado", desc: "Seguimiento de solicitudes" }
          ].map((tramite, index) => (
            <button
              key={index}
              className="rounded-lg border border-slate-200 p-4 text-left transition hover:border-petrol-400 hover:bg-petrol-50"
            >
              <p className="font-semibold text-slate-900">{tramite.title}</p>
              <p className="text-xs text-slate-600 mt-1">{tramite.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Modal de carga */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
          <div className="rounded-xl bg-white p-8 max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold text-slate-900">Carga completada</h3>
            <p className="mt-2 text-slate-600">Tu documento ha sido cargado exitosamente.</p>
            <div className="mt-6 space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                <span className="font-medium">Estado:</span> En revisión
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Tiempo de revisión:</span> 24-48 horas
              </p>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full rounded-lg bg-petrol-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-petrol-800"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
