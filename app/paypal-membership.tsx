"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

const containerId = "paypal-container-YQSQJPLMMF6BL";

export function PayPalMembershipButton({ amount = "", membershipType = "", selectionVersion = 0 }: { amount?: string; membershipType?: string; selectionVersion?: number }) {
  const rendered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selection = useRef({ amount, membershipType });
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const applySelection = useCallback((notify = false) => {
    const container = containerRef.current;
    if (!container) return;
    // PayPal mounts these editable fields asynchronously. Find and update each
    // independently, including its decimal-input variation on mobile browsers.
    const amountField = container.querySelector<HTMLInputElement>('input#amount, input[type="number"], input[inputmode="decimal"]');
    const typeField = container.querySelector<HTMLTextAreaElement>('textarea#memo, textarea');
    for (const [field, value, prototype] of [
      [amountField, selection.current.amount, HTMLInputElement.prototype],
      [typeField, selection.current.membershipType, HTMLTextAreaElement.prototype],
    ] as const) {
      if (!field || (!notify && field.value === value)) continue;
      Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(field, value);
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  useEffect(() => {
    selection.current = { amount, membershipType };
    // Reapply even when the visitor chooses the same membership again.
    applySelection(true);
  }, [amount, membershipType, selectionVersion, applySelection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      // Wait until PayPal has attached its field event handlers.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applySelection());
    });
    observer.observe(container, { childList: true, subtree: true });
    applySelection();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [applySelection]);

  const renderButton = useCallback(() => {
    if (!window.paypal?.HostedButtons || rendered.current) return;
    const container = containerRef.current;
    if (!container) return;
    rendered.current = true;
    container.replaceChildren();
    Promise.resolve().then(() => {
      if (!container.isConnected) return;
      return window.paypal!.HostedButtons({ hostedButtonId: "YQSQJPLMMF6BL" }).render(`#${containerId}`);
    }).then(() => {
      if (!container.isConnected) return;
      // Sync after rendering as well as during mounting, so PayPal receives the
      // latest choice even if it was selected before the SDK finished loading.
      applySelection(true);
      setLoading(false);
    }).catch(() => {
      if (!container.isConnected) return;
      rendered.current = false;
      setLoading(false);
      setFailed(true);
    });
  }, [applySelection]);

  useEffect(() => {
    // Also initialize when the SDK was already loaded on another museum page.
    renderButton();
  }, [renderButton]);

  return (
    <div className="paypal-membership">
      <Script
        id="paypal-membership-sdk"
        src="https://www.paypal.com/sdk/js?client-id=BAAJJgUig6_59X6i5Zo_SUOOQn0lQVplsjSBHTMctSBmeBWyKiRRYRz2YVQaXroZ8a57X2_eRThox_5NxQ&components=hosted-buttons&enable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={renderButton}
        onReady={renderButton}
        onError={() => { setLoading(false); setFailed(true); }}
      />
      {loading && <p role="status">Loading secure payment form…</p>}
      {failed && <p role="alert">The payment form couldn’t load. Open “Payment form not showing?” below to continue.</p>}
      <div id={containerId} ref={containerRef} />
      <noscript>
        <a
          className="button button--brick"
          href="https://www.paypal.com/ncp/payment/YQSQJPLMMF6BL"
        >
          Join and pay online
        </a>
      </noscript>
    </div>
  );
}
