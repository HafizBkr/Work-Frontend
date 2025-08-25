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
        {/* Header fixe avec titre */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-10 pt-4 pb-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <input
              className="text-2xl font-bold text-black bg-transparent border-none outline-none px-2 py-1"
              defaultValue="Titre de la note"
              style={{ minWidth: 200, maxWidth: 400 }}
            />
          </div>
          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">
              ID: {noteId}
            </span>
          </div>
        </div>

        {/* Zone d'édition pleine largeur */}
        <div className="flex-1 overflow-auto bg-white flex items-center justify-center">
          <TiptapEditor />
        </div>
      </main>
    </div>
  );
}
