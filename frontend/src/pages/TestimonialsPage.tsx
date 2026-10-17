import PageHero from "../components/PageHero";
import Testimonials from "../components/Testimonials";

export default function TestimonialsPage() {
  return (
    <div className="testimonials-page">
      <PageHero
        eyebrow="03 / Testimonials"
        title={<>The work is better<br /><em>when it&apos;s shared.</em></>}
        description="A few perspectives from the collaborators, product teams, and creative partners who have been part of the journey."
      />
      <Testimonials showIntro={false} />
    </div>
  );
}
