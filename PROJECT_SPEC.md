# NEOTHERA SKIN INTELLIGENCE - COMPLETE PROJECT SPECIFICATION

## 1. PROJECT OVERVIEW

### Name
Neothera Skin Intelligence

### Type
Premium, mobile-first health-tech web application

### Core Purpose
Transform habit tracking data into actionable skin insights. An AI-powered health concierge that answers: "What is causing this user's acne?"

### Context
Neothera treats acne by identifying root causes using user habit data (food, sleep, stress, skincare) and mapping it to skin outcomes.

---

## 2. TECH STACK

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.4.3 |
| Charts | Recharts 2.12.0 |
| Language | TypeScript |
| State | React hooks (useState, useEffect) |
| Storage | Local JSON / local state (no backend) |
| AI Integration | OpenRouter API (with fallback templates) |

---

## 3. FOLDER STRUCTURE

```
Neothera/
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── next-env.d.ts
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── Dashboard.tsx
    │   ├── InsightCard.tsx
    │   ├── ChartSection.tsx
    │   ├── WhatChangedCard.tsx
    │   ├── ScorecardCard.tsx
    │   └── CoachPanel.tsx
    ├── lib/
    │   ├── data.ts
    │   ├── analysis.ts
    │   └── ai.ts
    └── types/
        └── index.ts
```

---

## 4. FILES AND CONTENTS

### 4.1 package.json

```json
{
  "name": "neothera",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5"
  }
}
```

### 4.2 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        card: '#FFFFFF',
        primary: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
        },
        negative: '#F87171',
        neutral: '#64748B',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
        glow: '0 0 20px rgba(13, 148, 136, 0.15)',
      },
    },
  },
  plugins: [],
};
```

### 4.3 postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 4.4 tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4.5 next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
```

### 4.6 next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

---

## 5. TYPES (src/types/index.ts)

```typescript
export interface DayData {
  date: string;
  dairy: boolean;
  sugar: boolean;
  sleepQuality: 'good' | 'poor';
  stress: 'low' | 'medium' | 'high';
  skincareDone: boolean;
  acneSeverity: number; // 1-5
}

export interface HabitPattern {
  habit: string;
  habitKey: keyof Pick<DayData, 'dairy' | 'sugar' | 'sleepQuality' | 'stress' | 'skincareDone'>;
  icon: string;
  occurrences: number;
  worsenCount: number;
  improveCount: number;
  confidence: number;
  impact: 'negative' | 'positive' | 'neutral';
  description: string;
}

export interface TriggerInsight {
  habit: string;
  icon: string;
  message: string;
  confidence: number;
  impact: 'negative' | 'positive' | 'neutral';
}

export interface WhatChangedItem {
  habit: string;
  icon: string;
  reason: string;
}

export interface AIInsight {
  id: string;
  text: string;
  type: 'observation' | 'recommendation' | 'pattern';
}

export interface AnalysisResult {
  patterns: HabitPattern[];
  triggers: TriggerInsight[];
  todaySpike: {
    occurred: boolean;
    contributors: WhatChangedItem[];
    acneChange: number;
  };
  scorecards: HabitPattern[];
}
```

---

## 6. DATA GENERATION (src/lib/data.ts)

### Purpose
Generate 35 days of realistic synthetic data for demonstration/testing.

### Function Signature
```typescript
generateSyntheticData(days: number = 35): DayData[]
```

### Data Structure (DayData)
Each day contains:
- `date`: ISO date string (YYYY-MM-DD)
- `dairy`: boolean (true = consumed dairy)
- `sugar`: boolean (true = consumed sugar)
- `sleepQuality`: 'good' | 'poor'
- `stress`: 'low' | 'medium' | 'high'
- `skincareDone`: boolean
- `acneSeverity`: number (1-5)

### Pattern Logic
- **Dairy impact**: ~70% probability of increasing acne next day, additional 40% for second level
- **Sugar impact**: ~45% probability of worsening
- **Poor sleep**: 50% chance of worsening, more likely with high stress
- **High stress**: 50% chance of worsening
- **Medium stress**: 25% chance of worsening
- **Skincare**: 40% chance of improvement
- **Random variation**: 15% random worsening, 10% random improvement

### Seeded Randomness
- Uses seeded random for reproducibility
- Not perfect correlation (realistic noise)

---

## 7. ANALYSIS ENGINE (src/lib/analysis.ts)

### Purpose
Temporal analysis and pattern detection across habit data.

### Core Algorithms

#### 7.1 analyzeHabit()
Analyzes a single habit for temporal patterns:
- Compares day T habits with day T+1 acne severity
- Counts: occurrences, worsenCount, improveCount
- Calculates: `confidence = (negative_matches / total) * 100`
- Minimum threshold: 3 occurrences required

```typescript
function analyzeHabit(data: DayData[], config: HabitConfig): HabitPattern | null
```

#### 7.2 detectTriggers()
Returns high-confidence patterns:
- Filters patterns with confidence >= 55%
- Requires at least 3 occurrences
- Sorts by confidence descending

#### 7.3 analyzeTodaySpike()
Detects if today's acne worsened:
- Compares today vs yesterday acne severity
- Identifies contributing factors:
  - Dairy intake
  - Sugar intake
  - Poor sleep
  - High stress
  - No skincare done

#### 7.4 analyzeData()
Returns full AnalysisResult:
```typescript
{
  patterns: HabitPattern[],    // All analyzed patterns
  triggers: TriggerInsight[],  // High-confidence triggers
  todaySpike: { occurred, contributors, acneChange },
  scorecards: HabitPattern[]   // Sorted by confidence
}
```

#### 7.5 getBaselineAcne()
Returns average acne severity across all data.

#### 7.6 getAcneTrend()
Returns trend based on 7-day vs previous 7-day comparison:
- 'improving': recent avg < older avg by 0.3+
- 'worsening': recent avg > older avg by 0.3+
- 'stable': within 0.3 range

### Habit Configuration
```typescript
const HABIT_CONFIG = [
  { key: 'dairy', label: 'Dairy', icon: '🥛', invertCorrelation: true },
  { key: 'sugar', label: 'Sugar', icon: '🍬', invertCorrelation: true },
  { key: 'sleepQuality', label: 'Poor Sleep', icon: '😴', invertCorrelation: true, condition: d => d.sleepQuality === 'poor' },
  { key: 'stress', label: 'High Stress', icon: '⚡', invertCorrelation: true, condition: d => d.stress === 'high' },
  { key: 'skincareDone', label: 'Skincare', icon: '✨', invertCorrelation: false },
];
```

---

## 8. AI SKIN COACH (src/lib/ai.ts)

### Purpose
AI-powered insights using OpenRouter API with fallback templates.

### Function Signature
```typescript
generateAIInsights(data: DayData[], result: AnalysisResult): Promise<AIInsight[]>
```

### OpenRouter Implementation

**Endpoint**: `POST https://openrouter.ai/api/v1/chat/completions`

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_API_KEY",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "model": "openai/gpt-4o-mini",
  "messages": [
    {
      "role": "system",
      "content": "You are a compassionate skincare intelligence assistant. Provide concise, evidence-based insights that are scientifically cautious. Never claim causation, only association. Keep responses to 2-3 short, actionable insights. Use a warm, supportive tone."
    },
    {
      "role": "user",
      "content": "User data and detected patterns: [data summary]. Provide 2-3 concise, actionable insights based on this data."
    }
  ],
  "max_tokens": 300,
  "temperature": 0.7
}
```

**Environment Variable**: `OPENROUTER_API_KEY` (optional - if missing, uses fallback)

### Fallback Insights (When API Unavailable)
If no API key or API fails, return template insights:

1. **Pattern Observation**: "We've noticed a [X]% correlation between [habit] and skin changes. You may consider tracking this more closely."

2. **Today Analysis**: "Today showed some skin changes. [reason]. Consider noting how your skin responds over the next few days."

3. **Recommendation**: "Maintaining your skincare routine appears to support skin recovery. Keep up the consistency!"

4. **Default (no patterns)**: General encouragement to keep logging.

### Data Summary Format
```
Analysis of [N] days of habit and skin data:
Average acne severity: [X]/5

Detected patterns (confidence %):
- [Habit] [icon]: [X]% ([N] occurrences)

Today's skin change: +[X]
Contributing factors: [list]
```

---

## 9. COMPONENTS

### 9.1 Dashboard.tsx
**Purpose**: Main container orchestrating all components

**State**:
- `data`: DayData[]
- `result`: AnalysisResult
- `aiInsights`: AIInsight[]
- `isLoadingAI`: boolean
- `baseline`: number
- `trend`: 'improving' | 'worsening' | 'stable'

**Layout**:
1. Header with trend badge
2. Stats cards (baseline, data points)
3. Trigger Detector section (3 cards max)
4. Chart Section
5. What Changed Card
6. AI Coach Panel
7. Habit Impact Scorecards
8. Footer disclaimer

### 9.2 InsightCard.tsx
**Props**: `{ insight: TriggerInsight, index: number }`

**Visual**:
- Card with glass effect
- Icon (habit emoji) in colored circle
- Badge showing label (Potential Trigger / Supporting Factor / Monitor)
- Message text
- Confidence percentage

**Colors by Impact**:
- Negative: red tones
- Positive: emerald tones
- Neutral: slate tones

**Animation**: fadeInUp with stagger delay

### 9.3 ChartSection.tsx
**Props**: `{ data: DayData[] }`

**Features**:
- Line chart of acne severity (1-5 scale)
- Recharts LineChart component
- Custom tooltip showing date, acne level, habit markers
- Legend: 🥛 Dairy, 🍬 Sugar, 😴 Sleep, ⚡ Stress

**Chart Details**:
- X-axis: dates (month/day format)
- Y-axis: 1-5 severity
- Line color: primary teal (#0D9488)
- Smooth curve with dots

### 9.4 WhatChangedCard.tsx
**Props**: `{ contributors: WhatChangedItem[], acneChange: number }`

**States**:
1. **No change**: Shows "Skin Stable Today" message
2. **Acne increased**: Lists contributing factors with icons and reasons
3. **Acne decreased**: Shows improvement (optional)

**Visual**:
- Amber/orange tones for warning
- List of contributors with emoji icons
- Disclaimer text about association vs causation

### 9.5 ScorecardCard.tsx
**Props**: `{ pattern: HabitPattern, index: number }`

**Layout**:
- Header: Habit icon + name + impact badge
- Progress bar showing confidence percentage
- Stats: tracked days, worsen/improve counts

**Color Coding**:
- May Worsen: red
- May Help: emerald
- Unclear: slate

### 9.6 CoachPanel.tsx
**Props**: `{ insights: AIInsight[], isLoading: boolean, onRetry: () => void }`

**States**:
1. **Loading**: Skeleton with pulse animation
2. **Loaded**: Animated insight reveals
3. **Error**: Retry button visible

**Insight Types**:
- Observation (💡 amber)
- Pattern (📈 blue)
- Recommendation (🎯 purple)

**Animation**: Staggered fade-in with 150ms delay between insights

---

## 10. STYLING (src/app/globals.css)

### Tailwind Directives
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Custom Animations
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
.animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
.animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
```

### Stagger Classes
```css
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
.stagger-5 { animation-delay: 0.25s; }
```

### Glass Effect
```css
.card-glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

---

## 11. LAYOUT (src/app/layout.tsx)

**Requirements**:
- Mobile viewport meta tag (width=device-width, initial-scale=1, maximum-scale=1)
- Centered container with max-width: 420px
- Apple system font stack
- Gradient background (f0fdf4 to f0f9ff)

---

## 12. MAIN PAGE (src/app/page.tsx)

Simple component that imports and renders Dashboard.

---

## 13. UI/UX SPECIFICATIONS

### 13.1 Mobile-First (CRITICAL)
- Design strictly for mobile (375px width)
- Max width: 420px centered
- Single column layout only
- Large tap targets (min 44px)
- No dense tables → use cards
- Smooth spacing (16px–24px padding)

### 13.2 Color Palette
| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Light gradient | #F8FAFC → #F0F9FF |
| Card | White with transparency | rgba(255,255,255,0.85) |
| Primary | Muted teal | #0D9488 |
| Negative/Trigger | Soft red | #F87171 |
| Positive/Success | Emerald | #10B981 |
| Neutral | Slate | #64748B |
| Text Primary | Dark gray | #1F2937 |
| Text Secondary | Medium gray | #6B7280 |

### 13.3 Typography
- Font Family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Heading: 20-28px, font-weight 600-700
- Body: 14-16px, font-weight 400
- Small/Labels: 12-14px

### 13.4 Spacing
- Card padding: 16-24px
- Element gap: 12-16px
- Section gap: 16-24px
- Border radius: 16px (2xl) for cards, 12px for buttons

### 13.5 Shadows
```css
box-shadow-card: 0 4px 20px -4px rgba(0, 0, 0, 0.08)
box-shadow-glow: 0 0 20px rgba(13, 148, 136, 0.15)
```

---

## 14. FEATURES IMPLEMENTED

### 14.1 Trigger Detector
- Shows insight cards for detected triggers
- Message format: "We've observed a pattern..."
- Confidence percentage displayed
- Cautious language (no causation claims)

### 14.2 Skin Timeline + Overlay
- Line chart of acne severity over time
- Markers overlay:
  - 🥛 dairy consumption
  - 🍬 sugar intake
  - 😴 poor sleep
  - ⚡ high stress
- Interactive tooltips

### 14.3 What Changed Analyzer
- Detects acne spikes (increase vs previous day)
- Shows contributing factors when spike occurs
- Includes disclaimer about causation

### 14.4 Habit Impact Scorecards
- Card format for each tracked habit
- Shows: name, impact (Positive/Negative/Neutral), confidence %
- Visual progress bar
- Tracked days count

### 14.5 AI Skin Coach
- OpenRouter API integration
- Concise, actionable insights
- Fallback templates when API unavailable
- Loading state with skeleton
- Retry functionality

### 14.6 Data Confidence Layer
- Minimum 3 occurrences for pattern display
- Shows "Not enough data" if insufficient

---

## 15. MICROCOPY

| Context | Example Text |
|---------|--------------|
| Pattern observation | "We've observed a pattern..." |
| Association | "This may be associated with..." |
| Confidence | "Confidence: 72%" |
| Timeframe | "Based on the last 30 days" |
| Disclaimer | "This may be associated with skin changes, not necessarily caused by these factors alone." |
| Medical disclaimer | "Insights are based on patterns, not medical advice. Consult a dermatologist for personalized guidance." |

---

## 16. COMMANDS

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production
npm run preview

# Linting
npm run lint
```

---

## 17. EXPECTED OUTPUT

A premium AI health intelligence system that:
- Feels like Apple Health / Whoop
- Demonstrates temporal reasoning (T → T+1 relationships)
- Shows pattern detection with confidence scores
- Provides human-friendly, actionable insights
- Has premium UX with smooth animations
- Never crashes (fallback always available)

Not just a dashboard or data visualization - a complete data → insight system.
