'use client';

import { DayData } from '@/types';
import { ChartSection } from './ChartSection';
import { WhatChangedCard } from './WhatChangedCard';

interface TimelineTabProps {
  data: DayData[];
  contributors: any[];
  acneChange: number;
}

export function TimelineTab({ data, contributors, acneChange }: TimelineTabProps) {
  const recentWeek = data.slice(-7);
  const previousWeek = data.slice(-14, -7);
  
  const recentAvg = recentWeek.reduce((s, d) => s + d.acneSeverity, 0) / recentWeek.length;
  const prevAvg = previousWeek.length > 0
    ? previousWeek.reduce((s, d) => s + d.acneSeverity, 0) / previousWeek.length
    : recentAvg;
  
  const improvement = prevAvg - recentAvg;

  return (
    <div className="space-y-4 pb-8">
      {/* Trend Comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-glass rounded-xl p-4 shadow-card border border-slate-200">
          <p className="text-xs text-slate-500 mb-2">Last 7 Days Avg</p>
          <p className="text-2xl font-bold text-slate-800">{recentAvg.toFixed(1)}</p>
          <p className="text-xs text-slate-400">severity</p>
        </div>
        <div className={`card-glass rounded-xl p-4 shadow-card border ${improvement > 0 ? 'border-emerald-200' : improvement < 0 ? 'border-amber-200' : 'border-slate-200'}`}>
          <p className="text-xs text-slate-500 mb-2">Week-over-Week</p>
          <p className={`text-2xl font-bold ${improvement > 0 ? 'text-emerald-600' : improvement < 0 ? 'text-amber-600' : 'text-slate-600'}`}>
            {improvement > 0 ? '↓' : improvement < 0 ? '↑' : '→'} {Math.abs(improvement).toFixed(1)}
          </p>
          <p className="text-xs text-slate-400">change</p>
        </div>
      </div>

      {/* Timeline Chart */}
      <ChartSection data={data} />

      {/* What Changed Today */}
      <WhatChangedCard contributors={contributors} acneChange={acneChange} />

      {/* Timeline Insights */}
      <div className="card-glass rounded-xl p-4 shadow-card border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">📊 Timeline Insights</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-base">📍</span>
            <span>Your acne data spans <strong>{data.length} days</strong>, providing a solid foundation for pattern detection.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-base">🔄</span>
            <span>Look for <strong>recurring cycles</strong> in your timeline—they reveal your personal acne patterns.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-base">⚡</span>
            <span>Spikes on the chart often correspond to specific habits—check the Patterns tab for details.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
