"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const recentProjects = [
  { id: "0c11bb26-a3b5-4f85-aaad-0178fc1ad47f", name: "you" },
  { id: "1b22cc33-b4c6-5d97-bbae-1234abcd5678", name: "Software development" },
  { id: "2c33dd44-c5d7-6e08-ccbf-2345bcde6789", name: "E-SHOP" },
];

interface ProjectsSidebarProps {
  selectedSection?: string;
  onSelectSection?: (section: string) => void;
  onCollapse?: () => void;
}

export default function ProjectsSidebar({
  selectedSection,
  onSelectSection,
  onCollapse,
}: ProjectsSidebarProps = {}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  return (
    <aside
      className={`
        relative transition-all duration-300
        ${isCollapsed ? "w-16 px-2" : "w-80 px-6"}
      `}
      style={{ minHeight: "100vh" }}
    >
      {/* Poignée flottante */}
      <button
        onClick={() => {
          if (!isCollapsed && onCollapse) {
            onCollapse();
          } else {
            setIsCollapsed((v) => !v);
          }
        }}
        className={`
          absolute top-8 -left-4 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center
          transition-transform duration-300
          ${isCollapsed ? "" : "rotate-180"}
        `}
        style={{ outline: "none" }}
        title={
          isCollapsed
            ? "Déplier la barre latérale"
            : "Réduire la barre latérale"
        }
      >
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <polyline
            points="15,18 9,12 15,6"
            strokeWidth={2}
            stroke="currentColor"
          />
        </svg>
      </button>

      {/* Contenu de la sidebar */}
      {!isCollapsed ? (
        <div
          className={`
            bg-gray-50 border-l border-gray-200 h-full py-8 flex flex-col transition-opacity duration-300 opacity-100 w-full
          `}
        >
          {/* Recherche, filtres, projets récents... */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Rechercher des projets"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">
                Filtrer
              </button>
              <button className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 cursor-pointer">
                Trier
              </button>
            </div>
            <div>
              <div className="text-xs text-gray-400 font-semibold mb-2">
                PROJETS RÉCENTS
              </div>
              <ul className="flex flex-col gap-1">
                {recentProjects.map((proj) => (
                  <li
                    key={proj.id}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/projects/${proj.id}`)
                    }
                  >
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    {proj.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between py-8">
          {/* Top section */}
          <div className="flex flex-col items-center gap-2">
            {/* Projet */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg border border-gray-200 bg-white shadow-sm px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Projets
              </span>
            </button>
            <div className="w-8 border-t border-gray-200 my-2" />
            {/* Favoris */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Favoris
              </span>
            </button>
            {/* Statistiques */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Statistiques
              </span>
            </button>
            {/* Corbeille */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Corbeille
              </span>
            </button>
            {/* Modèles */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h10v10H7z" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Modèles
              </span>
            </button>
            {/* Autres */}+{" "}
            <button className="flex items-center w-full min-w-0 justify-center rounded-lg px-2 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6v6H9z" />
              </svg>
              <span
                className={`
                  transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Autres
              </span>
            </button>
            <div className="w-8 border-t border-gray-200 my-2" />
          </div>
          {/* Bottom section */}
          <div className="flex flex-col items-center gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polygon
                    points="12,2 22,8 22,16 12,22 2,16 2,8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span
                  className={`
                    transition-all duration-300 whitespace-nowrap
                    ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                  `}
                  style={{ minWidth: isCollapsed ? 0 : undefined }}
                >
                  Projet récent
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
