import React from "react";

interface TaskActionsBarProps {
  onCreateTask: () => void;
}

export default function TaskActionsBar({ onCreateTask }: TaskActionsBarProps) {
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
    </div>
  );
}
