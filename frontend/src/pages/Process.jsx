import { Link } from 'react-router-dom'
import { process, whatsappLink } from '../data.js'
import Reveal from '../components/Reveal.jsx'

const deliverables = [
  ['Consultation', ['Site visit & measurement', 'Needs & lifestyle brief', 'Budget & timeline discussion']],
  ['Concept & 3D', ['Mood boards & concept', 'Photorealistic 3D visuals', 'Material & finish selection', 'Detailed itemised quote (BOQ)']],
  ['Execution', ['Dedicated site team', 'Weekly progress updates', 'Quality checks at every stage', 'Vendor & trade coordination']],
  ['Turnkey handover', ['Deep clean & styling', 'Snag-list resolution', 'Warranty & after-care', 'Move-in ready home']],
]

export default function Process() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">How we work</span>
          <h1>A calm, transparent process</h1>
          <p>From first conversation to move-in day, one accountable team guides you through four clear stages — with no surprises along the way.</p>
        </div>
      </section>

      <section className="section">
        <div className="container service-list">
          {process.map(([n, t, d], i) => (
            <Reveal className={`svc-row ${i % 2 ? 'svc-row--rev' : ''}`} key={n}>
              <div className="proc-visual"><span>{n}</span></div>
              <div className="svc-row__body">
                <span className="eyebrow">Step {n}</span>
                <h2>{t}</h2>
                <p>{d}</p>
                <ul className="ticks">
                  {deliverables[i][1].map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-band__inner">
          <span className="eyebrow eyebrow--gold">Ready when you are</span>
          <h2>Let’s begin at step one</h2>
          <p>Book a free consultation — no obligation, just ideas and a clear next step.</p>
          <div className="hero__actions">
            <Link className="btn btn--gold" to="/book">Book a consultation</Link>
            <a className="btn btn--outline-light" href={whatsappLink()} target="_blank" rel="noreferrer">Ask on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  )
}
