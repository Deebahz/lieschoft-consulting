"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AdminJsonEditorProps {
  initialJson: string;
}

export default function AdminJsonEditor({ initialJson }: AdminJsonEditorProps) {
  const [siteJson, setSiteJson] = useState(initialJson);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setIsSaving(true);

    try {
      JSON.parse(siteJson);
    } catch (err) {
      setError("Invalid JSON format. Please fix the document before saving.");
      setIsSaving(false);
      return;
    }

    const response = await fetch("/admin/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ siteJson }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result?.error || "Unable to save site content.");
    } else {
      setStatus(result?.message || "Site content saved successfully.");
      router.refresh();
    }

    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <label htmlFor="site-json" className="mb-2 block text-sm font-medium text-slate-900">
          Site content JSON
        </label>
        <p className="mb-4 text-sm text-slate-600">
          Edit the full site configuration in JSON format. Use the site structure already loaded from <code>data/site.json</code>.
        </p>
        <textarea
          id="site-json"
          value={siteJson}
          onChange={(event) => setSiteJson(event.target.value)}
          className="min-h-[520px] w-full rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm text-slate-900 shadow-sm focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500/20"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          {status ? <p className="text-sm font-medium text-stone-700">{status}</p> : null}
          {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center rounded-xl bg-stone-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSaving ? "Saving…" : "Save site content"}
        </button>
      </div>
    </form>
  );
}

