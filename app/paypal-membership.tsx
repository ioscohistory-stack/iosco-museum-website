"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

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

export function PayPalMembershipButton({ amount = "", membershipType = "" }: { amount?: string; membershipType?: string }) {
  const rendered = useRef(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    // The hosted customer-set-price form renders asynchronously in this container.
    // Keep its visible, editable fields in sync; PayPal remains responsible for checkout.
    function applySelection() {
      const amountField = container!.querySelector<HTMLInputElement>('input[type="number"]');
      const typeField = container!.querySelector<HTMLTextAreaElement>('textarea');
      if (!amountField || !typeField) return;
      for (const [field, value, prototype] of [
        [amountField, amount, HTMLInputElement.prototype],
        [typeField, membershipType, HTMLTextAreaElement.prototype],
      ] as const) {
        if (field.value === value) continue;
        Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(field, value);
        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    const observer = new MutationObserver(applySelection);
    observer.observe(container, { childList: true, subtree: true });
    applySelection();
    return () => observer.disconnect();
  }, [amount, membershipType]);

  const renderButton = useCallback(() => {
    if (!window.paypal || rendered.current) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    container.replaceChildren();
    window.paypal
      .HostedButtons({ hostedButtonId: "YQSQJPLMMF6BL" })
      .render(`#${containerId}`);
    rendered.current = true;
  }, []);

  return (
    <div className="paypal-membership">
      <Script
        id="paypal-membership-sdk"
        src="https://www.paypal.com/sdk/js?client-id=BAAJJgUig6_59X6i5Zo_SUOOQn0lQVplsjSBHTMctSBmeBWyKiRRYRz2YVQaXroZ8a57X2_eRThox_5NxQ&components=hosted-buttons&enable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={renderButton}
        onReady={renderButton}
      />
      <div id={containerId} />
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
