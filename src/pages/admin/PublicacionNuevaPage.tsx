import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ImagePlus, Send, Save, XCircle } from "lucide-react";
import { AlertActionModal } from "../../components/admin/AlertActionModal";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { paths } from "../../router/paths";
import {
  defaultPublicationDraft,
  publicationAudiences,
  publicationCategories,
  publicationModes,
  publicationTypes,
  type PublicationDraft
} from "../../data/adminPublications";
import { previewChannels } from "../../data/adminDiffusion";

export function PublicacionNuevaPage() {
  const [draft, setDraft] = useState<PublicationDraft>(defaultPublicationDraft);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [published, setPublished] = useState<PublicationDraft | null>(null);

  const preview = useMemo(
    () => ({
      title: draft.title || "Título de publicación",
      subtitle: `${draft.type} · ${draft.category}`,
      description: draft.description || "La descripción aparecerá aquí como vista previa.",
      audience: draft.audience,
      location: draft.location || "Lugar por definir",
      modality: draft.modality,
      banner: draft.title || "Banner institucional"
    }),
    [draft]
  );

  const updateDraft = <K extends keyof PublicationDraft>(key: K, value: PublicationDraft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
  };

  const handleSaveDraft = () => {
    setSavedMessage(`Borrador guardado para ${draft.title || "nueva publicación"}.`);
    setPublished(null);
  };

  const handlePublish = () => {
    setPublished(draft);
    setSavedMessage(null);
  };

  return (
    <PageShell
      title="Crear publicación"
      description="Publica eventos, avisos, convocatorias o actividades para estudiantes."
      eyebrow="Difusión institucional"
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <SectionCard title="Información principal" description="Define el contenido y el formato de la publicación">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-medium text-slate-700">Título</span>
                <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Tipo de publicación</span>
                <select value={draft.type} onChange={(event) => updateDraft("type", event.target.value as PublicationDraft["type"])} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500">
                  {publicationTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Categoría</span>
                <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500">
                  {publicationCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-medium text-slate-700">Descripción</span>
                <textarea value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} rows={4} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <div className="md:col-span-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-700">
                  <ImagePlus className="h-5 w-5 text-petrol-700" />
                  <div>
                    <p className="font-semibold text-slate-900">Imagen o banner simulado</p>
                    <p className="text-sm text-slate-600">El banner se mostrará como tarjeta institucional en la vista previa.</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-gradient-to-r from-petrol-700 to-teal-700 px-4 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Banner</p>
                  <p className="mt-2 text-lg font-bold">{preview.banner}</p>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Fecha y ubicación" description="Programa la publicación y su contexto">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Fecha de inicio", "startDate"],
                ["Fecha de cierre", "endDate"],
                ["Hora", "time"],
                ["Lugar", "location"]
              ].map(([label, key]) => (
                <label key={key} className="space-y-1 text-sm">
                  <span className="font-medium text-slate-700">{label}</span>
                  <input value={draft[key as keyof PublicationDraft] as string} onChange={(event) => updateDraft(key as keyof PublicationDraft, event.target.value as never)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
                </label>
              ))}
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-medium text-slate-700">Modalidad</span>
                <select value={draft.modality} onChange={(event) => updateDraft("modality", event.target.value as PublicationDraft["modality"])} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500">
                  {publicationModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                </select>
              </label>
            </div>
          </SectionCard>

          <SectionCard title="Público objetivo" description="Selecciona el segmento que verá la publicación">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {publicationAudiences.map((audience) => (
                <label key={audience} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${draft.audience === audience ? "border-petrol-300 bg-petrol-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                  <input type="radio" checked={draft.audience === audience} onChange={() => updateDraft("audience", audience)} />
                  <span className="font-medium text-slate-700">{audience}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Requisitos" description="Define cupo, responsable y contacto">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Cupo</span>
                <input value={draft.cupo} onChange={(event) => updateDraft("cupo", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm">
                <span className="font-medium text-slate-700">Responsable</span>
                <input value={draft.owner} onChange={(event) => updateDraft("owner", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-medium text-slate-700">Material requerido</span>
                <textarea value={draft.material} onChange={(event) => updateDraft("material", event.target.value)} rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
              <label className="space-y-1 text-sm md:col-span-2">
                <span className="font-medium text-slate-700">Correo de contacto</span>
                <input type="email" value={draft.contactEmail} onChange={(event) => updateDraft("contactEmail", event.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-petrol-500" />
              </label>
            </div>
          </SectionCard>

          <SectionCard title="Visibilidad" description="Controla la distribución inicial">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["publishNow", "Publicar ahora"],
                ["featured", "Destacar en Home del estudiante"],
                ["notify", "Enviar notificación simulada"]
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                  <input type="checkbox" checked={draft[key as keyof PublicationDraft] as boolean} onChange={(event) => updateDraft(key as keyof PublicationDraft, event.target.checked as never)} />
                  <span className="font-medium text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleSaveDraft} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Save className="h-4 w-4" />Guardar borrador
            </button>
            <button type="button" onClick={handlePublish} className="inline-flex items-center gap-2 rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white hover:bg-petrol-800">
              <Send className="h-4 w-4" />Publicar
            </button>
            <Link to={paths.admin.difusion} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <XCircle className="h-4 w-4" />Cancelar
            </Link>
          </div>

          {savedMessage ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{savedMessage}</div>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-4 self-start">
          <SectionCard title="Vista previa" description="Así se verá la publicación en la experiencia estudiantil">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-gradient-to-r from-petrol-700 to-teal-700 px-5 py-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{preview.subtitle}</p>
                <h3 className="mt-2 text-2xl font-bold">{preview.title}</h3>
                <p className="mt-2 text-sm text-white/85">{preview.description}</p>
              </div>
              <div className="space-y-3 p-5 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Público:</span> {preview.audience}</p>
                <p><span className="font-semibold text-slate-900">Lugar:</span> {preview.location}</p>
                <p><span className="font-semibold text-slate-900">Modalidad:</span> {preview.modality}</p>
                <div>
                  <p className="font-semibold text-slate-900">Canales</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {previewChannels.map((channel) => (
                      <span key={channel} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{channel}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </aside>
      </div>

      {published ? (
        <AlertActionModal
          title="Publicación creada correctamente"
          description="Resumen final de la publicación generada"
          confirmLabel="Volver a difusión"
          onCancel={() => setPublished(null)}
          onConfirm={() => setPublished(null)}
        >
          <div className="space-y-2 text-sm text-slate-700">
            <p><span className="font-semibold text-slate-900">Título:</span> {published.title}</p>
            <p><span className="font-semibold text-slate-900">Tipo:</span> {published.type}</p>
            <p><span className="font-semibold text-slate-900">Público objetivo:</span> {published.audience}</p>
            <p><span className="font-semibold text-slate-900">Canales:</span> Home estudiante, correo institucional y notificación simulada</p>
            <p><span className="font-semibold text-slate-900">Estado:</span> {published.publishNow ? "Activa" : "Borrador"}</p>
            <div className="pt-2">
              <Link to={paths.admin.difusion} className="inline-flex rounded-lg bg-petrol-700 px-4 py-2 text-sm font-semibold text-white hover:bg-petrol-800">
                Volver a difusión
              </Link>
            </div>
          </div>
        </AlertActionModal>
      ) : null}
    </PageShell>
  );
}
