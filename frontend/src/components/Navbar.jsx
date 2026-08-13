import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { business } from '../data.js'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__logo">A</span>
          <span className="nav__brandtext">
            <span className="nav__name">{business.name}</span>
            <span className="nav__sub">Interior Design Studio</span>
          </span>
        </Link>

        <button className={`nav__toggle ${open ? 'is-open' : ''}`} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link className="btn btn--sm btn--primary nav__cta" to="/book" onClick={() => setOpen(false)}>
            Book Consultation
          </Link>
        </nav>
      </div>
    </header>
  )
}
