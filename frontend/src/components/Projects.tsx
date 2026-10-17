import { ArrowUpRightIcon } from "./Icon";
import { useFetch } from "../hooks/useFetch";
import { fetchProjects } from "../services/api";
import { Link } from "react-router-dom";

const palettes = ["violet", "orange", "aqua"];

interface ProjectsProps {
  compact?: boolean;
  showIntro?: boolean;
}

export default function Projects({ compact = false, showIntro = true }: ProjectsProps) {
  const { data: projects, loading, error } = useFetch(fetchProjects);
  const visibleProjects = compact ? projects?.slice(0, 3) : projects;

  return (
    <section id="projects" className={`content-section shell project-section ${compact ? "project-section--compact" : ""}`}>
      {showIntro && (
        <div className="section-intro">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2>Built to move<br /><em>ideas forward.</em></h2>
          </div>
          <p>From polished interfaces to durable systems, each project balances visual clarity with the real work underneath.</p>
        </div>
      )}

      {loading && <div className="project-grid project-grid--loading" aria-label="Loading projects"><div /><div /><div /></div>}
      {error && <p className="status-message">The work gallery is temporarily out of reach.</p>}
      {projects && projects.length === 0 && <p className="status-message">New work is being prepared for the gallery.</p>}

      {visibleProjects && visibleProjects.length > 0 && (
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article key={project.id} className={`project-card project-card--${palettes[index % palettes.length]}`}>
              <div className="project-card__backdrop" aria-hidden="true"><span /><span /><span /></div>
              <div className="project-card__number">0{index + 1}</div>
              <div className="project-card__body">
                <div className="project-card__topline">
                  <span>{project.featured ? "Featured build" : "Independent build"}</span>
                  <div className="project-card__links">
                    {project.repository_url && <a href={project.repository_url} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`}><span>Code</span><ArrowUpRightIcon /></a>}
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live site`}><span>Live</span><ArrowUpRightIcon /></a>}
                  </div>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-card__stack">
                  {project.tech_stack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
                <Link className="project-card__details" to={`/portfolio/${project.id}`}>
                  View project details <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      {compact && projects && projects.length > 3 && (
        <Link className="section-cta" to="/portfolio">Browse all work <span>↗</span></Link>
      )}
    </section>
  );
}
