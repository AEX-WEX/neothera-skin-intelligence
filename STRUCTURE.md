## Project Structure Documentation

This document explains the organization of the Neothera codebase and best practices for adding new features.

### Directory Organization

```
Neothera/
├── public/                    # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/               # Server-side API routes
│   │   │   └── insights/      # AI insights endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Dashboard.tsx      # Main dashboard container
│   │   ├── TabView.tsx        # Tab navigation component
│   │   ├── ChartSection.tsx   # Chart visualization
│   │   └── [other components]
│   │
│   ├── features/              # Feature-specific domain logic
│   │   ├── analysis/          # Analysis feature
│   │   │   ├── index.ts       # Feature exports
│   │   │   └── habitConfig.ts # Habit configurations
│   │   └── tracking/          # Tracking feature (future)
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── index.ts           # Exports
│   │   └── useAnalysis.ts     # Analysis hook
│   │
│   ├── lib/                   # Core library functions
│   │   ├── analysis.ts        # Analysis algorithms
│   │   ├── data.ts            # Data generation/fetching
│   │   └── ai.ts              # AI integration
│   │
│   ├── utils/                 # Utility functions
│   │   ├── index.ts           # Exports
│   │   ├── dateFormatter.ts   # Date utilities
│   │   └── confidenceLevel.ts # Confidence calculations
│   │
│   ├── constants/             # Static configuration
│   │   ├── index.ts           # Exports
│   │   ├── colors.ts          # Color definitions
│   │   └── app.ts             # App constants
│   │
│   └── types/                 # TypeScript definitions
│       └── index.ts           # All type exports
│
├── .env.local                 # Local environment (DO NOT COMMIT)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind CSS config
├── next.config.js             # Next.js config
└── README.md                  # Project documentation
```

### Layer Descriptions

#### **Components** (`/components`)
- Purpose: Reusable UI elements
- Rule: Minimal business logic (should use hooks if needed)
- Examples: Buttons, Cards, Inputs, Modals, Charts

✅ Good:
```tsx
export function UserCard({ name, score }) {
  return <div className="card">{name}: {score}</div>;
}
```

❌ Avoid:
```tsx
export function UserCard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // API calls
  }, []);
}
```

#### **Features** (`/features`)
- Purpose: Domain-specific business logic
- Organization: One folder per feature
- Exports: Main logic, configs, types for that feature

Example: `features/analysis/`
```
├── index.ts          # Main exports
├── habitConfig.ts    # Habit configurations
└── future: algorithms.ts
```

#### **Hooks** (`/hooks`)
- Purpose: Reusable stateful logic
- Pattern: Start with "use" prefix
- Should: Be testable and composable

Example:
```tsx
// useAnalysis.ts
export function useAnalysis(data) {
  const [result, setResult] = useState(null);
  // Logic here
  return result;
}

// Usage in component
function Dashboard() {
  const analysis = useAnalysis(data);
}
```

#### **Utils** (`/utils`)
- Purpose: Pure, stateless functions
- Characteristics: No dependencies, no side effects
- Examples: Formatting, calculations, transformations

```tsx
// dateFormatter.ts
export function formatDate(date) {
  return date.toLocaleDateString();
}
```

#### **Constants** (`/constants`)
- Purpose: Immutable configuration values
- Rule: Use UPPER_SNAKE_CASE for exported consts
- Group: By category (colors, messages, API config)

```tsx
export const COLORS = { primary: '#e11d48' };
export const MESSAGES = { ERROR: 'An error occurred' };
```

#### **Lib** (`/lib`)
- Purpose: Core algorithms and integrations
- Contains: Analysis, data fetching, AI integration
- Note: Lower-level than features

### Adding New Features

#### Step 1: Create Feature Folder
```bash
mkdir src/features/myFeature
touch src/features/myFeature/index.ts
```

#### Step 2: Add Configuration
```tsx
// src/features/myFeature/config.ts
export const MY_CONFIG = { /* ... */ };

// src/features/myFeature/index.ts
export * from './config';
```

#### Step 3: Create Custom Hook (if needed)
```tsx
// src/hooks/useMyFeature.ts
export function useMyFeature() { /* ... */ }
```

#### Step 4: Use in Components
```tsx
import { useMyFeature } from '@/hooks';
import { MY_CONFIG } from '@/features/myFeature';

export function MyComponent() {
  const data = useMyFeature();
  // Use MY_CONFIG...
}
```

### Import Path Conventions

Use path aliases for cleaner imports:

```tsx
// ✅ GOOD
import { formatDate } from '@/utils';
import { COLORS } from '@/constants';
import { Dashboard } from '@/components';

// ❌ AVOID
import { formatDate } from '../../../utils/dateFormatter';
import { COLORS } from '../../../constants/colors';
```

### Cleanup Guidelines

#### Remove Before Production
- [ ] All `console.log()` statements
- [ ] Unused imports
- [ ] Commented-out code
- [ ] Debug variables
- [ ] Temporary files

#### Keep
- [ ] `console.error()` - for error reporting
- [ ] Comments explaining complex logic
- [ ] Type definitions
- [ ] JSDoc comments for public functions

### Performance Best Practices

1. **Code Splitting**: Use lazy loading for components
   ```tsx
   const Dashboard = dynamic(() => import('@/components/Dashboard'));
   ```

2. **Memoization**: Wrap expensive computations
   ```tsx
   const result = useMemo(() => analyzeData(data), [data]);
   ```

3. **Dependencies**: Keep dependency arrays accurate
   ```tsx
   useEffect(() => { /* ... */ }, [data, userId]);
   ```

### Testing Structure (Future)

When adding tests:
```
src/
├── __tests__/
│   ├── components/
│   ├── utils/
│   └── hooks/
```

---

**Last Updated**: April 15, 2026
