"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InsightData } from "@/lib/siteData";

interface InsightsEditorProps {
  insights: InsightData[];
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function InsightsEditor({ insights }: InsightsEditorProps) {
  const [items, setItems] = useState<InsightData[]>(insights);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  function updateItem(index: number, field: keyof InsightData, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item
      )
    );
  }

  function addItem() {
    setItems((current) => [...current, { title: "", excerpt: "" }]);
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);

    const updatedInsights = items.map((item) => ({
      title: item.title.trim(),
      slug: item.slug.trim() || slugify(item.title),
      excerpt: item.excerpt.trim(),
      content: item.content.trim(),
    }));

    const slugs = updatedInsights.map((item) => item.slug);
    if (
      updatedInsights.some((item) => !item.title || !item.slug || !item.excerpt || !item.content) ||
      slugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) ||
      new Set(slugs).size !== slugs.length
    ) {
      setError("Each article needs a title, unique URL slug, excerpt, and full content.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "insights", value: updatedInsights }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result?.error || "Unable to save insights.");
        return;
      }

      setItems(updatedInsights);
      setStatus(result?.message || "Insights saved successfully.");
      router.refresh();
    } catch {
      setError("Unable to save articles.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-4xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-700">Admin</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Insights</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add and edit articles shown on the homepage and Insights page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-slate-900">Article {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-3xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                Remove
              </button>
            </div>

            <input
              required
              maxLength={160}
              value={item.title}
              onChange={(event) => updateItem(index, "title", event.target.value)}
              placeholder="Article title"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <input
              maxLength={120}
              value={item.slug}
              onChange={(event) => updateItem(index, "slug", event.target.value)}
              placeholder="URL slug (optional, generated from the title)"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <textarea
              required
              maxLength={1000}
              value={item.excerpt}
              onChange={(event) => updateItem(index, "excerpt", event.target.value)}
              placeholder="Article excerpt"
              rows={3}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <textarea
              required
              maxLength={20000}
              value={item.content}
              onChange={(event) => updateItem(index, "content", event.target.value)}
              placeholder="Full article content. Separate paragraphs with a blank line."
              rows={10}
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900"
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addItem}
            className="rounded-3xl bg-white px-5 py-3 text-sm font-medium text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100"
          >
            Add article
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-3xl bg-stone-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving…" : "Save articles"}
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