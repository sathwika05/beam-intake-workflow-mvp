"use client";

import { useMemo, useState } from "react";

export type Appointment = {
  id: number;
  status: "booked" | "available";
  start: string; // "YYYY-MM-DDTHH:mm:ss"
  slot_duration: number; // minutes
  patient_id: number | null;
};

export type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
};

export type BookedWithPatient = {
  appointment: Appointment;
  patient: Patient;
};

type Props = {
  date: string; // "YYYY-MM-DD"
  items: BookedWithPatient[];
};

const DAY_START_MIN = 8 * 60; // 8:00 AM
const DAY_END_MIN = 20 * 60; // 8:00 PM
const PIXELS_PER_MIN = 1; // 1px per minute

function timeToMinutes(iso: string) {
  const [hh, mm] = iso.slice(11, 16).split(":").map(Number);
  return hh * 60 + mm;
}

function format12h(iso: string) {
  const [hh, mm] = iso.slice(11, 16).split(":").map(Number);
  const suffix = hh >= 12 ? "PM" : "AM";
  const h12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${suffix}`;
}

export default function DayCalendar({ date, items }: Props) {
  const [selected, setSelected] = useState<BookedWithPatient | null>(null);

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => 8 + i), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      {/* Calendar */}
      <div className="border rounded-xl overflow-hidden bg-card">
        {/* Header */}
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="font-semibold">Day View</div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>

        <div className="grid grid-cols-[80px_1fr]">
          {/* Time column */}
          <div className="border-r bg-muted/30">
            {hours.map((h) => (
              <div
                key={h}
                className="h-[60px] border-b px-2 text-xs text-muted-foreground pt-2"
              >
                {h <= 12 ? `${h}:00` : `${h - 12}:00`} {h < 12 ? "AM" : "PM"}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="relative">
            {/* hour rows */}
            {hours.map((h) => (
              <div key={h} className="h-[60px] border-b" />
            ))}

            {/* Events overlay */}
            {items.map(({ appointment, patient }) => {
              const startMin = timeToMinutes(appointment.start);
              if (startMin < DAY_START_MIN || startMin > DAY_END_MIN) return null;

              const top = (startMin - DAY_START_MIN) * PIXELS_PER_MIN;
              const height = appointment.slot_duration * PIXELS_PER_MIN;

              return (
                <button
                  key={appointment.id}
                  onClick={() => setSelected({ appointment, patient })}
                  className="absolute left-2 right-2 text-left rounded-lg px-3 py-2 shadow bg-violet-600 text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  style={{ top, height: Math.max(height, 40) }}
                >
                  {/*  Patient name on calendar */}
                  <div className="font-semibold leading-5">
                    {patient.first_name} {patient.last_name}
                  </div>

                  <div className="text-xs opacity-90">
                    {format12h(appointment.start)} • {appointment.slot_duration} min • Appt #{appointment.id}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details panel */}
      <div className="border rounded-xl bg-card p-4">
        <div className="font-semibold mb-3">Details</div>

        {!selected ? (
          <div className="text-sm text-muted-foreground">
            Click an appointment block to see details.
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Patient</div>
              <div className="font-medium">
                {selected.patient.first_name} {selected.patient.last_name}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground text-xs">Time</div>
              <div>
                {format12h(selected.appointment.start)} • {selected.appointment.slot_duration} min
              </div>
            </div>

            <div>
              <div className="text-muted-foreground text-xs">Contact</div>
              <div>{selected.patient.email}</div>
              <div>{selected.patient.phone}</div>
            </div>

            <div>
              <div className="text-muted-foreground text-xs">Appointment</div>
              <div>#{selected.appointment.id}</div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-2 border rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
