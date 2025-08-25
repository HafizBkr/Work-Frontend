import React from "react";

type Props = {
  projectId: string;
};

export default function ProjectSettingsSupprimer({ projectId }: Props) {
  // Ici tu pourras brancher la logique de suppression réelle
  const handleDelete = () => {
    // TODO: Appeler l'API de suppression, afficher une confirmation, etc.
    alert(`Projet ${projectId} supprimé (simulation)`);
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">Supprimer le projet</h2>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Cette action est <span className="font-semibold text-red-600">irréversible</span>.<br />
        Toutes les données liées à ce projet seront définitivement supprimées.<br />
        Êtes-vous sûr de vouloir continuer&nbsp;?
      </p>
      <button
        onClick={handleDelete}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition"
      >
        Supprimer définitivement
      </button>
    </div>
  );
}
