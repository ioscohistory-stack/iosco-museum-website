"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const key = "iosco-anonymous-browser-v1";
const hosts = new Set(["www.ioscomuseum.com", "ioscomuseum.com", "iosco-museum-rebuild.iosco-history.chatgpt.site"]);

export function VisitorTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const navigatorWithPrivacy = navigator as Navigator & { globalPrivacyControl?: boolean };
    if (!pathname || !hosts.has(location.hostname) || navigator.webdriver
      || navigator.doNotTrack === "1" || navigatorWithPrivacy.globalPrivacyControl) return;
    let cancelled = false;
    let sent = false;
    let retry: ReturnType<typeof setTimeout> | undefined;
    async function send() {
      if (cancelled || sent || document.visibilityState !== "visible") return;
      sent = true;
      let browserId: string;
      try {
        browserId = localStorage.getItem(key) ?? crypto.randomUUID();
        if (!/^[0-9a-f-]{36}$/i.test(browserId)) browserId = crypto.randomUUID();
        localStorage.setItem(key, browserId);
      } catch { return; } // Do not fingerprint visitors when storage is blocked.
      const body = JSON.stringify({ browserId, eventId: crypto.randomUUID(), path: pathname });
      async function deliver(attempt = 0): Promise<void> {
        if (cancelled) return;
        try {
          const result = await fetch("/_museum/visit", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body, credentials: "omit", keepalive: true,
          });
          if (result.ok || result.status < 500) return;
        } catch { /* Retry the same event once, without delaying the page. */ }
        if (attempt === 0 && !cancelled) retry = setTimeout(() => void deliver(1), 2000);
      }
      await deliver();
    }
    // A brief delay avoids development effect replay and speculative navigation.
    const start = setTimeout(() => void send(), 350);
    const onVisible = () => { void send(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true; clearTimeout(start); clearTimeout(retry);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname]);
  return null;
}
