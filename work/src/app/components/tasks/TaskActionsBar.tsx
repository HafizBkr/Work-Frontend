import React from "react";

interface TaskActionsBarProps {
  onCreateTask: () => void;
}

export default function TaskActionsBar({
  onCreateTask,
}: TaskActionsBarProps) {
  return (
    <div className="flex flex-col items-end gap-2 w-full">
      {/* Ligne 1 : Créer tâche + Recherche */}
      <div className="flex items-center gap-3">
        <button
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition flex items-center gap-2 text-base"
          onClick={onCreateTask}
        >
          <span className="text-lg">+</span> Créer une tâche
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des tâches"
            className="pl-9 pr-4 py-2 rounded-lg border-none bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition w-56"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
      {/* Ligne 2 : Filtrer + Trier */}
      <div className="flex items-center gap-2 mt-1">
        <button className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 flex items-center gap-2 font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 13.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17v-3.586a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z" />
          </svg>
          Filtrer
        </button>
        <button className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 flex items-center gap-2 font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
          Trier
        </button>
      </div>
    </div>
  );
}
