# Veloura Beauty

Veloura is a full-stack cosmetics e-commerce application with a modern
storefront, product search, persisted reviews, cart and wishlist management,
checkout reservations, order tracking, and an admin dashboard.

## Stack

- Next.js 16, React 19, Tailwind CSS, TanStack Query
- Express, TypeScript, Zod
- PostgreSQL
- Cookie-based JWT authentication

## Local Setup

Requirements: Node.js 22+, npm, and PostgreSQL.

```bash
git clone https://github.com/ItzDoctorMine/e-com.git
cd e-com

cd server
cp .env.example .env
npm ci
npm run db:init
npm run dev
```

In another terminal:

```bash
cd client
cp .env.example .env.local
npm ci
npm run dev
```

The storefront runs at `http://localhost:3000` and proxies `/api/*` requests to
the API at `http://localhost:3001`.

## Environment Variables

Client:

- `NEXT_PUBLIC_API_URL`: browser API base path; keep `/api` when using the proxy
- `NEXT_PUBLIC_SITE_URL`: public storefront URL used for SEO and canonical URLs
- `API_URL`: server-side API URL and proxy destination

Server:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: long random signing secret
- `JWT_EXPIRES_IN`: token lifetime, such as `7d`
- `NODE_ENV`: `development` or `production`
- `PORT`: API port

Never commit real `.env` files or production secrets.

## Verification

```bash
cd client
npm run lint
npm run build

cd ../server
npm run typecheck
npm run build
```

## Deployment

### API and Database on Render

1. Create a Render Blueprint from this repository using `render.yaml`.
2. The blueprint runs `npm run db:init` before each deployment to apply the
   idempotent database schema.
3. Copy the deployed API URL for the client configuration.

### Client on Vercel

1. Import this repository and set the project root directory to `client`.
2. Add:
   - `API_URL=https://your-api.example.com`
   - `NEXT_PUBLIC_API_URL=/api`
   - `NEXT_PUBLIC_SITE_URL=https://your-store.example.com`
3. Deploy.

The same-origin `/api` rewrite keeps authentication cookies on the storefront
domain. Production cookies are secure automatically when `NODE_ENV=production`.

## SEO

The app includes route metadata, canonical URLs, Open Graph and Twitter cards,
organization structured data, a web manifest, `robots.txt`, and a dynamic
product-aware sitemap.
