import { Clock, FileText, Trophy, Users, Calendar, Bell, MapPin, MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "../../components/common/MetricCard";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import {
  agendaItems,
  campusEvents,
  estudianteMetrics,
  notices,
  currentStudent,
  studentDocuments
} from "../../data/estudiante.mock";
import { paths } from "../../router/paths";

export function EstudianteOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Saludo personalizado */}
      <section className="rounded-2xl bg-gradient-to-r from-petrol-700 to-teal-600 px-6 py-8 text-white md:px-10 md:py-10">
        <p className="text-sm opacity-90">Bienvenida,</p>
        <h1 className="mt-1 text-3xl font-bold md:text-4xl">{currentStudent.name}</h1>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          <div>
            <p className="text-xs opacity-75">Carrera</p>
            <p className="mt-1 font-semibold">{currentStudent.career}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Semestre</p>
            <p className="mt-1 font-semibold">{currentStudent.semester}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Matrícula</p>
            <p className="mt-1 font-semibold">{currentStudent.enrollment}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Asesor</p>
            <p className="mt-1 font-semibold">{currentStudent.tutor}</p>
          </div>
        </div>
      </section>

      {/* Métricas */}
      <section className="grid gap-4 md:grid-cols-3">
        {estudianteMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      {/* Convocatoria destacada */}
      <section className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 md:p-8">
        <div className="flex items-start gap-4">
          <Trophy className="h-8 w-8 flex-shrink-0 text-amber-700" />
          <div>
            <h2 className="font-bold text-amber-900">Convocatoria: Becas 2026-B</h2>
            <p className="mt-2 text-sm text-amber-800">
              Abre inscripción para nuevas becas académicas y deportivas. Cierre: 31 de mayo. ¡No te la pierdas!
            </p>
            <div className="mt-3 flex gap-3">
              <Link
                to={paths.estudiante.eventos}
                className="inline-flex font-semibold text-amber-700 hover:text-amber-800"
              >
                Ver convocatoria →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid principal */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* Próximas actividades */}
        <SectionCard
          title="Próximas actividades"
          description="Esta semana en tu agenda."
          action={
            <Link to={paths.estudiante.agenda} className="text-sm font-semibold text-petrol-700">
              Ver agenda →
            </Link>
          }
        >
          <div className="space-y-3">
            {agendaItems.slice(0, 4).map((item) => (
              <div key={item.id} className="border-l-4 border-l-petrol-500 bg-slate-50 p-4">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-slate-600">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {item.date} · {item.time}
                </p>
                <p className="text-xs text-slate-500">{item.location}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Avisos y alertas */}
        <SectionCard
          title="Avisos y alertas"
          description="Notificaciones importantes para ti."
          action={
            <Link to={paths.estudiante.avisos} className="text-sm font-semibold text-petrol-700">
              Ver todo →
            </Link>
          }
        >
          <div className="space-y-3">
            {notices.slice(0, 3).map((notice) => (
              <div
                key={notice.id}
                className={`rounded-lg p-4 border-l-4 ${
                  notice.priority === "urgente"
                    ? "border-l-rose-500 bg-rose-50"
                    : notice.priority === "alta"
                      ? "border-l-amber-500 bg-amber-50"
                      : "border-l-slate-300 bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{notice.title}</h3>
                    <p className="text-sm text-slate-600">{notice.summary}</p>
                  </div>
                  <Bell className="h-4 w-4 flex-shrink-0 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* Eventos recomendados */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Eventos recomendados</h2>
          <Link
            to={paths.estudiante.eventos}
            className="text-sm font-semibold text-petrol-700 hover:text-petrol-800"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campusEvents.slice(0, 3).map((event) => (
            <article key={event.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-petrol-600">{event.category}</span>
                <StatusBadge status={event.status} />
              </div>
              <h3 className="font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{event.summary}</p>
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <p>
                  <Calendar className="inline h-3 w-3 mr-1" />
                  {event.date} · {event.time}
                </p>
                <p>
                  <MapPin className="inline h-3 w-3 mr-1" />
                  {event.location}
                </p>
                <p className="text-slate-600">
                  {event.registered}/{event.capacity} inscritos
                </p>
              </div>
              <button className="mt-4 w-full rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100">
                Inscribirse
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Estado de acompañamiento */}
      <section className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Tu perfil académico">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Participación</span>
                <span className="font-bold text-petrol-700">{currentStudent.participationPercentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-petrol-600"
                  style={{ width: `${currentStudent.participationPercentage}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Documentación</span>
                <span className="font-bold text-green-700">{currentStudent.documentCompletion}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-green-600"
                  style={{ width: `${currentStudent.documentCompletion}%` }}
                ></div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-xs text-slate-600">Estado de acompañamiento</p>
              <p className="mt-2 flex items-center gap-2 font-semibold text-green-700">
                <Trophy className="h-4 w-4" />
                {currentStudent.accompanimentLevel}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Accesos rápidos">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Link
              to={paths.estudiante.agenda}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <Calendar className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Agenda</span>
            </Link>
            <Link
              to={paths.estudiante.documentos}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <FileText className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Documentos</span>
            </Link>
            <Link
              to={paths.estudiante.profesores}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <Users className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Profesores</span>
            </Link>
            <Link
              to={paths.estudiante.mapa}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <MapPin className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Mapa</span>
            </Link>
            <Link
              to={paths.estudiante.chat}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <MessageSquare className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Chat</span>
            </Link>
            <Link
              to={paths.estudiante.asistente}
              className="flex flex-col items-center gap-2 rounded-lg bg-slate-50 p-4 text-center transition hover:bg-slate-100"
            >
              <Zap className="h-6 w-6 text-petrol-700" />
              <span className="text-xs font-semibold text-slate-900">Asistente</span>
            </Link>
          </div>
        </SectionCard>
      </section>

      {/* Documentos pendientes */}
      {studentDocuments.some((d) => d.status === "pendiente") && (
        <section className="rounded-lg border-l-4 border-l-rose-500 bg-rose-50 p-6">
          <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 flex-shrink-0 text-rose-600" />
            <div className="flex-1">
              <h3 className="font-bold text-rose-900">Documentos pendientes</h3>
              <p className="mt-1 text-sm text-rose-800">
                Tienes {studentDocuments.filter((d) => d.status === "pendiente").length} documento
                {studentDocuments.filter((d) => d.status === "pendiente").length > 1 ? "s" : ""} por completar.
                Complétalo pronto para mantener tu expediente en orden.
              </p>
              <Link
                to={paths.estudiante.documentos}
                className="mt-3 inline-flex font-semibold text-rose-700 hover:text-rose-800"
              >
                Ver documentos →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

