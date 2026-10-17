import ContactForm from "../components/ContactForm";
import PageHero from "../components/PageHero";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <PageHero
        eyebrow="04 / Contact"
        title={<>Let&apos;s make the next<br /><em>good thing together.</em></>}
        description="Whether you have a clear brief or the first spark of an idea, this is a good place to begin."
      />
      <ContactForm />
    </div>
  );
}
