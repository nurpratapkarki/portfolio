import { useState } from "react";

import { SendIcon } from "./Icon";
import { submitContact } from "../services/api";
import type { ContactErrors, ContactPayload } from "../types";

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function validate(): ContactErrors {
    const validationErrors: ContactErrors = {};
    if (form.name.trim().length < 2) validationErrors.name = ["Name must be at least 2 characters."];
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) validationErrors.email = ["Enter a valid email address."];
    if (form.subject.trim().length < 3) validationErrors.subject = ["Subject must be at least 3 characters."];
    if (form.message.trim().length < 10) validationErrors.message = ["Message must be at least 10 characters."];
    return validationErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setSuccess(false);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const responseError = error as Error & { body?: ContactErrors };
      if (responseError.body && typeof responseError.body === "object") setErrors(responseError.body);
      else setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <section id="contact" className="contact-section shell">
      <div className="contact-panel">
        <div className="contact-panel__ambient contact-panel__ambient--one" aria-hidden="true" />
        <div className="contact-panel__ambient contact-panel__ambient--two" aria-hidden="true" />
        <div className="contact-panel__intro">
          <p className="eyebrow">05 / Open channel</p>
          <h2>Have a bright<br /><em>idea in mind?</em></h2>
          <p>Tell me a little about the challenge. I&apos;ll reply with a thoughtful next step.</p>
          <div className="contact-panel__signal"><i /> Usually replies within a few days</div>
        </div>

        <div className="contact-panel__form-wrap">
          {success ? (
            <div className="form-feedback form-feedback--success">
              <span>✓</span>
              <h3>Message received.</h3>
              <p>Thanks for reaching out. I&apos;ll be in touch soon.</p>
              <button type="button" onClick={() => setSuccess(false)}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {submitError && <p className="form-feedback form-feedback--error">{submitError}</p>}
              <div className="form-row">
                <label>
                  <span>Your name</span>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" autoComplete="name" />
                  {errors.name && <small>{errors.name[0]}</small>}
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" autoComplete="email" />
                  {errors.email && <small>{errors.email[0]}</small>}
                </label>
              </div>
              <label>
                <span>What&apos;s on your mind?</span>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="A new digital experience" />
                {errors.subject && <small>{errors.subject[0]}</small>}
              </label>
              <label>
                <span>Your message</span>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} placeholder="A little context goes a long way..." />
                {errors.message && <small>{errors.message[0]}</small>}
              </label>
              <button className="button button--submit" type="submit" disabled={submitting}>
                {submitting ? "Sending signal..." : <>Send a message <SendIcon /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
