# BugLess CLI

AI-powered code review directly in your terminal.

## Stack

- **Runtime:** Node.js 18+
- **UI:** Ink (React for CLI)
- **Git:** simple-git
- **Validation:** Zod
- **Config:** conf

## Installation

```bash
cd cli

# Install dependencies
npm install

# Build
npm run build

# Link globally
npm link

# Now 'bugless' is available globally
bugless
```

## Quick Start

```bash
# Copy environment variables
cp .env.example .env

# Interactive mode
bugless

# Review against a branch
bugless -b main

# Review uncommitted changes
bugless -u
```

## Environment Variables

```env
# Backend API URL
BUGLESS_API_URL=http://localhost:3000

# Frontend URL (for browser-based login)
BUGLESS_WEB_URL=http://localhost:3001

# Development mode (uses mock API for reviews)
BUGLESS_USE_MOCK=true
```

## Usage

### Interactive Mode

```bash
bugless
```

Opens an interactive menu to select what to review.

### Direct Commands

```bash
# Review against a branch (PR style)
bugless -b main
bugless --branch develop

# Review uncommitted changes
bugless -u
bugless --uncommitted

# Review a specific commit
bugless -c abc1234
bugless --commit abc1234

# Custom review with instructions
bugless -x
bugless --custom
```

### Review Presets

```bash
# Use a specific preset
bugless -b main -p security
bugless -u --preset performance

# Available presets:
# - standard     Balanced review (default)
# - security     Focus on vulnerabilities
# - performance  Focus on efficiency
# - quick        Critical issues only
# - thorough     Comprehensive analysis
```

### Authentication

```bash
# Login (opens browser)
bugless login

# Logout
bugless logout
```

### Configuration

```bash
# Set API key (for backend integration)
bugless config --api-key <key>

# Set API URL
bugless config --api-url <url>

# Show current config
bugless config --show
```

## Scripts

```bash
npm run dev       # Watch mode (tsx watch)
npm run build     # Build for production (tsup)
npm run start     # Run built version
npm run typecheck # Type check
npm run lint      # Run ESLint
```

## Project Structure

```
cli/
├── src/
│   ├── index.tsx       # Entry point
│   ├── app.tsx         # Main app component
│   ├── modes/          # Review modes
│   │   ├── branch.tsx
│   │   ├── uncommitted.tsx
│   │   ├── commit.tsx
│   │   └── custom.tsx
│   ├── components/     # UI components
│   ├── services/       # Git, API, config services
│   ├── hooks/          # React hooks
│   ├── types/          # TypeScript types
│   ├── schemas/        # Zod schemas
│   ├── prompts/        # Review prompts and presets
│   └── utils/          # Utility functions
├── dist/               # Built output
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Review Modes

| Mode | Flag | Description |
|------|------|-------------|
| Branch | `-b, --branch` | Compare current branch against target |
| Uncommitted | `-u, --uncommitted` | Review unstaged/staged changes |
| Commit | `-c, --commit` | Review a specific commit |
| Custom | `-x, --custom` | Paste code and custom instructions |

## Architecture

```
┌─────────────────────────────────┐
│           CLI (Ink)             │
├─────────────────────────────────┤
│  ┌─────────┐    ┌────────────┐  │
│  │  Modes  │───▶│ Components │  │
│  └────┬────┘    └────────────┘  │
│       │                         │
│  ┌────▼────┐    ┌────────────┐  │
│  │ Services│───▶│   Hooks    │  │
│  └────┬────┘    └────────────┘  │
└───────┼─────────────────────────┘
        │
        ▼
┌───────────────┐     ┌──────────────┐
│  simple-git   │     │  Backend API │
└───────────────┘     └──────────────┘
```

## Development

### Mock Mode

Set `BUGLESS_USE_MOCK=true` in `.env` to use mock data for reviews. Authentication always uses the real API.

### Building

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Test the built CLI
npm start
```

## License

MIT
