"use client";

import React from "react";
import {
  Building2,
  MessageSquare,
  Notebook,
  LayoutGrid,
  Users,
  Video,
  Settings as Cog,
} from "lucide-react";

const APPS = [
  { icon: Building2, name: "Organisation" },
  { icon: LayoutGrid, name: "Projets" },
  { icon: MessageSquare, name: "Chat" },
  { icon: Video, name: "Salles d'appel" },
  { icon: Notebook, name: "Notes" },
  { icon: Cog, name: "Automatisation" },
];

const ROLES = [
  {
    name: "Propriétaire",
    description:
      "Peut gérer tous les paramètres de l'organisation tout en détenant le rôle de modérateur sur toutes les applications Cynoia.",
    permissions: [
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
    ],
  },
  {
    name: "Modérateur",
    description:
      "Peut modérer le contenu des utilisateurs et avoir le contrôle des paramètres des applications.",
    permissions: [
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
      "Modérateur",
    ],
  },
  {
    name: "Éditeur",
    description:
      "Peut ajouter et modifier du contenu, mais n'a pas le contrôle sur la gestion des utilisateurs et les paramètres des applications.",
    permissions: [
      "Spectateur",
      "Éditeur",
      "Éditeur",
      "Éditeur",
      "Éditeur",
      "Éditeur",
    ],
  },
  {
    name: "Spectateur",
    description:
      "Peut voir le contenu, mais n'a aucun privilège de gestion ni de modification.",
    permissions: [
      "Spectateur",
      "Spectateur",
      "Spectateur",
      "Spectateur",
      "Spectateur",
      "Spectateur",
    ],
  },
];

const WorkspaceRolesSettings: React.FC = () => {
  // Empêche le scroll du body quand ce composant est monté
  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="max-w-4xl h-full flex flex-col">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex-shrink-0">
        Gérer les rôles
      </h1>
      <div
        className="space-y-8 flex-1 overflow-y-auto pr-2"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {ROLES.map((role, idx) => (
          <div
            key={role.name}
            className="bg-white border border-gray-200 rounded-2xl p-6"
          >
            <div className="font-bold text-xl text-gray-900 mb-1">
              {role.name}
            </div>
            <div className="text-gray-500 mb-4">{role.description}</div>
            <div className="grid grid-cols-2 gap-3">
              {APPS.map((app, i) => (
                <div
                  key={app.name}
                  className="flex items-center justify-between bg-gray-100 rounded-xl px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <app.icon className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {app.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-500">
                    {role.permissions[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceRolesSettings;
