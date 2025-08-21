"use client";

import React, { useState } from "react";
import { Monitor } from "lucide-react";

const SecuritySettings: React.FC = () => {
  // Exemple de sessions (à remplacer par des données réelles)
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Linux PC",
      browser: "Chrome",
      lastSeen: "now",
      active: true,
    },
    {
      id: 2,
      device: "Windows PC",
      browser: "Chrome",
      lastSeen: "28/07/2025 at 21:16",
      active: false,
    },
    {
      id: 3,
      device: "Windows PC",
      browser: "Chrome",
      lastSeen: "17/08/2025 at 13:21",
      active: false,
    },
  ]);

  // Suppression d'une session individuelle
  const handleRemoveSession = (id: number) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // Suppression de toutes les sessions sauf l'actuelle
  const handleRemoveAllSessions = () => {
    setSessions((prev) => prev.filter((s) => s.active));
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sécurité</h1>

      {/* Session active */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Session active
        </h2>
        {sessions
          .filter((s) => s.active)
          .map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-4 bg-gray-100 rounded-2xl px-6 py-5 mb-2"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-gray-200">
                <Monitor className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {session.device}
                </div>
                <div className="text-sm text-gray-500">
                  Browser: {session.browser}
                </div>
                <div className="text-sm text-gray-500">
                  Last seen: {session.lastSeen}
                </div>
              </div>
              <div className="ml-2 text-green-500 font-medium text-sm">
                Active session
              </div>
            </div>
          ))}
      </div>

      {/* Sessions récentes */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Sessions
        </h2>
        {sessions
          .filter((s) => !s.active)
          .map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-4 bg-gray-100 rounded-2xl px-6 py-5 mb-4 relative"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white border border-gray-200">
                <Monitor className="w-6 h-6 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {session.device}
                </div>
                <div className="text-sm text-gray-500">
                  Browser: {session.browser}
                </div>
                <div className="text-sm text-gray-500">
                  Last seen: {session.lastSeen}
                </div>
              </div>
              <button
                onClick={() => handleRemoveSession(session.id)}
                className="absolute top-4 right-4 px-3 py-1 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-200 transition"
                title="Supprimer cette session"
              >
                Supprimer
              </button>
            </div>
          ))}
        {sessions.filter((s) => !s.active).length > 0 && (
          <button
            onClick={handleRemoveAllSessions}
            className="w-full mt-2 px-4 py-3 text-base font-semibold text-white bg-black rounded-2xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition"
          >
            Supprimer toutes les sessions récentes
          </button>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
