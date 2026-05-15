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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <SectionCard title="Calendario" className="p-0 overflow-hidden">
            {/* Encabezado del mes */}
            <div className="border-b border-slate-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-slate-600">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>
            </div>

            {/* Días del calendario */}
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`aspect-square rounded-lg text-sm font-medium transition ${
                      day === selectedDay
                        ? "bg-petrol-700 text-white"
                        : "border border-slate-200 text-slate-700 hover:border-petrol-500 hover:bg-petrol-50"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Actividades de la semana */}
        <SectionCard title="Esta semana" className="lg:col-span-1">
          <div className="space-y-3">
            {agendaItems.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-lg border-l-4 border-l-petrol-500 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-petrol-700 uppercase">{item.date}</p>
                <p className="mt-1 font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.time}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Filtros y actividades del día seleccionado */}
      <SectionCard
        title={`Actividades del ${selectedDay} de ${MONTHS[currentDate.getMonth()]}`}
        className="mt-6"
      >
        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedType === type.id
                  ? "bg-petrol-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Lista de actividades */}
        {selectedDayItems.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-8 text-center">
            <p className="text-slate-600">No tienes actividades programadas para este día.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDayItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-4 hover:border-petrol-300">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <div className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                  <p>
                    <Clock className="inline h-4 w-4 mr-1" />
                    {item.time}
                  </p>
                  <p>
                    <MapPin className="inline h-4 w-4 mr-1" />
                    {item.location}
                  </p>
                </div>
                <p className="mt-2 text-xs text-slate-500">{item.course}</p>
                <button className="mt-3 rounded-lg bg-petrol-50 px-3 py-2 text-sm font-semibold text-petrol-700 transition hover:bg-petrol-100">
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
