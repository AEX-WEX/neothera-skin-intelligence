'use client';

import { ReactNode, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabViewProps {
  tabs: Tab[];
  children: ReactNode[];
  defaultTab?: string;
}

export function TabView({ tabs, children, defaultTab }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeIndex = tabs.findIndex(t => t.id === activeTab);
  const content = activeIndex >= 0 ? children[activeIndex] : null;

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-0 border-b border-slate-200 bg-slate-50/50 z-10 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 min-w-fit px-4 py-3 flex items-center justify-center gap-1
              text-xs md:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap
              ${
                activeTab === tab.id
                  ? 'border-rose-500 text-rose-600 bg-rose-50'
                  : 'border-transparent text-slate-600 hover:text-slate-700 hover:bg-slate-100'
              }
            `}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="hidden sm:inline text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4 animate-fade-in overflow-hidden">
        {content}
      </div>
    </div>
  );
}
