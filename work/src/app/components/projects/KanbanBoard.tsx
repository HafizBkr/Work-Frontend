"use client";
import React from "react";

const COLUMNS = [
  {
    key: "todo",
    title: "Non commencée",
    color: "border-gray-300",
    icon: (
      <svg
        className="w-4 h-4 mr-1 text-gray-400 animate-spin"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "in_progress",
    title: "En cours",
    color: "border-blue-400",
    icon: (
      <svg
        className="w-4 h-4 mr-1 text-blue-400 animate-spin"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "review",
    title: "À valider",
    color: "border-yellow-400",
    icon: (
      <svg
        className="w-4 h-4 mr-1 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "done",
    title: "Achevée",
    color: "border-green-500",
    icon: (
      <svg
        className="w-4 h-4 mr-1 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 12l2 2l4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "blocked",
    title: "Annulée / Bloquée",
    color: "border-red-400",
    icon: (
      <svg
        className="w-4 h-4 mr-1 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <line
          x1="8"
          y1="8"
          x2="16"
          y2="16"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="16"
          y1="8"
          x2="8"
          y2="16"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default function KanbanBoard() {
  return (
    <div className="flex gap-4 w-full overflow-x-auto pb-4">
      {/*{COLUMNS.map((col) => (
        <div
          key={col.key}
          className={`flex flex-col flex-shrink-0 w-64 min-h-[300px] bg-gray-50 rounded-xl border-t-4 ${col.color} shadow-sm`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center font-semibold text-gray-800 text-base">
              {col.icon}
              {col.title}
              <span className="ml-2 text-xs text-gray-400 font-normal">(0)</span>
            </div>
            <button
              className="ml-2 px-2 py-1 rounded text-xs font-medium text-purple-600 hover:bg-purple-50 transition"
              title="Ajouter une tâche"
            >
              +
            </button>
          </div>
          <div className="flex-1 px-4 py-3">
            <div className="text-gray-400 text-sm italic select-none">
              Ajouter une tâche
            </div>
          </div>
        </div>
      ))}*/}
    </div>
  );
}
