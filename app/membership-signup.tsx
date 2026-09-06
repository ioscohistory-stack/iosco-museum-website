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
    document.getElementById(levels[index].price.startsWith("$") ? "membership-payment" : "join-online")?.scrollIntoView({ block: "start" });
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
    <section className="membership-application" id="join-online">
      <p className="eyebrow">Join the Society</p>
      <h2>1. Choose your membership.</h2>
      <p>Select your level, then complete the secure payment below. PayPal collects your name and email during checkout. The museum receives your paid membership details through PayPal’s payment notification.</p>
      <div className="volunteer-form">
        <div className="form-field"><label htmlFor="member-level">Membership level *</label>
          <select id="member-level" value={selected} onChange={event=>setSelected(Number(event.target.value))}>
            {levels.map((item,index)=><option value={index} key={item.name}>{item.name} — {item.price}</option>)}
          </select>
        </div>
        <div className="form-field"><label htmlFor="member-amount">Membership amount (USD) *</label>
          <input id="member-amount" name="Membership amount (USD)" type="number" min="1" max="100000" step="0.01" required
            value={amount} readOnly={level.price.startsWith("$")} onChange={event=>setGift(event.target.value)} />
        </div>
        <p className="form-help">Choosing a membership here does not send an application. Complete your payment to join.</p>
      </div>
    </section>
    <section className="join-online" id="membership-payment">
      <div className="join-online__copy">
        <p className="eyebrow eyebrow--light">Secure membership payment</p>
        <h2>2. Pay for your membership.</h2>
        <p aria-live="polite">{level.name}{amount ? ` — $${Number(amount).toFixed(2)}` : " — enter your contribution above"}</p>
        <p>Check your selected membership and amount in the payment form before continuing.</p>
        <p className="secure-note">Payment is processed securely by PayPal. Your membership notification is sent to the museum after payment, not when you select a level.</p>
      </div>
      <div className="join-online__payment">
        <PayPalMembershipButton amount={amount} membershipType={level.name} />
        <a className="paypal-fallback-link" href="https://www.paypal.com/ncp/payment/YQSQJPLMMF6BL" target="_blank" rel="noreferrer">Open secure membership checkout ↗</a>
        <p className="payment-help">Using the separate checkout link? Enter {level.name} and {amount ? `$${Number(amount).toFixed(2)}` : "your contribution amount"} there.</p>
      </div>
    </section>
  </>;
}
