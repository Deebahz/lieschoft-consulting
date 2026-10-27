import Container from "@/components/ui/Container";
import InsightsEditor from "@/components/admin/InsightsEditor";
import LeadsTable from "@/components/admin/LeadsTable";
import OpenPositionsEditor from "@/components/admin/OpenPositionsEditor";
import { getContactLeads } from "@/lib/leadData";
import { getInsights } from "@/lib/insightsData";
import { getSiteData } from "@/lib/siteData";

export default async function AdminPage() {
  const siteData = getSiteData();
  const leads = getContactLeads();
  const insights = await getInsights();

  return (
    <main className="bg-slate-50 py-24 min-h-screen">
      <Container>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="rounded-4xl border border-slate-200 bg-white p-10 shadow-xl">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-700">Admin</p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-950">Edit site content</h1>
              <p className="text-slate-600">
                Manage open positions and insights articles, and see inbound contact requests.
              </p>
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-10">
              <OpenPositionsEditor positions={siteData.openPositions} />
              <InsightsEditor insights={insights} />
            </div>

            <LeadsTable leads={leads} />
          </div>
        </div>
      </Container>
    </main>
  );
}

