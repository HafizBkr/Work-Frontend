"use client";

import React from "react";
import Sidebar from "../dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
