import { ArrowRightIcon } from "./Icon";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="hero shell">
      <div className="hero__copy">
        <p className="eyebrow hero__eyebrow"><span /> Full-stack developer · Nepal</p>
        <h1>
          Digital ideas,<br />
          <em>given dimension.</em>
        </h1>
        <p className="hero__lede">
          I&apos;m Nur Pratap Karki — a full-stack developer crafting bright,
          high-performing digital experiences from the first sketch to production.
        </p>
        <div className="hero__actions">
          <Link className="button button--primary" to="/portfolio">
            Explore selected work <ArrowRightIcon />
          </Link>
          <Link className="text-link" to="/contact">Let&apos;s work together <span>↘</span></Link>
        </div>
        <div className="hero__availability">
          <span className="status-dot" /> Available for selected collaborations
        </div>
      </div>

      <div className="hero__visual" role="img" aria-label="Abstract three dimensional developer workspace illustration">
        <div className="hero-visual__glow hero-visual__glow--one" />
        <div className="hero-visual__glow hero-visual__glow--two" />
        <div className="hero-visual__scene">
          <div className="scene-orbit scene-orbit--one" />
          <div className="scene-orbit scene-orbit--two" />
          <div className="scene-orb" />
          <div className="scene-disc" />
          <div className="scene-cube">
            <span className="scene-cube__face scene-cube__face--front">N</span>
            <span className="scene-cube__face scene-cube__face--back" />
            <span className="scene-cube__face scene-cube__face--right" />
            <span className="scene-cube__face scene-cube__face--left" />
            <span className="scene-cube__face scene-cube__face--top" />
            <span className="scene-cube__face scene-cube__face--bottom" />
          </div>
          <div className="scene-spark scene-spark--one">✦</div>
          <div className="scene-spark scene-spark--two">✦</div>
        </div>
        <div className="hero-visual__tag hero-visual__tag--top">Build / 01</div>
        <div className="hero-visual__panel">
          <span>Currently shaping</span>
          <strong>useful experiences</strong>
          <i />
        </div>
      </div>
    </section>
  );
}
