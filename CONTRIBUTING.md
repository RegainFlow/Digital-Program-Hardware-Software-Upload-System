# Contributing to RegainFlow Data Normalizer

Welcome to the **RegainFlow Data Normalizer** project! This guide will help you understand the project structure, development workflow, and best practices for contributing as we scale this application.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Code Style Guide](#code-style-guide)
- [Component Guidelines](#component-guidelines)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Performance Best Practices](#performance-best-practices)
- [Accessibility](#accessibility)
- [Git Workflow](#git-workflow)
- [Pull Request Process](#pull-request-process)
- [Scalability Considerations](#scalability-considerations)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**RegainFlow Data Normalizer** is a high-performance React application designed to normalize non-standard Excel/CSV data into a centralized SQL schema using **Gemini AI** for intelligent column mapping. 

### Key Features

- 🤖 **AI-Powered Mapping**: Uses Google's Gemini 2.5 Flash to intelligently map source columns to target schema fields
- 📊 **Multi-Format Support**: Handles Excel (.xlsx) and CSV files with varying structures
- 🎨 **Glass Morphism UI**: Modern design system with neon cyan accents and frosted glass effects
- ⚡ **Real-time Preview**: Live data preview during mapping process
- 🔄 **Flexible Workflow**: Three-step process: Upload → Mapping → Success confirmation

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19.2.0 | UI components and state management |
| **Build Tool** | Vite 6.2.0 | Fast development server and bundling |
| **Language** | TypeScript 5.8.2 | Type safety and better DX |
| **Styling** | Tailwind CSS + Custom CSS | Utility-first + Glass morphism design |
| **Icons** | Phosphor React | Duotone icon library |
| **AI Integration** | Google Gemini API | Intelligent column mapping |

---

## Architecture

### High-Level Architecture

```
┌─────────────────┐
│   User Upload   │
│  (Excel/CSV)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  File Parser    │
│  (Client-side)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gemini AI      │
│  Mapping Engine │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Validation │
│   & Approval    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Data Ingestion │
│  (Simulated)    │
└─────────────────┘
```

### Component Architecture

```
App.tsx (Root)
├── UploadZone
│   ├── File drop area
│   ├── File validation
│   └── CSV/Excel parsing
├── MappingInterface
│   ├── Source preview panel
│   ├── AI suggestions display
│   ├── Manual mapping controls
│   └── Gemini service integration
└── Success Screen
    └── Completion summary
```

### Data Flow

1. **Upload Phase**: User uploads file → Parsed into headers + rows → State stored
2. **AI Mapping Phase**: Headers sent to Gemini API → AI suggests mappings → User reviews/edits
3. **Completion Phase**: Final mappings confirmed → Success screen displayed

---

## Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Latest version
- **Code Editor**: VS Code recommended (with ESLint and Prettier extensions)

### Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Digital-Program-Hardware-Software-Upload-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note**: Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

---

## Development Workflow

### Recommended Development Flow

1. **Review existing code** and design patterns before starting
2. **Check STYLES.md** for design system guidelines
3. **Create a feature branch** from `main`
4. **Implement changes** following code style guide
5. **Test thoroughly** on different screen sizes
6. **Commit with clear messages**
7. **Submit pull request** with detailed description

---

## Project Structure

```
Digital-Program-Hardware-Software-Upload-System/
│
├── components/                  # React components
│   ├── Icon.tsx                # Icon wrapper component
│   ├── MappingInterface.tsx    # AI mapping UI
│   ├── NeonButton.tsx          # Reusable button component
│   └── UploadZone.tsx          # File upload component
│
├── services/                    # External service integrations
│   └── geminiService.ts        # Gemini AI API client
│
├── App.tsx                     # Root component
├── index.tsx                   # Application entry point
├── index.html                  # HTML template
│
├── types.ts                    # TypeScript type definitions
├── constants.ts                # App-wide constants (schema, mock data)
│
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
│
├── STYLES.md                   # Design system documentation
├── CONTRIBUTING.md             # This file
└── README.md                   # Project overview
```

### Scalability Structure (Future)

As the project grows, consider this structure:

```
src/
├── features/                   # Feature-based organization
│   ├── upload/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── mapping/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── export/
│
├── shared/                     # Shared resources
│   ├── components/             # Reusable components
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── types/                  # Shared TypeScript types
│   └── constants/              # Shared constants
│
├── styles/                     # CSS organization
│   ├── base.css               # Reset and base styles
│   ├── variables.css          # CSS custom properties
│   ├── utilities.css          # Utility classes
│   ├── components.css         # Component styles
│   └── animations.css         # Keyframe animations
│
├── services/                   # API and external services
│   ├── api/
│   │   ├── gemini.ts
│   │   └── upload.ts
│   └── validation/
│
└── config/                     # Configuration files
    ├── schema.ts
    └── constants.ts
```

---

## Design System

Our design system is based on **Glass Morphism + Neon Aesthetics**. All design guidelines are documented in [STYLES.md](./STYLES.md).

### Core Design Principles

1. **Dark Mode First**: All components designed for dark backgrounds
2. **Glass Effect**: Frosted glass overlays with backdrop blur
3. **Neon Accents**: Cyan (#00d6cb) for CTAs and highlights
4. **Smooth Transitions**: All interactions have 250-350ms transitions
5. **Typography Hierarchy**: Clear visual hierarchy with proper contrast

### Design System Quick Reference

#### Colors

```typescript
// Primary brand color
--color-primary: #00d6cb

// Backgrounds
--color-bg-primary: #121213
--color-bg-secondary: #1a1a1a

// Text
--color-text-primary: #ffffff
--color-text-secondary: #a6a6a6
```

#### Spacing Scale

Use consistent spacing from the design system:

```
4px → var(--space-1)
8px → var(--space-2)
16px → var(--space-4)
24px → var(--space-6)
48px → var(--space-12)
```

#### Using Design Tokens

**✅ DO:**
```css
.my-button {
  background: var(--color-primary-alpha-15);
  border-radius: var(--radius-base);
  transition: all var(--transition-base) var(--ease-out);
}
```

**❌ DON'T:**
```css
.my-button {
  background: rgba(0, 214, 203, 0.15);
  border-radius: 8px;
  transition: all 0.3s ease;
}
```

---

## Code Style Guide

### TypeScript

#### Naming Conventions

- **Components**: PascalCase (`MappingInterface.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useFileUpload.ts`)
- **Utilities**: camelCase (`parseCSVFile.ts`)
- **Types/Interfaces**: PascalCase (`UploadedFileState`)
- **Constants**: UPPER_SNAKE_CASE (`TARGET_SCHEMA`)

#### Type Definitions

Always define explicit types:

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

// ❌ Bad
function Button(props: any) { }
```

#### Avoid `any` Type

```typescript
// ✅ Good
const handleFileUpload = (file: File): Promise<UploadedFileState> => {
  // Implementation
}

// ❌ Bad
const handleFileUpload = (file: any): any => {
  // Implementation
}
```

### File Organization

#### Import Order

1. React imports
2. Third-party libraries
3. Internal components
4. Utilities and helpers
5. Types
6. Constants
7. Styles

```typescript
// ✅ Good
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';
import { NeonButton } from './NeonButton';
import { parseCSVFile } from './utils';
import { UploadedFileState } from './types';
import { TARGET_SCHEMA } from './constants';
```

### React Best Practices

#### Functional Components

Use functional components with hooks:

```typescript
// ✅ Good
export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [state, setState] = useState<string>('');
  
  return <div>{title}</div>;
};
```

#### Props Destructuring

```typescript
// ✅ Good
export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  onClick, 
  children 
}) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ Bad
export const Button: React.FC<ButtonProps> = (props) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};
```

#### useState with Explicit Types

```typescript
// ✅ Good
const [mappings, setMappings] = useState<ColumnMapping[]>([]);
const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);

// ❌ Bad
const [mappings, setMappings] = useState([]);
const [step, setStep] = useState('upload');
```

---

## Component Guidelines

### Component Structure

Every component should follow this structure:

```typescript
import React, { useState } from 'react';
import { ComponentProps } from './types';

/**
 * ComponentName - Brief description
 * 
 * @param {ComponentProps} props - Component properties
 * @returns {JSX.Element} Rendered component
 */
export const ComponentName: React.FC<ComponentProps> = ({ 
  prop1, 
  prop2 
}) => {
  // 1. Hooks
  const [state, setState] = useState<string>('');

  // 2. Event handlers
  const handleEvent = () => {
    // Implementation
  };

  // 3. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 4. Render
  return (
    <div className="component-wrapper">
      {/* Component JSX */}
    </div>
  );
};
```

### Component Size Guidelines

- **Small Component**: < 100 lines (icon, button, badge)
- **Medium Component**: 100-300 lines (card, form, list)
- **Large Component**: 300-500 lines (dashboard, interface)
- **Refactor if**: > 500 lines (split into smaller components)

### Reusable Components

Create reusable components in the `components/` directory:

```typescript
// components/Card.tsx
interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  icon,
  className = ''
}) => {
  return (
    <div className={`glass-card ${className}`}>
      {icon && <div className="card-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

---

## State Management

### Current Approach

Currently using **React useState** for local component state. As the app scales, consider:

### Future State Management Options

#### 1. Context API (Medium Complexity)

For shared state across multiple components:

```typescript
// contexts/AppContext.tsx
interface AppContextType {
  user: User | null;
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  return (
    <AppContext.Provider value={{ user, settings, updateSettings: setSettings }}>
      {children}
    </AppContext.Provider>
  );
};
```

#### 2. Zustand (Recommended for Scaling)

Lightweight state management library:

```typescript
// store/useUploadStore.ts
import create from 'zustand';

interface UploadStore {
  files: File[];
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (id) => set((state) => ({ 
    files: state.files.filter(f => f.id !== id) 
  })),
}));
```

#### 3. Redux Toolkit (Enterprise Scale)

For large applications with complex state:

```typescript
// store/slices/uploadSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadState {
  files: File[];
  status: 'idle' | 'loading' | 'success' | 'error';
}

const uploadSlice = createSlice({
  name: 'upload',
  initialState: { files: [], status: 'idle' } as UploadState,
  reducers: {
    addFile: (state, action: PayloadAction<File>) => {
      state.files.push(action.payload);
    },
  },
});
```

---

## API Integration

### Gemini AI Service

The `geminiService.ts` handles all AI interactions:

```typescript
import { GoogleGenAI, Type } from "@google/genai";

export const getGeminiMappings = async (
  sourceHeaders: string[],
  targetSchema: StandardField[]
): Promise<MappingSuggestionResponse | null> => {
  // Implementation
};
```

### API Best Practices

1. **Error Handling**: Always wrap API calls in try-catch
2. **Loading States**: Show loading indicators during API calls
3. **Retry Logic**: Implement retry for failed requests
4. **Timeout**: Set appropriate timeout values
5. **Type Safety**: Define response types

#### Example: Robust API Call

```typescript
const fetchMappings = async (): Promise<MappingResponse> => {
  try {
    setIsLoading(true);
    setError(null);

    const response = await getGeminiMappings(headers, schema);
    
    if (!response) {
      throw new Error('Failed to fetch mappings');
    }

    return response;
  } catch (err) {
    const error = err as Error;
    setError(error.message);
    console.error('Mapping error:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

### Environment Variables

Always use environment variables for API keys:

```typescript
// ✅ Good
const apiKey = process.env.GEMINI_API_KEY;

// ❌ Bad
const apiKey = 'hardcoded-api-key-12345';
```

---

## Testing

### Testing Strategy (Future Implementation)

#### Unit Tests

Test individual functions and components:

```typescript
// __tests__/utils/parseCSV.test.ts
import { parseCSVFile } from '../utils/parseCSV';

describe('parseCSVFile', () => {
  it('should parse valid CSV content', () => {
    const csvContent = 'Name,Age\nJohn,30\nJane,25';
    const result = parseCSVFile(csvContent);
    
    expect(result.headers).toEqual(['Name', 'Age']);
    expect(result.rows).toHaveLength(2);
  });

  it('should handle empty CSV', () => {
    const csvContent = '';
    expect(() => parseCSVFile(csvContent)).toThrow();
  });
});
```

#### Integration Tests

Test component interactions:

```typescript
// __tests__/components/UploadZone.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { UploadZone } from '../components/UploadZone';

describe('UploadZone', () => {
  it('should accept file drops', async () => {
    const onFileProcessed = jest.fn();
    render(<UploadZone onFileProcessed={onFileProcessed} />);

    const file = new File(['content'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText('upload-input');

    fireEvent.drop(input, { dataTransfer: { files: [file] } });

    await waitFor(() => expect(onFileProcessed).toHaveBeenCalled());
  });
});
```

#### Recommended Testing Tools

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: E2E testing

---

## Performance Best Practices

### React Optimization

#### 1. Memoization

Use `useMemo` and `useCallback` for expensive operations:

```typescript
// ✅ Good
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);
```

#### 2. Code Splitting

Split large components with lazy loading:

```typescript
import { lazy, Suspense } from 'react';

const MappingInterface = lazy(() => import('./components/MappingInterface'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MappingInterface />
    </Suspense>
  );
}
```

#### 3. Avoid Inline Functions

```typescript
// ❌ Bad (creates new function every render)
<button onClick={() => handleClick(id)}>Click</button>

// ✅ Good
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<button onClick={handleButtonClick}>Click</button>
```

### Bundle Size Optimization

1. **Tree Shaking**: Import only what you need
2. **Asset Optimization**: Compress images and fonts
3. **Code Splitting**: Use dynamic imports
4. **Remove Unused Dependencies**: Regular cleanup

```typescript
// ✅ Good (tree-shakable)
import { PiRobotDuotone } from 'react-icons/pi';

// ❌ Bad (imports entire library)
import * as Icons from 'react-icons/pi';
```

---

## Accessibility

### WCAG 2.1 Guidelines

Follow these accessibility standards:

#### 1. Semantic HTML

```html
<!-- ✅ Good -->
<button onClick={handleClick}>Submit</button>
<nav><a href="/dashboard">Dashboard</a></nav>

<!-- ❌ Bad -->
<div onClick={handleClick}>Submit</div>
<div><span onClick={goToDashboard}>Dashboard</span></div>
```

#### 2. ARIA Labels

```typescript
<button aria-label="Upload file">
  <Icons.Upload />
</button>

<input 
  type="text" 
  aria-describedby="email-help"
  aria-invalid={hasError}
/>
```

#### 3. Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleAction();
  }
};

<div 
  role="button"
  tabIndex={0}
  onKeyPress={handleKeyPress}
  onClick={handleAction}
>
  Action
</div>
```

#### 4. Color Contrast

Maintain WCAG AA standards (4.5:1 for normal text):

- Text on background: High contrast
- Primary cyan on dark: Sufficient contrast
- Gray text: Use `#a6a6a6` minimum

#### 5. Focus Indicators

Always provide visible focus states:

```css
.neon-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Git Workflow

### Branch Naming Convention

```
feature/description      # New features
bugfix/description       # Bug fixes
hotfix/description       # Urgent fixes
refactor/description     # Code refactoring
docs/description         # Documentation updates
style/description        # UI/styling changes
```

Examples:
- `feature/add-export-functionality`
- `bugfix/fix-csv-parsing-error`
- `refactor/optimize-gemini-service`

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or tooling changes

**Examples:**

```bash
feat(upload): add drag-and-drop file upload support

Implemented drag-and-drop functionality for the upload zone.
Users can now drag files directly onto the upload area.

Closes #123

---

fix(mapping): resolve AI suggestion timeout issue

Increased timeout from 5s to 15s for Gemini API calls.
Added retry logic for failed requests.

---

docs: update CONTRIBUTING.md with testing guidelines
```

### Git Best Practices

1. **Commit Often**: Small, focused commits
2. **Write Clear Messages**: Explain why, not just what
3. **Keep Commits Atomic**: One logical change per commit
4. **Pull Before Push**: Always sync with remote
5. **Review Your Changes**: Use `git diff` before committing

```bash
# Before committing
git status
git diff

# Stage specific files
git add components/MyComponent.tsx

# Commit with message
git commit -m "feat(component): add MyComponent with props validation"

# Pull latest changes
git pull origin main

# Push to remote
git push origin feature/my-feature
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guide
- [ ] All new code has appropriate comments
- [ ] TypeScript types are properly defined
- [ ] No console.log statements in production code
- [ ] Tested on multiple screen sizes (mobile, tablet, desktop)
- [ ] Design matches STYLES.md guidelines
- [ ] No breaking changes (or documented if necessary)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Added X feature
- Fixed Y bug
- Refactored Z component

## Screenshots (if UI changes)
[Add screenshots here]

## Testing Steps
1. Step 1
2. Step 2
3. Expected result

## Checklist
- [ ] Code follows project style guide
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested on multiple browsers
```

### Review Process

1. **Automated Checks**: Wait for CI/CD to pass (when implemented)
2. **Code Review**: At least one approval required
3. **Testing**: Reviewers test changes locally
4. **Merge**: Squash and merge to main

---

## Scalability Considerations

### Performance at Scale

#### 1. Virtualization for Large Datasets

When displaying 1000+ rows:

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={500}
  itemCount={rows.length}
  itemSize={35}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      {rows[index]}
    </div>
  )}
</FixedSizeList>
```

#### 2. Pagination

For large result sets:

```typescript
const ITEMS_PER_PAGE = 50;

const paginatedData = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return data.slice(start, start + ITEMS_PER_PAGE);
}, [data, currentPage]);
```

#### 3. Debouncing User Input

```typescript
import { useDebouncedCallback } from 'use-debounce';

const debouncedSearch = useDebouncedCallback(
  (searchTerm: string) => {
    performSearch(searchTerm);
  },
  500
);
```

### Code Organization at Scale

#### Feature-Based Architecture

```
src/features/
├── upload/
│   ├── components/
│   │   ├── UploadZone.tsx
│   │   └── FilePreview.tsx
│   ├── hooks/
│   │   └── useFileUpload.ts
│   ├── utils/
│   │   └── parseFile.ts
│   └── index.ts
│
├── mapping/
│   ├── components/
│   │   ├── MappingInterface.tsx
│   │   └── ColumnMapper.tsx
│   ├── services/
│   │   └── geminiService.ts
│   └── index.ts
```

#### Shared Component Library

Create a design system package:

```
packages/
└── ui/
    ├── components/
    │   ├── Button/
    │   ├── Card/
    │   ├── Input/
    │   └── index.ts
    ├── styles/
    └── package.json
```

### Database Considerations (Future)

When transitioning to full-stack:

1. **Choose Appropriate Database**
   - PostgreSQL for relational data
   - MongoDB for flexible schemas
   - Redis for caching

2. **Schema Design**
   ```typescript
   interface UploadHistory {
     id: string;
     userId: string;
     fileName: string;
     uploadedAt: Date;
     mappings: ColumnMapping[];
     status: 'pending' | 'completed' | 'failed';
   }
   ```

3. **Indexing Strategy**
   - Index frequently queried fields
   - Use composite indexes for multi-field queries

---

## Troubleshooting

### Common Issues

#### 1. Gemini API Timeout

**Problem**: API calls taking too long or timing out

**Solution:**
```typescript
// Increase timeout in geminiService.ts
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s

try {
  const response = await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timeoutId);
}
```

#### 2. Large File Processing

**Problem**: Browser freezes when parsing large CSV files

**Solution:** Use Web Workers
```typescript
// workers/csvParser.worker.ts
self.addEventListener('message', (e) => {
  const { csvContent } = e.data;
  const parsed = parseCSV(csvContent);
  self.postMessage(parsed);
});

// In component
const worker = new Worker('./csvParser.worker.ts');
worker.postMessage({ csvContent });
worker.onmessage = (e) => {
  setData(e.data);
};
```

#### 3. Memory Leaks

**Problem**: Application slows down over time

**Solution:** Clean up effects
```typescript
useEffect(() => {
  const subscription = dataSource.subscribe();

  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

#### 4. Styling Issues

**Problem**: Tailwind classes not applying

**Solution:**
1. Check Tailwind CDN is loaded in `index.html`
2. Verify class names are correct
3. Check for CSS specificity conflicts
4. Use browser DevTools to inspect applied styles

### Getting Help

- **Documentation**: Check [STYLES.md](./STYLES.md) for design system
- **Issues**: Search existing GitHub issues
- **Discussions**: Start a discussion for questions
- **Code Review**: Ask for feedback in PRs

---

## Additional Resources

### Learning Materials

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)

### Design Resources

- [Glass Morphism Generator](https://ui.glass/generator/)
- [Phosphor Icons](https://phosphoricons.com/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Development Tools

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

---

## License

[Add your license information here]

---

## Contact

For questions or suggestions, please:
- Open an issue on GitHub
- Start a discussion in the Discussions tab
- Contact the maintainers

---

**Thank you for contributing to RegainFlow Data Normalizer!** 🚀

Your contributions help make this project better for everyone. We appreciate your time and effort in improving this application.
