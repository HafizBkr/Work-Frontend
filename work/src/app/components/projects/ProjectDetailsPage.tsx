"use client";
import React, { useState } from "react";
import Link from "next/link";
import TaskActionsBar from "@/app/components/tasks/TaskActionsBar";
import CreateTaskDrawer from "./CreateTaskDrawer";
import ProjectsSidebar from "./ProjectsSidebar";

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

  return (
    <div className="flex min-h-screen bg-white">
      {/* Main content */}
      <div className="flex-1 px-12 py-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 w-full max-w-5xl">
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
            <span className="inline-flex items-center min-w-0 flex-1">
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
            <span className="text-gray-400 text-2xl font-bold ml-4">...</span>
          </div>
          <TaskActionsBar onCreateTask={handleCreateTask} />
          <CreateTaskDrawer
            open={openTaskDrawer}
            onClose={handleCloseTaskDrawer}
            onSubmit={handleSubmitTask}
            users={users}
          />
        </div>

        {/* Tri/Filtres (optionnel, si tu veux les séparer) */}
        {/* <div className="flex items-center gap-2 mb-4">
          <button className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 flex items-center gap-2 font-medium">
            Filtrer
          </button>
          <button className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 flex items-center gap-2 font-medium">
            Trier
          </button>
          <button className="px-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 flex items-center gap-2 font-medium">
            Paramètres
          </button>
        </div> */}

        {/* Ici tu mets le contenu Kanban, Liste, etc. */}
        {/* ... */}
      </div>
      {/* Sidebar droite */}
      <ProjectsSidebar />
    </div>
  );
}
