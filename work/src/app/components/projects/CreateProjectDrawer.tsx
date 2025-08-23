import React from "react";
import Drawer from "../ui/Drawer";

interface CreateProjectDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateProjectDrawer({
  open,
  onClose,
}: CreateProjectDrawerProps) {
  const [visibility, setVisibility] = React.useState<"public" | "private">(
    "public",
  );

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-4xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Créer un nouveau projet
          </h2>
          <button
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition"
            title="Appliquer un modèle de projet"
            type="button"
          >
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 7h10v10H7z" />
            </svg>
          </button>
        </div>
        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button className="px-4 py-2 font-semibold text-purple-600 border-b-2 border-purple-600 focus:outline-none text-gray-900">
            Informations
          </button>
        </div>
        {/* Form */}
        <form className="flex-1 flex flex-col gap-4 text-gray-900">
          <div>
            <label className="block font-medium mb-1 text-gray-900">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              placeholder="Entrez le nom du projet"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-900">
              Description
            </label>
            <textarea
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition min-h-[80px]"
              placeholder="Entrez la description du projet"
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-900">
              Visibilité du projet
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border font-medium border-gray-200 focus:ring-2 focus:ring-purple-400 transition ${
                  visibility === "public"
                    ? "bg-purple-50 text-purple-700 border-purple-400"
                    : "bg-white text-gray-900"
                }`}
                onClick={() => setVisibility("public")}
              >
                Public
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border font-medium border-gray-200 focus:ring-2 focus:ring-purple-400 transition ${
                  visibility === "private"
                    ? "bg-purple-50 text-purple-700 border-purple-400"
                    : "bg-gray-100 text-gray-900"
                }`}
                onClick={() => setVisibility("private")}
              >
                Privé
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-900">
                Start Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1 text-gray-900">
                End Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
              />
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex justify-between gap-4 mt-8">
            <button
              type="button"
              className="px-8 py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Créer le projet
            </button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
