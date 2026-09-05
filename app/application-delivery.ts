export const APPLICATION_ENDPOINT = "https://formsubmit.co/ajax/iosco.history@gmail.com";
export const APPLICATION_SITE = "https://iosco-museum-rebuild.iosco-history.chatgpt.site/";

export async function sendApplication(form: FormData, subject: string) {
  const values = Object.fromEntries(form.entries());
  if (values._honey) throw new Error("Please leave the website field empty.");
  const response = await fetch(APPLICATION_ENDPOINT, {
    method: "POST",
    referrerPolicy: "origin",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // Keep full page paths and query strings out of the external Referer header.
    body: JSON.stringify({ ...values, _url: APPLICATION_SITE, _subject: subject, _template: "table" }),
    signal: AbortSignal.timeout(45000),
  });
  const result = await response.json();
  // An activation request is not an accepted application. Never report it as sent.
  if (!response.ok || ![true, "true"].includes(result.success) ||
      /activat|confirm your email/i.test(String(result.message ?? ""))) {
    console.warn("Application delivery was not accepted: " + JSON.stringify({ status: response.status, message: String(result.message ?? "No provider status") }));
    throw new Error("Your application could not be sent. Your answers are still here. Please try again or email iosco.history@gmail.com.");
  }
}
