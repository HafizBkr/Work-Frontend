"use client";

import React, { useState } from "react";
import WorkspaceSettingsSidebar from "../workspacesettings/WorkspaceSettingsSidebar";
import WorkspaceGeneralSettings from "../workspacesettings/WorkspaceGeneralSettings";
import WorkspaceMembersSettings from "../workspacesettings/WorkspaceMembersSettings";
import { WorkspaceSection } from "../workspacesettings/types";
import WorkspaceRolesSettings from "../workspacesettings/WorkspaceRolesSettings";

const sectionComponentMap: Record<WorkspaceSection, React.ReactNode> = {
  general: <WorkspaceGeneralSettings />,
  members: <WorkspaceMembersSettings />,
  roles: <WorkspaceRolesSettings />,
};

const WorkspaceSettingsLayout: React.FC = () => {
  const [selectedSection, setSelectedSection] =
    useState<WorkspaceSection>("general");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-[35%] border-r border-gray-200 bg-white">
        <WorkspaceSettingsSidebar
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />
      </div>
      {/* Main Content */}
      <main className="w-[45%] bg-white px-12 py-8 ">
        {sectionComponentMap[selectedSection]}
      </main>
      {/* Empty space 20% */}
      <div className="w-[20%] bg-gray-50"></div>
    </div>
  );
};

export default WorkspaceSettingsLayout;
