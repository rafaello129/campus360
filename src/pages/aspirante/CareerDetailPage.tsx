import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { careers } from "../../data/careers";
import { paths } from "../../router/paths";

export function CareerDetailPage() {
  const { careerId } = useParams();
  const career = careers.find((item) => item.id === careerId);
  const [showRequestModal, setShowRequestModal] = useState(false);

  if (!career) {
    return (
      <EmptyState
        title="Carrera no encontrada"
        description="Este programa no está disponible en el catálogo."
      />
    );
  }

  return (
    <PageShell
      eyebrow="Detalle de carrera"
      title={career.name}
      description={career.description}
      actions={
        <>
          <StatusBadge status={career.status} />
          <Link
            to={paths.aspirante.registro}
            className="rounded-lg bg-tech-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
          >
            Registrarme en esta carrera
          </Link>
        </>
      }
    >
      {/* Información general */}
      <section className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Información general" className="lg:col-span-2">
          <dl className="grid gap-4 text-sm">
            <div className="flex justify-between rounded-lg bg-slate-50 px-4 py-3">
              <dt className="font-medium text-slate-700">Área de estudio</dt>
              <dd className="font-semibold text-slate-900">{career.area}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-slate-50 px-4 py-3">
              <dt className="font-medium text-slate-700">Duración</dt>
              <dd className="font-semibold text-slate-900">{career.duration}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-slate-50 px-4 py-3">
              <dt className="font-medium text-slate-700">Modalidad</dt>
              <dd className="font-semibold text-slate-900">{career.modality}</dd>
            </div>
            <div className="flex justify-between rounded-lg bg-slate-50 px-4 py-3">
              <dt className="font-medium text-slate-700">Estado</dt>
              <dd>
                <StatusBadge status={career.status} />
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Elementos destacados">
          <ul className="space-y-2">
            {career.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
                <span className="mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-tech-primary/10 text-xs font-bold text-tech-primary">
                  ✓
                </span>
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      {/* Detalles académicos */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Perfil de ingreso">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Bachillerato o equivalente con énfasis en:</p>
            <ul className="space-y-1 pl-4">
              <li>• Matemáticas y física para Ingeniería en Software</li>
              <li>• Estadística y análisis para Analítica de Datos</li>
              <li>• Artes y tecnología para Diseño Digital</li>
            </ul>
            <p className="mt-3 pt-3 border-t border-slate-200">
              Capacidad de trabajo en equipo, pensamiento crítico y disposición para el aprendizaje continuo.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Perfil de egreso">
          <div className="space-y-3 text-sm text-slate-700">
            <p>Al finalizar el programa, serás capaz de:</p>
            <ul className="space-y-1 pl-4">
              <li>• Desarrollar soluciones tecnológicas innovadoras</li>
              <li>• Analizar y resolver problemas complejos</li>
              <li>• Liderar proyectos y equipos multidisciplinarios</li>
              <li>• Adaptarte a cambios tecnológicos</li>
              <li>• Contribuir al desarrollo institucional y social</li>
            </ul>
          </div>
        </SectionCard>
      </section>

      {/* Campo laboral y requisitos */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Campo laboral">
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Oportunidades de empleo:</p>
            <ul className="space-y-1 pl-4">
              <li>• Empresa privada</li>
              <li>• Sector público</li>
              <li>• Emprendimiento</li>
              <li>• Consultoría y asesoría</li>
              <li>• Docencia e investigación</li>
            </ul>
          </div>
        </SectionCard>

        <SectionCard title="Requisitos sugeridos">
          <div className="space-y-3 text-sm text-slate-700">
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="font-medium text-tech-primary">✓</span>
                Certificado de estudios previos
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-tech-primary">✓</span>
                Identificación oficial
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-tech-primary">✓</span>
                Comprobante de domicilio
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-tech-primary">✓</span>
                Fotografía tamaño cédula
              </li>
            </ul>
          </div>
        </SectionCard>
      </section>

      {/* CTA y próximos pasos */}
      <section className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="font-bold text-blue-900">¿Qué sigue?</h3>
        <p className="mt-2 text-sm text-blue-800">
          Completa tu registro y comienza el proceso de admisión. Te contactaremos en menos de 48 horas con más información.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={paths.aspirante.registro}
            className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
          >
            Iniciar registro
          </Link>
          <button
            onClick={() => setShowRequestModal(true)}
            className="rounded-lg border border-tech-primary px-4 py-2 text-sm font-semibold text-tech-primary transition hover:bg-tech-bg"
          >
            Solicitar información adicional
          </button>
        </div>
      </section>

      {/* Modal simulado */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="font-bold text-slate-900">Solicitud enviada</h3>
            <p className="mt-2 text-sm text-slate-600">
              Hemos recibido tu solicitud de información. Un asesor académico se contactará contigo en las próximas 24 horas.
            </p>
            <div className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-600">
                <span className="font-medium">Folio de seguimiento:</span> INFO-2026-0847
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Carrera:</span> {career.name}
              </p>
            </div>
            <button
              onClick={() => setShowRequestModal(false)}
              className="mt-4 w-full rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
}

