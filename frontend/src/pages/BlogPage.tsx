import Blog from "../components/Blog";
import PageHero from "../components/PageHero";

export default function BlogPage() {
  return (
    <div className="journal-page">
      <PageHero
        eyebrow="02 / Journal"
        title={<>Notes from inside<br /><em>the process.</em></>}
        description="Short, practical writing about building thoughtful interfaces, dependable systems, and the habits that make both better."
      />
      <Blog showIntro={false} />
    </div>
  );
}
