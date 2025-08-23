"use client";

import React, { useRef, useEffect } from "react";

interface FileMenuProps {
  fileId: string;
  onClose: () => void;
  onShare?: (id: string) => void;
  onRename?: (id: string) => void;
  onInfo?: (id: string) => void;
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
  position?: "top" | "right";
}

export default function FileMenu({
  fileId,
  onClose,
  onShare,
  onRename,
  onInfo,
  onDownload,
  onDelete,
  position = "right",
}: FileMenuProps) {
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
          onShare?.(fileId);
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
        Partager le fichier
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onRename?.(fileId);
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
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        Renommer le fichier
      </button>
      <div className="my-2 border-t border-gray-200" />
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onInfo?.(fileId);
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        Informations du fichier
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={() => {
          onDownload?.(fileId);
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Télécharger le fichier
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => {
          onDelete?.(fileId);
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
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
        Supprimer
      </button>
    </div>
  );
}
