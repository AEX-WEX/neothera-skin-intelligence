# Component Architecture Map

## File Structure Overview

```
src/
├── app/
│   ├── globals.css         (unchanged)
│   ├── layout.tsx          (unchanged)
│   └── page.tsx            (unchanged)
│
├── components/
│   ├── Dashboard.tsx                    ⭐ REFACTORED (now tab-based orchestrator)
│   ├── TabView.tsx                      ✨ NEW (tab navigation system)
│   ├── InsightsTab.tsx                  ✨ NEW (home tab - recommendations + AI)
│   ├── TimelineTab.tsx                  ✨ NEW (chart + trend analysis)
│   ├── PatternsTab.tsx                  ✨ NEW (deep pattern details)
│   ├── CoachTab.tsx                     ✨ NEW (AI coach interface)
│   ├── RecommendationCard.tsx           ✨ NEW (action cards)
│   ├── WeeklyDigestCard.tsx             ✨ NEW (weekly summary)
│   ├── EnhancedScorecardCard.tsx        ✨ NEW (expandable patterns)
│   │
│   ├── ChartSection.tsx                 (unchanged, used by TimelineTab)
│   ├── CoachPanel.tsx                   (enhanced, used by InsightsTab & CoachTab)
│   ├── InsightCard.tsx                  (unchanged, used by InsightsTab)
│   ├── WhatChangedCard.tsx              (unchanged, used by TimelineTab)
│   └── ScorecardCard.tsx                (deprecated - replaced by EnhancedScorecardCard)
│
├── lib/
│   ├── data.ts                          (unchanged - dataset generation)
│   ├── analysis.ts                      ⭐ ENHANCED (new analysis + recommendations)
│   └── ai.ts                            ⭐ ENHANCED (data-grounded prompts)
│
└── types/
    └── index.ts                         ⭐ ENHANCED (new interfaces)
```

---

## Component Hierarchy

```
Dashboard
│
├── Header (title + metadata)
│
└── TabView
    ├── Tab Navigation Bar
    │   ├── 💡 INSIGHTS
    │   ├── 📈 TIMELINE
    │   ├── 🔍 PATTERNS
    │   └── 🧠 COACH
    │
    └── Tab Content (dynamic)
        │
        ├─ InsightsTab (when selected)
        │  ├── WeeklyDigestCard
        │  │   ├── Top Improvement
        │  │   ├── Top Concern
        │  │   └── Focus Habit
        │  ├── Status Grid
        │  │   ├── Avg Severity card
        │  │   └── Trend card
        │  ├── CoachPanel
        │  │   └── AI Insights (3x)
        │  ├── Recommendations Section
        │  │   └── RecommendationCard[] (multiple)
        │  │       ├── Title + Description
        │  │       ├── Impact badge
        │  │       ├── Effort badge
        │  │       └── Reason text
        │  ├── Triggers Section
        │  │   └── InsightCard[] (top triggers)
        │  └── Data Quality indicator
        │
        ├─ TimelineTab (when selected)
        │  ├── Trend Comparison Grid
        │  │   ├── Last 7 Days Avg
        │  │   └── Week-over-Week Change
        │  ├── ChartSection
        │  │   └── 30-day acne severity chart
        │  ├── WhatChangedCard
        │  │   └── Today's contributors
        │  └── Timeline Insights
        │      └── Educational tips
        │
        ├─ PatternsTab (when selected)
        │  ├── Confidence Guide Card
        │  │   └── How to read % → semantic meaning
        │  ├── Triggers Section
        │  │   └── EnhancedScorecardCard[] (expandable)
        │  ├── Support Habits Section
        │  │   └── EnhancedScorecardCard[] (expandable)
        │  ├── Unclear Patterns Section
        │  │   └── EnhancedScorecardCard[] (expandable)
        │  └── Educational Notes
        │
        └─ CoachTab (when selected)
           ├── CoachPanel (same as InsightsTab)
           ├── About Coach Card
           │   └── What it analyzes
           └── Insight Types Guide
               ├── Observations
               ├── Patterns
               └── Recommendations
```

---

## EnhancedScorecardCard (Expandable)

```
EnhancedScorecardCard (collapsed state)
├── Icon + Habit Label + Status Badge + Expand arrow
├── Confidence bar + percentage
└── Click to expand

EnhancedScorecardCard (expanded state)
├── [All of above]
├── Confidence Level Tag (Strong/Moderate/Weak/Needs Data)
├── Scientific Explanation
├── Data Breakdown Grid
│   ├── Tracked count
│   ├── Worsened count
│   └── Improved count
├── Multi-Lag Effect Timeline
│   ├── T+1 percentage
│   ├── T+2 percentage
│   ├── T+3 percentage
│   └── "Strongest effect: Day X"
└── Data Quality Note
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Dashboard                                              │
│ - Loads synthetic data                                 │
│ - Calls analyzeData()                                  │
│ - Calls generateAIInsights()                           │
│ - Manages tab state & AI refresh                       │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ analyzeData(data) → AnalysisResult                    │
│ ┌─ Habitat patterns detection (T→T+1)                 │
│ ├─ generateRecommendations()                          │
│ ├─ generateWeeklyDigest()                             │
│ ├─ analyzeTodaySpike()                                │
│ └─ detectTriggers()                                   │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ AnalysisResult = {                                     │
│   patterns: HabitPattern[] (with multiLagData),       │
│   recommendations: Recommendation[],                  │
│   weeklyDigest: WeeklyDigest,                         │
│   triggers: TriggerInsight[],                         │
│   todaySpike: {...}                                   │
│ }                                                      │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ generateAIInsights(data, result, recommendations)     │
│ - Summarizes data for AI                              │
│ - Calls OpenRouter API (with fallback)                │
│ - Returns AIInsight[]                                 │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│ Tab Components receive props and render               │
│ ├─ InsightsTab: recommendations, aiInsights, digest   │
│ ├─ TimelineTab: data, chart data, trends             │
│ ├─ PatternsTab: patterns with multiLagData           │
│ └─ CoachTab: aiInsights, onRefresh handler           │
└─────────────────────────────────────────────────────────┘
```

---

## State Management

### Dashboard (parent) manages:
```typescript
const [data, setData] = useState<DayData[]>([])
const [result, setResult] = useState<AnalysisResult | null>(null)
const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
const [isLoadingAI, setIsLoadingAI] = useState(false)
const [baseline, setBaseline] = useState(0)
const [trend, setTrend] = useState<'improving' | 'worsening' | 'stable'>('stable')

// Pass down to tabs as props
```

### TabView manages:
```typescript
const [activeTab, setActiveTab] = useState(defaultTab)
// Controls which tab content renders
```

### EnhancedScorecardCard manages:
```typescript
const [expanded, setExpanded] = useState(false)
// Toggles expanded detail view
```

### CoachPanel manages:
```typescript
const [visibleInsights, setVisibleInsights] = useState<AIInsight[]>([])
// Handles staggered animation of AI insights
```

---

## Type System

### New Types Added

```typescript
// Types/index.ts
interface HabitPattern {
  // ... existing fields ...
  confidenceLevel: 'weak' | 'moderate' | 'strong' | 'insufficient'
  explanation: string
  recommendation?: string
  multiLagData?: {
    lag1: number  // T+1 percentage
    lag2: number  // T+2 percentage
    lag3: number  // T+3 percentage
    strongestLag: number  // Which lag is strongest
  }
}

interface Recommendation {
  id: string
  title: string
  description: string
  habit: string
  icon: string
  impact: 'high' | 'medium'
  effort: 'easy' | 'moderate' | 'challenging'
  reason: string
}

interface WeeklyDigest {
  topImprovement: string
  topConcern: string
  focusHabit: string
  focusIcon: string
  focusReason: string
  progressMessage: string
}

interface AnalysisResult {
  patterns: HabitPattern[]
  triggers: TriggerInsight[]
  todaySpike: {...}
  scorecards: HabitPattern[]
  recommendations: Recommendation[]  // NEW
  weeklyDigest: WeeklyDigest  // NEW
}
```

---

## Key Functions

### analysis.ts

```typescript
analyzeHabitMultiLag()
├─ Detects effects at different time lags
└─ Returns {lag1, lag2, lag3, strongestLag}

getConfidenceLevel()
├─ Converts raw % to semantic level
└─ Returns 'weak' | 'moderate' | 'strong' | 'insufficient'

analyzeHabit()
├─ Multi-lag enhanced pattern analysis
├─ Assigns confidenceLevel
├─ Adds scientific explanation
└─ Returns HabitPattern with new fields

generateRecommendations()
├─ Prioritizes by confidence
├─ Suggests experiments + habit amplification
└─ Returns Recommendation[]

generateWeeklyDigest()
├─ Calculates trend
├─ Surfaces improvements & concerns
└─ Returns WeeklyDigest

analyzeData()
├─ Orchestrates all analysis
├─ Generates recommendations + digest
└─ Returns complete AnalysisResult
```

### ai.ts

```typescript
summarizeDataForAI()
├─ Compresses 35 days → strategic brief
├─ Includes all pattern data
└─ Returns formatted string for AI

generateAIInsights()
├─ Builds data-aware prompt
├─ Calls OpenRouter API (or fallback)
├─ Parses response into AIInsight[]
└─ Ensures no stale insights

generateFallbackInsights()
├─ Strong template-based insights
├─ References specific user data
├─ No API required
└─ Maintains quality parity with API
```

---

## Styling System

### CSS Classes Used

```
.card-glass          Main card containers (glassmorphic)
.shadow-card         Subtle shadows
.rounded-xl          Border radius for cards
.rounded-2xl         Border radius for larger components
.border-*-200        Light borders (50-200 values)
.bg-*-50             Tinted backgrounds
.text-*-600          Text colors (600 weight)
.animate-fade-in-up  Fade + slide up animation
.stagger-*           Staggered animation delays
```

### Color System

```
Primary: teal-600 (health + science feel)
Negative: red-* (warning, triggers)
Positive: emerald-* (success, supporters)
Neutral: slate-* (secondary, unclear)
Info: blue-* (information, patterns)
Warning: amber-* (alerts, trends)
Success: emerald-* (achievements)
```

---

## Performance Considerations

1. **Tab Switching**: Lazy render (only active tab renders)
2. **Expandable Cards**: Conditional rendering (doesn't render expanded until clicked)
3. **AI Loading**: Async with skeleton UI
4. **Data Processing**: Single analyzeData() call on mount
5. **No External Dependencies**: Only recharts + Next.js/React
6. **Bundle Size**: ~200KB built Next.js app

---

## Testing Checklist

- [x] Build compiles without errors
- [x] App runs on localhost:3001
- [x] All tabs render without crashes
- [x] Expandable cards expand/collapse
- [x] Tab switching doesn't lose state
- [x] AI insights generate (fallback or API)
- [x] Weekly digest shows correct data
- [x] Recommendations generate with data
- [x] Multi-lag data displays correctly
- [x] Confidence levels interpret correctly
- [x] Mobile-responsive tab navigation
- [x] Error handling for missing data
