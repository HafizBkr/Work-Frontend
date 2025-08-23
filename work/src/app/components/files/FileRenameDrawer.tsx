"use client";

import React, { useState, useEffect } from "react";
import Drawer from "@/app/components/ui/Drawer";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

interface FileRenameDrawerProps {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onSubmit: (newName: string) => void;
}

export default function FileRenameDrawer({
  open,
  initialName,
  onClose,
  onSubmit,
}: FileRenameDrawerProps) {
  const [fileName, setFileName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFileName(initialName);
    setError(null);
  }, [initialName, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = fileName.trim();
    if (!trimmed) {
      setError("Le nom du fichier ne peut pas être vide");
      return;
    }
    if (trimmed === initialName) {
      onClose();
      return;
    }
    onSubmit(trimmed);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Renommer le fichier
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
              label="Nom du fichier"
              placeholder="Entrez le nouveau nom du fichier"
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError(null);
              }}
              required
              autoFocus
              className="bg-gray-100"
              containerClassName="text-gray-900"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>

          {/* Footer avec boutons */}
          <div className="flex justify-between gap-4 mt-8">
            <Button
              type="button"
              onClick={onClose}
              className="bg-black text-white font-semibold px-8 py-3 rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-black text-white font-semibold px-8 py-3 rounded-xl"
            >
              Renommer
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
