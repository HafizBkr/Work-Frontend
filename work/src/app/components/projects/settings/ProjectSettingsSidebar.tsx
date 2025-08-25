import React from "react";

interface ProjectSettingsSidebarProps {
  activeSection: string;
  onMenuClick: (section: string) => void;
}

export default function ProjectSettingsSidebar({
  activeSection,
  onMenuClick,
}: ProjectSettingsSidebarProps) {
  return (
    <nav className="w-60 bg-gray-50 border-r flex flex-col py-8 px-4 h-full">
      <div className="flex flex-col gap-1">
        <button
          className={`mb-1 text-left py-2 px-3 rounded-lg flex items-center gap-2 transition ${
            activeSection === "informations"
              ? "bg-white font-bold shadow text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onMenuClick("informations")}
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
          </svg>
          Informations
        </button>
        <button
          className={`mb-1 text-left py-2 px-3 rounded-lg flex items-center gap-2 transition ${
            activeSection === "equipe"
              ? "bg-white font-bold shadow text-black"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onMenuClick("equipe")}
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M17 21v-2a4 4 0 0 0-8 0v2" />
          </svg>
          Équipe
        </button>
      </div>
      <div className="flex-1" />
      <button
        className={`mt-auto text-left py-2 px-3 rounded-lg flex items-center gap-2 transition text-red-600 ${
          activeSection === "supprimer"
            ? "bg-red-50 font-bold"
            : "hover:bg-red-50"
        }`}
        onClick={() => onMenuClick("supprimer")}
        type="button"
      >
        <svg
          className="w-5 h-5 text-red-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        Supprimer
      </button>
    </nav>
  );
}
