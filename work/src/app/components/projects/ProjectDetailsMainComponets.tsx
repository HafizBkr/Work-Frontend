"use client";
import React, { useState } from "react";
import Link from "next/link";
import TaskActionsBar from "@/app/components/tasks/TaskActionsBar";
import CreateTaskDrawer from "./CreateTaskDrawer";
import KanbanBoard from "./KanbanBoard";
import ProjectViewTabs from "./ProjectViewTabs";

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
            <span className="text-gray-400 text-2xl font-bold ml-2">...</span>
            {/* Ajout du composant TaskActionsBar ici */}
            <TaskActionsBar onCreateTask={handleCreateTask} />
          </div>
        </div>

        <div className="border-b ">
          <ProjectViewTabs
            currentView="kanban"
            onViewChange={(view) => console.log(view)}
            projectId="1"
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
      </div>
    </div>
  );
}
