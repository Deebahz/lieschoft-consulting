"use client";

import { useState } from "react";

interface CaseStudyEntry {
  title: string;
  summary: string;
  slug: string;
  content: string;
}

interface CaseStudiesEditorProps {
  caseStudies: CaseStudyEntry[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CaseStudiesEditor({ caseStudies }: CaseStudiesEditorProps) {
  const [items, setItems] = useState<CaseStudyEntry[]>(
    caseStudies.length > 0 ? caseStudies : [{ title: "", summary: "", slug: "", content: "" }]
  );
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function updateItem(index: number, field: keyof CaseStudyEntry, value: string) {
    setItems((current) =>
      current.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  }

  function addItem() {
    setItems((current) => [...current, { title: "", summary: "", slug: "", content: "" }]);
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, idx) => idx !== index));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setIsSaving(true);

    const filtered = items
      .map((item) => ({
        title: item.title.trim(),
        summary: item.summary.trim(),
        slug: item.slug.trim() || slugify(item.title),
        content: item.content.trim(),
      }))
      .filter((item) => item.title && item.summary);

    const response = await fetch("/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "caseStudies", value: filtered }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result?.error || "Unable to save case studies.");
    } else {
      setStatus(result?.message || "Case studies saved successfully.");
      setItems(filtered.length > 0 ? filtered : [{ title: "", summary: "", slug: "", content: "" }]);
    }

    setIsSaving(false);
  }

  return (
    <section className="rounded-4xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-700">Admin</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Case studies</h2>
        <p className="mt-2 text-sm text-slate-600">
          Edit article titles, summaries, URLs, and full case study content.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-slate-900">Case study {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-3xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                Remove
              </button>
            </div>

            <input
              value={item.title}
              onChange={(event) => updateItem(index, "title", event.target.value)}
              placeholder="Article title"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <input
              value={item.slug}
              onChange={(event) => updateItem(index, "slug", event.target.value)}
              placeholder="Slug (URL path)"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <textarea
              value={item.summary}
              onChange={(event) => updateItem(index, "summary", event.target.value)}
              placeholder="Short summary"
              rows={3}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <textarea
              value={item.content}
              onChange={(event) => updateItem(index, "content", event.target.value)}
              placeholder="Full article content"
              rows={8}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addItem}
            className="rounded-3xl bg-white px-5 py-3 text-sm font-medium text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100"
          >
            Add case study
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-3xl bg-stone-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving…" : "Save case studies"}
          </button>
        </div>

        <div className="space-y-2">
          {status ? <p className="text-sm font-medium text-stone-700">{status}</p> : null}
          {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        </div>
      </form>
    </section>
  );
}

