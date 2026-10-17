import { Link, useParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { fetchBlogPosts } from "../services/api";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { data: posts, loading, error } = useFetch(fetchBlogPosts);
  const post = posts?.find((item) => item.slug === slug);

  if (loading) return <main className="detail-loading shell">Opening the note…</main>;
  if (error || !post) return <main className="detail-loading shell">That note could not be found. <Link to="/blog">Return to the journal</Link></main>;

  const paragraphs = post.content.split(/\n+/).filter(Boolean);

  return (
    <article className="article-detail shell">
      <nav className="detail-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blog">Journal</Link><span>/</span><span>Note</span></nav>
      <header className="article-detail__header">
        <p className="eyebrow">Field note / {formatDate(post.published_at ?? post.created_at)}</p>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
      </header>
      <div className="article-detail__body">
        <aside><span>✳</span><p>Read slowly.<br />Keep what helps.</p></aside>
        <div>
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="article-detail__outro">
            <span>Thanks for reading</span>
            <Link to="/blog">More notes <b>→</b></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
