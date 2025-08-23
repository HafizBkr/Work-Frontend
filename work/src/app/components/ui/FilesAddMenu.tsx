"use client";

import React, { useState } from "react";
import Button from "./Button";
import UploadFileDrawer from "../files/UploadFileDrawer";

interface FilesAddMenuProps {
  onUploadFile?: () => void;
  onCreateFolder?: () => void;
}

const icon = (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M3 7l4-4h10l4 4" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);

export default function FilesAddMenu({
  onUploadFile,
  onCreateFolder,
}: FilesAddMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [openUploadDrawer, setOpenUploadDrawer] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className="flex items-center gap-2 bg-black hover:bg-gray-900 rounded-lg"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Ajouter nouveau
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-black font-semibold hover:bg-gray-100 rounded-t-2xl transition-colors"
            onClick={() => {
              setOpen(false);
              setOpenUploadDrawer(true);
            }}
            type="button"
          >
            {icon}
            Uploader un fichier
          </button>
          <div className="border-t border-gray-200 mx-2" />
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-black font-semibold hover:bg-gray-100 rounded-b-2xl transition-colors"
            onClick={() => {
              setOpen(false);
              onCreateFolder && onCreateFolder();
            }}
            type="button"
          >
            {icon}
            Créer un dossier
          </button>
        </div>
      )}
      <UploadFileDrawer
        open={openUploadDrawer}
        onClose={() => setOpenUploadDrawer(false)}
        onUpload={(file, type) => {
          onUploadFile && onUploadFile();
          setOpenUploadDrawer(false);
        }}
      />
    </div>
  );
}
