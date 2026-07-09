"use client";

import { useState } from "react";
import { CheckIcon, ArrowRightIcon } from "@/components/Icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="glass flex h-full flex-col items-center justify-center rounded-3xl p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold">Message ready</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out! Connect this form to your email service or
          backend to start receiving messages.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-ghost mt-6"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="glass rounded-3xl p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Jane Doe" />
        <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
      </div>
      <Field label="Subject" name="subject" placeholder="How can we help?" className="mt-4" />
      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us what's on your mind…"
          className="mt-2 w-full resize-none rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-accent/50"
        />
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send Message <ArrowRightIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm outline-none transition focus:border-accent/50"
      />
    </div>
  );
}
