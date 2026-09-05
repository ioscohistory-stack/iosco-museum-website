"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { APPLICATION_SITE, sendApplication } from "./application-delivery";

export function ApplicationForm({ children, subject, button, success, className = "volunteer-form", onAccepted }: {
  children: ReactNode;
  subject: string;
  button: string;
  success: string;
  className?: string;
  onAccepted?: () => void;
}) {
  const busy = useRef(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setStatus("sending");
    try {
      await sendApplication(new FormData(event.currentTarget), subject);
      setStatus("sent");
      onAccepted?.();
    } catch (error) {
      console.warn("Application submission did not complete", error instanceof Error ? error.name : "Unknown error");
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }
  if (status === "sent") return <div className="application-status" role="status"><h3>Application submitted</h3><p>{success}</p></div>;
  return <form className={className} onSubmit={submit} method="POST" action="https://formsubmit.co/iosco.history@gmail.com">
    <input type="hidden" name="_url" value={APPLICATION_SITE} />
    <input type="hidden" name="_subject" value={subject} />
    <input type="hidden" name="_template" value="table" />
    <fieldset className="application-fields" disabled={status === "sending"}>
      {children}
      <div className="application-honey" aria-hidden="true">
        <label>Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-field form-field--full volunteer-form__submit">
        <button className="button button--brick" type="submit">{status === "sending" ? "Sending…" : button}</button>
        <p>Your details are sent to the museum through FormSubmit. No email app is needed.</p>
      </div>
    </fieldset>
    {status === "error" && <div className="application-error form-field--full" role="alert">
      <p>We couldn’t confirm your submission. Your answers are still here. Please try again or contact the museum.</p>
      <p>You can also email <a href="mailto:iosco.history@gmail.com">iosco.history@gmail.com</a> or call <a href="tel:9893628911">989-362-8911</a>.</p>
    </div>}
  </form>;
}
