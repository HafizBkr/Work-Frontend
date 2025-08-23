"use client";

import React, { useState, useRef } from "react";
import FilesAddMenu from "@/app/components/ui/FilesAddMenu";
import CreateFolderDrawer from "@/app/components/folder/CreateFolderDrawer";
import RenameFolderDrawer from "@/app/components/folder/RenameFolderDrawer";
import FolderMenu from "@/app/components/folder/FolderMenu";

interface Folder {
  id: string;
  name: string;
  createdAt?: string;
}

interface FileItem {
  id: string;
  name: string;
  createdAt?: string;
  extension?: string;
}

interface FilesMainContentProps {
  folders: Folder[];
  files: FileItem[];
  onUploadFile?: () => void;
  onCreateFolder?: () => void;
}

type ViewMode = "grid" | "list";

export default function FilesMainContent({
  folders,
  files,
  onUploadFile,
  onCreateFolder,
}: FilesMainContentProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [openCreateFolderDrawer, setOpenCreateFolderDrawer] = useState(false);
  const [openRenameFolderDrawer, setOpenRenameFolderDrawer] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const isEmpty = folders.length === 0 && files.length === 0;

  // Ouvre le menu contextuel à la position du bouton
  const handleMenuButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    folder: Folder,
  ) => {
    e.stopPropagation();
    setSelectedFolder(folder);
    setMenuAnchor(e.currentTarget);
  };

  // Ferme le menu contextuel
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  // Ouvre le drawer de renommage
  const handleFolderRename = () => {
    setOpenRenameFolderDrawer(true);
    handleCloseMenu();
  };

  // Suppression (à implémenter)
  const handleFolderDelete = (id: string) => {
    // TODO: API suppression
    console.log("Supprimer dossier", id);
    handleCloseMenu();
  };

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[70vh]">
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
            className="lucide lucide-file-text-icon lucide-file-text text-black"
            style={{ width: "96px", height: "96px" }}
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-500 mb-4">
          Votre espace de stockage est vide !
        </h2>
        <div className="flex gap-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
            onClick={onUploadFile}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Télécharger un fichier
          </button>
          <button
            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded flex items-center gap-2"
            onClick={() => setOpenCreateFolderDrawer(true)}
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 4v16h16V4H4zm8 4v8m-4-4h8" />
            </svg>
            Créer un dossier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">Mon Drive</h1>
        <FilesAddMenu
          onUploadFile={onUploadFile}
          onCreateFolder={() => setOpenCreateFolderDrawer(true)}
        />
      </div>
      {/* Dossiers */}
      <div className=" flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-2 text-black">
            Dossiers{" "}
            <span className="text-black font-normal">({folders.length})</span>
          </h2>
        </div>
        <div className="flex items-center">
          <div
            className="flex bg-gray-200 rounded-full p-0.5 gap-0.5"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)" }}
          >
            <button
              className={`transition-colors duration-150 flex items-center justify-center w-7 h-7 rounded-full ${
                viewMode === "list" ? "bg-white" : "bg-gray-200"
              }`}
              title="Vue liste"
              onClick={() => setViewMode("list")}
              style={{ border: "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={viewMode === "list" ? "black" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list-icon lucide-list"
              >
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
                <path d="M3 6h.01" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M8 6h13" />
              </svg>
            </button>
            <button
              className={`transition-colors duration-150 flex items-center justify-center w-7 h-7 rounded-full ${
                viewMode === "grid" ? "bg-white" : "bg-gray-200"
              }`}
              title="Vue grille"
              onClick={() => setViewMode("grid")}
              style={{ border: "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={viewMode === "grid" ? "black" : "white"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-boxes-icon lucide-boxes"
              >
                <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
                <path d="m7 16.5-4.74-2.85" />
                <path d="m7 16.5 5-3" />
                <path d="M7 16.5v5.17" />
                <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
                <path d="m17 16.5-5-3" />
                <path d="m17 16.5 4.74-2.85" />
                <path d="M17 16.5v5.17" />
                <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
                <path d="M12 8 7.26 5.15" />
                <path d="m12 8 4.74-2.85" />
                <path d="M12 13.5V8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        {folders.length === 0 ? (
          <div className="text-black">Aucun dossier</div>
        ) : viewMode === "list" ? (
          <div className="flex flex-col gap-2">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="border rounded-lg px-4 py-3 flex items-center justify-between bg-white shadow-sm cursor-pointer text-black relative"
                onClick={() =>
                  (window.location.href = `/dashboard/files/folder/${folder.id}`)
                }
                tabIndex={0}
                role="button"
                aria-label={`Ouvrir le dossier ${folder.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    window.location.href = `/dashboard/files/folder/${folder.id}`;
                }}
              >
                <div className="flex items-center gap-2">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="text-black"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M3 7l4-4h10l4 4" />
                  </svg>
                  <span className="font-medium text-black">{folder.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black">
                    {folder.createdAt || "now"}
                  </span>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={(e) => handleMenuButtonClick(e, folder)}
                    aria-label="Options dossier"
                    type="button"
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="5" cy="12" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="19" cy="12" r="1.5" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="w-32 bg-white rounded-lg shadow-sm flex flex-col items-center p-4 cursor-pointer relative"
                onClick={() =>
                  (window.location.href = `/dashboard/files/folder/${folder.id}`)
                }
                tabIndex={0}
                role="button"
                aria-label={`Ouvrir le dossier ${folder.name}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    window.location.href = `/dashboard/files/folder/${folder.id}`;
                }}
              >
                <button
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 z-10"
                  onClick={(e) => handleMenuButtonClick(e, folder)}
                  aria-label="Options dossier"
                  type="button"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </button>
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="text-black mb-2"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M3 7l4-4h10l4 4" />
                </svg>
                <span className="font-medium text-black text-center">
                  {folder.name}
                </span>
                <span className="text-xs text-black">
                  {folder.createdAt || "now"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-2 mt-2 text-black">
          Fichiers{" "}
          <span className="text-black font-normal">({files.length})</span>
        </h2>
        <div>
          {files.length === 0 ? (
            <div className="text-black">Aucun fichier</div>
          ) : viewMode === "list" ? (
            <div className="flex flex-col gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg px-4 py-3 flex items-center justify-between bg-white shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
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
                    <span className="font-medium text-black">{file.name}</span>
                  </div>
                  <span className="text-xs text-black">
                    {file.createdAt || "now"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
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
                      className="lucide lucide-file-text-icon lucide-file-text text-black"
                    >
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  </div>
                  <span className="font-medium text-black text-center w-full truncate">
                    {file.name}
                  </span>
                  <span className="text-xs text-black">
                    {file.createdAt || "now"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <CreateFolderDrawer
        open={openCreateFolderDrawer}
        onClose={() => setOpenCreateFolderDrawer(false)}
        onSubmit={(folderName) => {
          onCreateFolder?.();
          setOpenCreateFolderDrawer(false);
        }}
      />

      {selectedFolder && menuAnchor && (
        <div
          style={{
            position: "fixed",
            left: menuAnchor.getBoundingClientRect().left,
            top: menuAnchor.getBoundingClientRect().bottom + 4,
            zIndex: 1000,
          }}
        >
          <FolderMenu
            folderId={selectedFolder.id}
            onClose={handleCloseMenu}
            onRename={handleFolderRename}
            onDelete={() => handleFolderDelete(selectedFolder.id)}
            position="right"
          />
        </div>
      )}

      {selectedFolder && (
        <RenameFolderDrawer
          open={openRenameFolderDrawer}
          initialName={selectedFolder.name}
          onClose={() => setOpenRenameFolderDrawer(false)}
          onSubmit={(newName) => {
            // TODO: API renommage
            console.log("Renommer dossier", selectedFolder.id, "->", newName);
            setOpenRenameFolderDrawer(false);
          }}
        />
      )}
    </div>
  );
}
