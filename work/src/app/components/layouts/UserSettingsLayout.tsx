"use client";

import React from "react";
import UserSettingsSidebar from "../usersettings/UserSettingsSidebar";

interface UserSettingsLayoutProps {
  children: React.ReactNode;
}

const UserSettingsLayout: React.FC<UserSettingsLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[35%] border-r border-gray-200 bg-white">
        <UserSettingsSidebar />
      </div>
      {/* Main Content */}
      <main className="w-[40%] bg-white px-12 py-8 ">{children}</main>
      {/* Empty space 20% */}
      <div className="w-[20%] bg-gray-50"></div>
    </div>
  );
};

export default UserSettingsLayout;
