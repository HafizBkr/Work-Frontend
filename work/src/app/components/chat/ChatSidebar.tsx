"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Conversation } from "../../types/index";

type Props = {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
};

// ConversationItem Component
function ConversationItem({
  conversation,
  isSelected,
  onClick,
  isPinned = false,
}: {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
  isPinned?: boolean;
}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <button
      className={`w-full flex items-center px-3 py-2.5 rounded-md transition-colors mb-1 ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div
        className={`w-9 h-9 rounded-md flex items-center justify-center mr-3 ${
          isPinned ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        {conversation.avatar ? (
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-9 h-9 rounded-md object-cover"
          />
        ) : (
          <span
            className={`text-xs font-medium ${
              isPinned ? "text-white" : "text-black"
            }`}
          >
            {getInitials(conversation.name)}
          </span>
        )}
      </div>

      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <h3 className="font-medium text-black text-sm truncate">
            {conversation.name}
          </h3>
          <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
            {conversation.lastTime}
          </span>
        </div>
        <p className="text-sm text-black truncate">
          {conversation.lastMessage}
        </p>
      </div>

      {conversation.unread && conversation.unread > 0 && (
        <div className="ml-2 flex-shrink-0">
          <span className="inline-flex items-center justify-center w-5 h-5 bg-gray-800 text-white text-xs font-medium rounded-full">
            {conversation.unread}
          </span>
        </div>
      )}
    </button>
  );
}

export default function ChatSidebar({
  conversations,
  selectedId,
  onSelect,
}: Props) {
  const [activeTab, setActiveTab] = useState("Activity");
  const [searchQuery, setSearchQuery] = useState("");

  const pinned = conversations.filter((c) => c.pinned);
  const others = conversations.filter((c) => !c.pinned);

  const filteredOthers = others.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalUnread = conversations.reduce(
    (acc, conv) => acc + (conv.unread || 0),
    0,
  );

  return (
    <aside className="w-72  border-r border-gray-200 flex flex-col bg-white h-full flex-shrink-0">
      {/* Header */}
      <div className="mt-[60px] flex items-center justify-between px-3 py-3 border-b border-gray-100">
        <div>
          <h1 className="text-3xl  font-semibold text-gray-900">Inbox</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {totalUnread > 0 ? `${totalUnread} unread` : "All caught up"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center px-4 py-3 gap-6 border-b border-gray-100">
        {[
          { name: "Activity", count: totalUnread },
          { name: "My messages", count: 0 },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`text-sm font-medium transition-colors relative ${
              activeTab === tab.name
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
            {tab.count > 0 && tab.name === "Activity" && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-black"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Pinned Messages */}
        {pinned.length > 0 && (
          <div className="px-3 py-2">
            <h2 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
              Pinned Message
            </h2>
            <div className="space-y-1">
              {pinned.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedId === conv.id}
                  onClick={() => onSelect(conv.id)}
                  isPinned={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Messages */}
        <div className="px-3 py-2">
          <h2 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
            All Messages
          </h2>
          <div className="space-y-1">
            {filteredOthers.length > 0 ? (
              filteredOthers.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conversation={conv}
                  isSelected={selectedId === conv.id}
                  onClick={() => onSelect(conv.id)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No conversations found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
