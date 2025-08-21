"use client";
import React from "react";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo?: {
    id: string;
    name: string;
  };
  status: string;
  priority: "low" | "medium" | "high";
  points?: number;
  dueDate?: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Hafiz BOUKARI",
    assignedTo: {
      id: "user-1",
      name: "Hafiz"
    },
    status: "review",
    priority: "medium",
    points: 0
  }
];

export default function ListView() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* En-tête du tableau */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="col-span-4 font-medium text-gray-700">Nom de la tâche</div>
        <div className="col-span-2 font-medium text-gray-700">Assigné à</div>
        <div className="col-span-2 font-medium text-gray-700">Statut</div>
        <div className="col-
