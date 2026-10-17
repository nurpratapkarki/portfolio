import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found shell">
      <span>404</span>
      <p className="eyebrow">Lost in the layers</p>
      <h1>This page is still<br /><em>just an idea.</em></h1>
      <p>Let&apos;s bring you back to something that is already taking shape.</p>
      <Link className="button button--primary" to="/">Return home <b>→</b></Link>
    </section>
  );
}
