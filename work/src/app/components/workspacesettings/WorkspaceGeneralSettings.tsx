"use client";

import React from "react";

const WorkspaceGeneralSettings: React.FC = () => {
  const [formData, setFormData] = React.useState({
    orgName: "Hafiz",
    workspace_description:
      "Espace de travail collaboratif pour l'équipe projet.",
    workspace_logo: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de sauvegarde ici
    console.log("Workspace general settings:", formData);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Espace de travail de l&apos;organisation
      </h1>
      {/* Logo uploader */}
      <div className="flex flex-col items-start mb-8">
        <label className="block text-base font-medium text-gray-900 mb-2">
          Logo de l&aposespace de travail
        </label>
        <div className="relative w-20 h-20 mb-2">
          {formData.workspace_logo ? (
            <img
              src={formData.workspace_logo}
              alt="Logo du workspace"
              className="w-20 h-20 object-cover rounded-2xl border border-gray-200 bg-white"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gray-100 border border-gray-200 text-gray-400">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="3"
                  fill="#D1D5DB"
                />
                <rect x="7" y="7" width="3" height="3" rx="1" fill="#fff" />
                <rect x="7" y="14" width="3" height="3" rx="1" fill="#fff" />
                <rect x="14" y="7" width="3" height="3" rx="1" fill="#fff" />
                <rect x="14" y="14" width="3" height="3" rx="1" fill="#fff" />
              </svg>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            title="Choisir un logo"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setFormData((prev) => ({
                    ...prev,
                    workspace_logo: ev.target?.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <span className="text-xs text-gray-500 mb-2">
          JPG, PNG ou GIF. Max 2MB.
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Nom de l'organisation */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Nom de l&apos;organisation <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.orgName}
            onChange={(e) => handleChange("orgName", e.target.value)}
            className="block w-full px-4 py-3 text-gray-900 border-0 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
          />
        </div>
        {/* Description du workspace */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Description de l&aposespace de travail
          </label>
          <textarea
            value={formData.workspace_description}
            onChange={(e) =>
              handleChange("workspace_description", e.target.value)
            }
            rows={3}
            className="block w-full px-4 py-3 text-gray-900 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
            placeholder="Décrivez brièvement l'objectif de cet espace de travail"
          />
        </div>
        {/* Logo du workspace */}
        {/* Champ supprimé, remplacé par le composant uploader en haut */}
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-semibold text-white bg-purple-600 rounded-2xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkspaceGeneralSettings;
