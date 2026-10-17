import { Link } from "react-router-dom";

import { useFetch } from "../hooks/useFetch";
import { useInView } from "../hooks/useInView";
import { fetchTestimonials } from "../services/api";
import type { Testimonial } from "../types";

function initials(name: string): string {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

function RevealingQuote({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { ref, isVisible } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`reveal-quote ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 110}ms` }}
    >
      <span className="reveal-quote__number">0{index + 1}</span>
      <blockquote>“{testimonial.quote}”</blockquote>
      <footer>
        <div className="reveal-quote__avatar" style={testimonial.avatar_url ? { backgroundImage: `url(${testimonial.avatar_url})` } : undefined}>
          {!testimonial.avatar_url && initials(testimonial.name)}
        </div>
        <div>
          <strong>{testimonial.name}</strong>
          <span>{[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}</span>
        </div>
      </footer>
    </article>
  );
}

export default function HomeTestimonials() {
  const { data: testimonials, loading, error } = useFetch(fetchTestimonials);

  return (
    <section className="home-voices content-section shell" aria-labelledby="home-voices-title">
      <div className="section-intro">
        <div>
          <p className="eyebrow">In collaboration</p>
          <h2 id="home-voices-title">Made better<br /><em>together.</em></h2>
        </div>
        <div className="home-voices__intro">
          <p>Scroll through a few words from the people behind the work.</p>
          <Link className="section-cta" to="/testimonials">All perspectives <span>↗</span></Link>
        </div>
      </div>

      {loading && <div className="reveal-quote-grid reveal-quote-grid--loading"><div /><div /></div>}
      {error && <p className="status-message">The client stories are temporarily unavailable.</p>}
      {testimonials && testimonials.length === 0 && <p className="status-message">Client stories will appear here soon.</p>}
      {testimonials && testimonials.length > 0 && (
        <div className="reveal-quote-grid">
          {testimonials.slice(0, 3).map((testimonial, index) => <RevealingQuote key={testimonial.id} testimonial={testimonial} index={index} />)}
        </div>
      )}
    </section>
  );
}
