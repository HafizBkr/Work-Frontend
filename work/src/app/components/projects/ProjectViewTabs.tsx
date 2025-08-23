"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  {
    id: 'kanban',
    label: 'Kanban',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="2" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="2" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'list',
    label: 'Liste',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Stats',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z" />
      </svg>
    ),
  },
  {
    id: 'backlog',
    label: 'Backlog',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
];

interface ProjectViewTabsProps {
  currentView: string;
  onViewChange: (view: string) => void;
  projectId: string;
}

export default function ProjectViewTabs({ currentView, onViewChange, projectId }: ProjectViewTabsProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 px-2 py-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onViewChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-150 ease-in-out
            ${currentView === tab.id
              ? 'bg-purple-50 text-purple-600'
              : 'text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
      <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium ml-2">
        + Ajouter nouveau
      </button>
    </div>
  );
}
