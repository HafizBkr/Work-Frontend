"use client";

import React, { useState } from "react";
import Sidebar from "../dashboard/sidebar";
import ProjectsPage from "../projects/ProjectsPage";
import ChatSidebar from "../chat/ChatSidebar";
import ChatContent from "../chat/ChatContent";
import { Conversation, Message } from "../../types/index";
import { useRouter, usePathname } from "next/navigation";

// --- Données de chat (mock, à remplacer par API ou props si besoin) ---
const conversations: Conversation[] = [
  {
    id: "general",
    name: "Cansas Project",
    lastMessage: "made it more concise to highlight the CTA",
    lastTime: "12:10 AM",
    unread: 0,
    pinned: true,
  },
  {
    id: "bozz",
    name: "Bozz",
    lastMessage: "Complete your task before March 23, cau...",
    lastTime: "12:10 AM",
    unread: 8,
    pinned: true,
  },
  {
    id: "design",
    name: "Design Team",
    lastMessage: "Any mechanical keyboard enthusiasts in d...",
    lastTime: "12:10 AM",
    unread: 3,
  },
  // ... autres conversations ...
];

const messages: Message[] = [
  {
    id: 1,
    sender: "Rani",
    content:
      "Hey guys, can we start sharing the latest design updates? We're aiming to finalize everything this week.",
    time: "19.21",
  },
  {
    id: 2,
    sender: "Sayuti",
    content: "Yup, I've updated the homepage layout. Check it out on Figma 🙌",
    time: "Today",
  },
  // ... autres messages ...
];

function sectionFromPath(pathname: string) {
  if (pathname.endsWith("/dashboard/projects")) return "projects";
  if (pathname.endsWith("/dashboard/notifications")) return "notifications";
  if (pathname.endsWith("/dashboard/integrations")) return "integrations";
  if (pathname.endsWith("/dashboard/help")) return "help";
  if (pathname.endsWith("/settings/workspace")) return "workspace-settings";
  if (pathname.endsWith("/dashboard/chat")) return "chat";
  return "dashboard";
}

const DashboardLayout: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSection, setSelectedSection] = useState<string>(() =>
    sectionFromPath(pathname),
  );
  const [selectedChatId, setSelectedChatId] = React.useState("general");

  React.useEffect(() => {
    let url = "/dashboard";
    if (selectedSection && selectedSection !== "dashboard") {
      if (selectedSection === "workspace-settings") {
        url = "/settings/workspace";
      } else {
        url = `/dashboard/${selectedSection}`;
      }
    }
    if (pathname !== url) {
      router.replace(url);
    }
  }, [selectedSection]);

  React.useEffect(() => {
    const section = sectionFromPath(pathname);
    setSelectedSection(section);
  }, [pathname]);

  // Section rendering
  let mainContent: React.ReactNode = null;
  if (selectedSection === "dashboard") {
    mainContent = (
      <div className="p-8 text-2xl font-bold text-black">
        Bienvenue sur le Dashboard !
      </div>
    );
  } else if (selectedSection === "projects") {
    mainContent = <ProjectsPage />;
  } else if (selectedSection === "notifications") {
    mainContent = <div className="p-8 text-xl">Notifications</div>;
  } else if (selectedSection === "integrations") {
    mainContent = <div className="p-8 text-xl">Intégrations</div>;
  } else if (selectedSection === "workspace-settings") {
    mainContent = <div className="p-8 text-xl">Paramètres du workspace</div>;
  } else if (selectedSection === "help") {
    mainContent = <div className="p-8 text-xl">Centre d&apos;aide</div>;
  } else if (selectedSection === "chat") {
    // Section chat intégrée
    const selectedConv =
      conversations.find((c) => c.id === selectedChatId) || conversations[0];
    mainContent = (
      <div className="flex-1 h-full overflow-hidden">
        <div className="flex h-full">
          <ChatSidebar
            conversations={conversations}
            selectedId={selectedChatId}
            onSelect={setSelectedChatId}
          />
          <ChatContent
            conversation={{
              ...selectedConv,
              members: 16,
              online: 5,
              messages,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full">{mainContent}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
