"use client";

import { useEffect, useState } from "react";
import DayCalendar, { BookedWithPatient } from "@/components/calendar/DayCalendar";

function localDateYYYYMMDD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingsPage() {
  const [date, setDate] = useState(() => localDateYYYYMMDD(new Date()));
  const [items, setItems] = useState<BookedWithPatient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
      
        const res = await fetch(
          `http://localhost:3001/beam/appointments/booked?date=${date}`,
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load bookings");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [date]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-lg font-semibold">All Bookings</h1>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm bg-background"
          />

          {loading && <span className="text-sm text-muted-foreground">Loading…</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>

      <DayCalendar date={date} items={items} />
    </div>
  );
}
