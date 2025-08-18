import React, { useState } from "react";
import Drawer from "../ui/Drawer";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/select/Select";

interface TaskFormValues {
  task_title: string;
  task_description: string;
  task_status: string;
  task_assign_to: string;
  task_priority: string;
  task_points: number;
  task_dates: {
    start_date: string;
    due_date: string;
  };
  task_order: number;
  completion_percentage: number;
}

interface CreateTaskDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (task: TaskFormValues) => void;
  users?: { id: string; name: string }[]; // Pour l'assignation
}

const TASK_STATUSES = [
  {
    value: "backlog",
    label: <>Backlog</>,
    icon: (
      <span className="inline-block w-2 h-2 rounded-full bg-gray-300 mr-2" />
    ),
  },
  {
    value: "todo",
    label: <>Non commencée</>,
    icon: (
      <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-2" />
    ),
  },
  {
    value: "in_progress",
    label: <>En cours</>,
    icon: (
      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
    ),
  },
  {
    value: "review",
    label: <>À valider</>,
    icon: (
      <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2" />
    ),
  },
  {
    value: "done",
    label: <>Achevée</>,
    icon: (
      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
    ),
  },
];

const TASK_PRIORITIES = [
  {
    value: "none",
    label: <>Aucune priorité</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-300">
        {" "}
        <svg width="16" height="16">
          <rect width="16" height="16" fill="currentColor" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: "low",
    label: <>Basse</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-green-400">
        {" "}
        <svg width="16" height="16">
          <rect width="16" height="16" fill="currentColor" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: "medium",
    label: <>Moyenne</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-yellow-400">
        {" "}
        <svg width="16" height="16">
          <rect width="16" height="16" fill="currentColor" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: "high",
    label: <>Élevée</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-orange-500">
        {" "}
        <svg width="16" height="16">
          <rect width="16" height="16" fill="currentColor" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: "urgent",
    label: <>Urgente</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-red-500">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="8" fill="currentColor" />
        </svg>{" "}
      </span>
    ),
  },
];

const TASK_POINTS = [
  {
    value: 1,
    label: <>1 Points</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-400">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: 2,
    label: <>2 Points</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-400">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: 3,
    label: <>3 Points</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-400">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: 4,
    label: <>4 Points</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-400">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
        </svg>{" "}
      </span>
    ),
  },
  {
    value: 5,
    label: <>5 Points</>,
    icon: (
      <span className="inline-block w-4 h-4 mr-2 text-gray-400">
        {" "}
        <svg width="16" height="16">
          <circle cx="8" cy="8" r="7" stroke="currentColor" fill="none" />
        </svg>{" "}
      </span>
    ),
  },
];

interface TaskFormValues {
  task_title: string;
  task_description: string;
  task_status: string;
  task_assign_to: string;
  task_priority: string;
  task_points: number;
  task_dates: {
    start_date: string;
    due_date: string;
  };
  task_order: number;
  completion_percentage: number;
}

export default function CreateTaskDrawer({
  open,
  onClose,
  onSubmit,
  users = [],
}: CreateTaskDrawerProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("todo");
  const [assignTo, setAssignTo] = useState<string>("");
  const [priority, setPriority] = useState<string>("none");
  const [points, setPoints] = useState<number | "">("");
  const [startDate, setStartDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const [completion, setCompletion] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const task: TaskFormValues = {
      task_title: title,
      task_description: description,
      task_status: status,
      task_assign_to: assignTo,
      task_priority: priority,
      task_points: points === "" ? 0 : Number(points),
      task_dates: {
        start_date: startDate,
        due_date: dueDate,
      },
      task_order: order,
      completion_percentage: completion,
    };
    onSubmit?.(task);
    onClose();
    // Optionally reset form here
  };

  return (
    <Drawer open={open} onClose={onClose} width={600}>
      <div className="p-8 flex-1 flex flex-col min-h-full max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Créer une nouvelle tâche
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={onClose}
            type="button"
            aria-label="Fermer"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            label="Titre"
            placeholder="Entrez le titre du modèle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-100 text-gray-900"
            containerClassName="text-gray-900"
          />
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition min-h-[80px]"
              placeholder="Entrez une description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <hr className="my-2 border-gray-200" />
          <div className="flex flex-col gap-2 text-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-900 uppercase w-24">
                Projet
              </span>
              <span className="flex items-center gap-2 text-gray-900 font-medium">
                <span className="inline-block w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                you
              </span>
            </div>
            <Select
              label="Statut"
              value={status}
              onChange={(v) => setStatus(String(v))}
              options={TASK_STATUSES}
              className="mt-2"
            />
            <Select
              label="Attribué à"
              value={assignTo}
              onChange={(v) => setAssignTo(String(v))}
              options={[
                {
                  value: "",
                  label: <>Aucune attribution</>,
                  icon: (
                    <span className="inline-block w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  ),
                },
                ...users.map((u) => ({
                  value: u.id,
                  label: u.name,
                  icon: (
                    <span className="inline-block w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                  ),
                })),
              ]}
              className="mt-2"
            />
            <Select
              label="Priorité"
              value={priority}
              onChange={(v) => setPriority(String(v))}
              options={TASK_PRIORITIES}
              className="mt-2"
            />
            <Select
              label="Points"
              value={points}
              onChange={(v) => setPoints(typeof v === "number" ? v : Number(v))}
              options={TASK_POINTS}
              className="mt-2"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Date de début
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Date d&aposéchéance
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-8">
            <Button
              type="button"
              className="bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              Créer la tâche
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
