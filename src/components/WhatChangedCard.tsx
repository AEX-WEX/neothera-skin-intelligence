'use client';

import { WhatChangedItem } from '@/types';

interface WhatChangedCardProps {
  contributors: WhatChangedItem[];
  acneChange: number;
}

export function WhatChangedCard({ contributors, acneChange }: WhatChangedCardProps) {
  if (contributors.length === 0) {
    return (
      <div className="card-glass rounded-2xl p-4 shadow-card animate-fade-in-up stagger-3 opacity-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">
            ✨
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">Skin Stable Today</p>
            <p className="text-xs text-slate-500">No significant changes detected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass rounded-2xl p-4 shadow-card animate-fade-in-up stagger-3 opacity-0 border border-amber-200">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-lg flex-shrink-0">
          📊
        </div>
        <div>
          <p className="text-sm font-medium text-slate-800">
            Your acne increased today
          </p>
          <p className="text-xs text-slate-500">
            Possible contributors identified
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
          Potential Factors
        </p>
        <div className="space-y-1.5">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg"
            >
              <span className="text-base">{contributor.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{contributor.habit}</p>
                <p className="text-xs text-slate-500">{contributor.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 italic">
          This may be associated with skin changes, not necessarily caused by these factors alone.
        </p>
      </div>
    </div>
  );
}
