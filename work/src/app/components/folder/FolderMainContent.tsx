"use client";

import React from "react";

interface FileItem {
  id: string;
  name: string;
  createdAt?: string;
  extension?: string;
}

interface FolderMainContentProps {
  folderName: string;
  files: FileItem[];
  onUploadFile?: () => void;
}

import FilesAddMenu from "@/app/components/ui/FilesAddMenu";
import CreateFolderDrawer from "@/app/components/folder/CreateFolderDrawer";

function UploadOnlyMenu({ onUploadFile }: { onUploadFile?: () => void }) {
  const [open, setOpen] = React.useState(false);
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
      <button
        className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg"
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
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
          <button
            className="w-full flex items-center gap-2 px-4 py-3 text-black font-semibold hover:bg-gray-100 rounded-2xl transition-colors"
            onClick={() => {
              setOpen(false);
              onUploadFile && onUploadFile();
            }}
            type="button"
          >
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
            Uploader un fichier
          </button>
        </div>
      )}
    </div>
  );
}

export default function FolderMainContent({
  folderName,
  files,
  onUploadFile,
}: FolderMainContentProps) {
  const isEmpty = !files || files.length === 0;
  const [openCreateFolderDrawer, setOpenCreateFolderDrawer] =
    React.useState(false);

  return (
    <div className="p-8">
      {/* Header dossier */}
      <div className="flex items-center gap-2 mb-8">
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100"
          onClick={() => window.history.back()}
          aria-label="Retour"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M3 7l4-4h10l4 4" />
        </svg>
        <span className="text-2xl font-bold text-black">{folderName}</span>
        <span className="ml-2 text-2xl text-black font-bold">...</span>
        <div className="flex-1" />
        <FilesAddMenu
          onUploadFile={onUploadFile}
          onCreateFolder={() => setOpenCreateFolderDrawer(true)}
        />
      </div>

      {/* Main content */}
      <div className="bg-[#FAFAFA] rounded-2xl p-12 flex flex-col items-center justify-center min-h-[60vh] w-full">
        {isEmpty ? (
          <>
            {/* Illustration dossier vide */}
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="96"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cloud-upload-icon lucide-cloud-upload text-black"
              >
                <path d="M12 13v8" />
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m8 17 4-4 4 4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black mb-4">
              Le dossier est vide !
            </h2>
            <button
              className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mt-4"
              onClick={onUploadFile}
              type="button"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 13v8" />
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m8 17 4-4 4 4" />
              </svg>
              Uploader un fichier
            </button>
          </>
        ) : (
          <div className="w-full">
            <h2 className="font-semibold text-lg mb-2 text-black">
              Fichiers{" "}
              <span className="text-black font-normal">({files.length})</span>
            </h2>
            <div className="flex flex-wrap gap-6">
              {files.map((file) => (
                <div key={file.id} className="flex flex-col items-center w-32">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-text-icon lucide-file-text text-gray-400"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  </div>
                  <span className="text-sm text-black truncate w-full text-center font-medium">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {file.createdAt || "now"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
