import fs from "fs";
import path from "path";

export interface ContactLead {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

export function getContactLeads(): ContactLead[] {
  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, "[]");
  }

  return JSON.parse(fs.readFileSync(leadsFilePath, "utf8")) as ContactLead[];
}

export function saveContactLead(lead: Omit<ContactLead, "submittedAt">) {
  const existingLeads = getContactLeads();
  const newLead: ContactLead = {
    ...lead,
    submittedAt: new Date().toISOString(),
  };

  existingLeads.unshift(newLead);
  fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2));
}
