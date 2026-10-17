import { useFetch } from "../hooks/useFetch";
import { fetchTestimonials } from "../services/api";
import { Link } from "react-router-dom";

function initials(name: string): string {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

interface TestimonialsProps {
  showIntro?: boolean;
}

export default function Testimonials({ showIntro = true }: TestimonialsProps) {
  const { data: testimonials, loading, error } = useFetch(fetchTestimonials);

  return (
    <section id="testimonials" className="content-section shell voices-section">
      {showIntro && (
        <div className="section-intro section-intro--compact">
          <div>
            <p className="eyebrow">04 / Kind words</p>
            <h2>Better work is<br /><em>shared work.</em></h2>
          </div>
          <p>The best digital experiences are a collaboration. Here&apos;s what that has felt like for people I&apos;ve worked with.</p>
        </div>
      )}

      {loading && <div className="quote-grid quote-grid--loading"><div /><div /></div>}
      {error && <p className="status-message">The kind words could not be loaded.</p>}
      {testimonials && testimonials.length === 0 && <p className="status-message">Client stories will appear here soon.</p>}

      {testimonials && testimonials.length > 0 && (
        <div className="quote-grid">
          {testimonials.map((testimonial, index) => (
            <figure className={`quote-card quote-card--${index % 2 === 0 ? "violet" : "gold"}`} key={testimonial.id}>
              <div className="quote-card__shine" aria-hidden="true" />
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption>
                <div className="quote-card__avatar" style={testimonial.avatar_url ? { backgroundImage: `url(${testimonial.avatar_url})` } : undefined}>
                  {!testimonial.avatar_url && initials(testimonial.name)}
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  {(testimonial.role || testimonial.company) && <span>{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</span>}
                </div>
              </figcaption>
              <Link className="quote-card__details" to={`/testimonials/${testimonial.id}`}>Read their perspective <span>→</span></Link>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
