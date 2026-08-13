import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { services, serviceBySlug, whatsappLink } from '../data.js'
import { submitEnquiry } from '../api.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = serviceBySlug(slug)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [errors, setErrors] = useState({})

  if (!s) return <Navigate to="/services" replace />
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3)
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'loading', msg: '' }); setErrors({})
    try {
      const res = await submitEnquiry({ ...form, message: form.message || `Interested in ${s.title}.`, source: `service:${s.slug}` })
      setStatus({ state: 'success', msg: res.message }); setForm({ name: '', phone: '', message: '' })
    } catch (err) {
      setErrors(err.fieldErrors || {}); setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <>
      {/* Image */}
      <section className="detail-hero">
        <div className="detail-hero__media"><SmartImage src={s.image} alt={s.title} className="detail-hero__img" /></div>
        <div className="detail-hero__overlay">
          <div className="container">
            <nav className="crumbs"><Link to="/services">Services</Link> <span>/</span> {s.title}</nav>
            <span className="svc__icon svc__icon--lg">{s.icon}</span>
            <h1>{s.title}</h1>
            <p>{s.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail">
          <Reveal className="detail__main">
            {/* Description */}
            <h2>Overview</h2>
            <p>{s.overview}</p>
            <h2>What’s included</h2>
            <ul className="ticks ticks--2col">{s.highlights.map((hl) => <li key={hl}>{hl}</li>)}</ul>
            {/* Process */}
            <h2>Our process</h2>
            <div className="proc">
              {s.process.map(([t, d], i) => (
                <div className="proc__step" key={t}><span className="proc__no">{i + 1}</span><div><h4>{t}</h4><p>{d}</p></div></div>
              ))}
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal as="aside" className="detail__side card" delay={100}>
            <span className="detail__price">{s.priceFrom}</span>
            <p className="footer__muted">Every project is bespoke — book a consultation for an exact, itemised quote.</p>
            <Link className="btn btn--primary btn--block" to="/book">Book a consultation</Link>
            <a className="btn btn--ghost btn--block" href={whatsappLink(`Hi, I'd like to discuss ${s.title}.`)} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </Reveal>
        </div>

        {/* Consultation form */}
        <div className="container">
          <div className="card lead-form">
            <div className="lead-form__text">
              <span className="eyebrow">Free consultation</span>
              <h2>Request a callback</h2>
              <p className="footer__muted">Leave your details and our design team will call you back about your {s.title.toLowerCase()} project.</p>
            </div>
            <form className="lead-form__form" onSubmit={onSubmit} noValidate>
              {status.state === 'success' && <div className="alert alert--ok">{status.msg}</div>}
              {status.state === 'error' && <div className="alert alert--err">{status.msg}</div>}
              <div className="field-row">
                <div className="field"><label htmlFor="name">Name *</label><input id="name" name="name" value={form.name} onChange={update} placeholder="Your name" />{errors.name && <small className="err">{errors.name}</small>}</div>
                <div className="field"><label htmlFor="phone">Phone *</label><input id="phone" name="phone" value={form.phone} onChange={update} placeholder="98xxxxxxxx" />{errors.phone && <small className="err">{errors.phone}</small>}</div>
              </div>
              <div className="field"><label htmlFor="message">Message</label><input id="message" name="message" value={form.message} onChange={update} placeholder={`Tell us about your ${s.title.toLowerCase()}…`} /></div>
              <button className="btn btn--primary" type="submit" disabled={status.state === 'loading'}>{status.state === 'loading' ? 'Sending…' : 'Request callback'}</button>
            </form>
          </div>
        </div>

        {/* Related */}
        <div className="container">
          <div className="section__head" style={{ marginTop: '1rem' }}><span className="eyebrow">Explore more</span><h2>Other services</h2></div>
          <div className="grid grid--3">
            {others.map((o) => (
              <Link className="card svc svc--link" to={`/services/${o.slug}`} key={o.slug}>
                <div className="svc__media"><SmartImage src={o.image} alt={o.title} className="svc__img" /><span className="svc__icon">{o.icon}</span></div>
                <div className="svc__body"><h3>{o.title}</h3><p>{o.excerpt}</p><span className="link-arrow">Explore →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
