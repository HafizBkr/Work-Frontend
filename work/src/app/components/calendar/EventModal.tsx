import React from "react";

type Participant = {
  name: string;
  avatar?: string;
};

type EventModalProps = {
  event: {
    title: string;
    description?: string;
    date: string; // ex: "10 août, 2025"
    time: string; // ex: "4:49 PM - 5:50 PM"
    isOnline?: boolean;
    participants?: Participant[];
    calendarName?: string;
    color?: string; // ex: "#a78bfa"
  };
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-5 h-5 rounded-full"
            style={{ background: event.color || "#a78bfa" }}
          ></span>
          <h2 className="text-2xl font-extrabold text-black">{event.title}</h2>
        </div>
        {/* Description */}
        {event.description && (
          <div className="text-gray-500 text-sm mb-3">{event.description}</div>
        )}

        {/* Separator */}
        <div className="border-t border-gray-200 my-3" />

        {/* Date & Time */}
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-gray-900 text-sm">{event.date}</span>
          <span className="text-gray-400 text-xs ml-auto">{event.time}</span>
        </div>

        {/* Online/Offline */}
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M17 2.1A10 10 0 1 1 2 17" />
            <path d="M22 6 12 17l-5-5" />
          </svg>
          <span className="text-gray-900 text-sm">
            {event.isOnline
              ? "L'évènement est en ligne"
              : "L'évènement n'est pas en ligne"}
          </span>
        </div>

        {/* Participants */}
        <div className="flex items-center gap-2 mb-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-gray-900 text-sm">
            {event.participants && event.participants.length > 1
              ? `${event.participants.length} Participants`
              : "1 Participant"}
          </span>
          {event.participants && event.participants.length > 0 && (
            <span className="ml-auto flex">
              {event.participants.slice(0, 2).map((p, idx) =>
                p.avatar ? (
                  <img
                    key={idx}
                    src={p.avatar}
                    alt={p.name}
                    className="w-6 h-6 rounded-full border-2 border-white -ml-2 first:ml-0"
                  />
                ) : (
                  <span
                    key={idx}
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 border-2 border-white -ml-2 first:ml-0"
                  >
                    {p.name[0]}
                  </span>
                ),
              )}
            </span>
          )}
        </div>

        {/* Calendar */}
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="text-gray-900 text-sm flex-1">
            {event.calendarName || "Calendrier par défaut"}
          </span>
          <svg
            className="w-5 h-5 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <button
            className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
            onClick={onDelete}
          >
            Supprimer
          </button>
          <button
            className="flex-1 py-2 rounded-lg bg-black text-white font-semibold  transition"
            onClick={onEdit}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
