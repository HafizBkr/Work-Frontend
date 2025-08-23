"use client";

import React from "react";
import Drawer from "@/app/components/ui/Drawer";

interface NoteShareDrawerProps {
  open: boolean;
  onClose: () => void;
  noteTitle: string;
}

export default function NoteShareDrawer({
  open,
  onClose,
  noteTitle,
}: NoteShareDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} width={500}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-lg w-full mx-auto relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-black truncate">
            Partager la note
          </h2>
          <button
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition"
            onClick={onClose}
            type="button"
            aria-label="Fermer"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulaire d'ajout de membre */}
        <div className="mb-6">
          + <div className="text-sm text-black mb-1">Note à partager :</div>+{" "}
          <div className="font-semibold text-black">{noteTitle}</div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lien de partage
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-700 text-sm"
              value="https://work.app/notes/partage/123456"
              readOnly
            />
            <button
              className="px-3 py-2 bg-black text-white rounded font-semibold text-sm hover:bg-gray-800 transition"
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://work.app/notes/partage/123456",
                );
              }}
              type="button"
            >
              Copier
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inviter par email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              className="flex-1 px-3 py-2 border border-gray-200 rounded bg-gray-50 text-gray-700 text-sm"
              placeholder="email@exemple.com"
            />
            <button
              className="px-4 py-2 bg-black text-white rounded font-semibold text-sm hover:bg-gray-800 transition"
              type="button"
            >
              Envoyer
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-auto flex justify-end">
          <button
            className="px-5 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
            onClick={onClose}
            type="button"
          >
            Fermer
          </button>
        </div>
      </div>
    </Drawer>
  );
}
