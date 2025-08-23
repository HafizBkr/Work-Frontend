import React, { useState, useEffect } from "react";
import Drawer from "../ui/Drawer";

interface EventDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    event_title: string;
    event_description: string;
    start_datetime: string;
    end_datetime: string;
  }) => void;
  initialStart?: string | null;
  initialEnd?: string | null;
}

const EventDrawer: React.FC<EventDrawerProps> = ({
  open,
  onClose,
  onAdd,
  initialStart,
  initialEnd,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(initialStart || "");
  const [endDate, setEndDate] = useState(initialEnd || "");

  useEffect(() => {
    if (open) {
      setTitle("");
      setDescription("");
      setStartDate(initialStart || "");
      setEndDate(initialEnd || "");
    }
  }, [open, initialStart, initialEnd]);

  // Helper to format date for input[type=datetime-local]
  const toLocalInput = (iso: string) => {
    if (!iso) return "";
    // Remove Z and seconds for input compatibility
    const d = new Date(iso);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d.getTime() - tzOffset)
      .toISOString()
      .slice(0, 16);
    return localISO;
  };

  // Helper to convert input[type=datetime-local] to ISO string (UTC)
  const fromLocalInput = (local: string) => {
    if (!local) return "";
    const d = new Date(local);
    return d.toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startDate || !endDate) return;
    onAdd({
      event_title: title.trim(),
      event_description: description.trim(),
      start_datetime: fromLocalInput(startDate),
      end_datetime: fromLocalInput(endDate),
    });
  };

  return (
    <Drawer open={open} onClose={onClose} width={420}>
      <form
        className="flex flex-col h-full p-6"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-xl font-bold mb-4 text-black">
          Ajouter un événement
        </h2>
        <label className="mb-2 text-sm font-medium text-black">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          className="border rounded px-3 py-2 mb-4 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Titre de l'événement"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="mb-2 text-sm font-medium text-black">
          Description
        </label>
        <textarea
          className="border rounded px-3 py-2 mb-4 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <label className="mb-2 text-sm font-medium text-black">
          Début <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          className="border rounded px-3 py-2 mb-4 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={toLocalInput(startDate)}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label className="mb-2 text-sm font-medium text-black">
          Fin <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          className="border rounded px-3 py-2 mb-6 text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={toLocalInput(endDate)}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <div className="flex gap-2 mt-auto">
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded bg-gray-200 text-black font-semibold hover:bg-gray-300"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
            disabled={!title.trim() || !startDate || !endDate}
          >
            Ajouter
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default EventDrawer;
