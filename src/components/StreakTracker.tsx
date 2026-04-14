'use client';

import { DayData } from '@/types';

interface StreakTrackerProps {
  data: DayData[];
}

export function StreakTracker({ data }: StreakTrackerProps) {
  if (data.length === 0) return null;

  // Calculate current streak (consecutive days of logging)
  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    currentStreak++;
    if (i > 0) {
      const currentDate = new Date(data[i].date);
      const prevDate = new Date(data[i - 1].date);
      const diffDays = (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays !== 1) break;
    }
  }

  const loggedDays = data.length;
  
  // Calculate data completeness score (how many days have full habit logging)
  const fullyLoggedDays = data.filter(d => 
    d.dairy !== undefined && 
    d.sugar !== undefined && 
    d.sleepQuality && 
    d.stress && 
    d.skincareDone !== undefined &&
    d.acneSeverity > 0
  ).length;
  const completenessScore = ((fullyLoggedDays / loggedDays) * 100).toFixed(0);

  // Calculate data quality (based on variety of patterns)
  const hasMultipleStress = data.some(d => d.stress === 'low') && data.some(d => d.stress === 'high');
  const hasMultipleSleep = data.some(d => d.sleepQuality === 'good') && data.some(d => d.sleepQuality === 'poor');
  const hasDairy = data.some(d => d.dairy);
  const hasCleanDays = data.some(d => !d.dairy && !d.sugar && d.sleepQuality === 'good' && d.stress === 'low');
  
  const dataQualitySystems = [hasMultipleStress, hasMultipleSleep, hasDairy, hasCleanDays].filter(Boolean).length;
  const dataQualityPercent = Math.min(((dataQualitySystems / 4) * 100), 100);

  return (
    <div className="card-glass rounded-lg p-6 mb-6">
      {/* Grid container with ENFORCED 4-column equal-width layout */}
      <div 
        className="gap-4"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100%'
        }}
      >
        {/* Days Logged */}
        <div className="border border-rose-200 rounded-lg p-4 bg-rose-50/50 flex flex-col items-center justify-center text-center min-w-0">
          <p className="text-label text-rose-700 break-words">Days Tracked</p>
          <p className="text-value mt-2 text-rose-600">{loggedDays}</p>
          <p className="text-xs text-slate-500 mt-2 break-words">continuous data</p>
        </div>

        {/* Current Streak */}
        <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/50 flex flex-col items-center justify-center text-center min-w-0">
          <p className="text-label text-amber-700 break-words">Current Streak</p>
          <p className="text-value mt-2 text-amber-600">{currentStreak}</p>
          <p className="text-xs text-slate-500 mt-2 break-words">consecutive days</p>
        </div>

        {/* Data Completeness */}
        <div className="border border-orange-200 rounded-lg p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center min-w-0">
          <p className="text-label text-orange-700 break-words">Data Quality</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">{completenessScore}%</p>
          <p className="text-xs text-slate-500 mt-2 break-words">entries complete</p>
        </div>

        {/* Pattern Variety */}
        <div className="border border-pink-200 rounded-lg p-4 bg-pink-50/50 flex flex-col items-center justify-center text-center min-w-0">
          <p className="text-label text-pink-700 break-words">Pattern Variety</p>
          <p className="text-3xl font-bold mt-2 text-pink-600">{dataQualityPercent.toFixed(0)}%</p>
          <p className="text-xs text-slate-500 mt-2 break-words">habit diversity</p>
        </div>
      </div>

      {/* Data Quality Indicator */}
      <div className="mt-4 pt-4 border-t border-rose-100">
        <p className="text-xs text-slate-600 mb-2 font-semibold">Insight Potential</p>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-orange-400 transition-all duration-500"
            style={{ width: `${(loggedDays / 30) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-600 mt-2">
          {loggedDays < 7 && "Minimal insights - keep logging for patterns"}
          {loggedDays >= 7 && loggedDays < 14 && "Emerging patterns - continue tracking"}
          {loggedDays >= 14 && loggedDays < 30 && "Good pattern visibility - strong insights forming"}
          {loggedDays >= 30 && "Comprehensive data - high confidence patterns"}
        </p>
      </div>
    </div>
  );
}

