# StoreLaunch: Launch Service for New Shopify Stores

Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase (Postgres, Auth, Storage, RLS) + Vercel.

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in secrets (`openssl rand -hex 32` for `ENCRYPTION_KEY`).
3. Apply database schema: `supabase db push` (runs `supabase/migrations/0001_init_storelaunch.sql`).
4. Seed ~40 channels: `psql $DATABASE_URL -f supabase/seed.sql`.
5. Run verification tests: `npm run test:verify`.
6. Start dev server: `npm run dev`.
