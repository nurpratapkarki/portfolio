import PageHero from "../components/PageHero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function PortfolioPage() {
  return (
    <div className="portfolio-page">
      <PageHero
        eyebrow="01 / Portfolio"
        title={<>A closer look at<br /><em>the things I make.</em></>}
        description="A collection of digital products designed with equal attention to their surface, their system, and the people using them."
      />
      <Projects showIntro={false} />
      <Skills />
    </div>
  );
}
