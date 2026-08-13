import { useState } from 'react'

// First working image from one or more sources; removes itself if none load,
// revealing the gradient on the parent. Precedence: local → themed → generic → gradient.
export default function SmartImage({ src, alt = '', className = '' }) {
  const sources = (Array.isArray(src) ? src : [src]).filter(Boolean)
  const [idx, setIdx] = useState(0)
  if (idx >= sources.length) return null
  return (
    <img src={sources[idx]} alt={alt} className={className} loading="lazy" decoding="async"
      onError={() => setIdx((i) => i + 1)} />
  )
}
