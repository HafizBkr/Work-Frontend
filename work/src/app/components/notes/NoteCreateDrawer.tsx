"use client";

import React, { useState, useEffect } from "react";
import Drawer from "@/app/components/ui/Drawer";

interface NoteCreateDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (noteTitle: string) => void;
}

export default function NoteCreateDrawer({
  open,
  onClose,
  onSubmit,
}: NoteCreateDrawerProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) setTitle("");
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTitle("");
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-md w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-black">Créer une note</h2>
          <button
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition"
            onClick={onClose}
            type="button"
            aria-label="Fermer"
          >
            <svg
              className="w-6 h-6 text-black"
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
        <form className="flex flex-col flex-1" onSubmit={handleSubmit}>
          <label
            className="text-sm font-medium text-black mb-2"
            htmlFor="note-title-input"
          >
            Titre de la note
          </label>
          <input
            id="note-title-input"
            className="border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-black text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            maxLength={100}
            required
            placeholder="Ma première note"
          />
          <div className="mt-auto flex gap-2">
            <button
              type="button"
              className="flex-1 py-2 rounded-lg border border-gray-200 text-black bg-white hover:bg-gray-50 transition"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition"
              disabled={!title.trim()}
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
