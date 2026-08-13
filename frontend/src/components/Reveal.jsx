import { useEffect, useRef, useState } from 'react'

// Fades/rises children in when scrolled into view. Extra props (e.g. `to` for a
// react-router Link passed via `as`) are forwarded to the rendered element.
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-shown' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
