import { Link, useParams } from "react-router-dom";

import { ArrowUpRightIcon } from "../components/Icon";
import { useFetch } from "../hooks/useFetch";
import { fetchProjects } from "../services/api";

export default function PortfolioDetailPage() {
  const { projectId } = useParams();
  const { data: projects, loading, error } = useFetch(fetchProjects);
  const project = projects?.find(({ id }) => id === Number(projectId));

  if (loading) return <main className="detail-loading shell">Loading project details…</main>;
  if (error || !project) return <main className="detail-loading shell">That project could not be found. <Link to="/portfolio">Return to the portfolio</Link></main>;

  return (
    <article className="detail-page shell">
      <nav className="detail-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/portfolio">Portfolio</Link><span>/</span><span>{project.title}</span></nav>
      <header className="project-detail__hero">
        <div className="project-detail__orb project-detail__orb--one" aria-hidden="true" />
        <div className="project-detail__orb project-detail__orb--two" aria-hidden="true" />
        <p className="eyebrow">{project.featured ? "Featured case study" : "Selected project"}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="detail-actions">
          {project.live_url && <a className="button button--primary" href={project.live_url} target="_blank" rel="noreferrer">Visit live project <ArrowUpRightIcon /></a>}
          {project.repository_url && <a className="detail-outline-link" href={project.repository_url} target="_blank" rel="noreferrer">View source <ArrowUpRightIcon /></a>}
        </div>
      </header>

      <div className="detail-layout">
        <aside className="detail-sidebar">
          <p>Project signals</p>
          <dl>
            <div><dt>Focus</dt><dd>{project.featured ? "Flagship build" : "Product exploration"}</dd></div>
            <div><dt>Stack</dt><dd>{project.tech_stack.length} technologies</dd></div>
            <div><dt>Updated</dt><dd>{new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(project.updated_at))}</dd></div>
          </dl>
        </aside>
        <div className="detail-prose">
          <p className="detail-prose__lead">{project.description || project.summary}</p>
          <h2>Technology, with purpose.</h2>
          <p>Each part of the stack supports a clear outcome: a responsive experience, maintainable logic, and a foundation that can grow with the work.</p>
          <div className="detail-tech-list">
            {project.tech_stack.map((technology, index) => <span key={technology}><b>0{index + 1}</b>{technology}</span>)}
          </div>
          <div className="detail-next">
            <p>Have something similarly ambitious in mind?</p>
            <Link to="/contact">Start a conversation <span>→</span></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
