import React from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import ProjectSettingsSidebar from "./ProjectSettingsSidebar";
import ProjectSettingsInformations from "./ProjectSettingsInformations";
import ProjectSettingsEquipe from "./ProjectSettingsEquipe";
import ProjectSettingsSupprimer from "./ProjectSettingsSupprimer";

interface ProjectSettingsModalProps {
  projectId: string;
  onClose: () => void;
  section?: string;
}

export default function ProjectSettingsModal({
  projectId,
  onClose,
  section: sectionProp,
}: ProjectSettingsModalProps) {
  const router = useRouter();
  // State local pour affichage instantané de la section
  const [activeSection, setActiveSection] = React.useState(
    sectionProp || "informations",
  );

  // Synchronise le state local avec la prop section (utile navigation arrière/avant)
  React.useEffect(() => {
    setActiveSection(sectionProp || "informations");
  }, [sectionProp]);

  // Navigation menu
  const handleMenuClick = (section: string) => {
    router.replace(`/dashboard/projects/${projectId}?settings=${section}`);
    setActiveSection(section); // MAJ immédiate du contenu
  };

  // Fermer la modal si on clique sur le fond noir
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseAndCleanUrl();
    }
  };

  // Nettoyer l'URL en retirant le paramètre settings
  const handleCloseAndCleanUrl = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.delete("settings");
      const newUrl =
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "");
      router.replace(newUrl);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-xl flex w-[900px] h-[700px] overflow-hidden relative">
        <ProjectSettingsSidebar
          activeSection={activeSection}
          onMenuClick={handleMenuClick}
        />
        <div className="flex-1 p-8 overflow-y-auto">
          {activeSection === "informations" && (
            <ProjectSettingsInformations projectId={projectId} />
          )}
          {activeSection === "equipe" && (
            <ProjectSettingsEquipe projectId={projectId} />
          )}
          {activeSection === "supprimer" && (
            <ProjectSettingsSupprimer projectId={projectId} />
          )}
        </div>
        <button
          onClick={handleCloseAndCleanUrl}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 transition"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  );
}
