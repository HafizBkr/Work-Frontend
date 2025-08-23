"use client";

import React, { useState } from "react";
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface CreateFolderDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (folderName: string) => void;
}

export default function CreateFolderDrawer({
  open,
  onClose,
  onSubmit,
}: CreateFolderDrawerProps) {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    onSubmit(folderName.trim());
    setFolderName("");
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Créer un nouveau dossier
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="flex-1">
            <Input
              label="Nom du dossier"
              placeholder="Entrez le nom du dossier"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              autoFocus
              className="bg-gray-100"
              containerClassName="text-gray-900"
            />
          </div>

          {/* Footer avec boutons */}
          <div className="flex justify-between gap-4 mt-8">
            <Button
              type="button"
              onClick={onClose}
              className="bg-black text-white  font-semibold px-8 py-3 rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-black text-white  font-semibold px-8 py-3 rounded-xl"
            >
              Créer
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
