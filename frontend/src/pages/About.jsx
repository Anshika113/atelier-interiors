import { Link } from 'react-router-dom'
import { business, stats, process, whatsappLink } from '../data.js'
import Reveal from '../components/Reveal.jsx'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About the studio</span>
          <h1>Designers, makers &amp; project managers</h1>
          <p>{business.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container about">
          <Reveal className="about__text">
            <h2>Our philosophy</h2>
            <p>We believe great design is invisible in the best way — it simply makes life easier, calmer and more beautiful. Every project starts with how you actually live and work, not with a trend.</p>
            <p>For fifteen years we’ve delivered homes and workspaces across Mumbai, combining an in-house design studio with a dependable execution team. That means one accountable partner from first sketch to final handover.</p>
            <h2>Why clients trust us</h2>
            <ul className="ticks">
              <li>A single accountable team — design and execution under one roof</li>
              <li>3D visuals and transparent, itemised quotes before we begin</li>
              <li>Weekly site updates and strict quality checks</li>
              <li>On-time, on-budget turnkey handovers</li>
              <li>After-care support once you move in</li>
            </ul>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/book">Book a consultation</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp us</a>
            </div>
          </Reveal>
          <Reveal as="aside" className="about__side card" delay={100}>
            <h3>By the numbers</h3>
            <dl className="stats-grid">
              {stats.map((s) => <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
            </dl>
            <p className="footer__muted">{business.address}</p>
            <p className="footer__muted">{business.hours}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <Reveal className="section__head"><span className="eyebrow">How we work</span><h2>Our process</h2></Reveal>
          <div className="steps">
            {process.map(([n, t, d], i) => (
              <Reveal className="step" key={n} delay={i * 80}><span className="step__no">{n}</span><h3>{t}</h3><p>{d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
