import { Link } from 'react-router-dom'
import { services } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our services</span>
          <h1>What we design</h1>
          <p>Six specialisations, delivered end to end. Each has its own page with details, process and pricing.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {services.map((s, i) => (
              <Reveal as={Link} className="card svc svc--link" to={`/services/${s.slug}`} key={s.slug} delay={i * 50}>
                <div className="svc__media"><SmartImage src={s.image} alt={s.title} className="svc__img" /><span className="svc__icon">{s.icon}</span></div>
                <div className="svc__body">
                  <h3>{s.title}</h3>
                  <p className="svc__tag">{s.tagline}</p>
                  <p>{s.excerpt}</p>
                  <div className="svc__foot"><span className="svc__price">{s.priceFrom}</span><span className="link-arrow">Explore →</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
