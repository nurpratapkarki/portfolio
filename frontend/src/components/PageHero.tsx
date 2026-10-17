import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  trail?: string;
}

export default function PageHero({ eyebrow, title, description, trail }: PageHeroProps) {
  return (
    <header className="page-hero shell">
      <div className="page-hero__orb page-hero__orb--one" aria-hidden="true" />
      <div className="page-hero__orb page-hero__orb--two" aria-hidden="true" />
      <div className="page-hero__trail">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{trail ?? eyebrow.replace(/^\d+\s\/\s/, "")}</span>
      </div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-hero__line" />
    </header>
  );
}
