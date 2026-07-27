"use client";

import Script from "next/script";
import { useCallback, useRef } from "react";

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (options: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}

const buttonId = "2YA6BRLV2VYS2";
const containerId = `paypal-container-${buttonId}`;

export function PayPalMuseumCheckoutButton() {
  const rendered = useRef(false);

  const renderButton = useCallback(() => {
    if (!window.paypal || rendered.current) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    container.replaceChildren();
    window.paypal
      .HostedButtons({ hostedButtonId: buttonId })
      .render(`#${containerId}`);
    rendered.current = true;
  }, []);

  return (
    <div className="paypal-membership">
      <Script
        id="paypal-museum-checkout-sdk"
        src="https://www.paypal.com/sdk/js?client-id=BAAJJgUig6_59X6i5Zo_SUOOQn0lQVplsjSBHTMctSBmeBWyKiRRYRz2YVQaXroZ8a57X2_eRThox_5NxQ&components=hosted-buttons&enable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={renderButton}
        onReady={renderButton}
      />
      <div id={containerId} />
      <noscript>
        <a
          className="button button--brick"
          href="https://www.paypal.com/ncp/payment/2YA6BRLV2VYS2"
        >
          Open secure checkout
        </a>
      </noscript>
    </div>
  );
}
