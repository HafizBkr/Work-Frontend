"use client";

import React from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/dashboard/sidebar";
import FolderMainContent from "../../../../components/folder/FolderMainContent";

// Exemple de données fictives pour la démo
const FOLDERS: Record<
  string,
  {
    name: string;
    files: {
      id: string;
      name: string;
      extension?: string;
      createdAt?: string;
    }[];
  }
> = {
  "fc9480f0-8a8e-4ef7-bbf5-778e93aa837a": {
    name: "yoyo",
    files: [
      {
        id: "1",
        name: "fake_emails.xlsx",
        extension: ".xlsx",
        createdAt: "now",
      },
    ],
  },
  // Ajoute d'autres dossiers ici si besoin
  "1": {
    name: "Test dossier",
    files: [],
  },
};

export default function FolderPage() {
  const params = useParams();
  const folderId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Récupère le dossier courant (remplace par un fetch API dans un vrai projet)
  const folder = FOLDERS[folderId as string];

  // Si le dossier n'existe pas, redirige vers la page des dossiers
  if (!folder) {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard/files";
    }
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedSection="files" onSelectSection={() => {}} />
      <main className="flex-1 overflow-hidden">
        <FolderMainContent
          folderName={folder.name}
          files={folder.files}
          onUploadFile={() => {
            // TODO: ouvrir modal d'upload
          }}
        />
      </main>
    </div>
  );
}
