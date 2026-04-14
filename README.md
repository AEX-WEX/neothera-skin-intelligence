# [Neothera – Skin Intelligence Dashboard](https://neothera-skin-intelligence.vercel.app/)

**An AI-powered habit tracking and skin health analytics platform that correlates daily habits with skin condition changes.**

## 🚀 Overview

Neothera leverages machine learning and AI to help users understand which lifestyle factors impact their skin health. By analyzing patterns between habits (sleep, stress, skincare routines, diet, etc.) and skin observations, users receive personalized, data-driven recommendations for improvement.

**Key Innovation:** Uses OpenRouter's GPT-4o-mini to generate intelligent coaching and insights from tracked habit-skin correlations.

## ✨ Features

- **📊 Comprehensive Habit Tracking** - Timeline-based logging of daily activities and skin observations
- **🧠 AI-Powered Coaching** - Real-time personalized recommendations via GPT-4o-mini
- **📈 Advanced Analytics** - Severity scores, trend analysis, and habit correlations
- **🔍 Pattern Detection** - Automatically identifies correlations between habits and skin changes
- **🎯 Actionable Insights** - Weekly digests and personalized improvement strategies
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Next.js 14, TypeScript |
| Styling | Tailwind CSS, PostCSS |
| Visualizations | Recharts |
| AI/ML | OpenRouter (GPT-4o-mini) |
| Deployment | Vercel-ready |

## 📂 Project Architecture

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # Server-side API routes (OpenRouter integration)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard home
├── components/            # Reusable React components (15+ components)
│   ├── Dashboard.tsx      # Main dashboard view
│   ├── TabView.tsx        # Tab navigation system
│   ├── InsightCard.tsx    # AI-generated insights display
│   ├── StreakTracker.tsx  # Habit streak tracking
│   └── ...
├── features/              # Domain-specific business logic
│   ├── analysis/          # Habit analysis & correlation
│   └── tracking/          # Habit tracking logic
├── hooks/                 # Custom React hooks (useAnalysis)
├── lib/                   # Core utilities
│   ├── ai.ts             # OpenRouter API integration
│   ├── analysis.ts       # Pattern detection algorithms
│   └── data.ts           # Data processing
├── utils/                 # Helper functions
│   ├── dateFormatter.ts  # Date utilities
│   └── confidenceLevel.ts # Confidence scoring
├── types/                 # TypeScript definitions
└── constants/             # App configuration
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenRouter API key (for AI features)

### Getting Started

```bash
# Clone repository
git clone https://github.com/AEX-WEX/neothera-skin-intelligence.git
cd neothera-skin-intelligence

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local and add your OpenRouter API key

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Security & Best Practices

✅ All API keys stored in `.env.local` (never committed)  
✅ AI calls routed through Next.js API routes (secure)  
✅ No sensitive data in client-side code  
✅ Follows Next.js security guidelines  
✅ TypeScript for type safety  

## 📊 Usage Examples

1. **Track Habits** - Log daily activities (sleep, stress level, skincare routine, water intake, etc.)
2. **Log Observations** - Record skin condition changes
3. **Get AI Insights** - System analyzes patterns and generates personalized recommendations
4. **View Trends** - Visual analytics show correlations and severity trends
5. **Receive Coaching** - AI-powered coaching tailored to your data

## 🚀 Deployment

Ready to deploy on [Vercel](https://vercel.com) with one-click setup:

```bash
npm run build  # Verify build works locally
# Push to GitHub, connect Vercel repo, done!
```

## 📌 Future Roadmap

- [ ] Mobile app (React Native)
- [ ] Historical data export (CSV/PDF)
- [ ] Advanced ML models for better predictions
- [ ] Community insights & trending patterns
- [ ] Integration with wearables (Apple Health, Google Fit)
- [ ] Real-time notifications for ideal times to track

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Version:** 1.0.0 | **Last Updated:** April 2026
