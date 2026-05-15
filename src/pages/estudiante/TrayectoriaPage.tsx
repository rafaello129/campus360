import { AlertCircle, Target } from "lucide-react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { currentStudent, trajectoryMilestones } from "../../data/estudiante.mock";

export function TrayectoriaPage() {
  const strengths = [
    { title: "Participación activa", value: "78%", icon: "🎯", color: "text-green-700" },
    { title: "Liderazgo", value: "Alto", icon: "👥", color: "text-blue-700" },
    { title: "Cumplimiento documental", value: "85%", icon: "✅", color: "text-teal-700" },
    { title: "Actividad académica", value: "Regular", icon: "📚", color: "text-amber-700" }
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
      {/* Perfil */}
      <SectionCard title="Tu perfil académico">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-600">Nombre</p>
              <p className="mt-1 text-lg font-bold text-slate-900">{currentStudent.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Carrera</p>
              <p className="mt-1 font-semibold text-slate-900">{currentStudent.career}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Semestre actual</p>
              <p className="mt-1 font-semibold text-slate-900">{currentStudent.semester}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Matrícula</p>
              <p className="mt-1 font-mono font-bold text-petrol-700">{currentStudent.enrollment}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-600">Tutor asignado</p>
              <p className="mt-1 font-semibold text-slate-900">{currentStudent.tutor}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Estado general</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                {currentStudent.status}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-600">Nivel de acompañamiento</p>
              <p className="mt-1 font-semibold text-slate-900">{currentStudent.accompanimentLevel}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Métricas principales */}
      <section className="grid gap-4 md:grid-cols-4">
        {strengths.map((strength, index) => (
          <SectionCard key={index} className="text-center">
            <div className="text-4xl mb-2">{strength.icon}</div>
            <p className="text-sm text-slate-600">{strength.title}</p>
            <p className={`mt-2 text-2xl font-bold ${strength.color}`}>{strength.value}</p>
          </SectionCard>
        ))}
      </section>

      {/* Timeline de hitos */}
      <SectionCard title="Historial de progreso">
        <div className="space-y-4">
          {trajectoryMilestones.map((milestone, index) => (
            <div key={milestone.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol-100 text-petrol-700 font-bold text-sm">
                  {index + 1}
                </div>
                {index < trajectoryMilestones.length - 1 && (
                  <div className="mt-2 h-8 w-0.5 bg-slate-200"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                  <StatusBadge status={milestone.status} />
                </div>
                <p className="text-sm text-slate-600">{milestone.note}</p>
                <p className="text-xs text-slate-500 mt-1">{milestone.period}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Gráfica de participación */}
      <SectionCard title="Participación por mes">
        <div className="flex items-end justify-between gap-2 h-40">
          {monthlyParticipation.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-petrol-600 rounded-t-lg transition hover:bg-petrol-700"
                style={{ height: `${(data.value / 100) * 120}px` }}
              ></div>
              <p className="text-xs font-semibold text-slate-600 mt-2">{data.month}</p>
              <p className="text-xs text-slate-500">{data.value}%</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Recomendaciones */}
      <SectionCard title="Recomendaciones personalizadas">
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 border-l-4 ${
                rec.priority === "alta"
                  ? "border-l-rose-500 bg-rose-50"
                  : "border-l-amber-500 bg-amber-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {rec.priority === "alta" ? (
                    <AlertCircle className="h-5 w-5 text-rose-700" />
                  ) : (
                    <Target className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{rec.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
