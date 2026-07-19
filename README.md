# PasteMon

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)

> A modern Pokemon Showdown team sharing platform. Paste your team, get a beautiful visual preview, and share with a unique link.

## Features

- **Paste & Preview** — Paste Showdown exports and see your team with animated sprites, EV bars, moves, and items
- **Shareable Links** — Save teams and get a unique URL to share anywhere
- **Browse & Discover** — Explore public team pastes from the community
- **Copy Export** — Re-export your team back to Showdown format in one click
- **Live Preview** — Team renders in real-time as you type
- **View Counter** — See how many times a paste has been viewed
- **Dark Mode** — Sleek dark-first design with glassmorphism

## Tech Stack

| | |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL via [Prisma 7](https://www.prisma.io/) + driver adapter |
| **Pokemon Data** | [@pkmn/sets](https://github.com/pkmn/ps) — Showdown paste parser |
| **Container** | Docker + Docker Compose |

---

## Quick Start

### Prerequisites

- Node.js 20+
- A PostgreSQL database (local or cloud — see options below)

### 1. Clone & install

```bash
git clone https://github.com/TurboRx/PasteMon.git
cd PasteMon
npm install
```

### 2. Configure your database

```bash
cp .env.example .env
```

Edit `.env` and set your connection string:

```env
DATABASE_URL="postgresql://user:password@host:5432/pastemon?sslmode=require"
```

**Free cloud PostgreSQL (no local setup needed):**

| Provider | Free Tier | Notes |
|---|---|---|
| [Neon](https://neon.tech) | 0.5 GB | Serverless, scales to zero |
| [Supabase](https://supabase.com) | 500 MB | Full Postgres with extras |
| [Railway](https://railway.app) | $5 credit/month | Easy, deploy app alongside DB |

**Local with Docker:**

```bash
# Start a local PostgreSQL instance
docker run -d \
  --name pastemon-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pastemon \
  -p 5432:5432 \
  postgres:16-alpine

# Then set in .env:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pastemon"
```

### 3. Set up the schema & run

```bash
npx prisma db push   # Apply schema to the database
npm run dev          # Start development server
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Vercel (recommended)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add `DATABASE_URL` in **Project Settings → Environment Variables**
4. Deploy

Vercel builds and serves the Next.js app natively — no extra config needed.

### Docker / Self-Hosted

The repo ships with a `Dockerfile` and `docker-compose.yml` for full self-hosting.

**Option A — Docker Compose (app + database together):**

```bash
# Start everything
docker compose up -d

# First time only: apply the schema
docker compose exec app npx prisma db push

# View logs
docker compose logs -f app
```

The app is now running at [http://localhost:3000](http://localhost:3000).

**Option B — Docker with an external database:**

```bash
docker build -t pastemon .

docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/pastemon" \
  pastemon
```

### Railway

1. Create a new project and add a **PostgreSQL** service
2. Copy the connection string from the PostgreSQL service dashboard
3. Add a new service from your GitHub repo
4. Set `DATABASE_URL` in the service's environment variables
5. Deploy

### Render

1. Create a new **PostgreSQL** database on Render
2. Create a new **Web Service** from your GitHub repo
3. Set the build command: `npm install && npx prisma generate && npm run build`
4. Set the start command: `npm start`
5. Add `DATABASE_URL` as an environment variable
6. Deploy

### Fly.io

```bash
fly launch
fly postgres create
fly postgres attach <postgres-app-name>
fly deploy
```

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Yes |

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run db:push` | Apply schema to the database |
| `npm run db:migrate` | Run Prisma migrations (production) |
| `npm run db:studio` | Open Prisma Studio (database GUI) |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
PasteMon/
├── app/
│   ├── api/paste/          # REST API — create & list pastes
│   │   └── [id]/           # REST API — get & delete by ID
│   ├── browse/             # Browse public pastes
│   ├── new/                # Create new paste
│   ├── paste/[id]/         # Paste detail view
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Homepage
├── components/
│   ├── PasteForm.tsx       # Paste creation form with live preview
│   ├── PokemonCard.tsx     # Individual Pokemon card with stats
│   └── TeamPreview.tsx     # Full team grid
├── lib/
│   ├── db.ts               # Prisma client (PostgreSQL driver adapter)
│   └── pokemon.ts          # Showdown paste parser + sprite helpers
├── prisma/
│   └── schema.prisma       # Database schema
├── prisma.config.ts        # Prisma 7 CLI configuration
├── Dockerfile              # Multi-stage production Docker image
├── docker-compose.yml      # App + PostgreSQL for local self-hosting
├── next.config.ts
└── .env.example
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and commit: `git commit -m "feat: add my feature"`
4. Push and open a pull request

---

## License

MIT — see [LICENSE](LICENSE) for details.
