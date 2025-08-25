"use client";
import React, { useState } from "react";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatContent from "../../components/chat/ChatContent";
import { Conversation, Message } from "../../types/index";
import DashboardSidebar from "../../components/dashboard/sidebar";

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

// --- Page component ---
export default function Page() {
  const [selectedId, setSelectedId] = useState("general");
  const selectedConv =
    conversations.find((c) => c.id === selectedId) || conversations[0];

  return (
    <div className="flex  flex-1 h-full">
      <DashboardSidebar selectedSection="chat" onSelectSection={() => {}} />
      <ChatSidebar
        conversations={conversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
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
  );
}
