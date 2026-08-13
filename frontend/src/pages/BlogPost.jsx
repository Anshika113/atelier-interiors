import { useParams, Link, Navigate } from 'react-router-dom'
import { posts, postBySlug, whatsappLink } from '../data.js'
import SmartImage from '../components/SmartImage.jsx'

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug(slug)
  if (!post) return <Navigate to="/blog" replace />
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article className="post-article">
        <header className="post-article__head">
          <div className="container">
            <nav className="crumbs"><Link to="/blog">Journal</Link> <span>/</span> {post.category}</nav>
            <h1>{post.title}</h1>
            <p className="post__meta">{post.category} · {fmt(post.date)} · {post.read} read</p>
          </div>
        </header>

        <div className="container post-article__media">
          <SmartImage src={post.image} alt={post.title} className="post-article__img" />
        </div>

        <div className="container post-article__body">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}

          <div className="post-article__cta card">
            <div>
              <h3>Planning a project?</h3>
              <p className="footer__muted">Get a free consultation with our design team.</p>
            </div>
            <div className="post-article__cta-actions">
              <Link className="btn btn--primary" to="/book">Book now</Link>
              <a className="btn btn--ghost" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </article>

      <section className="section section--tint">
        <div className="container">
          <div className="section__head"><span className="eyebrow">Keep reading</span><h2>More from the journal</h2></div>
          <div className="grid grid--2">
            {more.map((p) => (
              <Link className="card post post--row" to={`/blog/${p.slug}`} key={p.slug}>
                <div className="post__media"><SmartImage src={p.image} alt={p.title} className="post__img" /></div>
                <div className="post__body"><span className="post__meta">{p.category} · {p.read}</span><h3>{p.title}</h3><p>{p.excerpt}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
