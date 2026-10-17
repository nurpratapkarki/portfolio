import type { CSSProperties } from "react";

import { useFetch } from "../hooks/useFetch";
import { fetchSkills } from "../services/api";
import type { Skill } from "../types";

function groupByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce<Record<string, Skill[]>>((groups, skill) => {
    const category = skill.category || "Other";
    groups[category] = [...(groups[category] ?? []), skill];
    return groups;
  }, {});
}

export default function Skills() {
  const { data: skills, loading, error } = useFetch(fetchSkills);
  const skillGroups = skills ? Object.entries(groupByCategory(skills)) : [];

  return (
    <section id="skills" className="content-section shell skills-section">
      <div className="section-intro section-intro--compact">
        <div>
          <p className="eyebrow">02 / Capability map</p>
          <h2>Tools are only<br /><em>the beginning.</em></h2>
        </div>
        <p>I use a focused toolkit to shape reliable products, with the right amount of care in every layer.</p>
      </div>

      {loading && <div className="skill-groups skill-groups--loading"><div /><div /><div /></div>}
      {error && <p className="status-message">The capability map could not be loaded.</p>}
      {skills && skills.length === 0 && <p className="status-message">Skills will appear here shortly.</p>}

      {skillGroups.length > 0 && (
        <div className="skill-groups">
          {skillGroups.map(([category, categorySkills], groupIndex) => (
            <article className="skill-group" key={category}>
              <header>
                <span>0{groupIndex + 1}</span>
                <h3>{category}</h3>
                <i />
              </header>
              <div className="skill-group__list">
                {categorySkills.map((skill) => {
                  const progress = skill.proficiency ?? 0;
                  return (
                    <div className="skill-token" key={skill.id}>
                      <div className="skill-token__dial" style={{ "--progress": `${progress * 3.6}deg` } as CSSProperties}>
                        <span>{progress || "—"}</span>
                      </div>
                      <div>
                        <strong>{skill.name}</strong>
                        <span>{skill.proficiency === null ? "Growing practice" : `${skill.proficiency}% confidence`}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
