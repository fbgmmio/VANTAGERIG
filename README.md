# SWING PRO — Landing Page

Bloomberg terminal-style early access landing page for Swing Pro. Collects
email addresses from interested traders before launch.

## Setup

```bash
cd swing-landing
npm install
cp .env.example .env.local
# Edit .env.local and set ADMIN_SECRET
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_SECRET` | Yes | Password for the `/admin` panel |
| `NOTIFY_WEBHOOK_URL` | No | Slack/Discord webhook URL for new signups |

## Admin Panel

Visit `/admin` with any username and your `ADMIN_SECRET` as the password.
The JSON export is at `/api/admin/emails`.

Email data is stored in `data/emails.json` (gitignored — back it up).

## Deployment

### Self-hosted (recommended)

```bash
npm run build
npm run start
# or: PM2 / systemd to keep it running
```

Serve behind nginx/Caddy with HTTPS. Set `ADMIN_SECRET` in your environment.

### Vercel

The file-based storage **does not persist** on Vercel's serverless functions.
To deploy on Vercel, swap `src/lib/emails.ts` for one of these backends:

- **Vercel KV** (Redis) — `@vercel/kv`, free hobby tier
- **Neon** (Postgres) — `@neondatabase/serverless`, free tier
- **Turso** (SQLite edge) — `@libsql/client`, free tier

The rest of the app (UI, middleware, API shape) stays identical.

## Security

- Admin protected with HTTP Basic Auth (middleware, constant-time compare)
- Rate limited: 3 submissions per IP per minute
- Email validated server-side, length-capped at 254 chars
- Duplicate submissions return success (avoids email enumeration)
- `data/` and `.env` are gitignored by default
