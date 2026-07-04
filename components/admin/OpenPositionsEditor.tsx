"use client";

import { useState } from "react";

interface PositionData {
  title: string;
  responsibilities: string[];
  requirements: string[];
}

interface OpenPositionsEditorProps {
  positions: PositionData[];
}

export default function OpenPositionsEditor({ positions }: OpenPositionsEditorProps) {
  const [items, setItems] = useState<PositionData[]>(
    positions.length > 0
      ? positions
      : [
          {
            title: "",
            responsibilities: [""],
            requirements: [""],
          },
        ]
  );
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function updateField(index: number, field: keyof PositionData, value: string[] | string) {
    setItems((current) =>
      current.map((item, idx) =>
        idx === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  }

  function updateTitle(index: number, value: string) {
    updateField(index, "title", value);
  }

  function updateResponsibilities(positionIndex: number, responsibilityIndex: number, value: string) {
    setItems((current) =>
      current.map((item, idx) => {
        if (idx !== positionIndex) return item;
        const responsibilities = item.responsibilities.map((responsibility, rIdx) =>
          rIdx === responsibilityIndex ? value : responsibility
        );
        return { ...item, responsibilities };
      })
    );
  }

  function updateRequirements(positionIndex: number, requirementIndex: number, value: string) {
    setItems((current) =>
      current.map((item, idx) => {
        if (idx !== positionIndex) return item;
        const requirements = item.requirements.map((requirement, rIdx) =>
          rIdx === requirementIndex ? value : requirement
        );
        return { ...item, requirements };
      })
    );
  }

  function addPosition() {
    setItems((current) => [
      ...current,
      {
        title: "",
        responsibilities: [""],
        requirements: [""],
      },
    ]);
  }

  function removePosition(index: number) {
    setItems((current) => current.filter((_, idx) => idx !== index));
  }

  function addResponsibility(positionIndex: number) {
    setItems((current) =>
      current.map((item, idx) =>
        idx === positionIndex
          ? { ...item, responsibilities: [...item.responsibilities, ""] }
          : item
      )
    );
  }

  function addRequirement(positionIndex: number) {
    setItems((current) =>
      current.map((item, idx) =>
        idx === positionIndex
          ? { ...item, requirements: [...item.requirements, ""] }
          : item
      )
    );
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setError(null);
    setIsSaving(true);

    const filtered = items
      .map((item) => ({
        title: item.title.trim(),
        responsibilities: item.responsibilities.map((r) => r.trim()).filter(Boolean),
        requirements: item.requirements.map((r) => r.trim()).filter(Boolean),
      }))
      .filter((item) => item.title);

    const response = await fetch("/admin/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "openPositions", value: filtered }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result?.error || "Unable to save open positions.");
    } else {
      setStatus(result?.message || "Open positions saved successfully.");
      setItems(filtered.length > 0 ? filtered : [
        {
          title: "",
          responsibilities: [""],
          requirements: [""],
        },
      ]);
    }

    setIsSaving(false);
  }

  return (
    <section className="rounded-4xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-700">Admin</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Open positions</h2>
        <p className="mt-2 text-sm text-slate-600">
          Manage the careers page openings, responsibilities, and requirements.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {items.map((position, index) => (
          <div key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-medium text-slate-900">Position {index + 1}</h3>
              <button
                type="button"
                onClick={() => removePosition(index)}
                className="rounded-3xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
              >
                Remove
              </button>
            </div>

            <input
              value={position.title}
              onChange={(event) => updateTitle(index, event.target.value)}
              placeholder="Role title"
              className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900"
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900">Responsibilities</h4>
                  <button
                    type="button"
                    onClick={() => addResponsibility(index)}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {position.responsibilities.map((responsibility, rIndex) => (
                    <input
                      key={rIndex}
                      value={responsibility}
                      onChange={(event) => updateResponsibilities(index, rIndex, event.target.value)}
                      placeholder="Responsibility"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900">Requirements</h4>
                  <button
                    type="button"
                    onClick={() => addRequirement(index)}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-3">
                  {position.requirements.map((requirement, rIndex) => (
                    <input
                      key={rIndex}
                      value={requirement}
                      onChange={(event) => updateRequirements(index, rIndex, event.target.value)}
                      placeholder="Requirement"
                      className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={addPosition}
            className="rounded-3xl bg-white px-5 py-3 text-sm font-medium text-slate-900 ring-1 ring-slate-300 transition hover:bg-slate-100"
          >
            Add position
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-3xl bg-stone-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSaving ? "Saving…" : "Save positions"}
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

