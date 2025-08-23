"use client";
import React, { useRef, useEffect } from "react";
import { UserPopup } from "./userDashDropdown";
import { useRouter } from "next/navigation";
import { useSidebar } from "./context/SidebarContext";

interface SidebarProps {
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedSection,
  onSelectSection,
}) => {
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [showUserPopup, setShowUserPopup] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState<
    "active" | "inactive" | "away"
  >("active");
  const popupRef = useRef<HTMLDivElement>(null);
  const userSectionRef = useRef<HTMLDivElement>(null);

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Tableau De Bord",
      href: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projets",
      href: "/dashboard/projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
          <path d="M8 10v4" />
          <path d="M12 10v2" />
          <path d="M16 10v6" />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      href: "/dashboard/chat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
        </svg>
      ),
    },
    {
      id: "files",
      label: "Fichiers",
      href: "/dashboard/files",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 12v-1" />
          <path d="M10 18v-2" />
          <path d="M10 7V6" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01" />
          <circle cx="10" cy="20" r="2" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendrier",
      href: "/dashboard/calendar/main",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 2v4" />
          <path d="M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25" />
          <path d="m22 22-1.875-1.875" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <circle cx="18" cy="18" r="3" />
        </svg>
      ),
    },
    {
      id: "notes",
      label: "Notes",
      href: "/dashboard/notes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
        </svg>
      ),
    },
  ];

  const bottomMenuItems = [
    {
      id: "notifications",
      label: "Notifications",
      href: "/dashboard/notifications",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
    },
    {
      id: "integrations",
      label: "Intégrations",
      href: "/dashboard/integrations",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m0-16.48l4.24 4.24m8.48 8.48l4.24 4.24" />
        </svg>
      ),
    },
    {
      id: "help",
      label: "Centre D'aide",
      href: "/dashboard/help",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];
  // Plus besoin de isActiveRoute ni handleMenuClick, tout est géré par selectedSection et onSelectSection

  // toggleSidebar est maintenant fourni par le contexte

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        userSectionRef.current &&
        !userSectionRef.current.contains(event.target as Node)
      ) {
        setShowUserPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout");
  };

  const handleSettings = () => {
    router.push("/settings/general");
  };

  const handleStatusChange = (status: "active" | "inactive" | "away") => {
    setUserStatus(status);
  };

  const getStatusColor = () => {
    switch (userStatus) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-gray-400";
      case "away":
        return "bg-orange-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="relative bg-gray-60 ">
      <div
        className={`${isCollapsed ? "w-16" : "w-55"} bg-gray-50 border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow z-10 cursor-pointer"
        >
          {isCollapsed ? (
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="9,18 15,12 9,6" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="15,18 9,12 15,6" />
            </svg>
          )}
        </button>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div
            className={`text-2xl font-bold text-black ${isCollapsed ? "text-center" : ""}`}
          >
            {isCollapsed ? "W" : "Work"}
          </div>
        </div>
        {/* User Section */}
        <div
          ref={userSectionRef}
          className="p-4 border-b border-gray-200 relative"
        >
          <div
            className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-200"
            onClick={toggleUserPopup}
          >
            <div
              className={`relative w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 transition-none ${
                isCollapsed ? "mx-auto" : ""
              }`}
            >
              <span className="text-orange-800 font-medium text-sm">HB</span>
              {/* Indicateur de statut */}
              <div
                className={`absolute -top-0.5 -right-0.5 w-3 h-3 ${getStatusColor()} rounded-full border-2 border-white`}
              ></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 ml-3">
                <div className="font-medium text-gray-900 truncate">
                  Hafiz BOUKARI
                </div>
                <div className="text-sm text-gray-500 truncate">Hafiz</div>
              </div>
            )}
          </div>

          {showUserPopup && !isCollapsed && (
            <div ref={popupRef}>
              <UserPopup
                userName="Hafiz BOUKARI"
                userEmail="hafiznovus@gmail.com"
                currentStatus={userStatus}
                onLogout={handleLogout}
                onSettings={handleSettings}
                onStatusChange={handleStatusChange}
                organizations={[
                  { name: "al3", code: "al3" },
                  { name: "Hafiz", code: "hafiz" },
                ]}
              />
            </div>
          )}
        </div>
        {/* Main Navigation */}
        <nav className="flex flex-col gap-2 mt-4 ">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.href);
              }}
              className={`flex items-center transition-all duration-300 cursor-pointer
                       ${isCollapsed ? "justify-center px-0" : "gap-2 px-4"}
                       py-2 rounded-lg text-base font-medium
                       ${
                         selectedSection === item.id
                           ? "bg-white border border-gray-200 text-gray-900 shadow"
                           : "text-gray-500 hover:bg-gray-100"
                       }
                     `}
              title={item.label}
            >
              <span
                className={
                  selectedSection === item.id
                    ? "text-gray-900"
                    : "text-gray-500"
                }
                title={item.label}
              >
                {item.icon}
              </span>
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
                title={item.label}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        {/* Bottom Navigation collé en bas avec espace */}
        <div className="mt-auto">
          <div className="border-t border-gray-200 px-4 py-4 space-y-1 bg-white mt-auto">
            <button
              onClick={() => onSelectSection("notifications")}
              className={`w-full flex items-center transition-all duration-300 cursor-pointer ${isCollapsed ? "justify-center px-0" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium ${
                selectedSection === "notifications"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title="Notifications"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Notifications
              </span>
            </button>
            <button
              onClick={() => onSelectSection("integrations")}
              className={`w-full flex items-center transition-all duration-300 cursor-pointer ${isCollapsed ? "justify-center px-0" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium ${
                selectedSection === "integrations"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title="Intégrations"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m0-16.48l4.24 4.24m8.48 8.48l4.24 4.24" />
              </svg>
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Intégrations
              </span>
            </button>
            <button
              onClick={() => onSelectSection("workspace-settings")}
              className={`w-full flex items-center transition-all duration-300 cursor-pointer ${isCollapsed ? "justify-center px-0" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium ${
                selectedSection === "workspace-settings"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title="Paramètres du workspace"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929" />
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Paramètres du workspace
              </span>
            </button>
            <button
              onClick={() => onSelectSection("help")}
              className={`w-full flex items-center transition-all duration-300 cursor-pointer ${isCollapsed ? "justify-center px-0" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium ${
                selectedSection === "help"
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title="Centre D'aide"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span
                className={`transition-all duration-300 whitespace-nowrap
                  ${isCollapsed ? "opacity-0 w-0 max-w-0 overflow-hidden" : "opacity-100 w-auto max-w-xs ml-2"}
                `}
                style={{ minWidth: isCollapsed ? 0 : undefined }}
              >
                Centre D&apos;aide
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
