import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import HomeTestimonials from "../components/HomeTestimonials";
import Projects from "../components/Projects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-route-map shell" aria-label="Explore the portfolio">
        <p className="eyebrow">Choose a direction</p>
        <div>
          <Link to="/portfolio"><span>01</span> Portfolio <b>↗</b></Link>
          <Link to="/blog"><span>02</span> Journal <b>↗</b></Link>
          <Link to="/contact"><span>03</span> Contact <b>↗</b></Link>
        </div>
      </section>
      <Projects compact />
      <HomeTestimonials />
      <section className="home-close shell">
        <p className="eyebrow">What&apos;s next?</p>
        <h2>Have a project with<br /><em>real momentum?</em></h2>
        <Link className="button button--primary" to="/contact">Open a conversation <span>→</span></Link>
      </section>
    </>
  );
}
