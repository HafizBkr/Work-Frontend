"use client";

import React, { useState } from "react";
import NoteMenu from "./NoteMenu";
import NoteShareDrawer from "./NoteShareDrawer";
import NoteRenameDrawer from "./NoteRenameDrawer";
import NoteCreateDrawer from "./NoteCreateDrawer";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  isPinned?: boolean;
}

interface NotesMainContentProps {
  notes: Note[];
  onCreateNote?: () => void;
}

export default function NotesMainContent({
  notes,
  onCreateNote,
}: NotesMainContentProps) {
  const hasNotes = notes && notes.length > 0;

  // Gestion du menu contextuel
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [pinnedNotes, setPinnedNotes] = useState<{ [id: string]: boolean }>({});

  // Drawers
  const [openShareDrawer, setOpenShareDrawer] = useState(false);
  const [openRenameDrawer, setOpenRenameDrawer] = useState(false);
  const [openCreateDrawer, setOpenCreateDrawer] = useState(false);

  // Ouvre le menu contextuel sur la note
  const handleMenuButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    note: Note,
  ) => {
    e.stopPropagation();
    setSelectedNote(note);
    setMenuAnchor(e.currentTarget);
  };

  // Ferme le menu contextuel
  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  // Handler pour épingler/désépingler
  const handleTogglePin = (id: string) => {
    setPinnedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    handleCloseMenu();
  };

  // Handler pour partager (ouvre le drawer)
  const handleShare = () => {
    setOpenShareDrawer(true);
    handleCloseMenu();
  };

  // Handler pour renommer (ouvre le drawer)
  const handleRename = () => {
    setOpenRenameDrawer(true);
    handleCloseMenu();
  };

  // Handler pour supprimer (ferme le menu)
  const handleDelete = () => {
    // TODO: supprimer la note
    handleCloseMenu();
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-2xl border border-gray-200 m-6 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
        <button
          className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          onClick={() => setOpenCreateDrawer(true)}
        >
          Nouvelle note
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {hasNotes ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => {
              const isPinned = pinnedNotes[note.id] ?? note.isPinned ?? false;
              return (
                <div
                  key={note.id}
                  className="group cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-5 transition flex flex-col relative"
                  tabIndex={0}
                  role="button"
                  // TODO: onClick pour ouvrir la note en détail/édition
                >
                  {/* Bouton menu ... */}
                  <button
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 z-10"
                    onClick={(e) => handleMenuButtonClick(e, note)}
                    aria-label="Options note"
                    type="button"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2" fill="#888" />
                      <circle cx="12" cy="12" r="2" fill="#888" />
                      <circle cx="19" cy="12" r="2" fill="#888" />
                    </svg>
                  </button>
                  {/* Affichage de l'épingle si épinglée */}
                  {isPinned && (
                    <div
                      className="absolute top-2 left-2 text-yellow-500"
                      title="Épinglée"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-3 3v7a1 1 0 0 1-2 0v-7l-3-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                      {note.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {note.content}
                    </p>
                  </div>
                  <div className="mt-4 text-xs text-gray-400">
                    {note.createdAt
                      ? new Date(note.createdAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              );
            })}
            {/* Menu contextuel Note */}
            {selectedNote && menuAnchor && (
              <div
                style={{
                  position: "fixed",
                  left: menuAnchor.getBoundingClientRect().left,
                  top: menuAnchor.getBoundingClientRect().bottom + 4,
                  zIndex: 1000,
                }}
              >
                <NoteMenu
                  noteId={selectedNote.id}
                  isPinned={
                    pinnedNotes[selectedNote.id] ??
                    selectedNote.isPinned ??
                    false
                  }
                  onTogglePin={handleTogglePin}
                  onShare={handleShare}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onClose={handleCloseMenu}
                  position="right"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-24">
            <div className="text-5xl mb-4">📝</div>
            <div className="text-lg text-gray-500 mb-2">
              Aucune note pour l’instant.
            </div>
            <button
              className="mt-4 bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              onClick={() => setOpenCreateDrawer(true)}
            >
              Créer une première note
            </button>
          </div>
        )}
      </div>
      {/* Drawer de partage, rendu globalement comme sur Files */}
      {selectedNote && (
        <NoteShareDrawer
          open={openShareDrawer}
          onClose={() => setOpenShareDrawer(false)}
          noteTitle={selectedNote.title}
        />
      )}

      {/* Drawer de création de note */}
      <NoteCreateDrawer
        open={openCreateDrawer}
        onClose={() => setOpenCreateDrawer(false)}
        onSubmit={(noteTitle) => {
          // TODO: Ajouter la note à la liste (API ou state local)
          setOpenCreateDrawer(false);
        }}
      />

      {/* Drawer de renommage, rendu globalement comme sur Files */}
      {selectedNote && (
        <NoteRenameDrawer
          open={openRenameDrawer}
          initialName={selectedNote.title}
          onClose={() => setOpenRenameDrawer(false)}
          onSubmit={(newName) => {
            // TODO: API renommage
            // Tu peux remplacer le nom dans le state ici si tu veux un effet immédiat
            setOpenRenameDrawer(false);
          }}
        />
      )}
    </div>
  );
}
