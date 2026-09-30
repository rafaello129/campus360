import { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Clock, Mail, Phone, MessageCircle, ShieldCheck, ClipboardList, FileCheck } from "lucide-react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { careers } from "../../data/careers";
import { createApplicant, type CreateApplicantInput } from "../../data/applicantStorage";
import {
  createOrResumeDemoApplicant,
  isDemoApplicant
} from "../../data/demoSession";
import { paths } from "../../router/paths";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  career: string;
  modality: string;
  education: string;
  source: string;
  comments: string;
}

function getValidCareerId(careerId: string | null) {
  if (!careerId) return "";
  return careers.some((career) => career.id === careerId) ? careerId : "";
}

function buildInitialFormData(careerId: string | null): FormData {
  return {
    fullName: "",
    email: "",
    phone: "",
    career: getValidCareerId(careerId),
    modality: "",
    education: "",
    source: "",
    comments: ""
  };
}

export function RegistrationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>(() =>
    buildInitialFormData(searchParams.get("career"))
  );
  const [showModal, setShowModal] = useState(false);
  const [folio, setFolio] = useState("");
  const [registrationResult, setRegistrationResult] = useState<"created" | "resumed">("created");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      setSubmitError(null);

      const input: CreateApplicantInput = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        career: formData.career,
        modality: formData.modality,
        education: formData.education,
        source: formData.source,
        comments: formData.comments,
        origin: "public"
      };

      if (isDemoApplicant(input)) {
        const result = createOrResumeDemoApplicant(input);
        setFolio(result.applicant.folio);
        setRegistrationResult(result.created ? "created" : "resumed");
      } else {
        const applicant = createApplicant(input, { setAsCurrent: true });
        setFolio(applicant.folio);
        setRegistrationResult("created");
      }

      setShowModal(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la solicitud. Intenta nuevamente."
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell
      eyebrow="Admisión"
      title="Registra tu solicitud de admisión"
      description="Completa el formulario para iniciar tu proceso de admisión. Tus datos están seguros y protegidos."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError ? (
            <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
              {submitError}
            </div>
          ) : null}
          <SectionCard
            title="Datos personales"
            description="Asegura que podamos contactarte y dar seguimiento sin fricción."
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="registration-fullName" className="block text-sm font-medium text-tech-textMain">Nombre completo</label>
                <input
                  id="registration-fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Juan Carlos Pérez García"
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="registration-email" className="block text-sm font-medium text-tech-textMain">Correo electrónico</label>
                  <input
                    id="registration-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label htmlFor="registration-phone" className="block text-sm font-medium text-tech-textMain">Teléfono</label>
                  <input
                    id="registration-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 XXXX XXXX"
                    className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Preferencias académicas"
            description="Indica la carrera y el recorrido académico que te interesa."
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="registration-career" className="block text-sm font-medium text-tech-textMain">Carrera de interés</label>
                <select
                  id="registration-career"
                  name="career"
                  value={formData.career}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">-- Selecciona una carrera --</option>
                  {careers.map((career) => (
                    <option key={career.id} value={career.id}>
                      {career.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="registration-modality" className="block text-sm font-medium text-tech-textMain">Modalidad preferida</label>
                <select
                  id="registration-modality"
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">-- Selecciona modalidad --</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="en_linea">En línea</option>
                </select>
              </div>

              <div>
                <label htmlFor="registration-education" className="block text-sm font-medium text-tech-textMain">Último nivel de estudios</label>
                <select
                  id="registration-education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">-- Selecciona nivel --</option>
                  <option value="bachillerato">Bachillerato</option>
                  <option value="tecnico">Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Información adicional"
            description="Comparte contexto útil para orientar tu seguimiento inicial."
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="registration-source" className="block text-sm font-medium text-tech-textMain">¿Cómo te enteraste de nosotros?</label>
                <select
                  id="registration-source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">-- Selecciona opción --</option>
                  <option value="redes_sociales">Redes sociales</option>
                  <option value="amigos">Recomendación de amigos</option>
                  <option value="web">Página web</option>
                  <option value="evento">Evento o charla</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="registration-comments" className="block text-sm font-medium text-tech-textMain">Comentarios o dudas</label>
                <textarea
                  id="registration-comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Cuéntanos si tienes alguna pregunta o comentario..."
                  rows={4}
                  className="mt-1 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </SectionCard>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-full bg-tech-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-tech-mid disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar solicitud"}
            </button>
            <Link
              to={paths.aspirante.root}
              className="rounded-full border border-tech-border px-4 py-3 text-sm font-semibold text-tech-textSecond transition hover:bg-blue-50"
            >
              Cancelar
            </Link>
          </div>
        </form>

        <aside className="space-y-4">
          <SectionCard title="Resumen del proceso" description="Tu siguiente paso se ve aquí de forma compacta." className="sticky top-4">
            <div className="space-y-4">
              <div className="rounded-2xl border border-tech-border bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-tech-primary text-sm font-bold text-white">
                    <ClipboardList className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-tech-textMain">Registro</p>
                    <p className="text-xs text-tech-textSecond">Completa este formulario</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-tech-border bg-surface-card p-4 opacity-75">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-tech-border text-sm font-bold text-tech-textSecond">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-tech-textMain">Contacto inicial</p>
                    <p className="text-xs text-tech-textSecond">Nos comunicaremos contigo</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-tech-border bg-surface-card p-4 opacity-75">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-tech-border text-sm font-bold text-tech-textSecond">
                    <FileCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-tech-textMain">Documentación</p>
                    <p className="text-xs text-tech-textSecond">Carga archivos requeridos</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-tech-border bg-surface-card p-4 opacity-75">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-tech-border text-sm font-bold text-tech-textSecond">
                    4
                  </span>
                  <div>
                    <p className="font-medium text-tech-textMain">Resultado</p>
                    <p className="text-xs text-tech-textSecond">Conoce tu estatus</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-tech-border pt-4">
                <div className="flex items-center gap-2 text-xs text-tech-textSecond">
                  <Clock className="h-4 w-4" />
                  <span><span className="font-medium">Tiempo estimado:</span> 5 minutos</span>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="¿Necesitas ayuda?">
            <div className="space-y-3 text-sm text-tech-textSecond">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-tech-primary" />
                <div>
                  <p className="font-medium text-tech-textMain">Email:</p>
                  <p>admisiones@campus360.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-tech-primary" />
                <div>
                  <p className="font-medium text-tech-textMain">Teléfono:</p>
                  <p>+56 9 XXXX XXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-tech-primary" />
                <div>
                  <p className="font-medium text-tech-textMain">Chat:</p>
                  <p>Disponible 24/7</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-success-title"
            className="w-full max-w-md rounded-3xl border border-tech-border bg-white p-8 shadow-2xl"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-tech-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 id="registration-success-title" className="text-xl font-semibold text-tech-textMain">
              {registrationResult === "resumed" ? "Solicitud recuperada" : "¡Registro completado!"}
            </h3>
            <p className="mt-2 text-tech-textSecond">
              {registrationResult === "resumed"
                ? "Tu solicitud ya estaba registrada. Puedes continuar con el mismo proceso de admisión."
                : "Tu solicitud ha sido recibida exitosamente. Tu proceso de admisión ha iniciado."}
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-tech-border bg-surface-card p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Folio de admisión</p>
                <p className="mt-1 font-mono text-lg font-semibold text-tech-primary">{folio}</p>
              </div>
              <p className="border-t border-tech-border pt-3 text-xs text-tech-textSecond">
                Guarda este folio para futuras consultas. Lo necesitarás para dar seguimiento a tu proceso.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate(paths.aspirante.procesoAdmision);
                }}
                className="w-full rounded-full bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-tech-mid"
              >
                Ver mi proceso de admisión
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate(paths.aspirante.root);
                }}
                className="w-full rounded-full border border-tech-border px-4 py-2.5 text-sm font-semibold text-tech-textSecond transition hover:bg-blue-50"
              >
                Seguir explorando
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-tech-textSecond">
              Guarda tu folio para consultar y dar seguimiento a tu proceso.
            </p>
          </div>
        </div>
      )}
    </PageShell>
  );
}
