"use client";

import { useEffect, useState } from "react";
import AppointmentTable, {
  IntakeRow,
} from "@/components/appointment-table";

const BASE_URL = "http://localhost:3001";

const NextDayAppointments = () => {
  const [rows, setRows] = useState<IntakeRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    const res = await fetch(
      `${BASE_URL}/beam/appointments/intake-worklist`
    );
    const data = await res.json();
    setRows(data);
    setLoading(false);
  };

  const sendReminder = async (appointmentId: number) => {
    await fetch(`${BASE_URL}/beam/reminders/send-one`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appointmentId }),
    });

    alert("Reminder sent!");
  };

  return (
    <div className="flex flex-col p-10">
      <h2 className="font-semibold text-lg">Next Day Appointments</h2>

      <div className="mt-6">
        <AppointmentTable
          rows={rows}
          loading={loading}
          onSendReminder={sendReminder}
        />
      </div>
    </div>
  );
};

export default NextDayAppointments;
