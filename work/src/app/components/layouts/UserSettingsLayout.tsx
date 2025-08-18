"use client";

import React, { useState } from "react";
import UserSettingsSidebar from "../usersettings/UserSettingsSidebar";
import ProfileSettings from "../usersettings/ProfileSettings";
import InformationsSettings from "../usersettings/InformationsSettings";
import PasswordSettings from "../usersettings/PasswordSettings";
import GeneralSettings from "../usersettings/GeneralSettings";
import SecuritySettings from "../usersettings/SecuritySettings";
import NotificationsSettings from "../usersettings/NotificationsSettings";

type SettingsSection =
  | "profil"
  | "informations"
  | "motdepasse"
  | "parametres"
  | "securite"
  | "notifications";

const sectionComponentMap: Record<SettingsSection, React.ReactNode> = {
  profil: <ProfileSettings />,
  informations: <InformationsSettings />,
  motdepasse: <PasswordSettings />,
  parametres: <GeneralSettings />,
  securite: <SecuritySettings />,
  notifications: <NotificationsSettings />,
};

const UserSettingsLayout: React.FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<SettingsSection>("profil");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[35%] border-r border-gray-200 bg-white">
        <UserSettingsSidebar
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />
      </div>
      {/* Main Content */}
      <main className="w-[40%] bg-white px-12 py-8 ">
        {sectionComponentMap[selectedSection]}
      </main>
      {/* Empty space 20% */}
      <div className="w-[20%] bg-gray-50"></div>
    </div>
  );
};

export default UserSettingsLayout;
