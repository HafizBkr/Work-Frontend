"use client";

import React from "react";
import ProjectsSidebar from "@/app/components/projects/ProjectsSidebar";
import ProjectCard from "./ProjectCard";
import ProjectActionsBar from "./ProjectActionsBar";
import CreateProjectDrawer from "./CreateProjectDrawer";

const projects = [
  {
    id: 1,
    name: "you",
    description: "yo",
    members: 2,
    progress: 0,
  },
  {
    id: 2,
    name: "Software development",
    description: "Description",
    members: 2,
    progress: 0,
  },
  {
    id: 3,
    name: "E-SHOP",
    description: "Hello",
    members: 2,
    progress: 0,
  },
];

export default function ProjectsPage() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-white mt-4">
      {/* Main content */}
      <div className="flex-1 px-12 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          {/* Left: Title & meta */}
          <div className="w-100 mb-11">
            <h1 className="text-3xl font-bold text-gray-900">
              Tous les projets
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-400 text-sm">
                {projects.length} projets
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                </svg>
                Date de création
              </span>
            </div>
          </div>
          {/* Right: Actions sur 2 lignes */}
          <ProjectActionsBar onOpenDrawer={() => setOpenDrawer(true)} />
        </div>
        {/* Projets */}
        <div className="flex gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <CreateProjectDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      </div>
      {/* Sidebar droite */}
      <ProjectsSidebar />
    </div>
  );
}
