"use client";

import { useState } from "react";
import { ApplicationForm } from "./application-form";
import { PayPalMembershipButton } from "./paypal-membership";

type Level = { name: string; price: string; subtitle: string; benefits: string[] };
export function MembershipSignup({ levels }: { levels: Level[] }) {
  const [selected, setSelected] = useState(0);
  const [gift, setGift] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const level = levels[selected];
  const amount = level.price.startsWith("$") ? level.price.slice(1) : gift;
  function choose(index: number) {
    setSelected(index);
    document.getElementById("join-online")?.scrollIntoView({ block: "start" });
  }
  return <>
    <div className="membership-levels">
      {levels.map((item, index) => <article className="membership-card" key={item.name}>
        <p className="eyebrow">{item.subtitle}</p><h2>{item.name}</h2>
        <p className="membership-price">{item.price}</p>
        <ul>{item.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
        <button type="button" className="text-link membership-choice" disabled={submitted} onClick={() => choose(index)}>
          Choose {item.name} <b>↓</b>
        </button>
      </article>)}
    </div>
    <section className="membership-application" id="join-online">
      <p className="eyebrow">Join the Society</p>
      <h2>1. Send your membership details.</h2>
      <p>Choose your level and tell us how to contact you. Then complete your payment below.</p>
      <ApplicationForm onAccepted={() => setSubmitted(true)} subject="Iosco Museum Membership Application" button="Send membership details"
        success="Thank you. Your membership details have been submitted. Complete your payment below; submitting this application does not charge you.">
        <div className="form-field"><label htmlFor="member-name">Name *</label><input id="member-name" name="name" autoComplete="name" required maxLength={150} /></div>
        <div className="form-field"><label htmlFor="member-email">Email *</label><input id="member-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div className="form-field"><label htmlFor="member-phone">Phone number</label><input id="member-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="form-field"><label htmlFor="member-level">Membership level *</label>
          <select id="member-level" name="Membership level" value={selected} onChange={event=>setSelected(Number(event.target.value))}>
            {levels.map((item,index)=><option value={index} key={item.name}>{item.name} — {item.price}</option>)}
          </select>
          <input type="hidden" name="Membership type" value={level.name} />
        </div>
        <div className="form-field"><label htmlFor="member-amount">Membership amount (USD) *</label>
          <input id="member-amount" name="Membership amount (USD)" type="number" min="1" max="100000" step="0.01" required
            value={amount} readOnly={level.price.startsWith("$")} onChange={event=>setGift(event.target.value)} />
        </div>
        <input type="hidden" name="Payment status" value="Application only — check PayPal separately for payment" />
      </ApplicationForm>
    </section>
    <section className="join-online" id="membership-payment">
      <div className="join-online__copy">
        <p className="eyebrow eyebrow--light">Secure membership payment</p>
        <h2>2. Pay for your membership.</h2>
        <p aria-live="polite">{level.name}{amount ? ` — $${Number(amount).toFixed(2)}` : " — enter your contribution above"}</p>
        <p>Check your selected membership and amount in the payment form before continuing.</p>
        <p className="secure-note">Payment is processed securely by PayPal. The museum receives a separate payment notification.</p>
      </div>
      <div className="join-online__payment">
        <PayPalMembershipButton amount={amount} membershipType={level.name} />
        <a className="paypal-fallback-link" href="https://www.paypal.com/ncp/payment/YQSQJPLMMF6BL" target="_blank" rel="noreferrer">Open secure membership checkout ↗</a>
        <p className="payment-help">Using the separate checkout link? Enter {level.name} and {amount ? `$${Number(amount).toFixed(2)}` : "your contribution amount"} there.</p>
      </div>
    </section>
  </>;
}
