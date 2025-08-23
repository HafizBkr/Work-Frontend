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
        <div className="flex items-center justify-between px-10 pt-8 pb-2 bg-white">
          {/* Groupe titre + navigation + aujourd'hui */}
          <div className="flex items-center">
            <span
              className="text-3xl font-extrabold text-black tracking-tight lowercase text-left flex-shrink-0 whitespace-nowrap overflow-hidden"
              style={{ width: "220px", minWidth: "220px" }}
            >
              {calendarTitle}
            </span>
            <div className="flex items-center gap-2 ml-8">
              <button
                className="rounded bg-white border border-gray-200 text-black px-4 py-2 font-bold text-base cursor-pointer"
                style={{ minWidth: 36 }}
                onClick={handlePrev}
                aria-label="Mois précédent"
              >
                &lt;
              </button>
              <button
                className="rounded bg-white border border-gray-200 text-black px-4 py-2 font-bold text-base cursor-pointer"
                style={{ minWidth: 36 }}
                onClick={handleNext}
                aria-label="Mois suivant"
              >
                &gt;
              </button>
              <button
                className="rounded bg-white border border-gray-200 text-black px-5 py-2 ml-2 font-semibold text-base cursor-pointer"
                onClick={handleToday}
              >
                Aujourd&apos;hui
              </button>
            </div>
          </div>
          {/* Boutons de vue */}
          <div className="flex items-center gap-2">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border cursor-pointer ${
                activeView === "dayGridMonth"
                  ? "bg-gray-100 text-black border-gray-200"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
              style={
                activeView === "dayGridMonth"
                  ? {
                      fontWeight: 700,
                      background: "#f5f5f5",
                      color: "#222",
                      borderColor: "#eee",
                    }
                  : {}
              }
              onClick={() => handleView("dayGridMonth")}
            >
              Mois
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border cursor-pointer ${
                activeView === "dayGridWeek"
                  ? "bg-gray-100 text-black border-gray-200"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
              style={
                activeView === "dayGridWeek"
                  ? {
                      fontWeight: 700,
                      background: "#f5f5f5",
                      color: "#222",
                      borderColor: "#eee",
                    }
                  : {}
              }
              onClick={() => handleView("timeGridWeek")}
            >
              Semaine
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border cursor-pointer ${
                activeView === "dayGridDay"
                  ? "bg-gray-100 text-black border-gray-200"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
              style={
                activeView === "dayGridDay"
                  ? {
                      fontWeight: 700,
                      background: "#f5f5f5",
                      color: "#222",
                      borderColor: "#eee",
                    }
                  : {}
              }
              onClick={() => handleView("timeGridDay")}
            >
              Jour
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-lg border cursor-pointer ${
                activeView === "list"
                  ? "bg-gray-100 text-black border-gray-200"
                  : "bg-white text-gray-400 border-gray-200"
              }`}
              style={
                activeView === "list"
                  ? {
                      fontWeight: 700,
                      background: "#f5f5f5",
                      color: "#222",
                      borderColor: "#eee",
                    }
                  : {}
              }
              onClick={() => handleView("list")}
            >
              Liste
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col px-0 pb-0">
          <div className="flex-1 overflow-hidden">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden w-full h-full p-[1%]">
              <CalendarWithRef
                ref={calendarRef}
                onTitleChange={setCalendarTitle}
                onViewChange={setActiveView}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
