'use client';

import { DayData } from '@/types';

interface HistoryTimelineProps {
  data: DayData[];
}

export function HistoryTimeline({ data }: HistoryTimelineProps) {
  // Show last 14 days
  const recentData = data.slice(-14).reverse();

  return (
    <div className="card-glass rounded-lg p-6 mb-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Tracking History</h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {recentData.map((day) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = date.getDate();
          const month = date.toLocaleDateString('en-US', { month: 'short' });

          // Determine acne severity
          const acneSeverity = day.acneSeverity;
          let acneTextColor = 'text-emerald-600';
          let acneBgColor = 'bg-emerald-50';
          if (acneSeverity >= 4) {
            acneTextColor = 'text-red-600';
            acneBgColor = 'bg-red-50';
          } else if (acneSeverity >= 3) {
            acneTextColor = 'text-amber-600';
            acneBgColor = 'bg-amber-50';
          }

          return (
            <div key={day.date} className="flex items-center gap-3 p-3 rounded border border-slate-200 hover:bg-slate-50 transition">
              {/* Date - Neutral color for better visual hierarchy */}
              <div className="min-w-fit text-left">
                <p className="text-xs text-slate-500 font-bold">{dayName}</p>
                <p className="text-sm font-bold text-slate-700">{dayNum} {month}</p>
              </div>

              {/* Habits Logged */}
              <div className="flex gap-1.5 flex-wrap flex-1 min-w-0">
                {day.dairy && (
                  <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded border border-blue-200 whitespace-nowrap">
                    Dairy
                  </div>
                )}
                {day.sugar && (
                  <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded border border-red-200 whitespace-nowrap">
                    Sugar
                  </div>
                )}
                {day.sleepQuality === 'poor' && (
                  <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded border border-purple-200 whitespace-nowrap">
                    Poor Sleep
                  </div>
                )}
                {day.stress === 'high' && (
                  <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded border border-orange-200 whitespace-nowrap">
                    High Stress
                  </div>
                )}
                {day.skincareDone && (
                  <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded border border-emerald-200 whitespace-nowrap">
                    Skincare
                  </div>
                )}
              </div>

              {/* Acne Severity */}
              <div className={`min-w-fit text-center px-3 py-1.5 rounded border border-slate-200 ${acneBgColor}`}>
                <p className={`text-sm font-bold ${acneTextColor}`}>{acneSeverity}/5</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-4 text-center">Last 14 days of tracking</p>
    </div>
  );
}
