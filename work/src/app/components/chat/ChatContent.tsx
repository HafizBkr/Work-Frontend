"use client";
import React, { useState } from "react";
import { Search, MoreVertical, Plus, Send } from "lucide-react";
import ChatInputOptions from "./ChatInputOptions";
import { ConversationData } from "../../types/index";

type Props = {
  conversation: ConversationData;
  currentUser?: string; // Ajout pour identifier l'utilisateur courant
};

export default function ChatContent({ conversation }: Props) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden p-8">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="font-semibold text-black">
              {getInitials(conversation.name)}
            </span>
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-black">{conversation.name}</h2>
            <p className="text-sm text-black">
              {conversation.members} Members • {conversation.online} Online
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1  overflow-y-auto px-[100px] py-4 space-y-4 bg-white min-h-0">
        {conversation.messages.map((msg) => {
          const currentUser = "Sayuti"; // À adapter selon ton auth
          const isMine = msg.sender === currentUser;

          // Fonction pour obtenir la couleur du nom selon l'utilisateur
          const getNameColor = (name: string) => {
            switch (name.toLowerCase()) {
              case "rani":
                return "text-green-600";
              case "sayuti":
                return "text-blue-600";
              case "damar":
                return "text-red-600";
              case "aldi":
                return "text-yellow-600";
              case "tia":
                return "text-pink-600";
              default:
                return "text-gray-900";
            }
          };

          return (
            <div key={msg.id} className="mb-4">
              {/* Nom de l'expéditeur */}
              <div
                className={`flex items-center ${isMine ? "justify-end" : "justify-start"} mb-1`}
              >
                <span
                  className={`text-sm font-medium ${getNameColor(msg.sender)}`}
                >
                  {msg.sender}
                </span>
              </div>

              {/* Message et timestamp */}
              <div className="flex gap-3">
                {!isMine && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-600">
                      {msg.sender.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div
                  className={`flex flex-col max-w-[75%] ${isMine ? "ml-auto" : ""}`}
                >
                  <div className={`${isMine ? "ml-12" : ""}`}>
                    <div
                      className={`rounded-lg max-w-[280px] px-3 py-2 ${
                        isMine ? "bg-blue-50" : "bg-gray-50"
                      }`}
                    >
                      <p className="text-gray-900 text-sm">{msg.content}</p>
                    </div>
                    <div className="flex justify-end">
                      <span className="text-xs text-gray-400 mt-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
                {isMine && (
                  <img
                    src={
                      msg.avatar ||
                      `https://ui-avatars.com/api/?name=${msg.sender}`
                    }
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Sample additional messages for demo */}
        <div className="flex items-center justify-center py-4">
          <div className="bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
            <span className="text-xs text-black font-medium">Today</span>
          </div>
        </div>

        {/* Démo : messages supplémentaires alignés */}
        {/* Sample additional messages for demo */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-red-600">Damar</span>
            <span className="text-xs text-gray-400">19.21</span>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-gray-600">DA</span>
            </div>
            <div className="flex flex-col max-w-[75%]">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-gray-900 text-sm">
                  Just saw it—nice layout!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Zone */}
      <div className="flex-shrink-0 px-4 py-3 border-t border-gray-200 bg-white">
        <ChatInputOptions
          onEmoji={() => setMessage((m) => m + "😊")}
          onBold={() => setMessage((m) => m + "**texte en gras**")}
          onItalic={() => setMessage((m) => m + "_texte en italique_")}
          onUnderline={() => setMessage((m) => m + "<u>texte souligné</u>")}
          onLink={() => setMessage((m) => m + "[lien](url)")}
          onAttach={() => alert("Sélecteur de fichier à implémenter")}
          onMic={() => alert("Enregistrement vocal à implémenter")}
          onImage={() => alert("Sélecteur d'image à implémenter")}
        />
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-black"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2.5 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
