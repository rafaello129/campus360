import { Mail, MapPin } from "lucide-react";
import { PageShell } from "../../components/common/PageShell";
import { StatusBadge } from "../../components/common/StatusBadge";
import { teachers } from "../../data/teachers";

export function ProfesoresPage() {
  return (
    <PageShell
      title="Profesores"
      description="Directorio base de docentes, materias y ventanas de atención."
      eyebrow="Apoyo académico"
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {teachers.map((teacher) => (
          <article key={teacher.id} className="surface-card p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900">{teacher.name}</h3>
              <StatusBadge status={teacher.status} />
            </div>

            <p className="text-sm text-slate-600">{teacher.subject}</p>

            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-petrol-700" />
                {teacher.office}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-petrol-700" />
                {teacher.availability}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

