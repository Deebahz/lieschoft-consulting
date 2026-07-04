import { ContactLead } from "@/lib/leadData";

interface LeadsTableProps {
  leads: ContactLead[];
}

export default function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-700">Admin</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Contact leads</h2>
        <p className="mt-2 text-sm text-slate-600">
          See who submitted a contact request through the website.
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No contact requests have been received yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
              {leads.map((lead) => (
                <tr key={`${lead.email}-${lead.submittedAt}`}>
                  <td className="px-4 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-4 py-4">{lead.email}</td>
                  <td className="px-4 py-4 max-w-xl truncate">{lead.message || "—"}</td>
                  <td className="px-4 py-4 text-slate-500">{new Date(lead.submittedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

