import { Link } from 'react-router-dom'
import { testimonials, stats, whatsappLink } from '../data.js'
import Reveal from '../components/Reveal.jsx'

export default function Testimonials() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Client stories</span>
          <h1>Loved by homeowners &amp; businesses</h1>
          <p>We measure our work by how our clients feel in their spaces long after handover. Here’s what they say.</p>
        </div>
      </section>

      {/* Stats band */}
      <section className="section section--dark">
        <div className="container">
          <div className="steps">
            {stats.map((s, i) => (
              <Reveal className="step step--light" key={s.label} delay={i * 70}>
                <span className="step__no">{s.value}</span>
                <p>{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {testimonials.map((t, i) => (
              <Reveal as="blockquote" className="card quote" key={t.name} delay={(i % 3) * 60}>
                <span className="quote__stars">★★★★★</span>
                <p>“{t.text}”</p>
                <cite>{t.name}<span>{t.role}</span></cite>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <span className="eyebrow eyebrow--gold">Your project next</span>
          <h2>Join our happy clients</h2>
          <p>Book a free consultation and let’s design a space you’ll love for years.</p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/book">Book a consultation</Link>
            <a className="btn btn--outline-light" href={whatsappLink()} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
