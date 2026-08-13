import { useState } from 'react'
import { Link } from 'react-router-dom'
import { business, faqs, whatsappLink } from '../data.js'
import { submitEnquiry } from '../api.js'

const empty = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [errors, setErrors] = useState({})
  const [openFaq, setOpenFaq] = useState(0)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' }); setErrors({})
    try {
      const res = await submitEnquiry({ ...form, source: 'contact-page' })
      setStatus({ state: 'success', msg: res.message }); setForm(empty)
    } catch (err) {
      setErrors(err.fieldErrors || {}); setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get in touch</span>
          <h1>Let’s talk about your space</h1>
          <p>Send us a message, or book a free consultation — whichever suits you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="card contact__form">
            <h2>Send a message</h2>
            {status.state === 'success' && <div className="alert alert--ok">{status.msg}</div>}
            {status.state === 'error' && <div className="alert alert--err">{status.msg}</div>}
            <form onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="err">{errors.name}</small>}</div>
                <div className="field"><label htmlFor="phone">Phone *</label><input id="phone" name="phone" value={form.phone} onChange={update} placeholder="98xxxxxxxx" />{errors.phone && <small className="err">{errors.phone}</small>}</div>
              </div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" />{errors.email && <small className="err">{errors.email}</small>}</div>
              <div className="field"><label htmlFor="message">Message *</label><textarea id="message" name="message" rows="4" value={form.message} onChange={update} placeholder="How can we help?" />{errors.message && <small className="err">{errors.message}</small>}</div>
              <button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Sending…' : 'Send message'}</button>
            </form>
          </div>

          <aside className="contact__info">
            <div className="card">
              <h3>Visit the studio</h3>
              <ul className="contact__list">
                <li><a href={`tel:${business.phone}`}>📞 {business.phoneDisplay}</a></li>
                <li><a href={whatsappLink()} target="_blank" rel="noreferrer">💬 Chat on WhatsApp</a></li>
                <li><a href={`mailto:${business.email}`}>✉️ {business.email}</a></li>
                <li>📍 {business.address}</li>
                <li>🕒 {business.hours}</li>
              </ul>
              <Link className="btn btn--primary btn--block" to="/book">Book a consultation</Link>
            </div>
            <div className="card map-card">
              <iframe title="Map to Atelier Interiors" src={business.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a className="btn btn--sm btn--ghost" href={business.mapLink} target="_blank" rel="noreferrer">Open in Google Maps</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container faq">
          <div className="faq__list">
            <div className="section__head" style={{ textAlign: 'left', margin: '0 0 1.5rem', maxWidth: 'none' }}>
              <span className="eyebrow">Good to know</span><h2>Frequently asked questions</h2>
            </div>
            {faqs.map(([q, a], i) => {
              const isOpen = openFaq === i
              return (
                <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={q}>
                  <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? -1 : i)}>
                    <span>{q}</span><span className="faq__icon" aria-hidden="true">{isOpen ? '–' : '+'}</span>
                  </button>
                  <div className="faq__a" hidden={!isOpen}><p>{a}</p></div>
                </div>
              )
            })}
          </div>
          <aside className="faq__cta card">
            <h3>Still have a question?</h3>
            <p className="footer__muted">We’re happy to help — reach out and we’ll get right back to you.</p>
            <Link className="btn btn--primary btn--block" to="/book">Book a consultation</Link>
            <a className="btn btn--ghost btn--block" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </aside>
        </div>
      </section>
    </>
  )
}
