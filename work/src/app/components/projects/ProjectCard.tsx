import React from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  members: number;
  progress: number;
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 w-80 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-400"
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
          <span className="font-semibold text-gray-900">{project.name}</span>
        </div>
        <button className="p-1 rounded-full hover:bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
      <div className="text-gray-500 text-sm mb-1">Description</div>
      <div className="text-gray-900 text-sm mb-3">{project.description}</div>
      <hr className="my-2 border-gray-100" />
      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
        Membres ({project.members})
        <span
          className="ml-2 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white border cursor-pointer"
          title="Hafiz BOUKARI"
        >
          Hafiz.
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-xs">
        Progression ({project.progress}%)
        <div className="flex-1 h-1 bg-gray-100 rounded-full ml-2">
          <div
            className="h-1 bg-purple-400 rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
