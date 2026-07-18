# PasteMon

> A modern Pokemon Showdown team paste and sharing platform.

PasteMon lets you paste your Pokemon Showdown team exports and instantly get a beautiful visual preview with sprites, stats, moves, and more. Save your team with a unique shareable URL and browse public teams from the community.

![PasteMon](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss) ![Prisma](https://img.shields.io/badge/Prisma_7-SQLite-2D3748?style=flat-square&logo=prisma)

## Features

- 📝 **Paste & Parse** — Paste Showdown team exports and get instant visual previews
- 🎨 **Beautiful UI** — Dark-mode-first design with animated sprites, stat bars, and glassmorphism
- 🔗 **Shareable Links** — Save teams and get unique URLs to share anywhere
- 🗄️ **Database Storage** — Prisma ORM with SQLite (swap to PostgreSQL for production)
- 🌐 **Browse Teams** — Explore public team pastes from the community
- 📋 **Copy Export** — Re-export teams back to Showdown format
- ⚡ **Live Preview** — See your team rendered as you type
- 👁️ **View Counter** — Track how many times a paste has been viewed
- 🔒 **Security Headers** — X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- 🚀 **Vercel Ready** — Deploy to Vercel out of the box

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [Prisma 7](https://www.prisma.io/) with SQLite
- **Pokemon Data**: [@pkmn/sets](https://github.com/pkmn/ps) for parsing Showdown team pastes
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/PasteMon.git
cd PasteMon

npm install

cp .env.example .env
npx prisma generate
npx prisma db push

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see PasteMon.

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | Prisma database connection string | `file:./dev.db` |

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:generate` | Regenerate Prisma Client |

## Project Structure

```
PasteMon/
├── app/
│   ├── api/
│   │   └── paste/
│   │       ├── route.ts          # POST + GET (list)
│   │       └── [id]/route.ts     # GET + DELETE
│   ├── browse/page.tsx           # Browse public pastes
│   ├── new/page.tsx              # Create new paste
│   ├── paste/[id]/
│   │   ├── page.tsx              # View paste (server)
│   │   └── PasteDetailClient.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx                  # Homepage
├── components/
│   ├── PasteForm.tsx
│   ├── PokemonCard.tsx
│   └── TeamPreview.tsx
├── lib/
│   ├── db.ts                     # Prisma client singleton
│   └── pokemon.ts                # Showdown paste parser
├── prisma/
│   └── schema.prisma
├── prisma.config.ts              # Prisma 7 config (DB URL)
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Switching to PostgreSQL

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
   }
   ```

2. Update `prisma.config.ts`:
   ```typescript
   datasource: {
     url: process.env.DATABASE_URL || 'postgresql://user:password@host:5432/pastemon',
   }
   ```

3. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/pastemon"
   ```

4. Run migrations:
   ```bash
   npx prisma db push
   ```

## Deploying to Vercel

1. Push your code to GitHub
2. Connect the repo to [Vercel](https://vercel.com)
3. Set the `DATABASE_URL` environment variable (use a hosted PostgreSQL like Supabase, Neon, or PlanetScale)
4. Deploy!

The build script automatically runs `prisma generate` before building.

## License

MIT
