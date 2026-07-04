"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setIsSending(true);

    const response = await fetch("/contact/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result?.error || "Something went wrong.");
    } else {
      setStatus(result?.message || "Your message has been sent.");
      setName("");
      setEmail("");
      setMessage("");
    }

    setIsSending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input
            id="contact-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="sr-only">Project details</label>
          <textarea
            id="contact-message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Project details"
            className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          {status ? <p className="text-sm font-medium text-stone-700">{status}</p> : null}
          {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center justify-center rounded-3xl bg-stone-700 px-7 py-4 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

