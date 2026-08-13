// API helpers. Dev: Vite proxies /api -> http://localhost:5002 (vite.config.js).
// Production: set VITE_API_URL when building.
const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function post(path, payload) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.')
    err.fieldErrors = data.errors || {}
    throw err
  }
  return data
}

export const bookConsultation = (payload) => post('/consultation', payload)
export const submitEnquiry = (payload) => post('/enquiry', payload)
export const subscribe = (email) => post('/subscribe', { email })
