"use client";

import React, { useState } from "react";
import { UserPlus, MoreHorizontal, KeyRound } from "lucide-react";
import InviteMemberDrawer from "./InviteMemberDrawer";

const initialMembers = [
  {
    id: 1,
    name: "Hafiz BOUKARI",
    email: "boukarihafiz4@gmail.com",
    avatar: "H",
    avatarColor: "bg-purple-600",
    status: "online",
    role: "Spectateur",
  },
  {
    id: 2,
    name: "Hafiz BOUKARI (Vous)",
    email: "hafizinovus@gmail.com",
    avatar: "Hafiz.",
    avatarColor: "bg-yellow-100 text-yellow-700 border border-gray-200",
    status: "online",
    role: "Propriétaire",
  },
];

const roles = ["Spectateur", "editeur", "moderateur"];

const WorkspaceMembersSettings: React.FC = () => {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [showInviteDrawer, setShowInviteDrawer] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-3xl">
      <InviteMemberDrawer
        open={showInviteDrawer}
        onClose={() => setShowInviteDrawer(false)}
      />
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Gérer les utilisateurs
        </h1>
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white font-semibold rounded-xl hover:bg-neutral-900 transition text-base"
          onClick={() => setShowInviteDrawer(true)}
        >
          <UserPlus className="w-5 h-5" />
          Inviter un nouvel utilisateur
        </button>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 text-sm">
          {members.length} Membres d&aposéquipe
        </span>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher  membres"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl bg-gray-100 text-gray-700 placeholder-gray-400 border-0 focus:ring-2 focus:ring-black focus:bg-white transition w-64"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path stroke="currentColor" strokeWidth="2" d="M21 21l-3.5-3.5" />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full bg-white rounded-2xl border border-gray-200">
          <thead>
            <tr className="text-gray-400 text-left text-sm">
              <th className="py-3 px-4 font-medium">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-3 px-4 font-medium">Membres d&aposéquipe</th>
              <th className="py-3 px-4 font-medium">E-mail</th>
              <th className="py-3 px-4 font-medium">Rôles</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${member.avatarColor.replace("bg-purple-600", "bg-black text-white")}`}
                    >
                      {member.avatar}
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-400"></span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {member.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{member.email}</td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm">
                    <KeyRound className="w-4 h-4 mr-1 text-gray-400" />
                    <select
                      value={member.role}
                      className="bg-transparent outline-none border-none text-gray-700 font-medium"
                      style={{ minWidth: 110 }}
                      onChange={() => {}}
                      disabled={member.role === "Propriétaire"}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkspaceMembersSettings;
