export const APPLICATION_ENDPOINT = "https://formsubmit.co/ajax/iosco.history@gmail.com";
export const APPLICATION_SITE = "https://iosco-museum-rebuild.iosco-history.chatgpt.site/";

export async function sendApplication(form: FormData, subject: string) {
  const values = Object.fromEntries(form.entries());
  if (values._honey) throw new Error("Please leave the website field empty.");
  const response = await fetch(APPLICATION_ENDPOINT, {
    method: "POST",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // FormSubmit's documented _url keeps setup and email attribution attached to
    // the real museum site even when the same source is tested in an internal preview.
    body: JSON.stringify({ ...values, _url: APPLICATION_SITE, _subject: subject, _template: "table" }),
    signal: AbortSignal.timeout(20000),
  });
  const result = await response.json();
  // An activation request is not an accepted application. Never report it as sent.
  if (!response.ok || ![true, "true"].includes(result.success) ||
      /activat|confirm your email/i.test(String(result.message ?? ""))) {
    throw new Error("Your application could not be sent. Your answers are still here. Please try again or email iosco.history@gmail.com.");
  }
}
