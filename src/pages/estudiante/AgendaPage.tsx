import { Bell, BellOff, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { STUDENT_DEMO } from "../../config/studentDemo";
import { agendaItems } from "../../data/estudiante.mock";

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function parseAgendaDate(dateISO?: string) {
  if (!dateISO) return null;
  const [year, month, day] = dateISO.split("-").map(Number);
  if (!year || !month || !day) return null;
  return { year, monthIndex: month - 1, day };
}

export function AgendaPage() {
  const referenceDate = new Date(`${STUDENT_DEMO.referenceDateISO}T12:00:00`);
  const [currentDate, setCurrentDate] = useState(
    () => new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1)
  );
  const [selectedType, setSelectedType] = useState("todo");
  const [selectedDay, setSelectedDay] = useState(referenceDate.getDate());
  const [reminderIds, setReminderIds] = useState<string[]>([]);

  const types = [
    { id: "todo", label: "Todo" },
    { id: "clase", label: "Clases" },
    { id: "evento", label: "Eventos" },
    { id: "tutoria", label: "Tutorías" },
    { id: "entrega", label: "Entregas" },
    { id: "taller", label: "Talleres" }
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  const monthItems = useMemo(
    () =>
      agendaItems
        .filter((item) => {
          const parsed = parseAgendaDate(item.dateISO);
          return (
            parsed?.year === currentDate.getFullYear() &&
            parsed.monthIndex === currentDate.getMonth()
          );
        })
        .sort((a, b) => (a.dateISO ?? "").localeCompare(b.dateISO ?? "") || a.time.localeCompare(b.time)),
    [currentDate]
  );

  const filteredItems =
    selectedType === "todo"
      ? monthItems
      : monthItems.filter((item) => item.type === selectedType);

  const selectedDayItems = filteredItems.filter(
    (item) => parseAgendaDate(item.dateISO)?.day === selectedDay
  );

  const activityDays = new Set(
    monthItems
      .map((item) => parseAgendaDate(item.dateISO)?.day)
      .filter((day): day is number => typeof day === "number")
  );

  const handleMonthChange = (offset: number) => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    setCurrentDate(nextDate);
    const firstActivity = agendaItems
      .map((item) => parseAgendaDate(item.dateISO))
      .find(
        (parsed) =>
          parsed?.year === nextDate.getFullYear() &&
          parsed.monthIndex === nextDate.getMonth()
      );
    setSelectedDay(firstActivity?.day ?? 1);
  };

  const toggleReminder = (id: string) => {
    setReminderIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  const upcomingItems = agendaItems
    .slice()
    .sort((a, b) => (a.dateISO ?? "").localeCompare(b.dateISO ?? "") || a.time.localeCompare(b.time))
    .slice(0, 4);

  return (
    <PageShell
      eyebrow="Académico"
      title="Mi agenda"
      description="Gestiona tu calendario de clases, tutorías, eventos y entregas."
    >
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="lg:col-span-1">
          <SectionCard
            title="Calendario"
            description="Navega por el mes y selecciona el día que necesitas revisar."
            className="overflow-hidden p-0"
          >
            <div className="border-b border-tech-border bg-surface-card p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-primary">Vista mensual</p>
                  <h2 className="mt-1 text-lg font-semibold text-tech-textMain">
                    {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button type="button" aria-label="Mes anterior" onClick={() => handleMonthChange(-1)} className="rounded-full border border-tech-border bg-white p-2 transition hover:bg-blue-50">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button type="button" aria-label="Mes siguiente" onClick={() => handleMonthChange(1)} className="rounded-full border border-tech-border bg-white p-2 transition hover:bg-blue-50">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-tech-textSecond">
                {DAYS_OF_WEEK.map((day) => <div key={day}>{day}</div>)}
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {emptyDays.map((_, index) => <div key={`empty-${index}`} />)}
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`relative aspect-square rounded-xl text-sm font-medium transition ${
                      day === selectedDay
                        ? "bg-tech-primary text-white shadow-sm"
                        : "border border-tech-border text-tech-textSecond hover:border-tech-primary hover:bg-blue-50"
                    }`}
                  >
                    {day}
                    {activityDays.has(day) ? (
                      <span className={`absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${day === selectedDay ? "bg-white" : "bg-tech-primary"}`} />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Próximas actividades" description="Vista rápida del escenario académico actual.">
          <div className="space-y-3">
            {upcomingItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-tech-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-primary">{item.date}</p>
                <p className="mt-1 font-semibold text-tech-textMain">{item.title}</p>
                <p className="text-xs text-tech-textSecond">{item.time}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title={`Actividades del ${selectedDay} de ${MONTHS[currentDate.getMonth()]}`}
        description="Filtra por tipo y revisa la información del día seleccionado."
        className="mt-6"
      >
        <div className="mb-6 flex flex-wrap gap-2">
          {types.map((type) => (
            <button key={type.id} type="button" onClick={() => setSelectedType(type.id)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedType === type.id ? "bg-tech-primary text-white" : "border border-tech-border bg-surface-card text-tech-textSecond hover:bg-blue-50"}`}>
              {type.label}
            </button>
          ))}
        </div>

        {selectedDayItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-tech-border bg-surface-card p-8 text-center">
            <p className="text-tech-textSecond">No tienes actividades programadas para este día.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayItems.map((item) => {
              const hasReminder = reminderIds.includes(item.id);
              return (
                <div key={item.id} className="rounded-2xl border border-tech-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-tech-textMain">{item.title}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="grid gap-2 text-sm text-tech-textSecond md:grid-cols-2">
                    <p><Clock className="mr-1 inline h-4 w-4" />{item.time}</p>
                    <p><MapPin className="mr-1 inline h-4 w-4" />{item.location}</p>
                  </div>
                  <p className="mt-2 text-xs text-tech-textSecond">{item.course}</p>
                  <button type="button" onClick={() => toggleReminder(item.id)} className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${hasReminder ? "border border-tech-border bg-white text-tech-primary hover:bg-blue-50" : "bg-blue-50 text-tech-primary hover:bg-blue-100"}`}>
                    {hasReminder ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    {hasReminder ? "Quitar recordatorio" : "Agregar recordatorio"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </PageShell>
  );
}
