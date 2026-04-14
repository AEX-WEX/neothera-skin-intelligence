'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';
import { DayData } from '@/types';

interface ChartSectionProps {
  data: DayData[];
}

interface ChartDataPoint {
  date: string;
  displayDate: string;
  acne: number;
  dairy?: boolean;
  sugar?: boolean;
  poorSleep?: boolean;
  highStress?: boolean;
}

const MARKER_ICONS: Record<string, string> = {
  dairy: '🥛',
  sugar: '🍬',
  poorSleep: '😴',
  highStress: '⚡',
};

export function ChartSection({ data }: ChartSectionProps) {
  const chartData: ChartDataPoint[] = data.map((day, index) => ({
    date: day.date,
    displayDate: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    acne: day.acneSeverity,
    dairy: day.dairy,
    sugar: day.sugar,
    poorSleep: day.sleepQuality === 'poor',
    highStress: day.stress === 'high',
  }));

  const markers = chartData.flatMap((point, index) => {
    const markers: { x: number; y: number; icon: string }[] = [];
    if (point.dairy) markers.push({ x: index, y: point.acne, icon: MARKER_ICONS.dairy });
    if (point.sugar) markers.push({ x: index, y: point.acne, icon: MARKER_ICONS.sugar });
    if (point.poorSleep) markers.push({ x: index, y: point.acne, icon: MARKER_ICONS.poorSleep });
    if (point.highStress) markers.push({ x: index, y: point.acne, icon: MARKER_ICONS.highStress });
    return markers;
  });

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-5 animate-fade-in-up stagger-2 opacity-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900">30-Day Timeline</h3>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>Dairy
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>Sugar
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>Sleep
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>Stress
          </span>
        </div>
      </div>

      <div className="h-56 -mx-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis
              dataKey="displayDate"
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[1, 5]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              ticks={[1, 2, 3, 4, 5]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload as ChartDataPoint;
                return (
                  <div className="bg-white rounded-lg shadow-lg p-3 text-xs border border-slate-200">
                    <p className="font-semibold text-slate-900 mb-2">{data.displayDate}</p>
                    <p className="text-slate-700">Severity: <span className="font-bold text-rose-600">{data.acne}/5</span></p>
                    {(data.dairy || data.sugar || data.poorSleep || data.highStress) && (
                      <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-200">
                        {data.dairy && <span className="text-slate-700">Dairy</span>}
                        {data.sugar && <span className="text-slate-700">Sugar</span>}
                        {data.poorSleep && <span className="text-slate-700">Poor Sleep</span>}
                        {data.highStress && <span className="text-slate-700">High Stress</span>}
                      </div>
                    )}
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="acne"
              stroke="#1f2937"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#374151', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
