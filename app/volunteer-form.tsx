"use client";

import { ApplicationForm } from "./application-form";

export function VolunteerForm() {
  return (
    <ApplicationForm subject="Iosco Museum Volunteer Application" button="Send volunteer application" success="Thank you for offering your time. The museum will contact you about volunteer opportunities.">
      <div className="form-field form-field--full">
        <label htmlFor="volunteer-name">Name *</label>
        <input id="volunteer-name" name="name" type="text" required />
      </div>
      <div className="form-field">
        <label htmlFor="volunteer-phone">Phone number *</label>
        <input id="volunteer-phone" name="phone" type="tel" required />
      </div>
      <div className="form-field">
        <label htmlFor="volunteer-email">Email *</label>
        <input id="volunteer-email" name="email" type="email" required />
      </div>
      <div className="form-field">
        <label htmlFor="volunteer-interest">Area of interest</label>
        <select id="volunteer-interest" name="interest" defaultValue="">
          <option value="" disabled>
            Choose an opportunity
          </option>
          <option>Museum guides</option>
          <option>Collections & archives</option>
          <option>Research assistance</option>
          <option>Events & programs</option>
          <option>Grounds & maintenance</option>
          <option>Wherever help is needed</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="volunteer-availability">Availability</label>
        <select id="volunteer-availability" name="availability" defaultValue="">
          <option value="" disabled>
            Choose your availability
          </option>
          <option>A few hours per month</option>
          <option>Weekly</option>
          <option>Special events</option>
          <option>Seasonal or project-based</option>
          <option>Flexible / please contact me</option>
        </select>
      </div>
      <div className="form-field form-field--full">
        <label htmlFor="volunteer-comments">
          Tell us how you would like to help
        </label>
        <textarea id="volunteer-comments" name="comments" rows={5} />
      </div>
    </ApplicationForm>
  );
}
