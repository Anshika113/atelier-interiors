/**
 * Atelier Interiors — API Worker.
 *
 * Replaces backend/app.py. Same routes, same request/response shapes, so the
 * React frontend works unchanged (api.js falls back to API_BASE = '/api').
 *
 * Storage is D1 (binding: DB) instead of a local SQLite file.
 * Static assets are served by Cloudflare directly; this Worker only runs for
 * /api/* (see run_worker_first in wrangler.jsonc).
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

const now = () => new Date().toISOString();

// Trim + coerce to string, so a missing or non-string field can't blow up.
const s = (v) => (typeof v === 'string' ? v.trim() : v == null ? '' : String(v).trim());

function validateContact({ name, phone, message, email }, needMessage = true) {
  const errors = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.';
  if (email && !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (needMessage && !message) errors.message = 'Please add a short message.';
  return errors;
}

const invalid = (errors) =>
  json({ ok: false, errors, message: 'Please check the highlighted fields.' }, 400);

async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

// --- Route handlers ---------------------------------------------------------

async function consultation(request, env) {
  const b = await readJson(request);
  const f = {
    name: s(b.name),
    email: s(b.email),
    phone: s(b.phone),
    project_type: s(b.project_type),
    property_size: s(b.property_size),
    area_sqft: s(b.area_sqft),
    budget: s(b.budget),
    timeline: s(b.timeline),
    preferred_date: s(b.preferred_date),
    message: s(b.message),
    estimate: s(b.estimate),
    source: s(b.source) || 'book-page',
  };

  const errors = validateContact(f, false);
  if (Object.keys(errors).length) return invalid(errors);

  const res = await env.DB.prepare(
    `INSERT INTO consultations
       (name, email, phone, project_type, property_size, area_sqft, budget,
        timeline, preferred_date, message, estimate, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      f.name, f.email, f.phone, f.project_type, f.property_size, f.area_sqft,
      f.budget, f.timeline, f.preferred_date, f.message, f.estimate, f.source, now()
    )
    .run();

  return json(
    {
      ok: true,
      id: res.meta.last_row_id,
      message:
        'Thank you! Your consultation request is booked — our design team will confirm within 24 hours.',
    },
    201
  );
}

async function enquiry(request, env) {
  const b = await readJson(request);
  const f = {
    name: s(b.name),
    email: s(b.email),
    phone: s(b.phone),
    message: s(b.message),
    source: s(b.source) || 'contact-page',
  };

  const errors = validateContact(f, true);
  if (Object.keys(errors).length) return invalid(errors);

  const res = await env.DB.prepare(
    `INSERT INTO enquiries (name, email, phone, message, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(f.name, f.email, f.phone, f.message, f.source, now())
    .run();

  return json(
    {
      ok: true,
      id: res.meta.last_row_id,
      message: "Thanks! We've received your message and will reply shortly.",
    },
    201
  );
}

async function subscribe(request, env) {
  const email = s((await readJson(request)).email);
  if (!EMAIL_RE.test(email)) {
    return json(
      { ok: false, errors: { email: 'Please enter a valid email.' }, message: 'Please enter a valid email.' },
      400
    );
  }

  // INSERT OR IGNORE => re-subscribing is a no-op, not an error.
  await env.DB.prepare('INSERT OR IGNORE INTO subscribers (email, created_at) VALUES (?, ?)')
    .bind(email, now())
    .run();

  return json({ ok: true, message: "You're subscribed — thank you!" });
}

async function listConsultations(request, env) {
  // Read endpoint — gate it behind ADMIN_TOKEN if the secret is set.
  if (env.ADMIN_TOKEN) {
    const auth = request.headers.get('Authorization') || '';
    if (auth !== `Bearer ${env.ADMIN_TOKEN}`) {
      return json({ ok: false, message: 'Unauthorized' }, 401);
    }
  }
  const { results } = await env.DB.prepare(
    'SELECT * FROM consultations ORDER BY id DESC LIMIT 200'
  ).all();
  return json({ count: results.length, consultations: results });
}

// --- Entry point ------------------------------------------------------------

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const method = request.method.toUpperCase();

    try {
      if (pathname === '/api/health' && method === 'GET') {
        return json({ status: 'ok', service: 'atelier-interiors', time: now() });
      }
      if (pathname === '/api/consultation' && method === 'POST') return consultation(request, env);
      if (pathname === '/api/enquiry' && method === 'POST') return enquiry(request, env);
      if (pathname === '/api/subscribe' && method === 'POST') return subscribe(request, env);
      if (pathname === '/api/consultations' && method === 'GET') return listConsultations(request, env);

      if (pathname.startsWith('/api/')) {
        return json({ ok: false, message: 'Not found' }, 404);
      }

      // Anything non-/api that reaches the Worker: hand back to static assets.
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error('API error:', err && err.stack ? err.stack : err);
      return json({ ok: false, message: 'Something went wrong. Please try again.' }, 500);
    }
  },
};
