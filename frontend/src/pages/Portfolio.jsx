import { useState, useMemo } from 'react'
import { projects, projectCategories } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'
import Lightbox from '../components/Lightbox.jsx'

export default function Portfolio() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat])

  const close = () => setOpen(null)
  const prev = () => setOpen((i) => (i + items.length - 1) % items.length)
  const next = () => setOpen((i) => (i + 1) % items.length)

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Our work</span>
          <h1>Portfolio</h1>
          <p>A selection of homes and workspaces we’ve designed and delivered. Filter by type, and tap any image to view it larger.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters">
            {projectCategories.map((c) => (
              <button key={c} className={`filter ${cat === c ? 'is-active' : ''}`} onClick={() => { setCat(c); setOpen(null) }}>{c}</button>
            ))}
          </div>
          <div className="masonry masonry--full">
            {items.map((p, i) => (
              <figure className={`shot shot--${(i % 4) + 1}`} key={p.label} onClick={() => setOpen(i)} role="button" tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen(i)}>
                <SmartImage src={p.img} alt={p.label} className="shot__img" />
                <figcaption>{p.label}<span>{p.category}</span></figcaption>
                <span className="shot__zoom" aria-hidden="true">⤢</span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Lightbox items={items} index={open} onClose={close} onPrev={prev} onNext={next} />
    </>
  )
}
