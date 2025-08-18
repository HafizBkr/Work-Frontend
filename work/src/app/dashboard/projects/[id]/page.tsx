"use client";
import { use } from "react";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
import ProjectsSidebar from "@/app/components/projects/ProjectsSidebar";
import ProjectDetailsPage from "@/app/components/projects/ProjectDetailsPage";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar principale à gauche */}
      <DashboardSidebar selectedSection="projects" />

      {/* Contenu principal + sidebar projet */}
      <div className="flex flex-1">
        {/* Contenu principal au centre */}
        <main className="flex-1  py-6">
          <ProjectDetailsPage projectId={id} />
        </main>

        {/* Sidebar projet à droite */}
        {/*<aside className="w-[320px] border-l bg-white">
          <ProjectsSidebar />
        </aside>*/}
      </div>
    </div>
  );
}
