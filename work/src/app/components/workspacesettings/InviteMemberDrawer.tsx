"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const roles = [
  { value: "moderateur", label: "Modérateur" },
  { value: "editeur", label: "Éditeur" },
  { value: "spectateur", label: "Spectateur" },
];

interface InviteMemberDrawerProps {
  open: boolean;
  onClose: () => void;
}

const InviteMemberDrawer: React.FC<InviteMemberDrawerProps> = ({
  open,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("moderateur");
  const [shareLink, setShareLink] = useState(false);
  const [invitations, setInvitations] = useState<string[]>([]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20">
      {/* Drawer */}
      <div className="relative w-full max-w-[600px] h-full bg-white rounded-l-3xl shadow-xl flex flex-col animate-slide-in-right">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="px-8 pt-8 pb-4 flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Inviter un nouvel utilisateur
          </h2>
          <div className="text-gray-400 text-sm mb-6">2 utilisateurs</div>

          <div className="mb-6">
            <div className="font-semibold text-gray-900 mb-3">
              Inviter par email
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="email"
                placeholder="Entrez  e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-900 placeholder-gray-400"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="px-3 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-gray-900"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition flex items-center gap-1"
                onClick={() => {
                  if (email) {
                    setInvitations((inv) => [...inv, email]);
                    setEmail("");
                  }
                }}
              >
                <Plus className="w-4 h-4" /> Ajouter
              </button>
            </div>
            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 text-gray-400 text-sm gap-2">
              <input
                type="checkbox"
                checked={shareLink}
                onChange={(e) => setShareLink(e.target.checked)}
                className="accent-purple-600"
              />
              Partager le lien
            </div>
          </div>

          <hr className="my-4" />

          <div className="font-semibold text-gray-700 mb-2">Invitations</div>
          <ul className="flex-1 overflow-y-auto">
            {invitations.map((inv, idx) => (
              <li key={idx} className="text-gray-700 text-sm py-1">
                {inv}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 px-8 pb-8">
          <button
            className="flex-1 py-3 rounded-xl bg-gray-100 text-purple-600 font-semibold"
            onClick={onClose}
            type="button"
          >
            Annuler
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-purple-200 text-white font-semibold"
            disabled
            type="button"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberDrawer;
