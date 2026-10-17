import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { CloseIcon, MenuIcon } from "./Icon";

const links = [
  ["Work", "/portfolio"],
  ["Expertise", "/portfolio#skills"],
  ["Notes", "/blog"],
  ["Voices", "/testimonials"],
  ["Contact", "/contact"],
] as const;

export default function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { hash } = useLocation();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-nav">
      <nav className="site-nav__bar shell" aria-label="Main navigation">
        <Link className="brand-mark" to="/" onClick={closeMenu} aria-label="Nur Pratap Karki home">
          <span className="brand-mark__core">N</span>
          <span className="brand-mark__word">nur.</span>
        </Link>

        <div className="site-nav__links">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (
                isActive && (to.includes("#") ? hash === "#skills" : hash !== "#skills")
                  ? "is-active"
                  : undefined
              )}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <Link className="nav-cta" to="/contact">
          Start a project <span>↗</span>
        </Link>

        <button
          className="site-nav__toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <div className={`site-nav__mobile ${isOpen ? "is-open" : ""}`}>
        {links.map(([label, to], index) => (
          <Link
            key={to}
            to={to}
            onClick={closeMenu}
            style={{ transitionDelay: `${index * 45}ms` }}
          >
            <span>0{index + 1}</span>
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
