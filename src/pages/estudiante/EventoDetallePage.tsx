import { ArrowLeft, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { campusEvents } from "../../data/estudiante.mock";
import { paths } from "../../router/paths";

export function EventoDetallePage() {
  const { eventId } = useParams();
  const event = campusEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <PageShell
        eyebrow="Eventos"
        title="Evento no encontrado"
        description="La convocatoria solicitada no está disponible en el escenario actual."
      >
        <EmptyState
          title="Evento no encontrado"
          description="Revisa las convocatorias disponibles y selecciona una nuevamente."
          action={
            <Link
              to={paths.estudiante.eventos}
              className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a eventos
            </Link>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Detalle de convocatoria"
      title={event.title}
      description={event.description ?? event.summary}
      actions={
        <>
          <StatusBadge status={event.status} />
          <Link
            to={paths.estudiante.eventos}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
          >
            Volver a eventos
          </Link>
        </>
      }
    >
      <SectionCard title="Información de la convocatoria">
        <dl className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          {[
            ["Fecha", event.date],
            ["Horario", event.time],
            ["Ubicación", event.location],
            ["Categoría", event.category],
            ["Organiza", event.organizer ?? "Institución"],
            ["Disponibilidad", `${event.registered ?? 0}/${event.capacity ?? 0} inscritos`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-slate-50 p-3">
              <dt className="font-medium text-slate-900">{label}</dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
      </SectionCard>

      {event.requirements?.length ? (
        <SectionCard title="Requisitos" description="Condiciones para participar en esta actividad.">
          <ul className="space-y-2 text-sm text-tech-textSecond">
            {event.requirements.map((requirement) => (
              <li key={requirement} className="rounded-lg border border-tech-border bg-white p-3">
                {requirement}
              </li>
            ))}
          </ul>
        </SectionCard>
      ) : null}

      {event.mapLocationId ? (
        <SectionCard title="Ubicación" description="Consulta el espacio dentro del mapa del campus.">
          <Link
            to={`${paths.estudiante.mapa}?location=${encodeURIComponent(event.mapLocationId)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-tech-mid"
          >
            <MapPin className="h-4 w-4" />
            Ver en mapa
          </Link>
        </SectionCard>
      ) : null}
    </PageShell>
  );
}
