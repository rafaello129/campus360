import { Building2, GraduationCap, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "../router/paths";

const roleCards = [
  {
    title: "Aspirante",
    description:
      "Explora la oferta académica, registra tu solicitud y sigue tu proceso de admisión.",
    cta: "Entrar al portal de aspirantes",
    path: paths.aspirante.root,
    icon: UserRoundPlus,
    color: "from-sky-500 to-petrol-700"
  },
  {
    title: "Estudiante",
    description:
      "Gestiona agenda, avisos, eventos, trámites y herramientas de acompañamiento académico.",
    cta: "Entrar al portal del alumno",
    path: paths.estudiante.root,
    icon: GraduationCap,
    color: "from-teal-500 to-petrol-700"
  },
  {
    title: "Administrativo",
    description:
      "Monitorea captación, permanencia, alertas institucionales y analítica para decisiones.",
    cta: "Entrar al panel institucional",
    path: paths.admin.root,
    icon: Building2,
    color: "from-indigo-500 to-petrol-700"
  }
];

export function RoleSelectorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-petrol-700">
            Campus360
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            Plataforma integral para experiencia y trayectoria estudiantil
          </h1>
          <p className="mt-4 max-w-4xl text-slate-600">
            Prototipo navegable para hackathon: centraliza captación, comunicación,
            permanencia, trámites y analítica institucional en una sola experiencia SaaS.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          {roleCards.map((role) => {
            const Icon = role.icon;
            return (
              <article
                key={role.title}
                className="surface-card overflow-hidden transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`h-24 bg-gradient-to-r ${role.color}`} />
                <div className="space-y-4 p-6">
                  <div className="inline-flex rounded-xl bg-slate-100 p-2 text-slate-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">{role.title}</h2>
                  <p className="text-sm text-slate-600">{role.description}</p>
                  <Link
                    to={role.path}
                    className="inline-flex rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800"
                  >
                    {role.cta}
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

