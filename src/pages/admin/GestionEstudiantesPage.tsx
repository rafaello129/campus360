import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable, type DataTableColumn } from "../../components/common/DataTable";
import { EmptyState } from "../../components/common/EmptyState";
import { MetricCard } from "../../components/common/MetricCard";
import { PageShell } from "../../components/common/PageShell";
import { SearchInput } from "../../components/common/SearchInput";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import { adminStudentFilters, adminStudents, type AdminStudentRecord, type ParticipationBand, type StudentRisk } from "../../data/adminStudents";
import { paths } from "../../router/paths";
import type { Metric } from "../../types";

const metrics: Metric[] = [
  {
    label: "Total de estudiantes",
    value: String(adminStudents.length),
    trend: "Base activa del semestre",
    trendDirection: "neutral"
  },
  {
    label: "Estudiantes activos",
    value: String(adminStudents.filter((student) => student.state === "activo").length),
    trend: "Seguimiento estable",
    trendDirection: "up"
  },
  {
    label: "Estudiantes con alerta",
    value: String(adminStudents.filter((student) => student.alerts > 0).length),
    trend: "Casos priorizados",
    trendDirection: "down"
  },
  {
    label: "Tutorías pendientes",
    value: String(adminStudents.reduce((total, student) => total + student.pendingTutoring, 0)),
    trend: "Requieren agenda",
    trendDirection: "neutral"
  },
  {
    label: "Documentos incompletos",
    value: String(adminStudents.reduce((total, student) => total + student.documentsIncomplete, 0)),
    trend: "Expedientes abiertos",
    trendDirection: "neutral"
  },
  {
    label: "Participación promedio",
    value: `${Math.round(adminStudents.reduce((total, student) => total + student.participation, 0) / adminStudents.length)}%`,
    trend: "Promedio institucional",
    trendDirection: "up"
  }
];

function riskClass(risk: StudentRisk) {
  if (risk === "alto") return "bg-rose-100 text-rose-800 border-rose-200";
  if (risk === "medio") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-emerald-100 text-emerald-800 border-emerald-200";
}

function participationClass(value: number) {
  if (value >= 80) return "text-emerald-700";
  if (value >= 65) return "text-amber-700";
  return "text-rose-700";
}

export function GestionEstudiantesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [careerFilter, setCareerFilter] = useState("Todas");
  const [semesterFilter, setSemesterFilter] = useState("Todos");
  const [stateFilter, setStateFilter] = useState("Todos");
  const [riskFilter, setRiskFilter] = useState<StudentRisk | "Todos">("Todos");
  const [participationFilter, setParticipationFilter] = useState<ParticipationBand | "Todas">("Todas");
  const [selectedStudent, setSelectedStudent] = useState<AdminStudentRecord | null>(null);
  const [summaryMessage, setSummaryMessage] = useState<string | null>(null);

  const filteredStudents = useMemo(() => {
    return adminStudents.filter((student) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.enrollment.toLowerCase().includes(query) ||
        student.career.toLowerCase().includes(query) ||
        student.tutor.toLowerCase().includes(query);
      const matchesCareer = careerFilter === "Todas" || student.career === careerFilter;
      const matchesSemester = semesterFilter === "Todos" || student.semester === semesterFilter;
      const matchesState = stateFilter === "Todos" || student.state === stateFilter;
      const matchesRisk = riskFilter === "Todos" || student.risk === riskFilter;
      const matchesParticipation = participationFilter === "Todas" || student.participationBand === participationFilter;

      return matchesSearch && matchesCareer && matchesSemester && matchesState && matchesRisk && matchesParticipation;
    });
  }, [careerFilter, participationFilter, riskFilter, searchTerm, semesterFilter, stateFilter]);

  const columns: DataTableColumn<AdminStudentRecord>[] = [
    {
      id: "student",
      header: "Estudiante",
      render: (student) => <UserAvatar name={student.name} subtitle={student.enrollment} />
    },
    {
      id: "career",
      header: "Carrera",
      render: (student) => <span className="text-slate-700">{student.career}</span>
    },
    {
      id: "semester",
      header: "Semestre",
      render: (student) => <span className="text-slate-700">{student.semester}</span>
    },
    {
      id: "tutor",
      header: "Tutor",
      render: (student) => <span className="text-slate-700">{student.tutor}</span>
    },
    {
      id: "participation",
      header: "Participación",
      render: (student) => <span className={`font-semibold ${participationClass(student.participation)}`}>{student.participation}%</span>
    },
    {
      id: "documents",
      header: "Documentos",
      render: (student) => (
        <span className="text-slate-700">
          {student.documentsComplete}/{student.documentsComplete + student.documentsIncomplete}
        </span>
      )
    },
    {
      id: "state",
      header: "Estado general",
      render: (student) => <StatusBadge status={student.state} />
    },
    {
      id: "risk",
      header: "Nivel de riesgo",
      render: (student) => (
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${riskClass(student.risk)}`}>
          {student.risk}
        </span>
      )
    },
    {
      id: "activity",
      header: "Última actividad",
      render: (student) => <span className="text-slate-600">{student.lastActivity}</span>
    },
    {
      id: "action",
      header: "Acción",
      className: "whitespace-nowrap",
      render: (student) => (
        <button
          type="button"
          onClick={() => setSelectedStudent(student)}
          className="font-semibold text-tech-primary hover:text-tech-accent"
        >
          Ver seguimiento
        </button>
      )
    }
  ];

  return (
    <PageShell
      title="Gestión de estudiantes"
      description="Consulta el estado académico, participación y seguimiento de los alumnos activos."
      eyebrow="Control escolar"
      actions={
        <Link to={paths.admin.analitica} className="rounded-lg bg-tech-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-tech-primary/90">
          Ver analítica
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <SectionCard title="Búsqueda y filtros" description="Filtra por carrera, semestre, estado, riesgo y participación">
        <div className="space-y-4">
          <SearchInput
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar estudiante, matrícula, carrera o tutor"
          />

          <div className="grid gap-3 lg:grid-cols-5">
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Carrera</span>
              <select value={careerFilter} onChange={(event) => setCareerFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-tech-primary">
                {adminStudentFilters.careers.map((career) => (
                  <option key={career} value={career}>{career}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Semestre</span>
              <select value={semesterFilter} onChange={(event) => setSemesterFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-tech-primary">
                {adminStudentFilters.semesters.map((semester) => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Estado</span>
              <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-tech-primary">
                {adminStudentFilters.states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Riesgo</span>
              <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value as StudentRisk | "Todos")} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-tech-primary">
                {adminStudentFilters.risks.map((risk) => (
                  <option key={risk} value={risk}>{risk}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-medium text-slate-700">Participación</span>
              <select value={participationFilter} onChange={(event) => setParticipationFilter(event.target.value as ParticipationBand | "Todas")} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-tech-primary">
                {adminStudentFilters.participation.map((band) => (
                  <option key={band} value={band}>{band}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Listado de estudiantes" description="Tabla consolidada con acceso directo al seguimiento">
        {filteredStudents.length === 0 ? (
          <EmptyState title="No hay estudiantes visibles" description="Ajusta los filtros o realiza otra búsqueda." />
        ) : (
          <DataTable columns={columns} rows={filteredStudents} rowKey={(student) => student.id} />
        )}
      </SectionCard>

      {selectedStudent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Resumen rápido</h3>
                <p className="mt-1 text-sm text-slate-600">{selectedStudent.name} · {selectedStudent.enrollment}</p>
              </div>
              <button type="button" onClick={() => setSelectedStudent(null)} className="text-sm font-semibold text-slate-500">
                Cerrar
              </button>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Información académica</p>
                  <p className="mt-2 text-sm text-slate-700">{selectedStudent.academicInfo}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Carrera:</span> {selectedStudent.career}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Tutor:</span> {selectedStudent.tutor}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Última tutoría:</span> {selectedStudent.lastTutoring}</p>
                    <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">Próxima acción:</span> {selectedStudent.nextAction}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-700">Alertas activas</p>
                    <p className="mt-2 text-sm font-medium text-rose-900">{selectedStudent.activeAlerts.join(" · ")}</p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tech-primary">Resumen de estado</p>
                    <p className="mt-2 text-sm font-medium text-tech-textMain">{selectedStudent.state} · Riesgo {selectedStudent.risk}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <StatusBadge status={selectedStudent.state} />
                  <p className="mt-3 text-sm text-slate-600">Participación: <span className="font-semibold text-slate-900">{selectedStudent.participation}%</span></p>
                  <p className="mt-1 text-sm text-slate-600">Documentos: <span className="font-semibold text-slate-900">{selectedStudent.documentsComplete}/{selectedStudent.documentsComplete + selectedStudent.documentsIncomplete}</span></p>
                  <p className="mt-1 text-sm text-slate-600">Tutorías pendientes: <span className="font-semibold text-slate-900">{selectedStudent.pendingTutoring}</span></p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSummaryMessage(`Seguimiento registrado para ${selectedStudent.name}.`)}
                    className="rounded-lg border border-tech-accent/30 bg-white px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-tech-bg"
                  >
                    Registrar seguimiento
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryMessage(`Recordatorio enviado para ${selectedStudent.name}.`)}
                    className="rounded-lg border border-tech-accent/30 bg-white px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-tech-bg"
                  >
                    Enviar recordatorio
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(paths.admin.estudiantePerfil(selectedStudent.id))}
                    className="rounded-lg border border-tech-accent/30 bg-white px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-tech-bg"
                  >
                    Ver trayectoria
                  </button>
                </div>

                {summaryMessage ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                    {summaryMessage}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

