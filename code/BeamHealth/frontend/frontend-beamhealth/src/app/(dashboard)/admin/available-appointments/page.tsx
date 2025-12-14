"use client";

import { useEffect, useMemo, useState } from "react";
import MiniMonthCalendar from "@/components/calendar/MiniMonthCalendar";

type Slot = {
  id: number;
  start: string;
  slot_duration: number;
};

const BASE_URL = "http://localhost:3001";

function toYYYYMMDD(d: Date) {
  return d.toISOString().split("T")[0];
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function AvailableAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  const dateStr = useMemo(
    () => toYYYYMMDD(selectedDate),
    [selectedDate]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/beam/appointments/available?date=${dateStr}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setSlots(data);
      setLoading(false);
    }

    load();
  }, [dateStr]);

  return (
    <div className="p-4 flex gap-6">
  
  {/* LEFT: Mini calendar (fixed width) */}
  <div className="w-[320px] shrink-0">
    <MiniMonthCalendar
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  </div>

  {/* RIGHT: Available slots (flexible) */}
  <div className="min-w-0 flex-1 rounded-xl border p-4 bg-white overflow-x-hidden">
    <div className="mb-4">
      <h2 className="font-semibold">Available Slots</h2>
      <p className="text-xs text-gray-500">{dateStr}</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {slots.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border px-3 py-2 text-center hover:bg-gray-50"
        >
          <div className="text-sm font-medium">
            {formatTime(s.start)}
          </div>
          <div className="text-[11px] text-gray-500">
            {s.slot_duration} min
          </div>
        </div>
      ))}
    </div>
  </div>

</div>


  );
}
