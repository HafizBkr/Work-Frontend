"use client";

import React from "react";
import Sidebar from "@/app/components/dashboard/sidebar";
import NotesMainContent from "../../components/notes/NotesMainContent";

const notes = [
  {
    id: "1",
    title: "Première note",
    content: "Ceci est le contenu de la première note.",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    title: "Idée de projet",
    content: "Penser à ajouter une fonctionnalité de recherche.",
    createdAt: "2024-06-02",
  },
];

export default function NotesPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar selectedSection="notes" onSelectSection={() => {}} />
      <main className="flex-1 overflow-hidden">
        <NotesMainContent
          notes={notes}
          onCreateNote={() => {
            // TODO: ouvrir modal de création de note
          }}
        />
      </main>
    </div>
  );
}
