import { Link } from 'react-router-dom'
import { posts } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Reveal from '../components/Reveal.jsx'

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Blog() {
  const [feature, ...rest] = posts
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">The Journal</span>
          <h1>Ideas &amp; inspiration</h1>
          <p>Design trends, practical tips and behind-the-scenes notes from our studio.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured post */}
          <Reveal as={Link} className="post-feature card" to={`/blog/${feature.slug}`}>
            <div className="post-feature__media"><SmartImage src={feature.image} alt={feature.title} className="post-feature__img" /></div>
            <div className="post-feature__body">
              <span className="post__meta">{feature.category} · {fmt(feature.date)} · {feature.read}</span>
              <h2>{feature.title}</h2>
              <p>{feature.excerpt}</p>
              <span className="link-arrow">Read article →</span>
            </div>
          </Reveal>

          {/* Grid */}
          <div className="grid grid--3 post-grid">
            {rest.map((p, i) => (
              <Reveal as={Link} className="card post" to={`/blog/${p.slug}`} key={p.slug} delay={i * 60}>
                <div className="post__media"><SmartImage src={p.image} alt={p.title} className="post__img" /></div>
                <div className="post__body">
                  <span className="post__meta">{p.category} · {p.read}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
