import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Mail,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Target,
  UserCheck,
  Users,
  X
} from "lucide-react";
import { EmptyState } from "../../components/common/EmptyState";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import type { Status } from "../../types";
import { adminApplicants, adminApplicantStages, type ApplicantPriority } from "../../data/adminApplicants";
import { paths } from "../../router/paths";

const careers = Array.from(new Set(adminApplicants.map((applicant) => applicant.career))).sort();
const priorities: Array<ApplicantPriority | "todas"> = ["todas", "alta", "media", "baja"];

const evaluationSteps = [
  "Documentación validada",
  "Entrevista programada",
  "Evaluación académica",
  "Resultado preliminar",
  "Inscripción"
];

interface ApplicantDraft {
  name: string;
  email: string;
  phone: string;
  career: string;
  source: string;
}

const emptyDraft: ApplicantDraft = {
  name: "",
  email: "",
  phone: "",
  career: careers[0] ?? "",
  source: "Portal web"
};

function priorityClass(priority: ApplicantPriority) {
  if (priority === "alta") return "border-rose-200 bg-rose-50 text-rose-700";
  if (priority === "media") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-blue-200 bg-blue-50 text-tech-primary";
}

function priorityLabel(priority: ApplicantPriority | "todas") {
  if (priority === "todas") return "Todas";
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function documentLabel(status: Status) {
  if (status === "aprobado") return "Documentos aprobados";
  if (status === "en_revision") return "Documentos en revisión";
  if (status === "rechazado") return "Documentos rechazados";
  return "Documentos pendientes";
}

export function CaptacionKanbanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCareer, setActiveCareer] = useState("todas");
  const [activePriority, setActivePriority] = useState<ApplicantPriority | "todas">("todas");
  const [applicants, setApplicants] = useState(adminApplicants);
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState<ApplicantDraft>(emptyDraft);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCareer = activeCareer === "todas" || applicant.career === activeCareer;
      const matchesPriority = activePriority === "todas" || applicant.priority === activePriority;

      return matchesSearch && matchesCareer && matchesPriority;
    });
  }, [activeCareer, activePriority, applicants, searchTerm]);

  const groupedByStage = useMemo(
    () =>
      adminApplicantStages.map((stage) => ({
        stage,
        rows: filteredApplicants.filter((applicant) => applicant.stage === stage)
      })),
    [filteredApplicants]
  );

  const pendingDocuments = applicants.filter((applicant) => applicant.documentStatus !== "aprobado").length;
  const highPriority = applicants.filter((applicant) => applicant.priority === "alta").length;
  const delayedFollowUp = applicants.filter((applicant) => applicant.daysWithoutFollowUp >= 2).length;
  const newRecords = applicants.filter((applicant) => applicant.stage === "Nuevo registro").length;
  const completedApplicants = applicants.filter((applicant) => applicant.stage === "Inscripción finalizada").length;
  const conversionRate = Math.round((completedApplicants / Math.max(applicants.length, 1)) * 100);
  const topCareers = careers
    .map((career) => ({
      career,
      total: applicants.filter((applicant) => applicant.career === career).length
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  const metrics = [
    { label: "Aspirantes activos", value: applicants.length, detail: "registros en tablero", icon: Users },
    { label: "Nuevos registros", value: newRecords, detail: "por contactar", icon: UserCheck },
    { label: "Documentación pendiente", value: pendingDocuments, detail: "requieren validación", icon: FileText },
    { label: "Conversión", value: `${conversionRate}%`, detail: "inscripción finalizada", icon: Target },
    { label: "Prioridad alta", value: highPriority, detail: "atención inmediata", icon: AlertTriangle },
    { label: "Seguimiento atrasado", value: delayedFollowUp, detail: "dos días o más", icon: Clock3 }
  ];

  const handleCreateApplicant = () => {
    const newApplicant = {
      id: `APL-2026-${String(applicants.length + 1).padStart(3, "0")}`,
      folio: `ADM-26-${String(1000 + applicants.length + 1)}`,
      name: draft.name,
      career: draft.career,
      email: draft.email,
      phone: draft.phone,
      city: "Por definir",
      modality: "Presencial",
      source: draft.source,
      lastContact: "Sin contacto",
      owner: "Pendiente de asignación",
      priority: "media",
      documentStatus: "pendiente",
      stage: "Nuevo registro",
      status: "activo",
      registeredAt: "Hoy",
      conversionProbability: 48,
      nextAction: "Realizar primer contacto",
      daysWithoutFollowUp: 0,
      observations: "Captura creada desde el panel administrativo.",
      timeline: [
        {
          id: "tl-1",
          title: "Registro creado",
          detail: "Alta manual desde el tablero de captación.",
          time: "Hoy",
          status: "activo"
        }
      ],
      documents: [
        { id: "doc-1", name: "Acta de nacimiento", status: "pendiente", updatedAt: "Nunca" },
        { id: "doc-2", name: "CURP", status: "pendiente", updatedAt: "Nunca" },
        { id: "doc-3", name: "Certificado", status: "pendiente", updatedAt: "Nunca" },
        { id: "doc-4", name: "Identificación", status: "pendiente", updatedAt: "Nunca" },
        { id: "doc-5", name: "Comprobante", status: "pendiente", updatedAt: "Nunca" }
      ]
    } satisfies (typeof adminApplicants)[number];

    setApplicants((previous) => [newApplicant, ...previous]);
    setShowModal(false);
    setDraft({ ...emptyDraft, career: draft.career });
    setConfirmation(`${draft.name} se agregó al tablero.`);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-tech-border bg-white shadow-sm">
        <div className="border-b border-tech-divider bg-gradient-to-r from-white via-blue-50/70 to-white px-5 py-5 md:px-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary shadow-sm">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
                Funnel de ingresos
              </div>
              <h1 className="max-w-[20rem] text-3xl font-bold tracking-tight text-tech-textMain sm:max-w-3xl md:text-4xl">
                Captación de aspirantes con seguimiento operativo.
              </h1>
              <p className="mt-3 max-w-[20rem] text-sm leading-6 text-tech-textSecond sm:max-w-2xl md:text-base">
                Vista institucional para priorizar contactos, revisar documentación y mover aspirantes hacia inscripción con menos fricción.
              </p>
            </div>

            <div className="grid gap-4 border-t border-tech-divider pt-4 sm:grid-cols-3 xl:w-[34rem] xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Visibles</p>
                <p className="mt-2 text-2xl font-bold text-tech-textMain">{filteredApplicants.length}</p>
                <p className="mt-1 text-xs text-tech-textSecond">según filtros activos</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Pendientes</p>
                <p className="mt-2 text-2xl font-bold text-tech-primary">{pendingDocuments}</p>
                <p className="mt-1 text-xs text-tech-textSecond">expedientes por cerrar</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Riesgo</p>
                <p className="mt-2 text-2xl font-bold text-rose-700">{highPriority}</p>
                <p className="mt-1 text-xs text-tech-textSecond">prioridad alta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4 md:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-textSecond" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar aspirante por nombre"
                className="w-full rounded-lg border border-tech-border bg-tech-bg py-2.5 pl-10 pr-3 text-sm text-tech-textMain outline-none transition placeholder:text-tech-textSecond focus:border-tech-primary focus:bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-tech-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-tech-mid"
            >
              <Plus className="h-4 w-4" />
              Nuevo aspirante
            </button>
          </div>

          <div className="grid gap-3 xl:grid-cols-[auto_1fr] xl:items-start">
            <div className="flex items-center gap-2 text-sm font-semibold text-tech-textMain">
              <SlidersHorizontal className="h-4 w-4 text-tech-primary" />
              Segmentación
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {priorities.map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setActivePriority(priority)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      activePriority === priority
                        ? "border-tech-primary bg-blue-50 text-tech-primary"
                        : "border-tech-border bg-white text-tech-textSecond hover:border-tech-primary/30 hover:text-tech-primary"
                    }`}
                  >
                    {priorityLabel(priority)}
                    <span className="ml-2 text-[11px]">
                      {priority === "todas" ? applicants.length : applicants.filter((applicant) => applicant.priority === priority).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setActiveCareer("todas")}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activeCareer === "todas"
                      ? "border-tech-primary bg-tech-primary text-white"
                      : "border-tech-border bg-tech-bg text-tech-textSecond hover:border-tech-primary/30 hover:text-tech-primary"
                  }`}
                >
                  Todas las carreras
                  <span className="ml-2 opacity-80">{applicants.length}</span>
                </button>
                {careers.map((career) => (
                  <button
                    key={career}
                    type="button"
                    onClick={() => setActiveCareer(career)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      activeCareer === career
                        ? "border-tech-primary bg-tech-primary text-white"
                        : "border-tech-border bg-tech-bg text-tech-textSecond hover:border-tech-primary/30 hover:text-tech-primary"
                    }`}
                  >
                    {career}
                    <span className="ml-2 opacity-80">{applicants.filter((applicant) => applicant.career === career).length}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {confirmation ? (
        <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-tech-primary">
          <CheckCircle2 className="h-4 w-4" />
          {confirmation}
        </div>
      ) : null}

      <section className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Estado operativo</p>
            <h2 className="mt-1 text-lg font-bold text-tech-textMain">Lectura compacta del tablero</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[36rem]">
            {metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="border-l-2 border-tech-primary/30 pl-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-tech-textSecond">{metric.label}</p>
                <p className="mt-1 text-xl font-bold text-tech-textMain">{metric.value}</p>
                <p className="text-xs text-tech-textSecond">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3 border-t border-tech-divider pt-4 md:grid-cols-3">
          {metrics.slice(3).map((metric) => {
            const Icon = metric.icon;

            return (
              <div key={metric.label} className="flex items-center justify-between gap-3 rounded-lg bg-tech-bg px-3 py-2.5">
                <div>
                  <p className="text-xs font-semibold text-tech-textSecond">{metric.label}</p>
                  <p className="text-sm text-tech-textMain">{metric.detail}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-tech-primary">
                  <Icon className="h-4 w-4" />
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Proceso de evaluación</p>
            <h2 className="mt-1 text-lg font-bold text-tech-textMain">Criterios antes de inscripción</h2>
            <p className="mt-1 text-sm leading-6 text-tech-textSecond">
              Secuencia simulada para revisar expedientes, entrevistas y resultado preliminar.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-5 xl:min-w-[48rem]">
            {evaluationSteps.map((step, index) => (
              <div key={step} className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-tech-primary text-xs font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-2 text-xs font-semibold leading-5 text-tech-textMain">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="overflow-x-auto rounded-lg border border-tech-border bg-white p-3 shadow-sm">
          <div className="flex min-w-max gap-3">
            {groupedByStage.map((column, index) => (
              <article key={column.stage} className="flex max-h-[48rem] min-h-[34rem] w-[19rem] shrink-0 flex-col rounded-lg border border-tech-divider bg-tech-bg/45">
                <div className="sticky top-0 z-10 border-b border-tech-divider bg-white/95 px-4 py-3 backdrop-blur">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tech-primary">
                        Etapa 0{index + 1}
                      </p>
                      <h2 className="mt-1 text-sm font-bold leading-5 text-tech-textMain">{column.stage}</h2>
                    </div>
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-bold text-tech-primary">
                      {column.rows.length}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-tech-divider">
                    <div
                      className="h-1 rounded-full bg-tech-primary"
                      style={{ width: `${Math.min(100, Math.max(12, column.rows.length * 18))}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-3">
                  {column.rows.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-tech-divider bg-white/70 p-4 text-center text-xs text-tech-textSecond">
                      Sin registros visibles
                    </div>
                  ) : null}

                  {column.rows.map((applicant) => (
                    <article
                      key={applicant.id}
                      className="group rounded-lg border border-tech-divider bg-white p-3 shadow-sm transition hover:border-tech-primary/25 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <UserAvatar name={applicant.name} subtitle={applicant.folio} compact />
                        <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${priorityClass(applicant.priority)}`}>
                          {applicant.priority}
                        </span>
                      </div>

                      <div className="mt-3 rounded-lg bg-tech-bg px-3 py-2">
                        <p className="text-sm font-semibold leading-5 text-tech-textMain">{applicant.career}</p>
                        <p className="mt-1 text-xs text-tech-textSecond">{applicant.stage}</p>
                      </div>

                      <dl className="mt-3 space-y-2 border-t border-tech-divider pt-3 text-xs">
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Responsable</dt>
                          <dd className="max-w-[10rem] truncate text-right font-semibold text-tech-textMain">{applicant.owner}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Último contacto</dt>
                          <dd className="font-semibold text-tech-textMain">{applicant.lastContact}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Expediente</dt>
                          <dd className="text-right"><StatusBadge status={applicant.documentStatus} /></dd>
                        </div>
                      </dl>

                      {applicant.stage === "Evaluación / entrevista" ? (
                        <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/70 p-3">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-tech-primary">
                            <ClipboardCheck className="h-3.5 w-3.5" />
                            Evaluación
                          </div>
                          <div className="mt-2 space-y-1.5 text-xs text-tech-textSecond">
                            <p className="flex items-center justify-between gap-2">
                              <span>Entrevista</span>
                              <span className="font-semibold text-tech-textMain">Programada</span>
                            </p>
                            <p className="flex items-center justify-between gap-2">
                              <span>Evaluador</span>
                              <span className="max-w-[8rem] truncate font-semibold text-tech-textMain">{applicant.owner}</span>
                            </p>
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-3 rounded-lg border border-tech-divider px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-tech-textSecond">Próxima acción</p>
                        <p className="mt-1 text-xs font-medium leading-5 text-tech-textMain">{applicant.nextAction}</p>
                      </div>

                      <Link
                        to={paths.admin.aspirantePerfil(applicant.id)}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-tech-border bg-white px-3 py-2 text-sm font-semibold text-tech-primary transition hover:border-tech-primary/30 hover:bg-blue-50"
                      >
                        Ver perfil
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </Link>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-4 rounded-lg border border-tech-border bg-white p-5 shadow-sm lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Lectura rápida</p>
            <h2 className="mt-1 text-lg font-bold text-tech-textMain">Prioridad institucional</h2>
            <p className="mt-2 text-sm leading-6 text-tech-textSecond">
              Concentrar seguimiento en expedientes pendientes y aspirantes de alta prioridad antes de moverlos a entrevista.
            </p>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Sin seguimiento oportuno</p>
            <p className="mt-1 text-3xl font-bold text-tech-textMain">{delayedFollowUp}</p>
            <p className="mt-1 text-xs text-tech-textSecond">casos con dos días o más</p>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Carreras con más demanda</p>
            <div className="mt-3 space-y-3">
              {topCareers.map((item) => (
                <div key={item.career}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-tech-textMain">{item.career}</span>
                    <span className="text-tech-primary">{item.total}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-tech-divider">
                    <div className="h-1.5 rounded-full bg-tech-primary" style={{ width: `${Math.max(24, item.total * 22)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Acción recomendada</p>
            <p className="mt-2 text-sm font-medium leading-6 text-tech-textMain">
              Validar documentos pendientes y confirmar entrevista para aspirantes con probabilidad superior al 70%.
            </p>
          </div>
        </aside>
      </section>

      {false ? (<>
      <section className="hidden">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article key={metric.label} className="rounded-lg border border-tech-border bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tech-textSecond">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold text-tech-textMain">{metric.value}</p>
                  <p className="mt-1 text-xs text-tech-textSecond">{metric.detail}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-2 text-tech-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6">
        <div className="overflow-x-auto rounded-lg border border-tech-border bg-white p-3 shadow-sm">
          <div className="grid min-w-[90rem] grid-cols-6 gap-3">
            {groupedByStage.map((column, index) => (
              <article key={column.stage} className="flex max-h-[46rem] min-h-[34rem] flex-col rounded-lg border border-tech-divider bg-tech-bg/45">
                <div className="sticky top-0 z-10 border-b border-tech-divider bg-white/95 px-4 py-3 backdrop-blur">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-tech-primary">
                        Etapa 0{index + 1}
                      </p>
                      <h2 className="mt-1 text-sm font-bold leading-5 text-tech-textMain">{column.stage}</h2>
                    </div>
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-bold text-tech-primary">
                      {column.rows.length}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-tech-divider">
                    <div
                      className="h-1 rounded-full bg-tech-primary"
                      style={{ width: `${Math.min(100, Math.max(12, column.rows.length * 18))}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-3">
                  {column.rows.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-tech-divider bg-white/70 p-4 text-center text-xs text-tech-textSecond">
                      Sin registros visibles
                    </div>
                  ) : null}

                  {column.rows.map((applicant) => (
                    <article
                      key={applicant.id}
                      className="group rounded-lg border border-tech-divider bg-white p-4 shadow-sm transition hover:border-tech-primary/25 hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <UserAvatar name={applicant.name} subtitle={applicant.folio} compact />
                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${priorityClass(applicant.priority)}`}>
                          {applicant.priority}
                        </span>
                      </div>

                      <div className="mt-3 border-t border-tech-divider pt-3">
                        <p className="text-sm font-semibold leading-5 text-tech-textMain">{applicant.career}</p>
                        <div className="mt-2 space-y-1.5 text-xs text-tech-textSecond">
                          <p className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-tech-primary" />
                            <span className="truncate">{applicant.email}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-tech-primary" />
                            {applicant.phone}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-3 grid gap-2 border-t border-tech-divider pt-3 text-xs">
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Responsable</dt>
                          <dd className="max-w-[9.5rem] truncate text-right font-semibold text-tech-textMain">{applicant.owner}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Último contacto</dt>
                          <dd className="font-semibold text-tech-textMain">{applicant.lastContact}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-tech-textSecond">Probabilidad</dt>
                          <dd className="font-semibold text-tech-primary">{applicant.conversionProbability}%</dd>
                        </div>
                      </dl>

                      <div className="mt-3 rounded-lg bg-tech-bg px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-tech-textSecond">Próxima acción</p>
                        <p className="mt-1 text-xs font-medium leading-5 text-tech-textMain">{applicant.nextAction}</p>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-tech-divider pt-3">
                        <StatusBadge status={applicant.documentStatus} />
                        <span className="text-[11px] font-medium text-tech-textSecond">{documentLabel(applicant.documentStatus)}</span>
                      </div>

                      <Link
                        to={paths.admin.aspirantePerfil(applicant.id)}
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-tech-border bg-white px-3 py-2 text-sm font-semibold text-tech-primary transition hover:border-tech-primary/30 hover:bg-blue-50"
                      >
                        Ver perfil
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </Link>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-4 rounded-lg border border-tech-border bg-white p-5 shadow-sm lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Lectura rápida</p>
            <h2 className="mt-1 text-lg font-bold text-tech-textMain">Prioridad institucional</h2>
            <p className="mt-2 text-sm leading-6 text-tech-textSecond">
              Concentrar seguimiento en expedientes pendientes y aspirantes de alta prioridad antes de moverlos a entrevista.
            </p>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Sin seguimiento oportuno</p>
            <p className="mt-1 text-3xl font-bold text-tech-textMain">{delayedFollowUp}</p>
            <p className="mt-1 text-xs text-tech-textSecond">casos con dos días o más</p>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Carreras con más demanda</p>
            <div className="mt-3 space-y-3">
              {topCareers.map((item) => (
                <div key={item.career}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-tech-textMain">{item.career}</span>
                    <span className="text-tech-primary">{item.total}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-tech-divider">
                    <div className="h-1.5 rounded-full bg-tech-primary" style={{ width: `${Math.max(24, item.total * 22)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-tech-divider pt-4 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tech-textSecond">Acción recomendada</p>
            <p className="mt-2 text-sm font-medium leading-6 text-tech-textMain">
              Validar documentos pendientes y confirmar entrevista para aspirantes con probabilidad superior al 70%.
            </p>
          </div>
        </aside>
      </section>
      </>) : null}

      {filteredApplicants.length === 0 ? (
        <EmptyState title="Sin aspirantes visibles" description="Ajusta los filtros para ver más registros." />
      ) : null}

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-tech-divider bg-gradient-to-r from-white via-blue-50/80 to-white px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-primary">Alta manual</p>
                <h3 className="mt-1 text-2xl font-bold text-tech-textMain">Nuevo aspirante</h3>
                <p className="mt-1 text-sm text-tech-textSecond">Captura un prospecto para integrarlo al tablero de captación.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-tech-border bg-white p-2 text-tech-textSecond transition hover:bg-tech-bg hover:text-tech-textMain"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-tech-textMain">Nombre</span>
                <input
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                  className="w-full rounded-lg border border-tech-border bg-tech-bg px-3 py-2.5 outline-none transition focus:border-tech-primary focus:bg-white"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-tech-textMain">Correo</span>
                <input
                  value={draft.email}
                  onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                  className="w-full rounded-lg border border-tech-border bg-tech-bg px-3 py-2.5 outline-none transition focus:border-tech-primary focus:bg-white"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-tech-textMain">Teléfono</span>
                <input
                  value={draft.phone}
                  onChange={(event) => setDraft({ ...draft, phone: event.target.value })}
                  className="w-full rounded-lg border border-tech-border bg-tech-bg px-3 py-2.5 outline-none transition focus:border-tech-primary focus:bg-white"
                />
              </label>
              <label className="space-y-1.5 text-sm">
                <span className="font-semibold text-tech-textMain">Carrera de interés</span>
                <select
                  value={draft.career}
                  onChange={(event) => setDraft({ ...draft, career: event.target.value })}
                  className="w-full rounded-lg border border-tech-border bg-tech-bg px-3 py-2.5 outline-none transition focus:border-tech-primary focus:bg-white"
                >
                  {careers.map((career) => (
                    <option key={career} value={career}>
                      {career}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1.5 text-sm sm:col-span-2">
                <span className="font-semibold text-tech-textMain">Medio de origen</span>
                <input
                  value={draft.source}
                  onChange={(event) => setDraft({ ...draft, source: event.target.value })}
                  className="w-full rounded-lg border border-tech-border bg-tech-bg px-3 py-2.5 outline-none transition focus:border-tech-primary focus:bg-white"
                />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-tech-divider bg-tech-bg/60 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-tech-border bg-white px-4 py-2 text-sm font-semibold text-tech-textSecond transition hover:bg-tech-bg"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateApplicant}
                className="rounded-lg bg-tech-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-tech-mid"
              >
                Guardar aspirante
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
