"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Strike } from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import "@/app/globals.css";
import { useState, useCallback } from "react";

export default function TiptapEditor() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlighter, setShowHighlighter] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Strike,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: `
      <p>Commencez à écrire votre note ici...</p>
    `,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  const setLink = useCallback(() => {
    if (linkUrl === null) {
      return;
    }

    if (linkUrl === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setShowLinkDialog(false);
    setLinkUrl("");
  }, [editor, linkUrl]);

  if (!editor) return null;

  const colors = [
    "#000000",
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b266",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "#3d1466",
  ];

  const highlightColors = [
    "#ffff00",
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#ffa500",
    "#ff69b4",
  ];

  return (
    <div className="w-full max-w-none bg-gray-100 min-h-screen">
      {/* Barre d'outils fixe */}

      <div className="sticky top-0 z-10 flex items-center justify-center gap-1 p-2 border-b border-gray-200 bg-white shadow-sm flex-wrap">
        {/* Undo/Redo */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
          title="Annuler"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 7v6h6" />
            <path d="m21 17-3-3-3 3" />
            <path d="M21 10.5c0 4.5-3.5 8-8 8s-8-3.5-8-8 3.5-8 8-8c2.5 0 4.5 1 6 2.5l3 3" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700 disabled:text-gray-400 disabled:hover:bg-transparent"
          title="Refaire"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 7v6h-6" />
            <path d="m3 17 3-3 3 3" />
            <path d="M3 10.5c0 4.5 3.5 8 8 8s8-3.5 8-8-3.5-8-8-8c-2.5 0-4.5 1-6 2.5l-3 3" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Styles de titre */}
        <select
          onChange={(e) => {
            const level = e.target.value;
            if (level === "p") {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(level) as 1 | 2 | 3 })
                .run();
            }
          }}
          className="px-2 py-1 rounded border border-gray-300 bg-white text-sm min-w-[100px]"
          value={
            editor.isActive("heading", { level: 1 })
              ? "1"
              : editor.isActive("heading", { level: 2 })
                ? "2"
                : editor.isActive("heading", { level: 3 })
                  ? "3"
                  : "p"
          }
        >
          <option value="p">Normal</option>
          <option value="1">Titre 1</option>
          <option value="2">Titre 2</option>
          <option value="3">Titre 3</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Listes */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bulletList")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Liste à puces"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("orderedList")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Liste numérotée"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="10" y1="6" x2="21" y2="6" />
            <line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <path d="m4 6 1 0 0 6" />
            <path d="m4 10 2 0" />
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignement */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Aligner à gauche"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="15" y1="12" x2="3" y2="12" />
            <line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Centrer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="6" />
            <line x1="21" y1="12" x2="3" y2="12" />
            <line x1="18" y1="18" x2="6" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Aligner à droite"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="21" y1="6" x2="3" y2="6" />
            <line x1="21" y1="12" x2="9" y2="12" />
            <line x1="21" y1="18" x2="7" y2="18" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive({ textAlign: "justify" })
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Justifier"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Formatage de texte */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("bold")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Gras"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Italique"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("underline")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Souligné"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 4v6a6 6 0 0 0 12 0V4" />
            <line x1="4" y1="20" x2="20" y2="20" />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("strike")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Barré"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4H9a3 3 0 0 0-2.83 4" />
            <path d="M14 12a4 4 0 0 1 0 8H6" />
            <line x1="4" y1="12" x2="20" y2="12" />
          </svg>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Code et exposant/indice */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("code")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Code"
        >
          <code className="text-sm font-mono">&lt;/&gt;</code>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("superscript")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Exposant"
        >
          <span className="text-xs font-bold">x²</span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`p-2 rounded hover:bg-gray-100 transition-colors ${
            editor.isActive("subscript")
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          title="Indice"
        >
          <span className="text-xs font-bold">x₂</span>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lien */}
        <div className="relative">
          <button
            onClick={() => setShowLinkDialog(!showLinkDialog)}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              editor.isActive("link")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
            title="Lien"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>

          {showLinkDialog && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10">
              <input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="block w-48 px-2 py-1 text-sm border border-gray-300 rounded mb-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLink();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={setLink}
                  className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowLinkDialog(false)}
                  className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Couleur du texte */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
            title="Couleur du texte"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="13.5" cy="6.5" r=".5" />
              <circle cx="17.5" cy="10.5" r=".5" />
              <circle cx="8.5" cy="7.5" r=".5" />
              <circle cx="6.5" cy="12.5" r=".5" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
          </button>

          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div className="grid grid-cols-7 gap-1 w-32">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                    className="w-4 h-4 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Surlignage */}
        <div className="relative">
          <button
            onClick={() => setShowHighlighter(!showHighlighter)}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${
              editor.isActive("highlight")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
            title="Surligner"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 11-6 6v3h3l6-6" />
              <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
            </svg>
          </button>

          {showHighlighter && (
            <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-300 rounded shadow-lg z-10">
              <div className="flex gap-1">
                {highlightColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      editor.chain().focus().toggleHighlight({ color }).run();
                      setShowHighlighter(false);
                    }}
                    className="w-4 h-4 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={`Surligner en ${color}`}
                  />
                ))}
                <button
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run();
                    setShowHighlighter(false);
                  }}
                  className="w-4 h-4 rounded border border-gray-300 bg-white hover:scale-110 transition-transform"
                  title="Supprimer le surlignage"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Bouton Add (personnalisable) */}
        <button
          className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
          title="Ajouter"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Zone d'édition avec style Google Docs */}
      <div className="flex justify-center py-8 min-h-screen">
        <div className="relative mt-[200px]">
          {/* Règle horizontale */}
          <div className="ruler-container">
            <div className="ruler">
              {/* Graduation principale tous les cm */}
              {Array.from({ length: 17 }, (_, i) => (
                <div
                  key={i}
                  className="ruler-mark major"
                  style={{ left: `${i * 48}px` }}
                >
                  <div className="ruler-number">{i + 1}</div>
                </div>
              ))}
              {/* Graduations mineures tous les 0.5cm */}
              {Array.from({ length: 33 }, (_, i) => (
                <div
                  key={`minor-${i}`}
                  className="ruler-mark minor"
                  style={{ left: `${i * 24}px` }}
                />
              ))}
              {/* Graduation très fine tous les 0.25cm */}
              {Array.from({ length: 65 }, (_, i) => (
                <div
                  key={`fine-${i}`}
                  className="ruler-mark fine"
                  style={{ left: `${i * 12}px` }}
                />
              ))}

              {/* Marqueurs de marge */}
              <div
                className="margin-marker left"
                style={{ left: "96px" }}
                title="Marge gauche"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="#4285f4">
                  <path d="M0 0 L10 6 L0 12 Z" />
                </svg>
              </div>
              <div
                className="margin-marker right"
                style={{ left: "720px" }}
                title="Marge droite"
              >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="#4285f4">
                  <path d="M10 0 L0 6 L10 12 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Page délimitée comme Google Docs */}
          <div className="google-docs-page">
            <EditorContent
              editor={editor}
              className="focus-within:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
