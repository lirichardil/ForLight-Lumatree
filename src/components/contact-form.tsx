"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ENQUIRY_EMAIL, ENQUIRY_ENDPOINT } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "handed-off" | "error";

type Enquiry = {
  name: string;
  email: string;
  product: string;
  message: string;
};

/**
 * Composes the enquiry as a mail-client draft.
 *
 * The fallback when no form backend is configured. It is not as smooth as an
 * inline post, but it actually delivers, which the previous behaviour did not:
 * the form used to wait 600ms and then say "Message sent" while sending
 * nothing anywhere. A lead quietly dropped on a page whose whole job is lead
 * capture is worse than a slightly clumsy hand-off.
 */
function mailtoHref({ name, email, product, message }: Enquiry): string {
  const subject = product && product !== "general" ? `Enquiry: ${product}` : "Enquiry";
  const body = [
    message,
    "",
    "—",
    `From: ${name}`,
    `Reply to: ${email}`,
    product ? `Fixture: ${product}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ productNames }: { productNames: string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  /**
   * Two delivery paths, picked by whether a backend is configured.
   *
   * Configured: POST the enquiry and report what actually happened.
   * Unconfigured: hand the message to the visitor's mail client and say so.
   *
   * A server action would be the obvious third option, but it would not
   * survive `STATIC_EXPORT=1`, which exists precisely so this site can be
   * handed to someone as a working preview. See next.config.ts.
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const enquiry: Enquiry = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      product: String(data.get("product") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    if (!ENQUIRY_ENDPOINT) {
      window.location.href = mailtoHref(enquiry);
      setStatus("handed-off");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(enquiry),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Outcome title="Message sent.">
        We read enquiries ourselves. Expect a reply within two business days,
        with a specification sheet attached.
      </Outcome>
    );
  }

  if (status === "handed-off") {
    return (
      <Outcome title="Your message is ready to send.">
        We have opened it in your mail client with the details filled in — send
        it to reach us. If nothing opened, write to{" "}
        <a
          href={`mailto:${ENQUIRY_EMAIL}`}
          className="text-ink underline underline-offset-4"
        >
          {ENQUIRY_EMAIL}
        </a>{" "}
        directly.
      </Outcome>
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
        <select
          required
          id="product"
          name="product"
          className="field-input"
          defaultValue=""
        >
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
          aria-describedby="message-help"
          rows={5}
          className="field-input resize-none"
          placeholder="Tell us about the space."
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-[13px] text-[#a3341f]">
          That did not send. Please try again, or write to{" "}
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="underline underline-offset-4"
          >
            {ENQUIRY_EMAIL}
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13px] font-medium whitespace-nowrap text-gallery transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:opacity-55"
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

function Outcome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-ink pt-8">
      <p className="text-2xl tracking-[-0.03em] text-ink">{title}</p>
      <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#5c5c5c]">
        {children}
      </p>
    </div>
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
      {help && (
        <p id={`${htmlFor}-help`} className="mt-2 text-[12px] text-[#6b6b6b]">
          {help}
        </p>
      )}
    </div>
  );
}
