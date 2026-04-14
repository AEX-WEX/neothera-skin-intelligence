# Quick Start Guide

## 🚀 Getting Started

### 1. Start the Development Server
```bash
cd e:\WESKER\OPENCODE\Projects\Neothera\Neothera
npm run dev
```

Opens at: **http://localhost:3001**

---

## 📱 Exploring the App (30 seconds)

### Step 1: Check the INSIGHTS Tab (Default)
- **Tab opens automatically** to the "Insights" view
- See: Weekly digest + AI Coach + recommendations
- **Action**: Read the "Try eliminating dairy" recommendation

### Step 2: Click the TIMELINE Tab
- **See**: 30-day chart of your acne severity
- **Action**: Scroll down to see today's contributors

### Step 3: Click the PATTERNS Tab
- **See**: All detected patterns organized by impact
- **Action**: Click on "Dairy" to expand and see details
- **Notice**: Multi-lag timeline shows effects on T+1, T+2, T+3 days

### Step 4: Click the COACH Tab
- **See**: Same AI insights (can be regenerated)
- **Action**: Click [Refresh] to get new AI insights

---

## 🎯 What You're Looking At

### The New Recommendation System
```
🥛 Try eliminating dairy for 7 days
├─ Why: Shows 71% correlation with acne worsening
├─ Your data: 8 of 12 days after dairy had worse acne  
├─ Impact: High (could reduce severity by 1-2 points)
└─ Effort: Moderate
```

### The New CI Coach
Instead of: "Keep your skincare routine"
Now says: "Your skincare routine shows 67% improvement correlation. 
          On the 8 days you skipped, acne worsened. Keep this consistency!"

### The Weekly Digest
```
This Week's Summary
├─ 📈 Improvement: "Your acne improved by 0.4 points"
├─ ⚠️ Focus Area: "Dairy shows strongest negative correlation"  
└─ 💡 Next Wave: "Focus on dairy elimination this week"
```

---

## 🔧 Making Changes

### Change Recommendation Content
File: `src/lib/analysis.ts` → `generateRecommendations()`
```typescript
// Adjust recommendations here
recommendations.push({
  id: 'eliminate-dairy',
  title: `Try eliminating dairy`,  // ← change this
  description: `For 7 days, avoid dairy...`,  // ← or this
  // ...
})
```

### Change AI Coach Personality
File: `src/lib/ai.ts` → `SYSTEM_PROMPT`
```typescript
const SYSTEM_PROMPT = `You are a compassionate...
# Edit this to change how AI talks
```

### Change Confidence Thresholds
File: `src/lib/analysis.ts` → `getConfidenceLevel()`
```typescript
function getConfidenceLevel(confidence: number) {
  if (confidence < 50) return 'insufficient';
  if (confidence < 60) return 'weak';      // ← adjust these
  if (confidence < 70) return 'moderate';
  return 'strong';
}
```

### Change Tab Order
File: `src/components/Dashboard.tsx`
```typescript
const tabs: Tab[] = [
  { id: 'insights', label: 'Insights', icon: '💡' },  // Move these
  { id: 'timeline', label: 'Timeline', icon: '📈' },
  // ...
];
```

---

## 📊 File Guide

### Key Files to Know

| File | Purpose | Edit When |
|------|---------|-----------|
| `Dashboard.tsx` | Main orchestrator | Adding new features |
| `InsightsTab.tsx` | Home tab | Changing what shows first |
| `analysis.ts` | Pattern detection | Adjusting thresholds |
| `ai.ts` | AI coach | Changing AI behavior |
| `types/index.ts` | Data structures | Adding new fields |

### Component Files (Don't usually need to edit)

| File | Purpose |
|------|---------|
| `TabView.tsx` | Tab navigation behavior |
| `TimelineTab.tsx` | Timeline view |
| `PatternsTab.tsx` | Pattern details view |
| `CoachTab.tsx` | Coach interface |
| `EnhancedScorecardCard.tsx` | Expandable pattern cards |
| `RecommendationCard.tsx` | Action recommendation cards |
| `WeeklyDigestCard.tsx` | Weekly summary card |

---

## 🧪 Testing Checklist

- [ ] App loads at http://localhost:3001
- [ ] INSIGHTS tab shows weekly digest
- [ ] INSIGHTS tab shows AI coach insights
- [ ] INSIGHTS tab shows recommendations
- [ ] TIMELINE tab shows 30-day chart
- [ ] PATTERNS tab shows habit patterns
- [ ] Click to expand a pattern → details show
- [ ] Multi-lag data shows (T+1, T+2, T+3)
- [ ] Mobile tab switching works
- [ ] Refresh button regenerates insights

---

## 🎓 Understanding the Data Model

### How Pattern Detection Works

```
1. For each habit (dairy, sugar, sleep, stress, skincare):
   
2. For tomorrow (after each day):
   - If habit happened TODAY and acne worsened TOMORROW → count as "worsen"
   - If habit happened TODAY and acne improved TOMORROW → count as "improve"
   - If habit happened TODAY and acne unchanged TOMORROW → count as "neutral"

3. Calculate confidence:
   confidence = (worsen count / total) × 100

4. Interpret confidence:
   < 50%  = insufficient data
   50-60% = weak pattern
   60-70% = moderate pattern
   70%+   = strong pattern

5. Also check multi-lag (T+2, T+3) to find delayed effects
```

---

## 🚨 Troubleshooting

### "Port 3000 is in use"
The app uses **3001** instead. Open: http://localhost:3001

### "Build failed"
```bash
# Clear cache and rebuild
rm -r .next node_modules
npm install
npm run build
```

### "AI insights not generating"
- **With API**: Check `OPENROUTER_API_KEY` environment variable
- **Without API**: Fallback insights generate automatically
- **No internet**: Still works (uses template insights)

### "Charts not showing"
Check browser console for errors. Usually a data format issue.

---

## 🎨 Customization Ideas

### Add New Habit to Track
Edit `src/lib/data.ts` → Add to `DayData` interface:
```typescript
export interface DayData {
  // ... existing fields ...
  exerciseDone: boolean,  // ← NEW
  // ...
}
```

### Change Styling (Dark Mode)
Edit Tailwind config or add dark mode variants:
```typescript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

### Add Export to PDF Feature
Install: `npm install jspdf`
Then add export button in `Dashboard.tsx`

### Add Data Upload/Download
Create file input component:
```typescript
<input type="file" onChange={(e) => loadUserData(e)} />
```

---

## 📈 Next Steps

1. **Test with Sample Data**
   - Verify all tabs work
   - Check AI insights quality
   - Review recommendations

2. **Customize for Your Needs**
   - Adjust habit types
   - Change recommendation text
   - Modify confidence thresholds

3. **Gather User Feedback**
   - Which tab do users visit most?
   - Do recommendations feel actionable?
   - Is AI coach helpful?

4. **Optional Enhancements**
   - Add user authentication
   - Store data in database
   - Add experiment tracking
   - Build analytics dashboard

---

## 💬 Support

- App runs at: **http://localhost:3001**
- Built with: Next.js 14 + React 18 + Tailwind CSS
- No backend needed (works entirely client-side)
- All data is synthetic (can be replaced with real data)

---

## 📚 Documentation

Read these for more context:
1. `IMPLEMENTATION_NOTES.md` - Full feature overview
2. `COMPONENT_ARCHITECTURE.md` - Technical architecture
3. `BEFORE_AFTER_GUIDE.md` - Product transformation details
4. `PROJECT_SPEC.md` - Original project specification

---

## 🎉 That's It!

You now have an intelligent health concierge dashboard. Users can:
- ✅ Quickly see recommendations (INSIGHTS tab)
- ✅ Understand trends (TIMELINE tab)
- ✅ Explore patterns deeply (PATTERNS tab)
- ✅ Get AI guidance (COACH tab)

Enjoy! 🚀
