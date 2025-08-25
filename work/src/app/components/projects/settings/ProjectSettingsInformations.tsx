import React from "react";

interface ProjectSettingsInformationsProps {
  projectId: string;
}

export default function ProjectSettingsInformations({
  projectId,
}: ProjectSettingsInformationsProps) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Paramètres du projet
      </h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-sm"
            defaultValue="TEST"
          />
          <p className="text-xs text-gray-500 mt-1">
            Choisissez un nom court mais descriptif
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-sm resize-none"
            rows={3}
            defaultValue="Hello"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Visibilité du projet
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                defaultChecked
                className="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <span className="text-sm text-gray-700">Public</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                className="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <span className="text-sm text-gray-700">Privé</span>
            </label>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
