"use client";

import { useState } from "react";
import { PayPalMembershipButton } from "./paypal-membership";

type Level = { name: string; price: string; subtitle: string; benefits: string[] };
export function MembershipSignup({ levels }: { levels: Level[] }) {
  const [selected, setSelected] = useState(0);
  const [gift, setGift] = useState("");
  const level = levels[selected];
  const amount = level.price.startsWith("$") ? level.price.slice(1) : gift;
  function choose(index: number) {
    setSelected(index);
    document.getElementById("membership-checkout")?.scrollIntoView({ block: "start" });
  }
  return <>
    <p><strong>Click a membership level below to pay online.</strong> Your membership type and payment amount will fill in automatically. For a Benefactor membership, enter the amount you wish to contribute.</p>
    <div className="membership-levels">
      {levels.map((item, index) => <article className="membership-card" key={item.name}>
        <p className="eyebrow">{item.subtitle}</p><h2>{item.name}</h2>
        <p className="membership-price">{item.price}</p>
        <ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
        <button type="button" className="text-link membership-choice" onClick={() => choose(index)}>
          Choose {item.name} and pay online <b>↓</b>
        </button>
      </article>)}
    </div>
    <span id="join-online" />
    <section className="join-online membership-payment" id="membership-payment">
      <div className="join-online__copy">
        <p className="eyebrow eyebrow--light">Secure membership payment</p>
        <h2>Complete your membership.</h2>
        <p>Pay by card, PayPal, or Venmo. PayPal collects your name and email at checkout.</p>
        <p className="secure-note">The museum receives your membership notification after payment.</p>
      </div>
      <div className="join-online__payment" id="membership-checkout">
        <h3 className="membership-payment__selection" aria-live="polite">{level.name}{amount ? ` — $${Number(amount).toFixed(2)}` : ""}</h3>
        {!level.price.startsWith("$") && <div className="form-field benefactor-amount"><label htmlFor="member-amount">Your contribution (USD)</label>
          <input id="member-amount" type="number" min="1" max="100000" step="0.01" required value={gift} onChange={event=>setGift(event.target.value)} />
        </div>}
        <p className="membership-payment__instruction">Check the amount, then select <strong>Checkout</strong> below to pay by card.</p>
        <PayPalMembershipButton amount={amount} membershipType={level.name} />
        <details className="membership-checkout-help"><summary>Payment form not showing?</summary>
          <a className="paypal-fallback-link" href="https://www.paypal.com/ncp/payment/YQSQJPLMMF6BL" target="_blank" rel="noreferrer">Open secure membership checkout ↗</a>
          <p className="payment-help">Enter {level.name} and {amount ? `$${Number(amount).toFixed(2)}` : "your contribution amount"} in the separate checkout.</p>
        </details>
      </div>
    </section>
  </>;
}
