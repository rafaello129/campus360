import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { events } from "../../data/events";
import { paths } from "../../router/paths";

export function EventoDetallePage() {
  const { eventId } = useParams();
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <EmptyState
        title="Evento no encontrado"
        description="El evento solicitado no está disponible en los datos mock actuales."
      />
    );
  }

  return (
    <PageShell
      eyebrow="Detalle del evento"
        title={event.title}
        description={event.description}
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

      <SectionCard title="Detalle de convocatoria">
        <dl className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="font-medium text-slate-900">Fecha</dt>
            <dd>{event.date}</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="font-medium text-slate-900">Horario</dt>
            <dd>{event.time}</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="font-medium text-slate-900">Ubicación</dt>
            <dd>{event.location}</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="font-medium text-slate-900">Categoría</dt>
            <dd>{event.category}</dd>
          </div>
        </dl>
      </SectionCard>
    </PageShell>
  );
}

