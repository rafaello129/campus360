import { Download, Eye, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";

interface Document {
  id: string;
  name: string;
  description: string;
  status: "pendiente" | "en_revision" | "aprobado" | "rechazado";
  dueDate: string;
  uploadedAt?: string;
  fileSize?: string;
  required: boolean;
}

const documents: Document[] = [
  {
    id: "doc-1",
    name: "Acta de nacimiento",
    description: "Documento oficial de nacimiento",
    status: "aprobado",
    dueDate: "28 Febrero 2026",
    uploadedAt: "20 Febrero 2026",
    fileSize: "1.2 MB",
    required: true
  },
  {
    id: "doc-2",
    name: "Certificado de bachillerato",
    description: "Certificado de nivel de educación anterior",
    status: "aprobado",
    dueDate: "28 Febrero 2026",
    uploadedAt: "19 Febrero 2026",
    fileSize: "2.4 MB",
    required: true
  },
  {
    id: "doc-3",
    name: "Identificación oficial",
    description: "Cédula, pasaporte o documento de identidad",
    status: "en_revision",
    dueDate: "28 Febrero 2026",
    uploadedAt: "21 Febrero 2026",
    fileSize: "1.8 MB",
    required: true
  },
  {
    id: "doc-4",
    name: "CURP",
    description: "Clave única de registro de población",
    status: "pendiente",
    dueDate: "28 Febrero 2026",
    required: true
  },
  {
    id: "doc-5",
    name: "Comprobante de domicilio",
    description: "Recibo de servicios o documento equivalente",
    status: "pendiente",
    dueDate: "5 Marzo 2026",
    required: true
  },
  {
    id: "doc-6",
    name: "Fotografía",
    description: "Fotografía a color, tamaño cédula",
    status: "aprobado",
    dueDate: "28 Febrero 2026",
    uploadedAt: "18 Febrero 2026",
    fileSize: "0.8 MB",
    required: true
  },
  {
    id: "doc-7",
    name: "Carta de recomendación",
    description: "Opcional: Recomendación de profesor o mentor",
    status: "pendiente",
    dueDate: "10 Marzo 2026",
    required: false
  },
  {
    id: "doc-8",
    name: "Declaración de propósitos",
    description: "Ensayo corto sobre tus objetivos académicos",
    status: "pendiente",
    dueDate: "10 Marzo 2026",
    required: false
  }
];

export function DocumentsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const approvedCount = documents.filter((d) => d.status === "aprobado").length;
  const requiredCount = documents.filter((d) => d.required).length;
  const requiredApproved = documents.filter((d) => d.required && d.status === "aprobado").length;
  const completionPercentage = Math.round((requiredApproved / requiredCount) * 100);

  const handleUpload = (docId: string) => {
    if (!uploadedFiles.includes(docId)) {
      setUploadedFiles([...uploadedFiles, docId]);
      setShowModal(true);
    }
  };

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
  };

  const missingRequired = documents.filter((d) => d.required && d.status === "pendiente");

  return (
    <PageShell
      eyebrow="Documentación"
      title="Documentos requeridos"
      description="Gestiona los archivos necesarios para completar tu proceso de admisión."
    >
      {/* Alertas */}
      {missingRequired.length > 0 && (
        <div className="mb-6 rounded-lg border-l-4 border-l-rose-500 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
            <div className="flex-1">
              <h3 className="font-semibold text-rose-900">Documentos faltantes</h3>
              <p className="mt-1 text-sm text-rose-800">
                Necesitas cargar <span className="font-medium">{missingRequired.length}</span> documento
                {missingRequired.length > 1 ? "s" : ""} antes del 28 de febrero para que tu solicitud sea procesada.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Progreso */}
      <SectionCard title="Progreso de documentación" className="mb-6">
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-900">Documentos requeridos completados</span>
              <span className="text-sm font-bold text-petrol-700">
                {requiredApproved}/{requiredCount}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-petrol-600 to-teal-600 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              {completionPercentage}% de documentación completada
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 border-t border-slate-200 pt-4 text-center">
            <div>
              <p className="text-2xl font-bold text-petrol-700">{approvedCount}</p>
              <p className="text-xs text-slate-600">Aprobados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {documents.filter((d) => d.status === "en_revision").length}
              </p>
              <p className="text-xs text-slate-600">En revisión</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-rose-600">
                {documents.filter((d) => d.status === "pendiente").length}
              </p>
              <p className="text-xs text-slate-600">Pendientes</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Documentos requeridos */}
      <SectionCard title="Documentos obligatorios" className="mb-6">
        <div className="space-y-3">
          {documents
            .filter((d) => d.required)
            .map((doc) => (
              <div key={doc.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4 md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                      <span className="inline-flex rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                        Requerido
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{doc.description}</p>

                    {doc.status !== "pendiente" && (
                      <div className="mt-2 text-xs text-slate-500">
                        {doc.uploadedAt && <p>Cargado: {doc.uploadedAt}</p>}
                        {doc.fileSize && <p>Tamaño: {doc.fileSize}</p>}
                      </div>
                    )}

                    <p className="mt-2 text-xs font-medium text-slate-700">
                      Fecha límite: <span className="text-rose-600">{doc.dueDate}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    <StatusBadge status={doc.status} />
                    <div className="flex gap-2">
                      {doc.status !== "pendiente" && (
                        <>
                          <button
                            onClick={() => handleView(doc)}
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                            title="Ver documento"
                          >
                            <Eye className="h-4 w-4 text-slate-600" />
                          </button>
                          <button
                            className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                            title="Descargar documento"
                          >
                            <Download className="h-4 w-4 text-slate-600" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleUpload(doc.id)}
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

      {/* Documentos opcionales */}
      <SectionCard title="Documentos opcionales" className="mb-6">
        <div className="space-y-3">
          {documents
            .filter((d) => !d.required)
            .map((doc) => (
              <div key={doc.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-75">
                <div className="flex items-start justify-between gap-4 md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">{doc.name}</h3>
                      <span className="inline-flex rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700">
                        Opcional
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{doc.description}</p>
                    <p className="mt-2 text-xs font-medium text-slate-700">
                      Fecha límite: {doc.dueDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status} />
                    <button
                      onClick={() => handleUpload(doc.id)}
                      className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
                    >
                      <Upload className="inline h-4 w-4 mr-1" />
                      Subir
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </SectionCard>

      {/* Recomendaciones */}
      <SectionCard title="Recomendaciones">
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">→</span>
            <p>Los documentos deben ser claros, legibles y en formato PDF, JPG o PNG.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">→</span>
            <p>El tamaño máximo de cada archivo es 10 MB.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">→</span>
            <p>Asegúrate que la información en los documentos sea legible y completa.</p>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-petrol-700">→</span>
            <p>Si tienes dudas, contacta a tu asesor académico o al equipo de admisiones.</p>
          </div>
        </div>
      </SectionCard>

      {/* Modal de carga */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
          <div className="rounded-xl bg-white p-8 max-w-md w-full shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">Carga completada</h3>
            <p className="mt-2 text-slate-600">
              Tu documento ha sido cargado exitosamente y se encuentra en revisión.
            </p>

            <div className="mt-6 space-y-2 rounded-lg bg-slate-50 p-4">
              <p className="text-xs text-slate-600">
                <span className="font-medium">Estado:</span> En revisión
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Tiempo estimado de revisión:</span> 24-48 horas
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

      {/* Modal de vista de documento */}
      {selectedDoc && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
          <div className="rounded-xl bg-white p-8 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-bold text-slate-900">{selectedDoc.name}</h3>
            <div className="mt-4 space-y-2 rounded-lg bg-slate-100 p-6 text-center">
              <p className="text-sm text-slate-600">Vista previa del documento</p>
              <p className="mt-2 text-2xl">📄</p>
              {selectedDoc.fileSize && <p className="text-xs text-slate-600">{selectedDoc.fileSize}</p>}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelectedDoc(null)}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button className="flex-1 rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800">
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
