import { ArrowRight, MessageSquare, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/common/MetricCard";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import {
  admissionDocuments,
  aspiranteFAQ,
  aspiranteMetrics,
  landingBenefits,
  procesosSteps
} from "../../data/aspirante.mock";
import { careers } from "../../data/careers";
import { paths } from "../../router/paths";

export function AspiranteOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-r from-petrol-700 to-teal-700 px-6 py-12 text-white md:px-10 md:py-16">
        <h1 className="max-w-3xl text-3xl font-bold md:text-4xl">
          Tu ingreso a la universidad, más claro y acompañado
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-100">
          Campus360 centraliza tu proceso de admisión, carreras, documentos, avisos y orientación en un solo lugar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={paths.aspirante.carreras}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-petrol-700 transition hover:bg-slate-100"
          >
            Explorar carreras
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={paths.aspirante.registro}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition hover:bg-white/10"
          >
            Iniciar registro
          </Link>
        </div>
      </section>

      {/* Beneficios Section */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">¿Por qué usar Campus360?</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {landingBenefits.map((benefit) => (
            <article key={benefit.title} className="surface-card p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-petrol-100 text-lg font-bold text-petrol-700">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Key Metrics */}
      <section>
        <div className="grid gap-4 md:grid-cols-3">
          {aspiranteMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">¿Cómo funciona?</h2>
        <div className="grid gap-6 md:grid-cols-5">
          {procesosSteps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-petrol-50 font-bold text-petrol-700">
                  {step.number}
                </div>
                <h3 className="font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-600">{step.description}</p>
              </div>
              {index < procesosSteps.length - 1 && (
                <div className="absolute -right-3 top-6 hidden w-6 text-center text-petrol-700 md:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Carreras Destacadas */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Carreras destacadas</h2>
          <Link
            to={paths.aspirante.carreras}
            className="text-sm font-semibold text-petrol-700 hover:text-petrol-800"
          >
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {careers.map((career) => (
            <article key={career.id} className="surface-card flex flex-col p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-petrol-700">{career.area}</span>
                <StatusBadge status={career.status} />
              </div>
              <h3 className="font-semibold text-slate-900">{career.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{career.description}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-slate-500">
                <span>{career.duration}</span>
                <span>{career.modality}</span>
              </div>
              <Link
                to={paths.aspirante.carreraDetalle(career.id)}
                className="mt-4 rounded-lg bg-petrol-50 px-3 py-2 text-center text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100"
              >
                Ver detalle
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Convocatoria Activa */}
      <section className="rounded-xl border-2 border-teal-200 bg-teal-50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <Trophy className="h-6 w-6 flex-shrink-0 text-teal-700" />
          <div className="flex-1">
            <h3 className="font-bold text-teal-900">Convocatoria 2026-A abierta</h3>
            <p className="mt-2 text-sm text-teal-800">
              Cierre de registro: 30 de junio de 2026. Inicia tu solicitud ahora y sé parte de nuestra comunidad académica.
            </p>
            <Link
              to={paths.aspirante.registro}
              className="mt-3 inline-flex font-semibold text-teal-700 hover:text-teal-800"
            >
              Registrarme ahora →
            </Link>
          </div>
        </div>
      </section>

      {/* Secciones Adicionales */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Documentación de admisión" description="Revisa qué documentos necesitas.">
          <div className="space-y-2">
            {admissionDocuments.slice(0, 2).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                  <p className="text-xs text-slate-500">Límite: {doc.dueDate}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
            <Link
              to={paths.aspirante.documentacion}
              className="mt-3 inline-flex text-sm font-semibold text-petrol-700"
            >
              Ver todos →
            </Link>
          </div>
        </SectionCard>

        <SectionCard
          title="¿Tienes dudas?"
          description="Chatea con nuestro asistente virtual."
          action={
            <Link
              to={paths.aspirante.chatbot}
              className="inline-flex gap-2 text-sm font-semibold text-petrol-700"
            >
              <MessageSquare className="h-4 w-4" />
              Abrir chat
            </Link>
          }
        >
          <div className="space-y-2">
            {aspiranteFAQ.slice(0, 2).map((faq) => (
              <p key={faq.question} className="text-sm text-slate-600">
                {faq.question}
              </p>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* CTA Final */}
      <section className="rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-10 text-center text-white md:px-10 md:py-12">
        <h2 className="text-2xl font-bold">¿Listo para empezar?</h2>
        <p className="mt-2 text-slate-300">
          Completa tu registro en pocos minutos y comienza tu camino académico.
        </p>
        <Link
          to={paths.aspirante.registro}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-petrol-700 px-6 py-3 font-semibold text-white transition hover:bg-petrol-800"
        >
          Iniciar registro ahora
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

