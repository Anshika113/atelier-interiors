# Atelier Interiors — Premium Demo

A demo of the **Premium package**: a **business-growth website** for an interior
design studio.

**Live:** https://atelier-interior.anshikami7890.workers.dev/

---

## What this is

| | |
|---|---|
| **Package** | Premium — *"A conversion-focused website to support business growth."* |
| **Frontend** | React 18 + React Router 6 (Vite 5) |
| **Backend** | Cloudflare Worker (JavaScript) |
| **Database** | Cloudflare D1 (consultations, enquiries, subscribers) |
| **Hosting** | Cloudflare Workers — static assets and API in a single deploy |

The frontend and the API are served from the same origin, so there is no CORS
setup and no `VITE_API_URL` to configure. Static files are served straight from
Cloudflare's edge; the Worker only runs for `/api/*`.

### Pages (15 fixed pages)
Home · About · Services · **6 service landing pages** (`/services/:slug`) ·
Process · Portfolio · Testimonials (Reviews) · Journal (Blog) · Book Consultation ·
Contact.
That's **15 fixed pages**; the **blog posts** (`/blog/:slug`) are Blog/CMS content
on top. (FAQ is a section on Contact.)

### Premium-tier features included
- **Premium UI/UX** — Fraunces + Jost, scroll animations, dark process section
- **Advanced landing pages** — each service page follows *image → description →
  process → CTA → consultation form*
- **Booking / enquiry workflow** — a 3-step consultation wizard with a progress
  stepper and a success state → stored in D1
- **Custom functionality** — an interactive **cost estimator** (space × package ×
  area → live budget range)
- **Blog / CMS** — a Journal with a featured post, grid and full article pages
- **Advanced portfolio** — filterable projects with lightbox
- **Advanced forms & lead capture** — consultation, per-service callback forms,
  general enquiry, and newsletter — all persisted
- **Conversion-focused CTAs** throughout; **WhatsApp/Call** everywhere
- **Advanced SEO** — meta + Open Graph, JSON-LD structured data, Search Console
  slot; **GA4 (conversion tracking)** snippet slot in `index.html`
- Advanced image/speed optimization (lazy-loaded, sized images; Vite build)

---

## Project structure

```
atelier-interiors/
├─ wrangler.jsonc       Worker name, static-assets config, D1 binding
├─ schema.sql           D1 tables (consultations, enquiries, subscribers)
├─ worker/
│  └─ index.js          The API: /api/consultation, /api/enquiry, /api/subscribe,
│                       /api/consultations, /api/health
├─ backend/             Legacy FastAPI version — kept for reference, not deployed
│  ├─ app.py
│  └─ requirements.txt
└─ frontend/
   ├─ index.html        SEO, JSON-LD, GA4 + Search Console slots
   ├─ download-images.js
   ├─ public/images/    Drop your photos here (see images/README.md)
   └─ src/
      ├─ data.js        ⭐ All content — business, services, projects, blog, estimator, booking
      ├─ api.js         consultation / enquiry / subscribe helpers
      ├─ components/    Navbar · Footer · FloatingButtons · SmartImage · Lightbox · Reveal · Estimator
      └─ pages/         Home · About · Services · ServiceDetail · Process · Portfolio · Testimonials · Blog · BlogPost · Book · Contact
```

---

## The API

Served by `worker/index.js` at the same origin as the site.

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/consultation` | Booking workflow — store a consultation request |
| `POST` | `/api/enquiry` | General / per-service enquiry |
| `POST` | `/api/subscribe` | Newsletter sign-up |
| `GET`  | `/api/consultations` | List booked consultations (see below) |
| `GET`  | `/api/health` | Health check |

Successful writes return `201` with `{ ok, id, message }`. Validation failures
return `400` with `{ ok: false, errors: { field: "..." } }`, which the forms render
inline against the offending field.

`GET /api/consultations` returns your leads, so it is gated behind a bearer token
when one is configured:

```bash
npx wrangler secret put ADMIN_TOKEN
```

With the secret set, the endpoint requires `Authorization: Bearer <token>`.
Without it, the endpoint is public — set it before go-live.

---

## Running locally

**Frontend only (fastest for UI work):**

```bash
cd frontend
npm install
npm run dev          # http://localhost:5175
```

Vite proxies `/api` to `http://localhost:8787`, so run `npx wrangler dev` in a
second terminal to have the API answer.

**Full stack, closest to production:**

```bash
cd frontend && npm install && npm run build && cd ..
npx wrangler dev     # http://localhost:8787 — site + API against a local D1
```

Rebuild the frontend after each change in this mode. To seed the local database:

```bash
npx wrangler d1 execute atelier-interiors --file=./schema.sql
```

(Omitting `--remote` targets the local dev copy.)

---

## Deploying

First time only — create the database and paste the printed `database_id` into
`wrangler.jsonc`:

```bash
npx wrangler login
npx wrangler d1 create atelier-interiors
npx wrangler d1 execute atelier-interiors --remote --file=./schema.sql
```

Every deploy after that:

```bash
cd frontend && npm run build && cd ..
npx wrangler deploy
```

Requires Wrangler 4.20+ — the `run_worker_first` array form in `wrangler.jsonc` is
ignored silently on older versions, which makes `/api/*` fall through to the SPA
and return HTML instead of JSON.

Verify:

```bash
curl https://atelier-interior.anshikami7890.workers.dev/api/health
npx wrangler d1 execute atelier-interiors --remote \
  --command "SELECT id, name, phone, created_at FROM consultations ORDER BY id DESC LIMIT 5"
```

`npx wrangler tail` streams live Worker logs if a form submission doesn't land.

---

## Customising

- **All content** (business, services + landing pages, projects, blog posts,
  testimonials, FAQs, estimator rates, booking options) → **`frontend/src/data.js`**
- **Colours & fonts** → `:root` in **`frontend/src/styles.css`**
- **SEO / Analytics / Search Console** → **`frontend/index.html`**
- **Photos** → `node download-images.js`, or drop files into `frontend/public/images/`

> Sample phone, WhatsApp, email, address and map are placeholders — update before
> go-live, along with the Search Console verification code in `index.html`.

---

## Tech notes
- React 18 + React Router 6 (dynamic `/services/:slug` and `/blog/:slug`), Vite 5
- Cloudflare Workers + D1; no server to run, no Python host required
- D1 is SQLite-compatible, so `schema.sql` is the same shape as the original
  `backend/studio.db`
- No paid services required to run or deploy the demo (Workers and D1 free tiers)
