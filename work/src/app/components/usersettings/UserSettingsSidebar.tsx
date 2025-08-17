"use client";

import React from "react";
import {
  User,
  FileText,
  Lock,
  Settings,
  Shield,
  Bell,
  ChevronLeft,
} from "lucide-react";

type SettingsSection =
  | "profil"
  | "informations"
  | "motdepasse"
  | "parametres"
  | "securite"
  | "notifications";

interface UserSettingsSidebarProps {
  selectedSection: SettingsSection;
  onSelectSection: (section: SettingsSection) => void;
}

const menuItems: {
  icon: React.ElementType;
  label: string;
  section: SettingsSection;
}[] = [
  { icon: User, label: "Profil", section: "profil" },
  { icon: FileText, label: "Informations", section: "informations" },
  { icon: Lock, label: "Mot De Passe", section: "motdepasse" },
  { icon: Settings, label: "Paramètres", section: "parametres" },
  { icon: Shield, label: "Sécurité", section: "securite" },
  { icon: Bell, label: "Notifications", section: "notifications" },
];

const UserSettingsSidebar: React.FC<UserSettingsSidebarProps> = ({
  selectedSection,
  onSelectSection,
}) => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header with back button and title */}
      <div className="px-6 mt-10 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4 justify-end">
          <div className="space-y-2 w-full max-w-[220px]">
            <button
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              title="Retour à l'accueil"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <p className="text-sm  text-black uppercase tracking-wide font-medium mt-9">
              PARAMÈTRES UTILISATEUR
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-6 py-4">
        <div className="flex justify-end">
          <ul className="space-y-3 w-full max-w-[220px]">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = selectedSection === item.section;
              return (
                <li key={item.section}>
                  <button
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    onClick={() => onSelectSection(item.section)}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        isActive ? "text-gray-700" : "text-gray-500"
                      }`}
                    />
                    <span className="text-base font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Bottom User Info */}
      <div className="px-6 py-6 border-t border-gray-100 mb-12">
        <div className="flex justify-end">
          <div className="flex items-center gap-3 max-w-[220px] w-full">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-sm font-bold text-orange-600">H</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                Hafiz BOUKARI
              </p>
              <p className="text-xs text-gray-500 truncate">Utilisateur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsSidebar;
