# BugLess Frontend

Landing page for BugLess - AI-powered code review tool focused on TypeScript.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Phosphor Icons
- **Forms:** React Hook Form + Zod
- **Package Manager:** pnpm

## Quick Start

```bash
# Copy environment variables
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Scripts

```bash
pnpm dev    # Start development server (http://localhost:3001)
pnpm build  # Build for production
pnpm start  # Start production server
pnpm lint   # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   └── (landing)/              # Route group
│       ├── _components/        # Landing components (colocation)
│       │   ├── hero/
│       │   ├── features/
│       │   ├── problem/
│       │   ├── terminal/
│       │   ├── comparison/
│       │   ├── pricing/
│       │   └── shared/
│       └── _hooks/             # Landing-specific hooks
│
├── components/
│   ├── ui/                     # Base components (shadcn/ui)
│   ├── common/                 # Global components (Header, etc)
│   └── motion/                 # Animation wrappers
│
├── lib/
│   ├── utils.ts                # Utilities (cn, etc)
│   └── animations.ts           # Animation variants
│
├── hooks/                      # Global hooks
├── types/                      # Global types
└── services/queries/           # React Query (future)
```

## Conventions

### Colocation

Components used only in a specific route live inside that route:

- `app/(landing)/_components/` - landing components
- `app/(landing)/_hooks/` - landing hooks

Folders prefixed with `_` are ignored by Next.js routing.

### Naming

| Type | Convention | Example |
|------|------------|---------|
| Files | `kebab-case.tsx` | `hero-section.tsx` |
| Components | `PascalCase` | `HeroSection` |
| Hooks | `use-name.ts` | `use-scroll.ts` |
| Variables/Functions | `camelCase` | `handleClick` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_URL` |

### Imports

Path alias configured: `@/` points to `src/`

```tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

## Design System

Uses CSS variables for theming. Base components from shadcn/ui with Tailwind CSS 4.

### Colors

- `bg-background`, `text-foreground` - Base colors
- `bg-primary`, `text-primary-foreground` - Primary actions
- `bg-muted`, `text-muted-foreground` - Subtle elements
- `border-border` - Borders

### Typography

- Tailwind's default type scale
- `font-variant-numeric: tabular-nums` for numbers

## License

MIT
