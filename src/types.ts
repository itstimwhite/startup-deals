export interface Deal {
  id: string;
  company: string;
  logo?: string;
  tagline: string;
  dealValue: string;
  dealType: DealType;
  details: string;
  source: string;
  url: string;
  qualification: string;
  categories: string[];
  discoveredAt: string;
  expiresAt?: string;
  featured: boolean;
}

export type DealType = "funding" | "accelerator" | "grant" | "competition" | "program";

export const DEAL_TYPE_LABELS: Record<DealType, string> = {
  funding: "Funding Round",
  accelerator: "Accelerator",
  grant: "Grant",
  competition: "Competition",
  program: "Program",
};

export const DEAL_TYPE_COLORS: Record<DealType, string> = {
  funding: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  accelerator: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  grant: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  competition: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  program: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
};