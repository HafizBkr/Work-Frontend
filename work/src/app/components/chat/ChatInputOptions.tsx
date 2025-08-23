"use client";
import React from "react";
import {
  Smile,
  Bold,
  Italic,
  Underline,
  Link,
  Paperclip,
  Mic,
  Image,
} from "lucide-react";

type Props = {
  onEmoji?: () => void;
  onBold?: () => void;
  onItalic?: () => void;
  onUnderline?: () => void;
  onLink?: () => void;
  onAttach?: () => void;
  onMic?: () => void;
  onImage?: () => void;
};

export default function ChatInputOptions({
  onEmoji,
  onBold,
  onItalic,
  onUnderline,
  onLink,
  onAttach,
  onMic,
  onImage,
}: Props) {
  return (
    <div className="flex items-center gap-2 px-1 py-1">
      <button type="button" onClick={onEmoji} className="p-1 hover:bg-gray-100 rounded" title="Emoji">
        <Smile className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onBold} className="p-1 hover:bg-gray-100 rounded" title="Gras">
        <Bold className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onItalic} className="p-1 hover:bg-gray-100 rounded" title="Italique">
        <Italic className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onUnderline} className="p-1 hover:bg-gray-100 rounded" title="Souligné">
        <Underline className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onLink} className="p-1 hover:bg-gray-100 rounded" title="Lien">
        <Link className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onAttach} className="p-1 hover:bg-gray-100 rounded" title="Pièce jointe">
        <Paperclip className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onMic} className="p-1 hover:bg-gray-100 rounded" title="Micro">
        <Mic className="w-5 h-5 text-gray-500" />
      </button>
      <button type="button" onClick={onImage} className="p-1 hover:bg-gray-100 rounded" title="Image">
        <Image className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}
