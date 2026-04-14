'use client';

import { WeeklyDigest } from '@/types';

interface WeeklyDigestCardProps {
  digest: WeeklyDigest;
}

export function WeeklyDigestCard({ digest }: WeeklyDigestCardProps) {
  return (
    <div className="card-glass rounded-2xl p-5 shadow-card border border-purple-200 bg-gradient-to-br from-purple-50 to-white animate-fade-in-up opacity-0">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg flex-shrink-0">
          📋
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">This Week's Summary</h3>
          <p className="text-xs text-slate-500">{digest.progressMessage}</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Top Improvement */}
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-xs font-medium text-emerald-700 mb-1">📈 Improvement</p>
          <p className="text-sm text-slate-700">{digest.topImprovement}</p>
        </div>

        {/* Top Concern */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs font-medium text-amber-700 mb-1">⚠️ Focus Area</p>
          <p className="text-sm text-slate-700">{digest.topConcern}</p>
        </div>

        {/* Focus Habit */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-700 mb-1">💡 Next Wave Target</p>
          <p className="text-sm text-slate-700">
            <span className="text-lg mr-2">{digest.focusIcon}</span>
            <span className="font-medium">{digest.focusHabit}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">{digest.focusReason}</p>
        </div>
      </div>
    </div>
  );
}
