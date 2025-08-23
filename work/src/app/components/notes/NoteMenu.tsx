"use client";

import React, { useRef, useEffect } from "react";

interface NoteMenuProps {
  noteId: string;
  isPinned?: boolean;
  onClose: () => void;
  onTogglePin?: (id: string) => void;
  onShare?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  position?: "top" | "right";
}

export default function NoteMenu({
  noteId,
  isPinned = false,
  onClose,
  onTogglePin,
  onShare,
  onRename,
  onDelete,
  position = "right",
}: NoteMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={`absolute z-50 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 ${
        position === "top" ? "right-0 top-full mt-2" : "left-full top-0 ml-2"
      }`}
    >
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onTogglePin?.(noteId);
          onClose();
        }}
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="M17 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-3 3v7a1 1 0 0 1-2 0v-7l-3-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z" />
        </svg>
        {isPinned ? "Désépingler" : "Épingler"}
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onShare?.(noteId);
          onClose();
        }}
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="M4 12v-2a4 4 0 0 1 4-4h8" />
          <polyline points="16 4 20 8 16 12" />
          <path d="M20 8H8a4 4 0 0 0-4 4v2" />
        </svg>
        Partager la note
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onRename?.(noteId);
          onClose();
        }}
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </svg>
        Renommer
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => {
          onDelete?.(noteId);
          onClose();
        }}
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-400"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        Supprimer
      </button>
    </div>
  );
}
