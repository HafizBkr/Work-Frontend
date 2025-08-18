"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../dashboard/sidebar";
import ProjectsPage from "../projects/ProjectsPage";
import { useRouter, usePathname } from "next/navigation";

const sectionComponentMap: Record<string, React.ReactNode> = {
  dashboard: (
    <div className="p-8 text-2xl font-bold text-black">
      Bienvenue sur le Dashboard !
    </div>
  ),
  projects: <ProjectsPage />,
  // Ajoute ici d'autres sections si besoin
  notifications: <div className="p-8 text-xl">Notifications</div>,
  integrations: <div className="p-8 text-xl">Intégrations</div>,
  "workspace-settings": (
    <div className="p-8 text-xl">Paramètres du workspace</div>
  ),
  help: <div className="p-8 text-xl">Centre d&apos;aide</div>,
};

function sectionFromPath(pathname: string) {
  if (pathname.endsWith("/dashboard/projects")) return "projects";
  if (pathname.endsWith("/dashboard/notifications")) return "notifications";
  if (pathname.endsWith("/dashboard/integrations")) return "integrations";
  if (pathname.endsWith("/dashboard/help")) return "help";
  if (pathname.endsWith("/settings/workspace")) return "workspace-settings";
  return "dashboard";
}

const DashboardLayout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState<string>(() =>
    sectionFromPath(pathname),
  );

  useEffect(() => {
    let url = "/dashboard";
    if (selectedSection && selectedSection !== "dashboard") {
      if (selectedSection === "workspace-settings") {
        url = "/settings/workspace";
      } else {
        url = `/dashboard/${selectedSection}`;
      }
    }
    if (pathname !== url) {
      router.replace(url);
    }
  }, [selectedSection]);

  useEffect(() => {
    const section = sectionFromPath(pathname);
    setSelectedSection(section);
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full">{sectionComponentMap[selectedSection]}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
