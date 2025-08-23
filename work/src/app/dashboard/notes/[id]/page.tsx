"use client";
import React from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/app/components/dashboard/sidebar";
import dynamic from "next/dynamic";
const TiptapEditor = dynamic(
  () => import("@/app/components/notes/TiptapEditor"),
  { ssr: false },
);

export default function NoteEditPage() {
  const params = useParams();
  const noteId = params?.id as string;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar dashboard */}
      <Sidebar selectedSection="notes" onSelectSection={() => {}} />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header/menu */}
        <div className="flex items-center justify-between px-10 pt-8 pb-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Titre de la note (à remplacer par le vrai titre) */}
            <input
              className="text-2xl font-bold text-black bg-transparent border-none outline-none px-2 py-1"
              defaultValue="Titre de la note"
              style={{ minWidth: 200, maxWidth: 400 }}
              // TODO: brancher la modification du titre
            />
            {/* (Optionnel) Statut, badge, etc. */}
          </div>
          {/* (Optionnel) Actions à droite : partager, menu, etc. */}
        </div>

        {/* Zone d'édition type Google Docs */}
        <div className="flex-1 flex justify-center items-start overflow-auto bg-gray-50">
          <div className="w-full max-w-3xl px-4 py-8">
            {/* Éditeur Tiptap */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow p-6 min-h-[600px]">
              <TiptapEditor />
              <div className="mt-4 text-xs text-gray-400 text-center">
                Note ID : <span className="font-mono">{noteId}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
