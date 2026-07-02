"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

const REASONS = ["Buying", "Renting", "Selling my property", "Property management", "Something else"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  if (submitted) {
    return (
      <div className={styles.success}>
        <i className="ph-fill ph-check-circle" aria-hidden />
        <h3>Thanks{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
        <p>
          A specialist will get back to you within one business day. In the meantime, feel free to
          browse listings or call us directly.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Full name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input required type="email" placeholder="you@example.com" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Phone</span>
          <input type="tel" placeholder="+971 5X XXX XXXX" />
        </label>
        <label className={styles.field}>
          <span>I&apos;m interested in</span>
          <select defaultValue={REASONS[0]}>
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.field}>
        <span>Message</span>
        <textarea required rows={5} placeholder="Tell us a little about what you're looking for" />
      </label>

      <button type="submit" className={styles.submit}>
        Send message <i className="ph ph-arrow-right" aria-hidden />
      </button>
      <p className={styles.disclaimer}>
        This is a demo form — messages aren&apos;t actually sent anywhere. For a real enquiry, use the
        contact details alongside.
      </p>
    </form>
  );
}
