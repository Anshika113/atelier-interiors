import { Link } from 'react-router-dom'
import { business, services, projects, testimonials, stats, process, whatsappLink, heroImages } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'
import Estimator from '../components/Estimator.jsx'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Mumbai · Since 2010</span>
            <h1>Interiors designed to <span className="accent">grow your life.</span></h1>
            <p>{business.intro}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/book">Book a free consultation</Link>
              <Link className="btn btn--ghost" to="/portfolio">View our work</Link>
            </div>
            <div className="hero__stats">
              {stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__panel hero__panel--main"><SmartImage src={heroImages.main} alt="A designed living space" className="hero__img" /></div>
            <div className="hero__panel hero__panel--a"><SmartImage src={heroImages.a} alt="Kitchen" className="hero__img" /></div>
            <div className="hero__panel hero__panel--b"><SmartImage src={heroImages.b} alt="Bedroom" className="hero__img" /></div>
            <div className="hero__chip"><strong>18 awards</strong><span>for design excellence</span></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">What we design</span>
            <h2>End-to-end interior design</h2>
            <p className="section__lead">Six specialisations, one seamless team — from first sketch to turnkey handover.</p>
          </Reveal>
          <div className="grid grid--3">
            {services.map((s, i) => (
              <Reveal as={Link} className="card svc svc--link" to={`/services/${s.slug}`} key={s.slug} delay={i * 50}>
                <div className="svc__media"><SmartImage src={s.image} alt={s.title} className="svc__img" /><span className="svc__icon">{s.icon}</span></div>
                <div className="svc__body">
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  <div className="svc__foot"><span className="svc__price">{s.priceFrom}</span><span className="link-arrow">Explore →</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator (custom functionality) */}
      <section className="section">
        <div className="container est-wrap">
          <Reveal><Estimator /></Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="section__head section__head--light">
            <span className="eyebrow eyebrow--gold">How we work</span>
            <h2>A calm, four-step journey</h2>
          </Reveal>
          <div className="steps">
            {process.map(([n, t, d], i) => (
              <Reveal className="step step--light" key={n} delay={i * 80}>
                <span className="step__no">{n}</span><h3>{t}</h3><p>{d}</p>
              </Reveal>
            ))}
          </div>
          <div className="section__cta"><Link className="btn btn--gold" to="/process">See our full process</Link></div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Selected work</span>
            <h2>Recent projects</h2>
          </Reveal>
          <div className="masonry">
            {projects.slice(0, 6).map((p) => (
              <figure className="shot" key={p.label} style={{ minHeight: 260 }}>
                <SmartImage src={p.img} alt={p.label} className="shot__img" />
                <figcaption>{p.label}<span>{p.category}</span></figcaption>
              </figure>
            ))}
          </div>
          <div className="section__cta"><Link className="btn btn--dark" to="/portfolio">See all projects</Link></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head"><span className="eyebrow">Client love</span><h2>Kind words</h2></Reveal>
          <div className="grid grid--3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal as="blockquote" className="card quote" key={t.name} delay={i * 60}>
                <span className="quote__stars">★★★★★</span>
                <p>“{t.text}”</p>
                <cite>{t.name}<span>{t.role}</span></cite>
              </Reveal>
            ))}
          </div>
          <div className="section__cta"><Link className="btn btn--dark" to="/testimonials">Read all reviews</Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-band__inner">
          <span className="eyebrow eyebrow--gold">Let’s design your space</span>
          <h2>Ready to start your project?</h2>
          <p>Book a free consultation — no obligation, just ideas and a clear next step.</p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/book">Book a consultation</Link>
            <a className="btn btn--outline-light" href={`tel:${business.phone}`}>Call {business.phoneDisplay}</a>
          </div>
        </div>
      </section>
    </>
  )
}
