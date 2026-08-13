"use client";

import { useState, useEffect, useRef } from "react";

interface WeeklyAgendaSlot {
  id: string;
  dayOfWeek: string;
  period: string;
  activity: string;
  notes: string;
  weekStart: string;
  weekEnd: string;
}

const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const PERIODS = ["Manhã", "Tarde"];

export default function AgendaPage() {
  const [slots, setSlots] = useState<WeeklyAgendaSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSlots();
  }, [weekOffset]);

  async function fetchSlots() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/agenda?weekOffset=${weekOffset}`);
      if (!res.ok) throw new Error("Erro ao carregar agenda");
      const data = await res.json();
      setSlots(data.slots || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  function getSlot(day: string, period: string) {
    return slots.find((s) => s.dayOfWeek === day && s.period === period);
  }

  function getWeekLabel() {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    return `${monday.toLocaleDateString("pt-BR")} — ${sunday.toLocaleDateString("pt-BR")}`;
  }

  function handlePrint() {
    window.print();
  }

  function handleExportPDF() {
    window.print();
  }

  return (
    <>
      {/* Print-only styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          @page { margin: 15mm; size: landscape; }
        }
      `}</style>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-4">
            <a href="/" className="text-2xl font-bold hover:opacity-80">
              📅 Agenda PAEET
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              🖨️ Imprimir / PDF
            </button>
          </div>
        </header>

        {/* Week Navigation */}
        <div className="flex items-center justify-center gap-4 py-4 border-b bg-zinc-50 dark:bg-zinc-900 no-print">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors font-medium"
          >
            ← Anterior
          </button>
          <span className="font-semibold text-sm md:text-base">{getWeekLabel()}</span>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors font-medium"
          >
            Próxima →
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Hoje
            </button>
          )}
        </div>

        {/* Print Area */}
        <div ref={printRef} id="print-area" className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
          {/* Print Header */}
          <div className="hidden print:block mb-4 text-center">
            <h1 className="text-xl font-bold">📅 Agenda PAEET — Semana {getWeekLabel()}</h1>
          </div>

          {/* Agenda Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20 no-print">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <span className="ml-3 text-zinc-500">Carregando agenda...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20 no-print">
                <p className="text-red-500 mb-4">❌ {error}</p>
                <button
                  onClick={fetchSlots}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-zinc-300">
                  <thead>
                    <tr>
                      <th className="border border-zinc-300 p-2 bg-zinc-100 text-sm font-semibold w-20">
                        Horário
                      </th>
                      {DAYS.map((day) => (
                        <th
                          key={day}
                          className="border border-zinc-300 p-2 bg-zinc-100 text-sm font-semibold"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIODS.map((period) => (
                      <tr key={period}>
                        <td className="border border-zinc-300 p-2 bg-zinc-50 text-sm font-medium text-center">
                          {period}
                        </td>
                        {DAYS.map((day) => {
                          const slot = getSlot(day, period);
                          return (
                            <td
                              key={`${day}-${period}`}
                              className="border border-zinc-300 p-2 min-h-[80px] align-top"
                            >
                              {slot ? (
                                <div>
                                  <p className="font-medium text-sm">{slot.activity}</p>
                                  {slot.notes && (
                                    <p className="text-xs text-zinc-500 mt-1">{slot.notes}</p>
                                  )}
                                </div>
                              ) : (
                                <p className="text-xs text-zinc-300 italic">
                                  Livre
                                </p>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>

        {/* Developer Credit */}
        <footer className="text-center py-4 border-t text-sm text-zinc-500 no-print">
          <p>
            Desenvolvido por{" "}
            <a
              href="https://rendey.store"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              Rendey LLC
            </a>{" "}
            — <a href="https://rendey.store" target="_blank" rel="noopener noreferrer" className="hover:underline">rendey.store</a>
          </p>
        </footer>

        {/* Print Footer */}
        <div className="hidden print:block text-center py-4 text-sm text-zinc-500">
          <p>Desenvolvido por Rendey LLC — rendey.store</p>
          <p className="text-xs mt-1">Agenda PAEET © {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}
