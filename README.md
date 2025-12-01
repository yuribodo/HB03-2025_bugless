# BugLess

AI-powered code review tool focused on TypeScript. Get instant, intelligent feedback on your code through CLI, GitHub integration, or web interface.

## Overview

BugLess helps developers catch bugs, improve code quality, and maintain best practices through automated AI-powered code reviews. It supports multiple review modes and integrates seamlessly into your development workflow.

### Key Features

- **CLI Tool**: Review code directly from your terminal
- **GitHub App Integration**: Automatic reviews on Pull Requests
- **Multiple Review Modes**: PR diffs, uncommitted changes, specific commits, or custom code
- **Review Presets**: Standard, security, performance, quick, or thorough analysis
- **Real-time Streaming**: Watch reviews as they're generated

## Project Structure

```
bugless/
├── back/       # Backend API (Express + Prisma + BullMQ)
├── cli/        # Command-line interface (Ink + React)
├── front/      # Landing page (Next.js 16)
└── docs/       # Documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker & Docker Compose (for backend services)

### 1. Clone the Repository

```bash
git clone https://github.com/ProgramadoresSemPatria/HB03-2025_bugless.git
cd HB03-2025_bugless
```

### 2. Backend Setup

```bash
cd back

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL and Redis
docker-compose up -d

# Install dependencies
npm install

# Run migrations
npm run prisma:migrate

# Start the server
npm run dev
```

### 3. CLI Setup

```bash
cd cli

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Build and link globally
npm run build
npm link

# Use the CLI
bugless
```

### 4. Frontend Setup

```bash
cd front

# Copy environment variables
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Environment Variables

### Backend (`back/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_PORT` | Redis port |
| `REDIS_PASSWORD` | Redis password |
| `JWT_SECRET` | Secret for JWT tokens |
| `GOOGLE_API_KEY` | Google AI API key for code reviews |
| `GITHUB_APP_ID` | GitHub App ID (for PR reviews) |
| `GITHUB_PRIVATE_KEY` | GitHub App private key |
| `GITHUB_WEBHOOK_SECRET` | Webhook signature secret |

### CLI (`cli/.env`)

| Variable | Description |
|----------|-------------|
| `BUGLESS_API_URL` | Backend API URL |
| `BUGLESS_WEB_URL` | Frontend URL (for login) |
| `BUGLESS_USE_MOCK` | Use mock data for development |

### Frontend (`front/.env`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

## GitHub App Setup

To enable automatic PR reviews, configure the GitHub App. See [GitHub App Setup Guide](back/docs/GITHUB_APP_SETUP.md).

For local development with webhooks, use smee.io:

```bash
npm install -g smee-client
smee -u https://smee.io/YOUR_CHANNEL -t http://localhost:3000/webhooks/github
```

## Tech Stack

| Component | Technologies |
|-----------|--------------|
| **Backend** | Express 5, Prisma, PostgreSQL, Redis, BullMQ, Google AI |
| **CLI** | TypeScript, Ink, React, simple-git |
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4, Framer Motion |

## Scripts Reference

### Backend

```bash
npm run dev              # Start with hot reload
npm run prisma:studio    # Open Prisma Studio
npm run prisma:migrate   # Run migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:seed      # Seed database
```

### CLI

```bash
npm run dev       # Watch mode
npm run build     # Build for production
npm run start     # Run built version
npm run typecheck # Type check
```

### Frontend

```bash
pnpm dev    # Development server
pnpm build  # Production build
pnpm start  # Start production server
pnpm lint   # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

Copyright (c) 2025 Borderless Coding
