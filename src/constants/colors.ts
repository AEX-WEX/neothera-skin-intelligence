/**
 * Color and Theme Constants
 * Centralized color definitions for consistent branding
 */

export const COLORS = {
  // Primary brand colors
  primary: '#e11d48', // rose-600
  primaryDark: '#be123c', // rose-700
  primaryLight: '#f43f5e', // rose-500

  // Chart colors
  chart: {
    line: '#1f2937', // dark gray-800 (for timeline)
    lineHover: '#374151', // dark gray-700
  },

  // Habit colors
  habits: {
    dairy: '#3b82f6', // blue
    sugar: '#ef4444', // red
    poorSleep: '#8b5cf6', // purple
    highStress: '#f97316', // orange
    skincare: '#10b981', // emerald
  },

  // Status colors
  status: {
    improving: '#10b981', // emerald
    worsening: '#f59e0b', // amber
    stable: '#6b7280', // gray
    positive: '#10b981',
    negative: '#ef4444',
    neutral: '#6b7280',
  },

  // Background colors
  bg: {
    light: '#f8fafc', // slate-50
    lighter: '#f1f5f9', // slate-100
    card: '#ffffff',
    gradient: 'from-slate-50 to-slate-100',
  },

  // Text colors
  text: {
    primary: '#1e293b', // slate-900
    secondary: '#64748b', // slate-500
    tertiary: '#94a3b8', // slate-400
  },
};

export const CHART_COLORS = {
  dairy: '#3b82f6',
  sugar: '#ef4444',
  sleep: '#8b5cf6',
  stress: '#f97316',
  skincare: '#10b981',
} as const;

export const TREND_INDICATORS = {
  improving: '📉',
  worsening: '📈',
  stable: '➡️',
} as const;
