import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  name: string;
  description: string;
  members: number;
  progress: number;
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Empêche la propagation du clic sur le bouton menu
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-5 w-90 shadow-sm flex flex-col relative cursor-pointer transition hover:shadow-md"
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          router.push(`/dashboard/projects/${project.id}`);
        }
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-400"
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
          <span className="font-semibold text-gray-900">{project.name}</span>
        </div>
        <div className="relative" onClick={handleMenuClick}>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setShowMenu((v) => !v)}
            aria-label="Options projet"
            tabIndex={0}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full mt-2 z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 flex flex-col"
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                  // Redirige vers la page projet avec le paramètre settings=informations pour ouvrir la modal sur la bonne section
                  router.push(
                    `/dashboard/projects/${project.id}?settings=informations`,
                  );
                }}
                type="button"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                Modifier le projet
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                  alert("Gérer les membres");
                }}
                type="button"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M17 21v-2a4 4 0 0 0-8 0v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Gérer les membres
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                  alert("Dupliquer le projet");
                }}
                type="button"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <rect x="2" y="2" width="13" height="13" rx="2" />
                </svg>
                Dupliquer le projet
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                  alert("Supprimer le projet");
                }}
                type="button"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-500 text-sm mb-1">Description</div>
      <div className="text-gray-900 text-sm mb-3">{project.description}</div>

      <hr className="my-2 border-gray-100" />

      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
        Membres ({project.members})
        <span
          className="ml-2 w-7 h-7 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white border cursor-pointer"
          title="Hafiz BOUKARI"
        >
          Hafiz.
        </span>
      </div>

      <div className="flex items-center gap-2 text-gray-500 text-xs">
        Progression ({project.progress}%)
        <div className="flex-1 h-1 bg-gray-100 rounded-full ml-2">
          <div
            className="h-1 bg-black rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
