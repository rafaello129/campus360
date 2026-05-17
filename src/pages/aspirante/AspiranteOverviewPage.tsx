import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  FileCheck,
  FileText,
  Landmark,
  MessageSquare,
  Route,
  Sparkles,
  Trophy,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/common/MetricCard";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import {
  admissionDocuments,
  aspiranteFAQ,
  aspiranteMetrics,
  procesosSteps
} from "../../data/aspirante.mock";
import { careers } from "../../data/careers";
import { paths } from "../../router/paths";

export function AspiranteOverviewPage() {
  const quickFacts = [
    { icon: Clock, label: "Respuesta media", value: "48 h" },
    { icon: FileText, label: "Documentos guía", value: "5" },
    { icon: Users, label: "Carreras activas", value: "18" }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      label: "Seguimiento",
      title: "Admisión en tiempo real",
      description: "Consulta avances y pendientes sin salir del portal."
    },
    {
      icon: BookOpen,
      label: "Oferta académica",
      title: "Carreras y perfiles",
      description: "Explora modalidades, duración y campos de formación."
    },
    {
      icon: FileCheck,
      label: "Control documental",
      title: "Expediente ordenado",
      description: "Revisa documentos con una ruta clara de entrega."
    },
    {
      icon: MessageSquare,
      label: "Acompañamiento",
      title: "Orientación continua",
      description: "Canales de ayuda y asistente virtual disponibles."
    }
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
        <div className="grid min-w-0 gap-0 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative min-h-[30rem] min-w-0 overflow-hidden bg-tech-primary px-6 py-8 text-white md:min-h-[33rem] md:px-8 lg:px-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.18]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
                backgroundSize: "64px 64px"
              }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  <Landmark className="h-3.5 w-3.5" />
                  Portal para aspirantes
                </div>
                <h1 className="max-w-[20rem] text-3xl font-bold leading-tight tracking-tight sm:max-w-3xl sm:text-4xl md:text-5xl">
                  Tu ingreso a la universidad en una ruta institucional clara.
                </h1>
                <p className="mt-5 max-w-[20rem] text-sm leading-7 text-blue-100 sm:max-w-2xl md:text-base">
                  Centraliza tu admisión, revisa carreras, controla documentos y sigue tu avance con una experiencia ordenada para tomar mejores decisiones.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={paths.aspirante.registro}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-tech-primary transition hover:bg-blue-50 sm:w-auto"
                  >
                    Iniciar registro
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={paths.aspirante.carreras}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                  >
                    Explorar carreras
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-3">
                {quickFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="border-l border-white/25 pl-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                        <Icon className="h-4 w-4" />
                        {fact.label}
                      </div>
                      <p className="mt-2 text-2xl font-bold text-white">{fact.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-w-0 bg-white p-5 md:p-6 lg:p-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Ruta de admisión</p>
                <h2 className="mt-1 max-w-[19rem] text-xl font-bold text-tech-textMain sm:max-w-none">Sigue cada etapa sin perder contexto</h2>
              </div>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-tech-primary">
                Ciclo 2026-A
              </span>
            </div>
            <div className="space-y-3">
              {procesosSteps.slice(0, 5).map((step, index) => (
                <div key={step.number} className="relative flex gap-3 border-l border-tech-divider pb-4 pl-5 last:pb-0">
                  <div className="absolute -left-[0.56rem] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-tech-primary" />
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-tech-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-tech-textMain">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-tech-textSecond">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {aspiranteMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-lg border border-tech-border bg-white p-5 shadow-sm md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-primary">Ventajas clave</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-tech-textMain">Una experiencia de admisión con menos pasos sueltos.</h2>
          <p className="mt-3 text-sm leading-6 text-tech-textSecond">
            El portal concentra oferta, documentos, orientación y seguimiento para que el proceso sea más visible desde el primer contacto.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="border-t border-tech-divider pt-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-tech-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{benefit.label}</span>
                  </div>
                  <h3 className="font-semibold text-tech-textMain">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-tech-textSecond">{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-tech-border bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-primary">Proceso guiado</p>
              <h2 className="mt-1 text-xl font-bold text-tech-textMain">Mapa rápido de avance</h2>
            </div>
            <Route className="h-5 w-5 text-tech-primary" />
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {procesosSteps.map((step, index) => (
              <div key={step.number} className="relative border-l border-tech-primary/30 bg-tech-bg/50 p-4">
                <p className="text-xs font-bold text-tech-primary">0{index + 1}</p>
                <h3 className="mt-2 text-sm font-semibold leading-5 text-tech-textMain">{step.title}</h3>
                {index < procesosSteps.length - 1 ? (
                  <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-tech-primary/40 sm:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-primary">Oferta académica</p>
            <h2 className="mt-1 text-2xl font-bold text-tech-textMain">Carreras destacadas</h2>
          </div>
          <Link to={paths.aspirante.carreras} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary transition hover:text-tech-mid">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {careers.slice(0, 4).map((career) => (
            <article key={career.id} className="group overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-tech-primary/30 hover:shadow-md">
              <div className="h-1 bg-tech-primary" />
              <div className="flex min-h-full flex-col p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">{career.area}</span>
                  <StatusBadge status={career.status} />
                </div>
                <h3 className="text-lg font-bold leading-6 text-tech-textMain">{career.name}</h3>
                <p className="mt-2 text-sm leading-6 text-tech-textSecond">{career.description}</p>
                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-tech-divider pt-4 text-xs">
                  <div>
                    <p className="font-semibold text-tech-textMain">{career.duration}</p>
                    <p className="text-tech-textSecond">Duración</p>
                  </div>
                  <div>
                    <p className="font-semibold text-tech-textMain">{career.modality}</p>
                    <p className="text-tech-textSecond">Modalidad</p>
                  </div>
                </div>
                <Link
                  to={paths.aspirante.carreraDetalle(career.id)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-tech-border bg-blue-50 px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-blue-100"
                >
                  Ver detalle
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-tech-primary/20 bg-tech-primary p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                <Trophy className="h-3.5 w-3.5" />
                Convocatoria activa
              </div>
              <h2 className="text-2xl font-bold">Convocatoria 2026-A abierta</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Cierre de registro: 30 de junio de 2026. Inicia tu solicitud y prepara tu expediente con anticipación.
              </p>
            </div>
            <Link
              to={paths.aspirante.registro}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-tech-primary transition hover:bg-blue-50"
            >
              Registrarme
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <SectionCard
          title="¿Tienes dudas?"
          description="Consulta preguntas frecuentes o abre el asistente virtual."
          action={
            <Link to={paths.aspirante.chatbot} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary transition hover:text-tech-mid">
              <MessageSquare className="h-4 w-4" />
              Abrir chat
            </Link>
          }
        >
          <div className="space-y-3">
            {aspiranteFAQ.slice(0, 2).map((faq) => (
              <p key={faq.question} className="border-t border-tech-divider pt-3 text-sm leading-6 text-tech-textSecond first:border-t-0 first:pt-0">
                {faq.question}
              </p>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Documentación de admisión" description="Revisa qué documentos necesitas y qué estado tiene cada entrega.">
          <div className="space-y-3">
            {admissionDocuments.slice(0, 3).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-3 border-t border-tech-divider pt-3 first:border-t-0 first:pt-0">
                <div>
                  <p className="text-sm font-semibold text-tech-textMain">{doc.name}</p>
                  <p className="text-xs text-tech-textSecond">Límite: {doc.dueDate}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
            <Link to={paths.aspirante.documentacion} className="inline-flex items-center gap-2 text-sm font-semibold text-tech-primary transition hover:text-tech-mid">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionCard>

        <section className="rounded-lg border border-tech-border bg-white p-6 text-center shadow-sm md:p-8">
          <Sparkles className="mx-auto h-6 w-6 text-tech-primary" />
          <h2 className="mt-3 text-2xl font-bold text-tech-textMain">¿Listo para empezar?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-tech-textSecond">
            Completa tu registro en pocos minutos y comienza tu camino académico con una ruta clara.
          </p>
          <Link
            to={paths.aspirante.registro}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-tech-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-tech-mid"
          >
            Iniciar registro ahora
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </section>
    </div>
  );
}
