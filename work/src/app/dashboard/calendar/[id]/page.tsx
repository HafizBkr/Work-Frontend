"use client";

import { useParams } from "next/navigation";
import React, {
  useRef,
  useState,
  forwardRef,
  useEffect,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/app/components/dashboard/sidebar";
import { useSidebar } from "@/app/components/dashboard/context/SidebarContext";

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
  const { isCollapsed } = useSidebar();

  // Fonction de redimensionnement optimisée
  const updateCalendarSize = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      api.updateSize();
    }
  }, []);

  // Gestion fluide du redimensionnement - différer complètement le redimensionnement
  useEffect(() => {
    const handleResize = () => {
      updateCalendarSize();
    };

    // Désactiver temporairement le calendrier pendant la transition
    const api = calendarRef.current?.getApi();
    if (api) {
      // Cacher temporairement pendant la transition pour éviter les débordements
      const calendarEl = api.el;
      if (calendarEl) {
        calendarEl.style.visibility = "hidden";
      }
    }

    // Réactiver et redimensionner après la transition
    const timer = setTimeout(() => {
      const api = calendarRef.current?.getApi();
      if (api) {
        const calendarEl = api.el;
        if (calendarEl) {
          calendarEl.style.visibility = "visible";
        }
        updateCalendarSize();
      }
    }, 320);

    // Listener pour le redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed, updateCalendarSize]);

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
    if (api) {
      api.changeView(view);
      // Force le redimensionnement après changement de vue
      setTimeout(() => updateCalendarSize(), 100);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ overflow: "hidden" }}>
      {/* Style inline pour être sûr */}
      <Sidebar selectedSection="calendar" onSelectSection={() => {}} />
      <main
        className="flex-1 flex flex-col transition-all duration-300 ease-out"
        style={{
          width: isCollapsed ? "calc(100vw - 60px)" : "calc(100vw - 240px)",
          maxWidth: isCollapsed ? "calc(100vw - 60px)" : "calc(100vw - 240px)",
          minWidth: 0,
          height: "100vh",
          overflow: "hidden", // Style inline pour être sûr
        }}
      >
        <div className="flex items-center justify-between px-10 pt-8 pb-2 bg-white overflow-hidden flex-shrink-0">
          {/* Ajout flex-shrink-0 */}
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
        <div className="flex-1 flex flex-col px-0 pb-0 overflow-hidden min-h-0">
          {/* Ajout min-h-0 pour forcer la compression */}
          <div className="flex-1 overflow-hidden min-h-0">
            {/* Ajout min-h-0 */}
            <div
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden w-full h-full p-[1%] min-h-0"
              style={{
                width: "100%",
                minWidth: 0,
                height: "100%", // Force 100% de la hauteur disponible
              }}
            >
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
