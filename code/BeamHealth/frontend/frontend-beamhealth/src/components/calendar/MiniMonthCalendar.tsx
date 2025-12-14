"use client";

import { Calendar } from "@/components/ui/calendar";

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

export default function MiniMonthCalendar({ selectedDate, onDateChange }: Props) {
  return (
    <div className="w-full max-w-sm rounded-xl border p-3 bg-background">
      <div className="text-sm font-medium mb-2">Select date</div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && onDateChange(date)}
        className="w-full"
        classNames={{
          months: "w-full",
          month: "w-full space-y-2",

          /* Month header + arrows */
          caption: "flex items-center justify-between px-2 py-2",
          caption_label: "text-sm font-medium",

          nav: "flex items-center gap-2",
          nav_button:
            "h-8 w-8 rounded-md border bg-background hover:bg-muted text-foreground inline-flex items-center justify-center",
          nav_button_previous: "",
          nav_button_next: "",

          /* Weekdays + days (aligned) */
          head_row: "grid grid-cols-7",
          head_cell:
            "h-8 text-[11px] font-medium text-muted-foreground text-center",

          table: "w-full border-collapse",
          row: "grid grid-cols-7",
          cell: "h-9 w-9 p-0 mx-auto text-center",

          day: "h-9 w-9 rounded-full hover:bg-muted",
          day_selected:
            "bg-violet-600 text-white hover:bg-violet-600 focus:bg-violet-600",
          day_today: "border border-muted-foreground",
        }}
      />
    </div>
  );
}
