"use client";

import { useParams } from "next/navigation";
import React, { useRef, useState, forwardRef } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/app/components/dashboard/sidebar";

// Typage strict pour CalendarWithRef
import type { CalendarProps } from "@/app/components/calendar/Calendar";
import type FullCalendar from "@fullcalendar/react";

// Import dynamique sans forwardRef ici
const CalendarDynamic = dynamic(
  () => import("@/app/components/calendar/Calendar"),
  { ssr: false },
);

// Wrapper local qui forward la ref avec typage strict
const CalendarWithRef = forwardRef<FullCalendar | null, CalendarProps>(
  (props, ref) => <CalendarDynamic {...props} ref={ref} />,
);
CalendarWithRef.displayName = "CalendarWithRef";

const CalendarPage = () => {
  const params = useParams();
  const calendarId = params?.id;

  const calendarRef = useRef<FullCalendar | null>(null);
  const [calendarTitle, setCalendarTitle] = useState("Chargement...");
  const [activeView, setActiveView] = useState("dayGridMonth");

  const handlePrev = () => {
    const api = calendarRef.current?.getApi();
    if (api) api.prev();
  };
  const handleNext = () => {
    const api = calendarRef.current?.getApi();
    if (api) api.next();
  };
  const handleToday = () => {
    const api = calendarRef.current?.getApi();
    if (api) api.today();
  };
  const handleView = (view: string) => {
    const api = calendarRef.current?.getApi();
    if (api) api.changeView(view);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedSection="calendar" onSelectSection={() => {}} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-10 pt-8 pb-2">
          <h1 className="text-3xl font-extrabold text-black tracking-tight lowercase">
            {calendarTitle}
          </h1>
          <div className="flex items-center gap-2">
            <button
              className="rounded bg-gray-700 text-white px-6 py-2 font-bold text-xl"
              onClick={handlePrev}
              aria-label="Mois précédent"
            >
              &lt;
            </button>
            <button
              className="rounded bg-gray-700 text-white px-6 py-2 font-bold text-xl"
              onClick={handleNext}
              aria-label="Mois suivant"
            >
              &gt;
            </button>
            <button
              className="rounded bg-gray-200 text-black px-6 py-2 ml-2 font-semibold text-lg"
              onClick={handleToday}
            >
              Aujourd&apos;hui
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border ${
                activeView === "dayGridMonth"
                  ? "bg-gray-700 text-white border-gray-700 shadow"
                  : "bg-gray-100 text-black border-gray-200"
              }`}
              onClick={() => handleView("dayGridMonth")}
            >
              Mois
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border ${
                activeView === "dayGridWeek"
                  ? "bg-gray-700 text-white border-gray-700 shadow"
                  : "bg-gray-100 text-black border-gray-200"
              }`}
              onClick={() => handleView("dayGridWeek")}
            >
              Semaine
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border ${
                activeView === "dayGridDay"
                  ? "bg-gray-700 text-white border-gray-700 shadow"
                  : "bg-gray-100 text-black border-gray-200"
              }`}
              onClick={() => handleView("dayGridDay")}
            >
              Jour
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col px-0 pb-0">
          <div className="flex-1 overflow-hidden">
            <CalendarWithRef
              ref={calendarRef}
              onTitleChange={setCalendarTitle}
              onViewChange={setActiveView}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
