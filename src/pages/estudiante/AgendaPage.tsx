import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/common/PageShell";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { agendaItems } from "../../data/estudiante.mock";

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15)); // May 15, 2026
  const [selectedType, setSelectedType] = useState<string>("todo");
  const [selectedDay, setSelectedDay] = useState(15);

  const types = [
    { id: "todo", label: "Todo" },
    { id: "clase", label: "Clases" },
    { id: "evento", label: "Eventos" },
    { id: "tutoria", label: "Tutorías" },
    { id: "entrega", label: "Entregas" },
    { id: "taller", label: "Talleres" }
  ];

  // Get days in current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

  // Filter agenda items based on selected type
  const filteredItems =
    selectedType === "todo" ? agendaItems : agendaItems.filter((item) => item.type === selectedType);

  // Get items for selected day
  const selectedDayItems = filteredItems.filter((item) => {
    const dayMatch = item.date.includes(selectedDay.toString());
    return dayMatch;
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <PageShell
      eyebrow="Académico"
      title="Mi agenda"
      description="Gestiona tu calendario de clases, tutorías, eventos y entregas."
    >
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="lg:col-span-1">
          <SectionCard title="Calendario" description="Navega por el mes y selecciona el día que necesitas revisar." className="overflow-hidden p-0">
            <div className="border-b border-tech-border bg-surface-card p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tech-primary">Vista mensual</p>
                  <h2 className="mt-1 text-lg font-semibold text-tech-textMain">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="rounded-full border border-tech-border bg-white p-2 transition hover:bg-blue-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="rounded-full border border-tech-border bg-white p-2 transition hover:bg-blue-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-tech-textSecond">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square rounded-xl text-sm font-medium transition ${
                      day === selectedDay
                        ? "bg-tech-primary text-white shadow-sm"
                        : "border border-tech-border text-tech-textSecond hover:border-tech-primary hover:bg-blue-50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Esta semana" description="Vista rápida de los próximos compromisos.">
          <div className="space-y-3">
            {agendaItems.slice(0, 4).map((item) => (
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
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedType === type.id
                  ? "bg-tech-primary text-white"
                  : "border border-tech-border bg-surface-card text-tech-textSecond hover:bg-blue-50"
              }`}
            >
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
            {selectedDayItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-tech-border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-tech-textMain">{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <div className="grid gap-2 text-sm text-tech-textSecond md:grid-cols-2">
                  <p>
                    <Clock className="inline h-4 w-4 mr-1" />
                    {item.time}
                  </p>
                  <p>
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {item.location}
                  </p>
                </div>
                <p className="mt-2 text-xs text-tech-textSecond">{item.course}</p>
                <button className="mt-3 rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-tech-primary transition hover:bg-blue-100">
                  Agregar recordatorio
                </button>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </PageShell>
  );
}
