"use client";

import React from "react";
import Sidebar from "@/app/components/dashboard/sidebar";
import FilesMainContent from "./FilesMainContent";

const folders = [
  {
    id: "1",
    name: "yoyo",
    createdAt: "now",
  },
];

const files = [
  {
    id: "1",
    name: "fake_emails.xlsx",
    extension: ".xlsx",
    createdAt: "now",
  },
];

export default function FilesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedSection="files" onSelectSection={() => {}} />
      <main className="flex-1 overflow-hidden">
        <FilesMainContent
          folders={folders}
          files={files}
          onUploadFile={() => {
            // TODO: ouvrir modal d'upload
          }}
          onCreateFolder={() => {
            // TODO: ouvrir modal création dossier
          }}
        />
      </main>
    </div>
  );
}
