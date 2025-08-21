"use client";
import React, { use } from "react";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
import ProjectDetailsPage from "@/app/components/projects/ProjectDetailsMainComponets";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);

  return (
    <div className="relative flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar selectedSection="projects" onSelectSection={() => {}} />
      <main className="flex-1 h-full w-full overflow-y-auto flex justify-center items-start">
        <ProjectDetailsPage projectId={id} />
      </main>
    </div>
  );
}
