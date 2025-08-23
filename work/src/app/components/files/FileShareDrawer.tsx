"use client";

import React from "react";
import Drawer from "@/app/components/ui/Drawer";
import Button from "@/app/components/ui/Button";

interface FileShareDrawerProps {
  open: boolean;
  onClose: () => void;
  fileName: string;
  // Ajoute ici d'autres props si besoin (ex: membres, callbacks, etc)
}

export default function FileShareDrawer({
  open,
  onClose,
  fileName,
}: FileShareDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} width={500}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-lg w-full mx-auto relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 truncate">{fileName}</h2>
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
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Membres, groupes et externes..."
              type="text"
              // value, onChange à brancher selon logique réelle
            />
            <Button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
              Ajouter
            </Button>
          </div>
        </div>

        {/* Liste des personnes ayant accès */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900">Personnes ayant accès</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-bold">
              Hafiz
            </span>
            <span className="text-gray-900">Hafiz BOUKARI</span>
            <span className="ml-auto text-xs text-gray-500">Propriétaire</span>
          </div>
          {/* Ajouter ici la liste dynamique des membres si besoin */}
        </div>
      </div>
    </Drawer>
  );
}
