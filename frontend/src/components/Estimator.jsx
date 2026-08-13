import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { estimatorRooms, estimatorPackages } from '../data.js'

// Custom functionality: an instant budget estimator. Pick a space, a package
// tier and an area, and get a live estimated cost range (computed client-side).
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

export default function Estimator() {
  const [room, setRoom] = useState(estimatorRooms[0].key)
  const [pkg, setPkg] = useState(estimatorPackages[1].key)
  const [area, setArea] = useState(600)

  const est = useMemo(() => {
    const r = estimatorRooms.find((x) => x.key === room)
    const p = estimatorPackages.find((x) => x.key === pkg)
    const sqft = Math.max(0, Number(area) || 0)
    const base = sqft * p.rate * r.factor
    return { low: base * 0.9, high: base * 1.12, rate: p.rate, valid: sqft > 0 }
  }, [room, pkg, area])

  const bookText = `Hi Atelier, my instant estimate is ${inr(est.low)}–${inr(est.high)}. I'd like to book a consultation.`

  return (
    <div className="est card">
      <div className="est__head">
        <span className="eyebrow">Instant estimate</span>
        <h3>Get a rough budget in seconds</h3>
        <p className="est__note">A guide only — your consultation gives you an exact, itemised quote.</p>
      </div>

      <div className="est__controls">
        <label className="est__field">
          <span>Space</span>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            {estimatorRooms.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </label>
        <label className="est__field">
          <span>Package</span>
          <select value={pkg} onChange={(e) => setPkg(e.target.value)}>
            {estimatorPackages.map((p) => <option key={p.key} value={p.key}>{p.label} — {inr(p.rate)}/sq ft</option>)}
          </select>
        </label>
        <label className="est__field">
          <span>Area: <strong>{area} sq ft</strong></span>
          <input type="range" min="100" max="3000" step="50" value={area} onChange={(e) => setArea(e.target.value)} />
        </label>
      </div>

      <div className="est__result">
        <div>
          <span className="est__label">Estimated cost</span>
          <strong className="est__amount">{est.valid ? `${inr(est.low)} – ${inr(est.high)}` : '—'}</strong>
        </div>
        <Link className="btn btn--primary" to="/book">Book with this estimate</Link>
      </div>
      <p className="est__pkgblurb">{estimatorPackages.find((p) => p.key === pkg).blurb}</p>
    </div>
  )
}
