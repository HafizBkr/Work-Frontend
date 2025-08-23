"use client";

import React from "react";
import Drawer from "@/app/components/ui/Drawer";

interface FileInfoDrawerProps {
  open: boolean;
  onClose: () => void;
  file: {
    name: string;
    extension?: string;
    size?: string;
    location?: string;
    owner?: string;
    ownerAvatarUrl?: string;
    lastOpened?: string;
    uploadedAt?: string;
  };
}

export default function FileInfoDrawer({
  open,
  onClose,
  file,
}: FileInfoDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} width={500}>
      <div className="p-8 flex flex-col h-full relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 truncate">
            {file.name}
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

        {/* File preview */}
        <div
          className="bg-gray-100 rounded-lg flex flex-col items-center justify-center mb-6"
          style={{ height: 180 }}
        >
          <svg
            width="48"
            height="48"
            fill="none"
            stroke="gray"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 7l4-4h10l4 4" />
          </svg>
          <span className="text-gray-500 mt-2">
            .{file.extension || "file"}
          </span>
        </div>

        {/* File info */}
        <div>
          <h3 className="font-semibold mb-2 text-gray-900">
            Informations sur le fichier
          </h3>
          <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between py-1 text-sm text-gray-700">
              <span className="font-medium">TYPE</span>
              <span>{file.extension || "file"}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-700">
              <span className="font-medium">TAILLE</span>
              <span>{file.size || "—"}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-700">
              <span className="font-medium">EMPLACEMENT</span>
              <span>{file.location || "Mon Drive"}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-700 items-center">
              <span className="font-medium">PROPRIÉTAIRE</span>
              <span className="flex items-center gap-2">
                {file.ownerAvatarUrl ? (
                  <img
                    src={file.ownerAvatarUrl}
                    alt={file.owner}
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-bold">
                    {file.owner
                      ? file.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "?"}
                  </span>
                )}
                <span>{file.owner || "—"}</span>
              </span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-700">
              <span className="font-medium">DERNIÈRE OUVERTURE</span>
              <span>{file.lastOpened || "—"}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-700">
              <span className="font-medium">DATE DE TÉLÉCHARGEMENT</span>
              <span>{file.uploadedAt || "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
