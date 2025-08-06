import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Settings, LogOut, ChevronRight } from "lucide-react";

interface UserDropdownProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onLogout?: () => void;
  onSettings?: () => void;
}

interface UserPopupProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  organizations?: { name: string; code: string }[];
  onStatusChange?: (status: "active" | "inactive" | "away") => void;
  currentStatus?: "active" | "inactive" | "away";
}

const UserPopup: React.FC<UserPopupProps> = ({
  userName,
  userEmail,
  userAvatar,
  onLogout,
  onSettings,
  onStatusChange,
  currentStatus: propCurrentStatus = "active",
  organizations = [
    { name: "al3", code: "al3" },
    { name: "Hafiz", code: "hafiz" },
  ],
}) => {
  const [currentStatus, setCurrentStatus] = useState<
    "active" | "inactive" | "away"
  >(propCurrentStatus);

  // Mettre à jour le statut local quand la prop change
  useEffect(() => {
    setCurrentStatus(propCurrentStatus);
  }, [propCurrentStatus]);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const statusLabels = {
    active: "Actif",
    inactive: "Inactif",
    away: "Absent",
  };

  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    away: "bg-orange-500",
  };

  const handleStatusChange = (newStatus: "active" | "inactive" | "away") => {
    setCurrentStatus(newStatus);
    setIsStatusDropdownOpen(false);
    onStatusChange?.(newStatus);
  };

  return (
    <div className="absolute left-full top-0 ml-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      {/* User Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-orange-800 font-medium">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            )}
            {/* Indicateur de statut */}
            <div
              className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${statusColors[currentStatus]} rounded-full border-2 border-white`}
            ></div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{userName}</div>
            <div className="text-sm text-gray-500">{userEmail}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
          onClick={onSettings}
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Paramètres utilisateur</span>
        </button>

        {/* Status Section */}
        <div
          className="border-b border-gray-200 relative"
          onMouseEnter={() => setIsStatusDropdownOpen(true)}
          onMouseLeave={() => setIsStatusDropdownOpen(false)}
        >
          <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div
                className={`w-2 h-2 rounded-full ${statusColors[currentStatus]}`}
              ></div>
              <span className="text-sm text-gray-700">
                {statusLabels[currentStatus]}
              </span>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isStatusDropdownOpen ? "rotate-90" : ""
              }`}
            />
          </div>

          {/* Status Dropdown Options - Popup à droite on hover */}
          {isStatusDropdownOpen && (
            <div className="absolute left-full top-0 ml-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-2">
                {(["active", "inactive", "away"] as const)
                  .filter((status) => status !== currentStatus)
                  .map((status) => (
                    <button
                      key={status}
                      className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50"
                      onClick={() => handleStatusChange(status)}
                    >
                      <div
                        className={`w-2 h-2 ${statusColors[status]} rounded-full`}
                      ></div>
                      <span className="text-sm text-gray-700">
                        {statusLabels[status]}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Déconnexion</span>
        </button>
      </div>

      {/* Organizations Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
            <ChevronRight className="w-4 h-4 mr-1" />
            Toutes les organisations...
          </button>
        </div>

        {/* Organization Items */}
        <div className="space-y-2">
          {organizations.map((org) => (
            <div
              key={org.code}
              className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
            >
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {org.code.charAt(0).toLowerCase()}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {org.name}
                </div>
                <div className="text-xs text-gray-500">{org.code}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant de démonstration
const App = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative">
        <UserPopup
          userName="Hafiz BOUKARI"
          userEmail="hafiznovus@gmail.com"
          onSettings={() => console.log("Settings clicked")}
          onLogout={() => console.log("Logout clicked")}
          onStatusChange={(status) => console.log("Status changed to:", status)}
          organizations={[
            { name: "al3", code: "al3" },
            { name: "Hafiz", code: "hafiz" },
          ]}
        />
      </div>
    </div>
  );
};

export { UserPopup };
