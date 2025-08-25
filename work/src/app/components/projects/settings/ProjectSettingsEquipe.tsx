import React, { useState } from "react";

type Member = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  isOnline?: boolean;
};

type Props = {
  projectId: string;
};

const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Hafiz BOUKARI",
    avatarUrl: "",
    role: "Modérateur",
    isOnline: true,
  },
  {
    id: "2",
    name: "Alice Dupont",
    avatarUrl: "",
    role: "Spectateur",
    isOnline: false,
  },
];

export default function ProjectSettingsEquipe({ projectId }: Props) {
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);
  const [invite, setInvite] = useState("");
  const [role, setRole] = useState("Spectateur");
  const [shareLink, setShareLink] = useState(false);

  const handleAddMember = () => {
    if (!invite.trim()) return;
    setMembers([
      ...members,
      {
        id: Math.random().toString(),
        name: invite,
        role,
        avatarUrl: "",
      },
    ]);
    setInvite("");
    setRole("Spectateur");
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-900">Équipe</h2>

      {/* Section d'invitation */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Membres, groupes et externes..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-sm"
            value={invite}
            onChange={(e) => setInvite(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm min-w-[120px]"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Spectateur">Spectateur</option>
            <option value="Modérateur">Modérateur</option>
            <option value="Admin">Admin</option>
          </select>
          <button
            className="px-4 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            onClick={handleAddMember}
          >
            Ajouter
          </button>
        </div>

        {/* Partager le lien */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Partager le lien
          </button>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={shareLink}
              onChange={() => setShareLink((v) => !v)}
              className="sr-only"
            />
            <span
              className={`w-8 h-5 flex items-center bg-gray-200 rounded-full p-0.5 duration-300 ease-in-out ${
                shareLink ? "bg-black" : ""
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ease-in-out ${
                  shareLink ? "translate-x-3" : ""
                }`}
              />
            </span>
          </label>
        </div>
      </div>

      {/* Séparateur */}
      <hr className="my-6 border-gray-200" />

      {/* Section membres d'équipe */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">
              Membres d&apos;équipe
            </h3>
            <span className="text-gray-500 text-sm">
              {members.length} membre{members.length > 1 ? "s" : ""}{" "}
              d&apos;équipe
            </span>
          </div>
          <input
            type="text"
            placeholder="Trouver quelqu'un..."
            className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white text-sm md:w-64"
          />
        </div>

        {/* Liste des membres */}
        <div className="space-y-1">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-50 transition-colors group"
            >
              {/* Avatar avec statut en ligne */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-medium text-white text-sm">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                  )}
                </div>
                {member.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Nom du membre */}
              <span className="font-medium text-gray-900 text-sm">
                {member.name}
              </span>

              {/* Rôle */}
              <span className="ml-auto text-xs text-gray-600 font-medium">
                {member.role}
              </span>

              {/* Menu options */}
              <button
                className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors text-gray-400 group-hover:text-gray-600"
                title="Options"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
