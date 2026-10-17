import { useFetch } from "../hooks/useFetch";
import { fetchBlogPosts } from "../services/api";
import { Link } from "react-router-dom";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
}

interface BlogProps {
  showIntro?: boolean;
}

export default function Blog({ showIntro = true }: BlogProps) {
  const { data: posts, loading, error } = useFetch(fetchBlogPosts);

  return (
    <section id="blog" className="content-section shell journal-section">
      {showIntro && (
        <div className="section-intro section-intro--compact">
          <div>
            <p className="eyebrow">03 / Field notes</p>
            <h2>Thoughts from<br /><em>the workbench.</em></h2>
          </div>
          <p>Small, practical notes about building digital products that feel clear, useful, and ready for real people.</p>
        </div>
      )}

      {loading && <div className="journal-grid journal-grid--loading"><div /><div /></div>}
      {error && <p className="status-message">The journal is temporarily unavailable.</p>}
      {posts && posts.length === 0 && <p className="status-message">The first field note is on its way.</p>}

      {posts && posts.length > 0 && (
        <div className="journal-grid">
          {posts.map((post, index) => (
            <article key={post.id} className={`journal-card journal-card--${index % 2 === 0 ? "light" : "dark"}`}>
              <div className="journal-card__chrome">
                <span>Note / 0{index + 1}</span>
                <time>{formatDate(post.published_at ?? post.created_at)}</time>
              </div>
              <div className="journal-card__content">
                <span className="journal-card__symbol">✳</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link className="journal-card__read" to={`/blog/${post.slug}`}>Read note <b>→</b></Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
