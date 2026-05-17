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
  const missingRequired = documents.filter((d) => d.required && d.status === "pendiente");

  const handleUpload = (docId: string) => {
    if (!uploadedFiles.includes(docId)) {
      setUploadedFiles([...uploadedFiles, docId]);
      setShowModal(true);
    }
  };

  return (
    <PageShell
      eyebrow="Documentación"
      title="Documentos requeridos"
      description="Gestiona los archivos necesarios para completar tu proceso de admisión."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <SectionCard title="Progreso de documentación" description="Resumen del estado actual del expediente.">
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Aprobados</p>
                  <p className="mt-2 text-2xl font-semibold text-tech-primary">{approvedCount}</p>
                </div>
                <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">En revisión</p>
                  <p className="mt-2 text-2xl font-semibold text-tech-textMain">
                    {documents.filter((d) => d.status === "en_revision").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-tech-border bg-surface-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Pendientes</p>
                  <p className="mt-2 text-2xl font-semibold text-tech-textMain">
                    {documents.filter((d) => d.status === "pendiente").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-tech-border bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Completado</p>
                  <p className="mt-2 text-2xl font-semibold text-tech-primary">{completionPercentage}%</p>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-tech-textSecond">Documentos requeridos completados</span>
                  <span className="font-semibold text-tech-primary">
                    {requiredApproved}/{requiredCount}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-tech-divider">
                  <div
                    className="h-full bg-tech-primary transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-tech-textSecond">{completionPercentage}% de documentación completada</p>
              </div>
            </div>
          </SectionCard>

          {missingRequired.length > 0 && (
            <SectionCard title="Pendientes críticos" description="Documentos faltantes que requieren atención inmediata.">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-rose-900">Documentos faltantes</h3>
                    <p className="mt-1 text-sm leading-6 text-rose-800">
                      Necesitas cargar <span className="font-medium">{missingRequired.length}</span> documento
                      {missingRequired.length > 1 ? "s" : ""} antes del 28 de febrero para que tu solicitud sea procesada.
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          <SectionCard title="Recomendaciones" description="Criterios útiles para aprobar tus archivos a la primera.">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Los documentos deben ser claros, legibles y en formato PDF, JPG o PNG.",
                "El tamaño máximo de cada archivo es 10 MB.",
                "Asegúrate que la información en los documentos sea legible y completa.",
                "Si tienes dudas, contacta a tu asesor académico o al equipo de admisiones."
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-tech-border bg-white p-4 text-sm leading-6 text-tech-textSecond">
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Documentos obligatorios" description="Revisa el estado, descarga o sube archivos cuando corresponda.">
            <div className="space-y-3">
              {documents
                .filter((d) => d.required)
                .map((doc) => (
                  <div key={doc.id} className="rounded-2xl border border-tech-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-tech-textMain">{doc.name}</h3>
                          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-tech-primary">
                            Requerido
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-tech-textSecond">{doc.description}</p>

                        {doc.status !== "pendiente" && (
                          <div className="mt-2 text-xs text-tech-textSecond">
                            {doc.uploadedAt && <p>Cargado: {doc.uploadedAt}</p>}
                            {doc.fileSize && <p>Tamaño: {doc.fileSize}</p>}
                          </div>
                        )}

                        <p className="mt-2 text-xs font-medium text-tech-textSecond">
                          Fecha límite: <span className="font-semibold text-tech-primary">{doc.dueDate}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                        <StatusBadge status={doc.status} />
                        <div className="flex gap-2">
                          {doc.status !== "pendiente" && (
                            <>
                              <button
                                onClick={() => setSelectedDoc(doc)}
                                className="rounded-full border border-tech-border p-2 transition hover:bg-blue-50"
                                title="Ver documento"
                              >
                                <Eye className="h-4 w-4 text-tech-textSecond" />
                              </button>
                              <button
                                className="rounded-full border border-tech-border p-2 transition hover:bg-blue-50"
                                title="Descargar documento"
                              >
                                <Download className="h-4 w-4 text-tech-textSecond" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleUpload(doc.id)}
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

          <SectionCard title="Documentos opcionales" description="Elementos complementarios para enriquecer tu expediente.">
            <div className="space-y-3">
              {documents.filter((d) => !d.required).map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col gap-4 rounded-2xl border border-tech-border bg-surface-card p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-tech-textMain">{doc.name}</h3>
                      <span className="inline-flex rounded-full bg-tech-border px-2.5 py-1 text-xs font-semibold text-tech-textSecond">
                        Opcional
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-tech-textSecond">{doc.description}</p>
                    <p className="mt-2 text-xs text-tech-textSecond">Fecha límite: {doc.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status} />
                    <button
                      onClick={() => handleUpload(doc.id)}
                      className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-blue-100"
                    >
                      <Upload className="inline h-4 w-4 mr-1" />
                      Subir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      <SectionCard title="Vista previa de documento" description="Revisa el archivo seleccionado antes de continuar.">
        {selectedDoc ? (
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-tech-border bg-surface-card p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Documento seleccionado</p>
              <h3 className="mt-2 text-xl font-semibold text-tech-textMain">{selectedDoc.name}</h3>
              <div className="mt-4 rounded-2xl border border-tech-border bg-white p-8">
                <p className="text-sm text-tech-textSecond">Vista previa del documento</p>
                <p className="mt-3 text-5xl text-tech-primary">▣</p>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-tech-border bg-white p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Estado</p>
                <StatusBadge status={selectedDoc.status} />
              </div>
              <div className="grid gap-3 text-sm text-tech-textSecond sm:grid-cols-2">
                <div className="rounded-2xl bg-surface-card p-4">
                  <p className="text-xs uppercase tracking-[0.22em]">Fecha límite</p>
                  <p className="mt-2 font-medium text-tech-textMain">{selectedDoc.dueDate}</p>
                </div>
                <div className="rounded-2xl bg-surface-card p-4">
                  <p className="text-xs uppercase tracking-[0.22em]">Tamaño</p>
                  <p className="mt-2 font-medium text-tech-textMain">{selectedDoc.fileSize ?? "No cargado"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="flex-1 rounded-full border border-tech-border px-4 py-2.5 text-sm font-semibold text-tech-textSecond transition hover:bg-blue-50"
                >
                  Cerrar
                </button>
                <button className="flex-1 rounded-full bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid">
                  Descargar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-tech-border bg-surface-card p-8 text-center text-tech-textSecond">
            Selecciona un documento para revisar su vista previa.
          </div>
        )}
      </SectionCard>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-tech-border bg-white p-8 shadow-2xl">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-tech-primary">
              <Upload className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-tech-textMain">Carga completada</h3>
            <p className="mt-2 text-tech-textSecond">
              Tu documento ha sido cargado exitosamente y se encuentra en revisión.
            </p>

            <div className="mt-6 space-y-2 rounded-2xl border border-tech-border bg-surface-card p-4">
              <p className="text-xs text-tech-textSecond">
                <span className="font-medium text-tech-textMain">Estado:</span> En revisión
              </p>
              <p className="text-xs text-tech-textSecond">
                <span className="font-medium text-tech-textMain">Tiempo estimado de revisión:</span> 24-48 horas
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
