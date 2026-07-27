"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm({ productNames }: { productNames: string[] }) {
  const [sent, setSent] = useState(false);

  // Not wired to a backend yet — swap this for a real submit handler
  // (API route / server action) once lead capture is in scope.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[20px] border border-canopy/10 bg-vellum-dim p-8">
        <p className="font-display text-2xl italic">Message sent.</p>
        <p className="mt-2 text-sm text-canopy/60">
          We read every message ourselves. Expect a reply within two
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name">
          <input
            required
            name="name"
            type="text"
            className="field-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email">
          <input
            required
            name="email"
            type="email"
            className="field-input"
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <Field label="Interested in">
        <select name="product" className="field-input" defaultValue="">
          <option value="" disabled>
            Choose a fixture
          </option>
          <option value="general">General inquiry</option>
          {productNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message">
        <textarea
          required
          name="message"
          rows={5}
          className="field-input resize-none"
          placeholder="Tell us about the space you're lighting."
        />
      </Field>

      <button
        type="submit"
        className="font-mono text-[11px] uppercase tracking-[0.16em] text-vellum bg-canopy rounded-full px-6 py-3 transition-opacity hover:opacity-90"
      >
        Send message
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-canopy/50">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
