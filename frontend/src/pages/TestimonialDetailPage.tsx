import { Link, useParams } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { fetchTestimonials } from "../services/api";

function initials(name: string): string {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

export default function TestimonialDetailPage() {
  const { testimonialId } = useParams();
  const { data: testimonials, loading, error } = useFetch(fetchTestimonials);
  const testimonial = testimonials?.find(({ id }) => id === Number(testimonialId));

  if (loading) return <main className="detail-loading shell">Loading perspective…</main>;
  if (error || !testimonial) return <main className="detail-loading shell">That perspective could not be found. <Link to="/testimonials">Return to testimonials</Link></main>;

  return (
    <article className="testimonial-detail shell">
      <nav className="detail-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/testimonials">Testimonials</Link><span>/</span><span>{testimonial.name}</span></nav>
      <div className="testimonial-detail__card">
        <div className="testimonial-detail__halo testimonial-detail__halo--one" aria-hidden="true" />
        <div className="testimonial-detail__halo testimonial-detail__halo--two" aria-hidden="true" />
        <span className="testimonial-detail__mark">“</span>
        <blockquote>{testimonial.quote}</blockquote>
        <footer>
          <div className="testimonial-detail__avatar" style={testimonial.avatar_url ? { backgroundImage: `url(${testimonial.avatar_url})` } : undefined}>
            {!testimonial.avatar_url && initials(testimonial.name)}
          </div>
          <div>
            <strong>{testimonial.name}</strong>
            <span>{[testimonial.role, testimonial.company].filter(Boolean).join(" · ") || "Collaborator"}</span>
          </div>
        </footer>
      </div>
      <div className="testimonial-detail__closing">
        <p>Good work is a conversation—not just a delivery.</p>
        <Link to="/testimonials">Explore more perspectives <span>→</span></Link>
      </div>
    </article>
  );
}
