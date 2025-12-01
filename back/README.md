# BugLess Backend

REST API for BugLess - handles authentication, code submissions, AI-powered reviews, and GitHub App integration.

## Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 5
- **Database:** PostgreSQL + Prisma ORM
- **Queue:** Redis + BullMQ
- **AI:** Google Generative AI (Gemini)
- **GitHub:** Octokit + GitHub App

## Quick Start

```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start PostgreSQL and Redis
docker-compose up -d

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database (optional)
npm run prisma:seed

# Start development server
npm run dev
```

## Environment Variables

```env
# Server
PORT=3000
FRONTEND_URL=http://localhost:3001

# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=bugless
POSTGRES_PORT=5432
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/bugless

# Redis (for BullMQ)
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CLI Session
CLI_SESSION_EXPIRY_MINUTES=10

# Google AI
GOOGLE_API_KEY=your-google-ai-api-key

# GitHub App (optional - for PR reviews)
GITHUB_APP_ID=123456
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your-webhook-secret
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/cli/session` | Create CLI session |
| GET | `/auth/cli/session/:id` | Check CLI session status |
| POST | `/auth/cli/session/:id/complete` | Complete CLI session |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | List user projects |
| POST | `/projects` | Create project |
| GET | `/projects/:id` | Get project details |
| PUT | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### Submissions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/submissions` | Create code review submission |
| GET | `/submissions/:id` | Get submission with review |
| GET | `/submissions/:id/stream` | SSE stream for review progress |

### Status

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/status-submissions` | List submission statuses |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhooks/github` | GitHub App webhook receiver |

## Project Structure

```
back/
├── server.ts              # Entry point
├── docker-compose.yaml    # PostgreSQL + Redis
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Migration files
│   └── seed.ts            # Seed data
├── src/
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── database/          # Database connection
│   ├── generated/         # Prisma generated client
│   ├── middleware/        # Auth, validation middleware
│   ├── providers/         # External services (AI, GitHub)
│   ├── routes/            # API routes
│   ├── schemas/           # Zod validation schemas
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   └── workers/           # BullMQ workers
└── docs/
    └── GITHUB_APP_SETUP.md
```

## Database Schema

### Main Models

- **User**: Authentication and profile
- **Project**: Code projects with custom instructions
- **Submission**: Code submitted for review
- **Review**: AI-generated review results
- **CliSession**: Browser-based CLI authentication
- **GitHubInstallation**: GitHub App installations
- **GitHubPullRequest**: PR tracking for automatic reviews

### Submission Modes

| Mode | Description |
|------|-------------|
| `PR_DIFF` | Review changes between branches |
| `UNCOMMITTED` | Review unstaged changes |
| `COMMIT` | Review a specific commit |
| `CUSTOM` | Review custom code snippet |

## Scripts

```bash
npm run dev              # Start with hot reload (tsx watch)
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:migrate   # Create and run migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Push schema to database
npm run prisma:seed      # Seed database with initial data
```

## Docker Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset data
docker-compose down -v
```

## GitHub App Integration

For automatic PR reviews, configure a GitHub App. See [GITHUB_APP_SETUP.md](docs/GITHUB_APP_SETUP.md).

### Local Development with Smee

```bash
# Install smee client
npm install -g smee-client

# Start proxy (replace with your channel URL)
smee -u https://smee.io/YOUR_CHANNEL -t http://localhost:3000/webhooks/github
```

## Architecture

```
                    ┌─────────────────┐
                    │   GitHub PR     │
                    └────────┬────────┘
                             │ webhook
                             ▼
┌─────────┐         ┌─────────────────┐         ┌─────────────┐
│   CLI   │────────▶│  Express API    │────────▶│  PostgreSQL │
└─────────┘         └────────┬────────┘         └─────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     BullMQ      │
                    │  (Redis Queue)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Review Worker  │
                    │   (Google AI)   │
                    └─────────────────┘
```

## License

MIT
