/**
 * Application Constants
 * Fixed configuration values and defaults
 */

// Data retention and analysis periods
export const DATA_PERIODS = {
  RECENT_WEEK: 7,
  RECENT_TWO_WEEKS: 14,
  FULL_MONTH: 30,
  MIN_DATA_POINTS_FOR_ANALYSIS: 7,
  MIN_DATA_POINTS_FOR_PATTERNS: 14,
} as const;

// Confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  INSUFFICIENT: 50,
  WEAK: 60,
  MODERATE: 70,
  STRONG: 100,
} as const;

// API configuration
export const API_CONFIG = {
  INSIGHTS_ENDPOINT: '/api/insights',
  TIMEOUT_MS: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// UI Messages
export const MESSAGES = {
  NO_DATA: 'No data available. Start tracking to see insights.',
  MINIMAL_DATA: 'Minimal insights - keep logging for patterns',
  EMERGING_PATTERNS: 'Emerging patterns - continue tracking',
  GOOD_DATA: 'Good pattern visibility - strong insights forming',
  COMPREHENSIVE_DATA: 'Comprehensive data - high confidence patterns',
  LOADING_INSIGHTS: 'Analyzing your patterns...',
  ERROR_LOADING: 'Unable to load insights. Please try again.',
} as const;

// Tab configurations
export const TAB_CONFIG = {
  TABS: [
    { id: 'timeline', label: 'Timeline', icon: '📈' },
    { id: 'patterns', label: 'Patterns', icon: '🔍' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'coach', label: 'Coach', icon: '🧠' },
  ],
} as const;

// Animation settings
export const ANIMATION = {
  FADE_IN_DURATION: 300,
  STAGGER_DELAY: 150,
  CHART_TRANSITION: 500,
} as const;
