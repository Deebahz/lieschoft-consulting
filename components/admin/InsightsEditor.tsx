"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InsightData } from "@/lib/siteData";

interface InsightsEditorProps {
  insights: InsightData[];
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
      excerpt: item.excerpt.trim(),
    }));

    if (updatedInsights.some((item) => !item.title || !item.excerpt)) {
      setError("Each insight needs a title and excerpt.");
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
      setError("Unable to save insights.");
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
          Manage the insight cards shown on the homepage and Insights page.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-slate-900">Insight {index + 1}</h3>
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
              value={item.title}
              onChange={(event) => updateItem(index, "title", event.target.value)}
              placeholder="Insight title"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <textarea
              required
              value={item.excerpt}
              onChange={(event) => updateItem(index, "excerpt", event.target.value)}
              placeholder="Short excerpt"
              rows={3}
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
            Add insight
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-3xl bg-stone-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving…" : "Save insights"}
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