import React, { useState, useRef, useEffect } from "react";
import { UserPopup } from "./userDashDropdown";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [userStatus, setUserStatus] = useState<"active" | "inactive" | "away">(
    "active",
  );
  const popupRef = useRef<HTMLDivElement>(null);
  const userSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Tableau De Bord",
      href: "/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "projects",
      label: "Projets",
      href: "/dashboard/projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "chat",
      label: "Chat",
      href: "/dashboard/chat",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      id: "files",
      label: "Fichiers",
      href: "/dashboard/files",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendrier",
      href: "/dashboard/calendar",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: "notes",
      label: "Notes",
      href: "/dashboard/notes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
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
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return activeRoute === "/dashboard";
    }
    return activeRoute.startsWith(href);
  };

  const handleMenuClick = (href: string) => {
    setActiveRoute(href);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
    <div className="relative">
      <div
        className={`${isCollapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
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
            className={`text-2xl font-bold text-purple-600 ${isCollapsed ? "text-center" : ""}`}
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
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden py-4">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.href)}
              className={`w-full flex items-center cursor-pointer ${isCollapsed ? "justify-center px-2" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item.href)
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className={`flex-shrink-0 ${
                  isActiveRoute(item.href) ? "text-purple-600" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 border-t border-gray-200 space-y-1">
          {bottomMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.href)}
              className={`w-full flex items-center cursor-pointer ${isCollapsed ? "justify-center px-2" : "space-x-3 px-3"} py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item.href)
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <span
                className={`flex-shrink-0 ${
                  isActiveRoute(item.href) ? "text-purple-600" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
