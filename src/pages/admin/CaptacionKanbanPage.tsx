import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { FilterPill } from "../../components/common/FilterPill";
import { PageShell } from "../../components/common/PageShell";
import { SearchInput } from "../../components/common/SearchInput";
import { StatusBadge } from "../../components/common/StatusBadge";
import { UserAvatar } from "../../components/common/UserAvatar";
import { EmptyState } from "../../components/common/EmptyState";
import type { Status } from "../../types";
import { adminApplicants, adminApplicantStages, type ApplicantPriority } from "../../data/adminApplicants";
import { paths } from "../../router/paths";

const careers = Array.from(new Set(adminApplicants.map((applicant) => applicant.career))).sort();
const priorities: Array<ApplicantPriority | "todas"> = ["todas", "alta", "media", "baja"];

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
  if (priority === "alta") return "bg-rose-100 text-rose-800 border-rose-200";
  if (priority === "media") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-sky-100 text-sky-800 border-sky-200";
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
    <PageShell
      title="Captación de aspirantes"
      description="Tablero operativo para priorizar seguimiento, documentación e inscripción."
      eyebrow="Funnel de ingresos"
      actions={
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800"
        >
          <Plus className="h-4 w-4" />
          Nuevo aspirante
        </button>
      }
    >
      {confirmation ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          {confirmation}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <SearchInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Buscar aspirante por nombre"
        />
        <div className="flex flex-wrap gap-2">
          {priorities.map((priority) => (
            <FilterPill
              key={priority}
              label={priority === "todas" ? "Todas las prioridades" : priority}
              active={activePriority === priority}
              count={priority === "todas" ? applicants.length : applicants.filter((applicant) => applicant.priority === priority).length}
              onClick={() => setActivePriority(priority)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterPill
          label="Todas las carreras"
          active={activeCareer === "todas"}
          count={applicants.length}
          onClick={() => setActiveCareer("todas")}
        />
        {careers.map((career) => (
          <FilterPill
            key={career}
            label={career}
            active={activeCareer === career}
            count={applicants.filter((applicant) => applicant.career === career).length}
            onClick={() => setActiveCareer(career)}
          />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-6">
        {groupedByStage.map((column) => (
          <article key={column.stage} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{column.stage}</h3>
                <p className="text-xs text-slate-500">{column.rows.length} aspirantes</p>
              </div>
              <span className="rounded-full bg-petrol-50 px-2.5 py-1 text-xs font-semibold text-petrol-700">
                {column.rows.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.rows.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-500">
                  Sin registros visibles
                </div>
              ) : null}

              {column.rows.map((applicant) => (
                <article key={applicant.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <UserAvatar name={applicant.name} subtitle={applicant.owner} compact />
                    <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClass(applicant.priority)}`}>
                      Prioridad {applicant.priority}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-900">{applicant.career}</p>
                      <p className="text-xs text-slate-500">{applicant.email}</p>
                      <p className="text-xs text-slate-500">{applicant.phone}</p>
                    </div>
                    <p className="text-xs text-slate-500">Origen: {applicant.source}</p>
                    <p className="text-xs text-slate-500">Último contacto: {applicant.lastContact}</p>
                    <p className="text-xs text-slate-500">Responsable: {applicant.owner}</p>
                    <p className="text-xs text-slate-500">{documentLabel(applicant.documentStatus)}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <StatusBadge status={applicant.documentStatus} />
                    <Link
                      to={paths.admin.aspirantePerfil(applicant.id)}
                      className="inline-flex rounded-lg bg-petrol-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-petrol-800"
                    >
                      Ver perfil
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))}
      </section>

      {filteredApplicants.length === 0 ? (
        <EmptyState title="Sin aspirantes visibles" description="Ajusta los filtros para ver más registros." />
      ) : null}

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Nuevo aspirante</h3>
                <p className="text-sm text-slate-600">Captura un prospecto para integrarlo al tablero.</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="text-sm font-semibold text-slate-500">
                Cerrar
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Nombre</span>
                <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Correo</span>
                <input value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Teléfono</span>
                <input value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Carrera de interés</span>
                <select value={draft.career} onChange={(event) => setDraft({ ...draft, career: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500">
                  {careers.map((career) => (
                    <option key={career} value={career}>{career}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm sm:col-span-2">
                <span className="font-medium text-slate-700">Medio de origen</span>
                <input value={draft.source} onChange={(event) => setDraft({ ...draft, source: event.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setShowModal(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                Cancelar
              </button>
              <button type="button" onClick={handleCreateApplicant} className="rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white">
                Guardar aspirante
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}

