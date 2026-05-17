import { MapPin, Search, Clock3 } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { StatusBadge } from "../../components/common/StatusBadge";
import { teachers } from "../../data/teachers";

export function ProfesoresPage() {
  const [query, setQuery] = useState("");

  const filteredTeachers = useMemo(() => {
    const term = query.toLowerCase();
    return teachers.filter((teacher) =>
      !term ||
      teacher.name.toLowerCase().includes(term) ||
      teacher.subject.toLowerCase().includes(term) ||
      teacher.office.toLowerCase().includes(term) ||
      teacher.availability.toLowerCase().includes(term)
    );
  }, [query]);

  return (
    <PageShell
      title="Profesores"
      description="Directorio de docentes, materias y ventanas de atención con vista institucional."
      eyebrow="Apoyo académico"
    >
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-tech-border bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Búsqueda</p>
          <p className="mt-1 text-sm text-tech-textSecond">Filtra por nombre, materia, oficina o disponibilidad.</p>
        </div>
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar docente..." className="w-full rounded-2xl border border-tech-border bg-tech-bg py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {filteredTeachers.map((teacher) => (
          <article key={teacher.id} className="rounded-3xl border border-tech-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-tech-textMain">{teacher.name}</h3>
                <p className="mt-1 text-sm text-tech-textSecond">{teacher.subject}</p>
              </div>
              <StatusBadge status={teacher.status} />
            </div>

            <div className="mt-4 grid gap-3 text-sm text-tech-textSecond sm:grid-cols-2">
              <p className="inline-flex items-center gap-2 rounded-2xl bg-tech-bg px-3 py-2"><MapPin className="h-4 w-4 text-tech-primary" /> {teacher.office}</p>
              <p className="inline-flex items-center gap-2 rounded-2xl bg-tech-bg px-3 py-2"><Clock3 className="h-4 w-4 text-tech-primary" /> {teacher.availability}</p>
              <p className="inline-flex items-center gap-2 rounded-2xl bg-tech-bg px-3 py-2">Estado · {teacher.status}</p>
              <p className="inline-flex items-center gap-2 rounded-2xl bg-tech-bg px-3 py-2">Atención presencial</p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

