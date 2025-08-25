"use client";
import React, { useState } from "react";
import Link from "next/link";
import TaskActionsBar from "@/app/components/tasks/TaskActionsBar";
import CreateTaskDrawer from "./CreateTaskDrawer";
import KanbanBoard from "./KanbanBoard";
import ProjectViewTabs from "./ProjectViewTabs";
import ProjectSettingsModal from "./settings/ProjectSettingsModal";
import { useRouter, usePathname } from "next/navigation";

interface ProjectDetailsPageProps {
  projectId: string;
  projectName?: string;
}

interface TaskFormValues {
  task_title: string;
  task_description: string;
  task_status: string;
  task_assign_to: string;
  task_priority: string;
  task_points: number;
  task_dates: {
    start_date: string;
    due_date: string;
  };
  task_order: number;
  completion_percentage: number;
}

interface TaskFormValues {
  task_title: string;
  task_description: string;
  task_status: string;
  task_assign_to: string;
  task_priority: string;
  task_points: number;
  task_dates: {
    start_date: string;
    due_date: string;
  };
  task_order: number;
  completion_percentage: number;
}

export default function ProjectDetailsPage({
  projectId,
  projectName = "Software development",
}: ProjectDetailsPageProps) {
  const [openTaskDrawer, setOpenTaskDrawer] = useState(false);

  // Ouvre la modal si un paramètre settings est présent dans l'URL (corrigé via useEffect)
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [settingsSection, setSettingsSection] =
    useState<string>("informations");

  // Synchronise la section affichée avec le paramètre settings de l'URL à chaque changement
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const section = params.get("settings");
      if (section) {
        setOpenSettingsModal(true);
        setSettingsSection(section);
      } else if (params.has("settings")) {
        setOpenSettingsModal(true);
        setSettingsSection("informations");
      } else {
        setOpenSettingsModal(false);
      }
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);

  // À remplacer par la vraie liste des utilisateurs du projet
  const users = [
    { id: "uuid-user-assigné", name: "Utilisateur Assigné" },
    { id: "uuid-user-2", name: "Autre Utilisateur" },
  ];

  const handleCreateTask = () => {
    setOpenTaskDrawer(true);
  };

  const handleCloseTaskDrawer = () => {
    setOpenTaskDrawer(false);
  };

  const handleSubmitTask = (task: TaskFormValues) => {
    // TODO: Envoyer la tâche à l'API ou au state manager
    // console.log("Nouvelle tâche :", task);
  };

  // Ouvre la modal de paramètres projet et injecte ?settings=informations dans l'URL
  const handleOpenSettings = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("settings", "informations");
      const newUrl =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }
    setOpenSettingsModal(true);
    setSettingsSection("informations");
  };

  const handleCloseSettings = () => {
    setOpenSettingsModal(false);
  };

  return (
    <div className="flex min-h-screen bg-white overflow-x-hidden min-w-[100%]">
      {/* Main content */}
      <div className="flex-1 mt-[70px]">
        {/* Header */}
        <div className="flex items-center justify-between h-2 py-8">
          <div className="flex mb-17 items-center gap-3 w-full ">
            <Link
              href="/dashboard/projects"
              className="flex items-center text-gray-500 hover:text-purple-600 transition font-medium mr-4"
              title="Retour à la liste des projets"
            >
              <svg
                className="w-6 h-6 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Projets
            </Link>
            <span className="inline-flex items-center min-w-0">
              <svg
                className="w-7 h-7 text-green-600 mr-2 flex-shrink-0"
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
              <span className="text-3xl font-extrabold text-gray-900 truncate break-words">
                {projectName}
              </span>
            </span>
            {/* Bouton Paramètres avec icône engrenage */}
            <button
              className="ml-4 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition"
              onClick={handleOpenSettings}
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6V4a2 2 0 0 1 4 0v.09c.3.07.58.19.82.33a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6c.07.3.19.58.33.82H21a2 2 0 0 1 0 4h-.09c-.07.3-.19.58-.33.82z" />
              </svg>
              Paramètres
            </button>
            {/* Ajout du composant TaskActionsBar ici */}
            <TaskActionsBar onCreateTask={handleCreateTask} />
          </div>
        </div>

        <div className="border-b ">
          <ProjectViewTabs
            currentView="kanban"
            onViewChange={(view) => console.log(view)}
            projectId={projectId}
          />
        </div>
        <div className="px-12 py-8">
          <KanbanBoard />
        </div>
        <CreateTaskDrawer
          open={openTaskDrawer}
          onClose={handleCloseTaskDrawer}
          onSubmit={handleSubmitTask}
          users={users}
        />
        {/* Modal paramètres projet */}
        {openSettingsModal && (
          <ProjectSettingsModal
            projectId={projectId}
            onClose={handleCloseSettings}
            section={settingsSection}
          />
        )}
      </div>
    </div>
  );
}
