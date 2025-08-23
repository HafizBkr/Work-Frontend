"use client";

import React, { useState } from "react";
import Drawer from "../ui/Drawer";
import Button from "../ui/Button";

interface UploadFileDrawerProps {
  open: boolean;
  onClose: () => void;
  onUpload?: (file: File, type: string) => void;
}

type UploadType = "image" | "document" | "capture" | "video";

const UPLOAD_OPTIONS = [
  {
    id: "image",
    label: "Image",
    accept: "image/*",
    icon: (
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
        className="text-black"
      >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <circle cx="10" cy="12" r="2" />
        <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
      </svg>
    ),
  },
  {
    id: "video",
    label: "Vidéo",
    accept: "video/*",
    icon: (
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
        className="text-black"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    ),
  },
  {
    id: "document",
    label: "Document",
    accept: ".pdf,.doc,.docx,.txt,.xls,.xlsx",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    id: "capture",
    label: "Capture d'écran",
    accept: "image/*",
    icon: (
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
        className="text-black"
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
];

export default function UploadFileDrawer({
  open,
  onClose,
  onUpload,
}: UploadFileDrawerProps) {
  const [selectedType, setSelectedType] = useState<UploadType>("image");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = () => {
    if (file && onUpload) {
      onUpload(file, selectedType);
      setFile(null);
      onClose();
    }
  };

  const handleCaptureScreen = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Arrêter tous les tracks
      stream.getTracks().forEach((track) => track.stop());

      // Convertir le canvas en blob
      canvas.toBlob((blob) => {
        if (blob) {
          const captureFile = new File([blob], `capture-${Date.now()}.png`, {
            type: "image/png",
          });
          setFile(captureFile);
        }
      }, "image/png");
    } catch (err) {
      console.error("Error capturing screen:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  const currentOption = UPLOAD_OPTIONS.find((opt) => opt.id === selectedType);

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-xl w-full mx-auto bg-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Uploader un fichier
            </h2>
            <p className="text-gray-500 mt-1">
              Sélectionnez le type de fichier que vous souhaitez uploader
            </p>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

        {/* Type selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {UPLOAD_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSelectedType(option.id as UploadType);
                if (option.id === "capture") {
                  handleCaptureScreen();
                }
              }}
              className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                selectedType === option.id
                  ? "border-black bg-gray-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  selectedType === option.id ? "bg-white" : "bg-gray-50"
                }`}
              >
                {option.icon}
              </div>
              <span className="font-medium text-sm text-gray-900">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Upload zone */}
        {selectedType !== "capture" && (
          <div
            className={`flex-1 border-2 border-dashed rounded-xl p-8 mb-8 flex flex-col items-center justify-center gap-4 transition-all duration-200 ${
              isDragging
                ? "border-black bg-gray-50 scale-[1.02]"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept={currentOption?.accept}
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />

            {file ? (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 text-center font-medium">
                  {file.name}
                </span>
                <span className="text-xs text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </>
            ) : isCapturing ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full border-4 border-black border-t-transparent animate-spin" />
                <span className="text-sm text-gray-600">
                  Capture d&apos;écran en cours...
                </span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  {currentOption?.icon}
                </div>
                <div className="text-center">
                  <span className="text-gray-600">
                    Glissez-déposez un fichier ici ou{" "}
                    <span className="text-black font-semibold hover:underline cursor-pointer">
                      parcourir
                    </span>
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedType === "image" && "PNG, JPG jusqu'à 10MB"}
                    {selectedType === "document" &&
                      "PDF, DOC, DOCX, TXT jusqu'à 10MB"}
                    {selectedType === "video" && "MP4, MOV jusqu'à 100MB"}
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-between gap-4 pt-4 border-t">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-xl"
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file}
            className={`flex-1 font-semibold px-8 py-3 rounded-xl transition-all duration-200 ${
              file
                ? "bg-black hover:bg-gray-900 text-white"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {file ? "Uploader" : "Sélectionnez un fichier"}
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
