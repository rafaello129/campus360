import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { careers } from "../../data/careers";
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

export function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    career: "",
    modality: "",
    education: "",
    source: "",
    comments: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [folio, setFolio] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular generación de folio
    const newFolio = `ASP-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;
    
    setFolio(newFolio);
    setShowModal(true);
    
    // Limpiar formulario
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        career: "",
        modality: "",
        education: "",
        source: "",
        comments: ""
      });
    }, 500);
  };

  return (
    <PageShell
      eyebrow="Admisión"
      title="Registra tu solicitud de admisión"
      description="Completa el formulario para iniciar tu proceso de admisión. Tus datos están seguros y protegidos."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <SectionCard title="Datos personales">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">Nombre completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Juan Carlos Pérez García"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-900">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+56 9 XXXX XXXX"
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Preferencias académicas">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">Carrera de interés</label>
                <select
                  name="career"
                  value={formData.career}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
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
                <label className="block text-sm font-medium text-slate-900">Modalidad preferida</label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                >
                  <option value="">-- Selecciona modalidad --</option>
                  <option value="presencial">Presencial</option>
                  <option value="hibrido">Híbrido</option>
                  <option value="en_linea">En línea</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900">Último nivel de estudios</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                >
                  <option value="">-- Selecciona nivel --</option>
                  <option value="bachillerato">Bachillerato</option>
                  <option value="tecnico">Técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Información adicional">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900">¿Cómo te enteraste de nosotros?</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
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
                <label className="block text-sm font-medium text-slate-900">Comentarios o dudas</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Cuéntanos si tienes alguna pregunta o comentario..."
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-petrol-500 focus:ring-2 focus:ring-petrol-50"
                />
              </div>
            </div>
          </SectionCard>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-petrol-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-petrol-800"
            >
              Enviar solicitud
            </button>
            <Link
              to={paths.aspirante.root}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </Link>
          </div>
        </form>

        {/* Barra lateral con resumen del proceso */}
        <aside className="space-y-4">
          <SectionCard title="Resumen del proceso" className="sticky top-4">
            <div className="space-y-4">
              <div className="rounded-lg bg-petrol-50 p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-petrol-700 text-sm font-bold text-white">
                    1
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Registro</p>
                    <p className="text-xs text-slate-600">Completa este formulario</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-sm font-bold text-slate-400">
                    2
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Contacto inicial</p>
                    <p className="text-xs text-slate-600">Nos comunicaremos contigo</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-sm font-bold text-slate-400">
                    3
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Documentación</p>
                    <p className="text-xs text-slate-600">Carga archivos requeridos</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 opacity-60">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 text-sm font-bold text-slate-400">
                    4
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">Resultado</p>
                    <p className="text-xs text-slate-600">Conoce tu estatus</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-600">
                  ⏱️ <span className="font-medium">Tiempo estimado:</span> 5 minutos
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="¿Necesitas ayuda?">
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                📧 <span className="font-medium">Email:</span>
                <br />
                admisiones@campus360.edu
              </p>
              <p>
                📞 <span className="font-medium">Teléfono:</span>
                <br />
                +56 9 XXXX XXXX
              </p>
              <p>
                💬 <span className="font-medium">Chat:</span>
                <br />
                Disponible 24/7
              </p>
            </div>
          </SectionCard>
        </aside>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4 z-50">
          <div className="rounded-xl bg-white p-8 max-w-md w-full shadow-lg">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Registro completado!</h3>
            <p className="mt-2 text-slate-600">
              Tu solicitud ha sido recibida exitosamente. Tu proceso de admisión ha iniciado.
            </p>

            <div className="mt-6 space-y-3 rounded-lg bg-slate-50 p-4">
              <div>
                <p className="text-xs uppercase font-semibold text-slate-600">Folio de admisión</p>
                <p className="mt-1 text-lg font-bold font-mono text-petrol-700">{folio}</p>
              </div>
              <p className="text-xs text-slate-600 border-t border-slate-200 pt-3">
                Guarda este folio para futuras consultas. Lo necesitarás para dar seguimiento a tu proceso.
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate(paths.aspirante.procesoAdmision);
                }}
                className="w-full rounded-lg bg-petrol-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-petrol-800"
              >
                Ver mi proceso de admisión
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Volver al inicio
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-500 text-center">
              📧 Te hemos enviado un correo de confirmación con instrucciones.
            </p>
          </div>
        </div>
      )}
    </PageShell>
  );
}
