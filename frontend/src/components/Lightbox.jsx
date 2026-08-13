import { useEffect } from 'react'
import SmartImage from './SmartImage.jsx'

// Full-screen viewer for project images. Esc closes; arrow keys navigate.
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  if (index == null) return null
  const item = items[index]
  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}>
      <button className="lb__close" aria-label="Close" onClick={onClose}>×</button>
      <button className="lb__nav lb__nav--prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev() }}>‹</button>
      <figure className="lb__stage" onClick={(e) => e.stopPropagation()}>
        <SmartImage src={item.img} alt={item.label} className="lb__img" />
        <figcaption><span>{item.label}</span><span className="lb__meta">{item.category} · {index + 1} / {items.length}</span></figcaption>
      </figure>
      <button className="lb__nav lb__nav--next" aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext() }}>›</button>
    </div>
  )
}
