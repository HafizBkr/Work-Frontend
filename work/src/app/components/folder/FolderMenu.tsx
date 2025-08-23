"use client";

import React, { useRef, useEffect } from "react";

interface FolderMenuProps {
  folderId: string;
  onClose: () => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  position?: "top" | "right";
}

export default function FolderMenu({
  folderId,
  onClose,
  onRename,
  onDelete,
  position = "right",
}: FolderMenuProps) {
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
      className={`absolute z-50 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 ${
        position === "top" ? "right-0 top-full mt-2" : "left-full top-0 ml-2"
      }`}
    >
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100 transition-colors"
        onClick={() => {
          onRename?.(folderId);
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
        Renommer
      </button>
      <button
        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
        onClick={() => {
          onDelete?.(folderId);
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
