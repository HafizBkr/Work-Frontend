import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import type { CalendarApi } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { v4 as uuidv4 } from "uuid";
import EventDrawer from "./EventDrawer";
import "../../../app/globals.css";
type CalendarEvent = {
  id: string;
  event_title: string;
  event_description?: string;
  start_datetime: string;
  end_datetime: string;
};

export type CalendarProps = {
  // Pour permettre au parent de contrôler FullCalendar (ref)
  onTitleChange?: (title: string) => void;
  onViewChange?: (view: string) => void;
};

// Type du handle exposé via le ref
export type CalendarHandle = {
  getApi: () => CalendarApi;
};

const Calendar = forwardRef<CalendarHandle, CalendarProps>(
  ({ onTitleChange, onViewChange }, ref) => {
    const calendarRef = useRef<FullCalendar | null>(null);

    // Expose getApi to parent via ref, typé explicitement
    useImperativeHandle(ref, () => ({
      getApi: (): CalendarApi => calendarRef.current!.getApi(),
    }));

    const [events, setEvents] = useState<CalendarEvent[]>([
      {
        id: uuidv4(),
        event_title: "4:49 PM Meeting",
        event_description: "Réunion rapide",
        start_datetime: "2025-08-10T16:49:00",
        end_datetime: "2025-08-10T17:00:00",
      },
      {
        id: uuidv4(),
        event_title: "23",
        event_description: "",
        start_datetime: "2025-08-23",
        end_datetime: "2025-08-23",
      },
    ]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedStart, setSelectedStart] = useState<string | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<string | null>(null);

    // Handle date click to open drawer - optimized with useCallback
    const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
      setSelectedStart(selectInfo.startStr);
      setSelectedEnd(selectInfo.endStr);
      setDrawerOpen(true);
    }, []);

    // Add event - optimized with useCallback
    const handleAddEvent = useCallback(
      (data: {
        event_title: string;
        event_description: string;
        start_datetime: string;
        end_datetime: string;
      }) => {
        setEvents((prev) => [
          ...prev,
          {
            id: uuidv4(),
            ...data,
          },
        ]);
        setDrawerOpen(false);
        setSelectedStart(null);
        setSelectedEnd(null);
      },
      [],
    );

    // Handle event click with better UX
    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
      const desc = clickInfo.event.extendedProps.description || "";
      const title = clickInfo.event.title;

      const msg = `📅 ${title}\n${desc ? `📝 ${desc}` : "📝 Aucune description"}\n\n⚠️ Voulez-vous supprimer cet événement ?`;

      if (window.confirm(msg)) {
        setEvents((prev) => prev.filter((e) => e.id !== clickInfo.event.id));
      }
    }, []);

    // Close drawer handler
    const handleCloseDrawer = useCallback(() => {
      setDrawerOpen(false);
      setSelectedStart(null);
      setSelectedEnd(null);
    }, []);

    // Map events to FullCalendar format
    const fullCalendarEvents = useMemo(
      () =>
        events.map((e) => ({
          id: e.id,
          title: e.event_title,
          start: e.start_datetime,
          end: e.end_datetime,
          extendedProps: {
            description: e.event_description,
          },
          allDay: e.start_datetime.length <= 10,
          className: "calendar-event",
        })),
      [events],
    );

    // Event styling function matching the image
    const getEventClasses = useCallback(() => {
      return [
        "bg-purple-500",
        "hover:bg-purple-600",
        "text-white font-medium",
        "rounded px-2 py-1",
        "text-xs",
        "transition-all duration-200",
        "cursor-pointer",
        "shadow-sm",
      ].join(" ");
    }, []);

    // Synchronise le titre et la vue avec le parent
    const handleDatesSet = useCallback(
      (arg: { view: { title: string; type: string } }) => {
        if (onTitleChange) onTitleChange(arg.view.title);
        if (onViewChange) onViewChange(arg.view.type);
      },
      [onTitleChange, onViewChange],
    );

    return (
      <div className="bg-white h-full flex flex-col">
        <div className="flex-1">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={frLocale}
            headerToolbar={false}
            events={fullCalendarEvents}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="100%"
            dayMaxEvents={3}
            fixedWeekCount={false}
            displayEventTime={true}
            eventClassNames={getEventClasses}
            dayHeaderClassNames="text-gray-500 font-semibold uppercase text-xs"
            dayCellClassNames="hover:bg-gray-50 cursor-pointer"
            datesSet={handleDatesSet}
            dayMaxEventRows={4}
            eventDisplay="block"
            eventBackgroundColor="#8b5cf6"
            eventBorderColor="#8b5cf6"
            eventTextColor="#ffffff"
            nowIndicator={false}
            selectMirror={true}
            unselectAuto={true}
            selectOverlap={true}
            eventOverlap={true}
            weekends={true}
            editable={false}
            droppable={false}
            eventStartEditable={false}
            eventDurationEditable={false}
          />
        </div>

        {/* Event Drawer */}
        <EventDrawer
          open={drawerOpen}
          initialStart={selectedStart}
          initialEnd={selectedEnd}
          onClose={handleCloseDrawer}
          onAdd={handleAddEvent}
        />
      </div>
    );
  },
);

Calendar.displayName = "Calendar";

export default Calendar;
