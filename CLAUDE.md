# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vite-powered React landing page for AlloRestau, an AI phone assistant service for restaurants. The project features a unique **triple-theme system** that dynamically switches between three restaurant types: Pizzeria, Snack, and Restaurant. Each theme has its own color palette, content, and branding.

## Development Commands

```bash
# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build in development mode
npm run build:dev

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Triple Theme System

The core architectural feature is the dynamic theme system that supports three distinct restaurant types:

- **ThemeContext** (`src/contexts/ThemeContext.tsx`): Manages theme state and CSS variable updates
- **ThemeType** (`src/types/theme.ts`): Defines three themes - 'pizzeria', 'snack', 'restaurant'
- **CSS Variables** (`src/index.css`): Each theme has its own color palette defined in HSL format

Theme switching works by:
1. User selects a theme (via Header component)
2. ThemeContext updates CSS custom properties (`--theme-bg`, `--theme-light`, `--theme-dark`, `--theme-accent`)
3. All components automatically re-render with new colors
4. Smooth transitions are managed via `isTransitioning` state

### Component Structure

The landing page follows a single-page layout with section-based components:

- **Index page** (`src/pages/Index.tsx`): Wraps everything in ThemeProvider
- **Header**: Navigation and theme switcher
- **HeroSection**: Dynamic content based on current theme
- **TestIASection**: AI voice assistant demo
- **WorkflowSection**: How the service works
- **StatsSection**: Business metrics
- **MenuPricingSection**: Pricing information
- **Footer**: Contact and links

### Key Technical Details

**Path Aliases**: Use `@/` prefix for imports (configured in vite.config.ts and tsconfig.json)
```typescript
import { ThemeProvider } from '@/contexts/ThemeContext';
```

**Styling**:
- Tailwind CSS with custom color system
- Three font families: Inter (body), Playfair Display (headings), Poppins (bold)
- All components should use theme-aware color classes: `theme-bg`, `theme-light`, `theme-dark`, `theme-accent`, `text-universal`

**CRITICAL: Dynamic Color Adaptation**:
- **ALL colors MUST adapt to the active theme** (pizzeria/snack/restaurant)
- **NEVER use fixed colors** like `#FFD700` or `#cc1616` directly in components
- **ALWAYS use CSS variables**: `hsl(var(--theme-bg))`, `hsl(var(--theme-accent))`, etc.
- **Card backgrounds**: Use `hsl(var(--theme-bg))` to match the current theme color
- **Text on colored backgrounds**: Use `#fdefd5` (blanc cassé/off-white) for readability
- **Example**: Cards in StatsSection have `backgroundColor: 'hsl(var(--theme-bg))'` so they turn red for pizzeria, yellow for snack, blue for restaurant

**shadcn/ui**:
- UI components in `src/components/ui/` are from shadcn/ui
- Component configuration in `components.json`
- Uses Radix UI primitives underneath

**React Router**:
- Single route at `/` (Index page)
- Catch-all `*` route for 404 (NotFound page)
- ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE

**State Management**:
- React Query for server state (QueryClient configured in App.tsx)
- Context API for theme management
- Local state for component-specific UI

**TypeScript Configuration**:
- Strict mode is DISABLED (`noImplicitAny: false`, `strictNullChecks: false`)
- Unused variables/parameters warnings are OFF
- `allowJs: true` permits JavaScript files

## Important Patterns

### Adding New Components

When creating components that use theming:
1. Import and use theme-aware Tailwind classes
2. Access theme context via `useTheme()` if dynamic content is needed
3. Add smooth transitions using `theme-transition` class

### Theme Content

Each theme has unique content defined in `themeContents` object (src/types/theme.ts):
- `name`, `icon`: Display metadata
- `heroTitle`, `heroSubtitle`: Hero section text
- `painPoints`: Customer problems
- `benefits`: Solution features

### Brutalist Card Design System

When implementing brutalist-style cards:
1. **Background color logic**:
   - If section has a **colored background** → cards use **white** (`#ffffff`)
   - If section has a **white/neutral background** → cards use **theme color** (`hsl(var(--theme-bg))`)

2. **Text color rules**:
   - Cards with **theme-colored backgrounds** → text in **blanc cassé** (`#fdefd5`)
   - Cards with **white backgrounds** → text in **black** (`#000`)

3. **Brutalist style elements**:
   - Border: `4px solid #000`
   - Shadow: `10px 10px 0 #000`
   - Font: `Outfit, sans-serif`
   - Hover effect: translate(-2px, -2px) with larger shadow

4. **Examples**:
   - **StatsSection** (beige background `#fdefd5`) → cards with theme color bg + white text
   - **WorkflowSection** (theme-colored background) → cards with white bg + black text

### Development Integration

This project was created with Lovable (lovable.dev) and uses the `lovable-tagger` plugin in development mode for component tracking. The plugin is automatically disabled in production builds.

## UI Library

Uses shadcn/ui components with custom theming. When adding new shadcn components, ensure they respect the triple-theme color system by using the custom color variables rather than default shadcn colors.
