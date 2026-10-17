import { ArrowUpRightIcon } from "./Icon";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="eyebrow">Make something memorable</p>
          <Link className="site-footer__email" to="/contact">
            Start a conversation <ArrowUpRightIcon />
          </Link>
        </div>

        <div className="site-footer__meta">
          <Link to="/">Back to home ↑</Link>
          <p>© {new Date().getFullYear()} Nur Pratap Karki</p>
          <p>Built with considered detail.</p>
        </div>
      </div>
    </footer>
  );
}
