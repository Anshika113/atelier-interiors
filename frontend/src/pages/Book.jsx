import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectTypes, propertySizes, budgetRanges, timelines, business, whatsappLink } from '../data.js'
import { bookConsultation } from '../api.js'

const steps = ['Project', 'Schedule', 'Your details']
const empty = {
  project_type: '', property_size: '', area_sqft: '', budget: '', timeline: '',
  preferred_date: '', message: '', name: '', email: '', phone: '',
}

export default function Book() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [errors, setErrors] = useState({})

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' }); setErrors({})
    try {
      const res = await bookConsultation({ ...form, source: 'book-page' })
      setStatus({ state: 'success', msg: res.message })
      setForm(empty)
    } catch (err) {
      setErrors(err.fieldErrors || {}); setStatus({ state: 'error', msg: err.message })
      if (err.fieldErrors?.name || err.fieldErrors?.phone) setStep(2)
    }
  }

  if (status.state === 'success') {
    return (
      <section className="section">
        <div className="container">
          <div className="card booked">
            <span className="booked__tick">✓</span>
            <h1>Consultation requested</h1>
            <p>{status.msg}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/portfolio">Browse our work</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">Message us on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Free consultation</span>
          <h1>Book your consultation</h1>
          <p>Tell us about your project in three quick steps. It’s free, and there’s no obligation.</p>
        </div>
      </section>

      <section className="section">
        <div className="container book">
          {/* Progress */}
          <ol className="stepper">
            {steps.map((label, i) => (
              <li key={label} className={`stepper__item ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}>
                <span className="stepper__no">{i < step ? '✓' : i + 1}</span>
                <span className="stepper__label">{label}</span>
              </li>
            ))}
          </ol>

          <form className="card book__form" onSubmit={onSubmit} noValidate>
            {status.state === 'error' && <div className="alert alert--err">{status.msg}</div>}

            {step === 0 && (
              <div className="book__step">
                <h2>About your project</h2>
                <div className="field-row">
                  <div className="field"><label>Project type</label>
                    <select name="project_type" value={form.project_type} onChange={update}>
                      <option value="">Select…</option>{projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Property size</label>
                    <select name="property_size" value={form.property_size} onChange={update}>
                      <option value="">Select…</option>{propertySizes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field-row">
                  <div className="field"><label>Approx. area (sq ft)</label><input name="area_sqft" type="number" min="0" value={form.area_sqft} onChange={update} placeholder="e.g. 900" /></div>
                  <div className="field"><label>Budget</label>
                    <select name="budget" value={form.budget} onChange={update}>
                      <option value="">Select…</option>{budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="book__nav"><span /><button type="button" className="btn btn--primary" onClick={next}>Continue</button></div>
              </div>
            )}

            {step === 1 && (
              <div className="book__step">
                <h2>Timeline &amp; details</h2>
                <div className="field-row">
                  <div className="field"><label>When do you want to start?</label>
                    <select name="timeline" value={form.timeline} onChange={update}>
                      <option value="">Select…</option>{timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="field"><label>Preferred consultation date</label><input name="preferred_date" type="date" value={form.preferred_date} onChange={update} /></div>
                </div>
                <div className="field"><label>Anything else?</label><textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Style you love, must-haves, links…" /></div>
                <div className="book__nav"><button type="button" className="btn btn--ghost" onClick={back}>Back</button><button type="button" className="btn btn--primary" onClick={next}>Continue</button></div>
              </div>
            )}

            {step === 2 && (
              <div className="book__step">
                <h2>Your details</h2>
                <div className="field-row">
                  <div className="field"><label>Name *</label><input name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="err">{errors.name}</small>}</div>
                  <div className="field"><label>Phone *</label><input name="phone" value={form.phone} onChange={update} placeholder="98xxxxxxxx" />{errors.phone && <small className="err">{errors.phone}</small>}</div>
                </div>
                <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />{errors.email && <small className="err">{errors.email}</small>}</div>
                <p className="book__summary">Project: <strong>{form.project_type || '—'}</strong> · Size: <strong>{form.property_size || '—'}</strong> · Budget: <strong>{form.budget || '—'}</strong></p>
                <div className="book__nav"><button type="button" className="btn btn--ghost" onClick={back}>Back</button><button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Booking…' : 'Confirm booking'}</button></div>
              </div>
            )}
          </form>

          <aside className="book__side">
            <div className="card">
              <h3>Prefer to talk?</h3>
              <ul className="contact__list">
                <li><a href={`tel:${business.phone}`}>📞 {business.phoneDisplay}</a></li>
                <li><a href={whatsappLink()} target="_blank" rel="noreferrer">💬 WhatsApp</a></li>
                <li><a href={`mailto:${business.email}`}>✉️ {business.email}</a></li>
              </ul>
            </div>
            <div className="card book__reassure">
              <p>✓ Free, no-obligation consultation</p>
              <p>✓ 3D visuals before any work starts</p>
              <p>✓ Transparent, itemised quotes</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
