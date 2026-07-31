"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ productNames }: { productNames: string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  // Not wired to a backend yet. Replace with a server action when lead
  // capture is in scope; the states below already cover the real cycle.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-[--color-ink] pt-8">
        <p className="text-2xl tracking-[-0.03em] text-[--color-ink]">
          Message sent.
        </p>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#5c5c5c]">
          We read enquiries ourselves. Expect a reply within two business
          days, with a specification sheet attached.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            required
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            required
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="field-input"
            placeholder="you@studio.com"
          />
        </Field>
      </div>

      <Field label="Fixture" htmlFor="product">
        <select id="product" name="product" className="field-input" defaultValue="">
          <option value="" disabled>
            Choose a fixture
          </option>
          <option value="general">General enquiry</option>
          {productNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        htmlFor="message"
        help="Room dimensions and ceiling height help us quote accurately."
      >
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className="field-input resize-none"
          placeholder="Tell us about the space."
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-[#a3341f]">
          That did not send. Please try again, or write to us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-[--color-ink] px-6 py-3 text-[13px] font-medium whitespace-nowrap text-[--color-gallery] transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:opacity-55"
      >
        {status === "sending" ? "Sending" : "Send enquiry"}
        <ArrowUpRight
          size={14}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  help,
  children,
}: {
  label: string;
  htmlFor: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[13px] text-[#5c5c5c]">
        {label}
      </label>
      {children}
      {help && <p className="mt-2 text-[12px] text-[#6b6b6b]">{help}</p>}
    </div>
  );
}
