import { AlertCircle, Target, Users, BookOpen, CheckCircle } from "lucide-react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { currentStudent, trajectoryMilestones } from "../../data/estudiante.mock";

export function TrayectoriaPage() {
  const strengths = [
    { title: "Participación activa", value: "78%", icon: Target, color: "text-tech-primary" },
    { title: "Liderazgo", value: "Alto", icon: Users, color: "text-tech-mid" },
    { title: "Cumplimiento documental", value: "85%", icon: CheckCircle, color: "text-tech-accent" },
    { title: "Actividad académica", value: "Regular", icon: BookOpen, color: "text-tech-textMain" }
  ];

  const recommendations = [
    {
      title: "Participar en tutoría",
      description: "Asegura tu apoyo académico en temas complejos",
      priority: "media"
    },
    {
      title: "Revisar convocatoria de becas",
      description: "Cierra el 31 de mayo. Podrías ser beneficiario",
      priority: "alta"
    },
    {
      title: "Completar documentos faltantes",
      description: "Te falta 1 documento para completar tu expediente",
      priority: "alta"
    },
    {
      title: "Inscribirse a taller de productividad",
      description: "Aprende técnicas para mejorar tu gestión del tiempo",
      priority: "media"
    }
  ];

  const monthlyParticipation = [
    { month: "Ene", value: 60 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 72 },
    { month: "Abr", value: 75 },
    { month: "May", value: 78 }
  ];

  return (
    <PageShell
      eyebrow="Académico"
      title="Mi trayectoria"
      description="Visualiza tu progreso académico y participación institucional."
    >
      <SectionCard title="Tu perfil académico" description="Datos generales y estado de tu trayectoria dentro del campus.">
        <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Nombre", currentStudent.name],
              ["Carrera", currentStudent.career],
              ["Semestre actual", currentStudent.semester],
              ["Matrícula", currentStudent.enrollment]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-tech-border bg-surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">{label}</p>
                <p className="mt-2 text-sm font-semibold text-tech-textMain">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-tech-border bg-white p-4">
            <div className="space-y-3">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Tutor asignado</p>
                <p className="mt-2 font-semibold text-tech-textMain">{currentStudent.tutor}</p>
              </div>
              <div className="rounded-2xl bg-surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Estado general</p>
                <p className="mt-2 flex items-center gap-2 font-semibold text-tech-textMain">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-tech-primary"></span>
                  {currentStudent.status}
                </p>
              </div>
              <div className="rounded-2xl bg-surface-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-textSecond">Nivel de acompañamiento</p>
                <p className="mt-2 font-semibold text-tech-textMain">{currentStudent.accompanimentLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Métricas principales */}
      <section className="grid gap-4 md:grid-cols-4">
        {strengths.map((strength, index) => {
          const IconComponent = strength.icon;
          return (
            <SectionCard key={index} className="text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <IconComponent className={`h-6 w-6 ${strength.color}`} />
              </div>
              <p className="text-sm text-tech-textSecond">{strength.title}</p>
              <p className={`mt-2 text-2xl font-bold ${strength.color}`}>{strength.value}</p>
            </SectionCard>
          );
        })}
      </section>

      <SectionCard title="Historial de progreso" description="Evolución de tus hitos académicos y de participación.">
        <div className="space-y-4">
          {trajectoryMilestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-tech-primary">
                  {index + 1}
                </div>
                {index < trajectoryMilestones.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-tech-border"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-tech-textMain">{milestone.title}</h4>
                  <StatusBadge status={milestone.status} />
                </div>
                <p className="text-sm text-tech-textSecond">{milestone.note}</p>
                <p className="mt-1 text-xs text-tech-textSecond">{milestone.period}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Participación por mes" description="Evolución reciente de tu actividad académica.">
        <div className="flex h-40 items-end justify-between gap-2">
          {monthlyParticipation.map((data) => (
            <div key={data.month} className="flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t-lg bg-tech-primary transition hover:bg-tech-mid"
                style={{ height: `${(data.value / 100) * 120}px` }}
              ></div>
              <p className="mt-2 text-xs font-semibold text-tech-textSecond">{data.month}</p>
              <p className="text-xs text-tech-textSecond">{data.value}%</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Recomendaciones personalizadas" description="Sugerencias para fortalecer tu trayectoria.">
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-4 ${
                rec.priority === "alta"
                  ? "border-rose-200 bg-rose-50"
                  : "border-tech-border bg-surface-card"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {rec.priority === "alta" ? (
                    <AlertCircle className="h-5 w-5 text-rose-700" />
                  ) : (
                    <Target className="h-5 w-5 text-tech-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-tech-textMain">{rec.title}</p>
                  <p className="mt-1 text-sm text-tech-textSecond">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
