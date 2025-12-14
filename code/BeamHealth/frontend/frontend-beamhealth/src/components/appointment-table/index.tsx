"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export type IntakeRow = {
  patient_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  appointment_id: number;
  appointment_time: string;
  start: string;
  slot_duration: number;
  intake_status: string;
  eligibility_status: string;
};

type Props = {
  rows: IntakeRow[];
  loading?: boolean;
  onSendReminder: (appointmentId: number) => void;
};

const AppointmentTable = ({ rows, loading, onSendReminder }: Props) => {
  if (loading) return <div className="text-sm">Loading appointments...</div>;
  if (!rows?.length) return <div className="text-sm">No appointments found.</div>;

  return (
    <div className="rounded-lg border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="p-3">Time</th>
            <th className="p-3">Patient</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Intake</th>
            <th className="p-3">Eligibility</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            const isReady = row.intake_status === "Ready";

            return (
              <tr key={row.appointment_id} className="border-t">
                <td className="p-3">{row.appointment_time}</td>
                <td className="p-3">
                  {row.first_name} {row.last_name}
                </td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.phone}</td>
                <td className="p-3">{row.intake_status}</td>
                <td className="p-3">{row.eligibility_status}</td>

                <td className="p-3 text-center">
                  <Button
                   size="sm"
                   disabled={isReady}
                   onClick={() => onSendReminder(row.appointment_id)}
                   >
                    Send Reminder
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
