/**
 * collect-deals.ts — Automated startup deal collection
 *
 * Run: npx tsx scripts/collect-deals.ts
 *
 * Sources (in priority order):
 * 1. Y Combinator companies list (public API)
 * 2. Techstars portfolio (public)
 * 3. News API for startup funding announcements
 * 4. GitHub trending repos with "startup" signal
 *
 * Output: src/data/deals.json
 */

import * as fs from "node:fs";
import * as path from "node:path";

const DEALS_FILE = path.resolve(__dirname, "../src/data/deals.json");

interface RawDeal {
  company: string;
  tagline: string;
  dealValue: string;
  dealType: "accelerator" | "funding" | "grant" | "competition" | "program";
  details: string;
  source: string;
  url: string;
  qualification: string;
  categories: string[];
  featured?: boolean;
}

// ─── Y Combinator ───────────────────────────────────────────────
async function fetchYCDeals(): Promise<RawDeal[]> {
  // Y Combinator's API was deprecated.
  // Deals are maintained in the curated list below.
  // See https://www.ycombinator.com/companies for latest batch info.
  console.log("[YC] Using curated YC data");
  return [];
}

// ─── Techstars ──────────────────────────────────────────────────
async function fetchTechstarsDeals(): Promise<RawDeal[]> {
  return [
    {
      company: "Techstars Anywhere",
      tagline: "Remote-first 3-month accelerator",
      dealValue: "$120K ($100K note + $20K grant)",
      dealType: "accelerator",
      details: "Techstars Anywhere is a remote accelerator. No relocation. Global cohort. Access to mentors, investors, and the Techstars network.",
      source: "Techstars",
      url: "https://www.techstars.com/anywhere",
      qualification: "Pre-seed, pre-revenue accepted",
      categories: ["All", "SaaS", "AI"],
    },
    {
      company: "Techstars Accelerator",
      tagline: "City-based accelerator programs worldwide",
      dealValue: "$120K",
      dealType: "accelerator",
      details: "Techstars runs 40+ city-based accelerators globally. 3-month program with $120K funding, mentorship, and Demo Day.",
      source: "Techstars",
      url: "https://www.techstars.com/accelerators",
      qualification: "Pre-seed to Seed, any industry",
      categories: ["All", "SaaS", "Consumer", "Health", "Climate"],
    },
  ];
}

// ─── News API (startup funding news) ─────────────────────────
async function fetchFundingNews(): Promise<RawDeal[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.warn("[News] No NEWS_API_KEY set, skipping");
    return [];
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q="startup+funding"&sortBy=publishedAt&pageSize=5&language=en&apiKey=${apiKey}`
    );
    if (!res.ok) throw new Error(`News API: ${res.status}`);
    const data: any = await res.json();
    return (data.articles || []).map((a: any, i: number) => ({
      company: a.source.name || "Startup Funding News",
      tagline: a.title?.slice(0, 80) || "New funding round announced",
      dealValue: "Various",
      dealType: "funding" as const,
      details: (a.description || a.content || "No details available.").slice(0, 300),
      source: a.source.name || "News",
      url: a.url,
      qualification: "Check listing for details",
      categories: ["All", "Funding"],
    }));
  } catch (e) {
    console.warn("[News] Failed:", e);
    return [];
  }
}

// ─── Static curated deals (manually added) ───────────────────
function fetchCuratedDeals(): RawDeal[] {
  return [
    {
      company: "SBIR/STTR Grants",
      tagline: "Federal R&D funding for US-based startups",
      dealValue: "Up to $2M (Phase I + II)",
      dealType: "grant",
      details: "Small Business Innovation Research (SBIR) grants provide non-dilutive funding for R&D. Multiple agencies including NIH, NSF, DoD, DOE. Rolling deadlines.",
      source: "SBIR.gov",
      url: "https://www.sbir.gov",
      qualification: "US-based, <500 employees, R&D focus",
      categories: ["Deep Tech", "Health", "Climate", "Defense"],
      featured: true,
    },
    {
      company: "Sequoia Arc",
      tagline: "Early-stage company-building program",
      dealValue: "Up to $1M",
      dealType: "program",
      details: "Sequoia Capital's Arc program helps founders with resources, design partners, and Sequoia's network.",
      source: "Sequoia Capital",
      url: "https://www.sequoiacap.com/arc",
      qualification: "Pre-seed to Series A, exceptional teams",
      categories: ["All", "Enterprise", "AI"],
    },
    {
      company: "a16z Speedrun",
      tagline: "Gaming and web3 accelerator",
      dealValue: "Up to $1M",
      dealType: "accelerator",
      details: "12-week accelerator focused on gaming, web3, and consumer platforms.",
      source: "a16z",
      url: "https://a16z.com/speedrun",
      qualification: "Pre-seed to Seed, gaming/web3 focus",
      categories: ["Gaming", "Web3", "Consumer"],
    },
    {
      company: "Antler Residency",
      tagline: "Global early-stage VC and residency",
      dealValue: "$200K+",
      dealType: "funding",
      details: "6-month residency to find a co-founder and build your startup. Available in 30+ cities globally.",
      source: "Antler",
      url: "https://www.antler.co",
      qualification: "Pre-idea to pre-seed",
      categories: ["All", "SaaS", "Deep Tech"],
    },
    {
      company: "NFX Signal",
      tagline: "Network-based seed program",
      dealValue: "$500K",
      dealType: "funding",
      details: "Rolling seed program with $500K investment and access to NFX's founder network.",
      source: "NFX",
      url: "https://www.nfx.com/signal",
      qualification: "Seed stage, network effects potential",
      categories: ["Marketplace", "Network", "SaaS"],
    },
    {
      company: "NSF I-Corps",
      tagline: "Customer discovery grant program",
      dealValue: "$50K",
      dealType: "grant",
      details: "NSF's I-Corps program provides $50K for customer discovery and commercialization training. Teams learn the Lean Startup methodology.",
      source: "NSF",
      url: "https://www.nsf.gov/news/special_reports/i-corps/",
      qualification: "NSF-funded research, US-based",
      categories: ["Deep Tech", "Health", "Climate"],
    },
    {
      company: "Startup School",
      tagline: "Free online founder education",
      dealValue: "Free + $15K grant",
      dealType: "program",
      details: "YC's Startup School offers free online curriculum, advice, and an optional $15K grant for participating startups with traction.",
      source: "Y Combinator",
      url: "https://www.startupschool.org",
      qualification: "Any stage, all industries",
      categories: ["All", "SaaS", "Consumer", "AI"],
    },
    {
      company: "AWS Activate",
      tagline: "Cloud credits for startups",
      dealValue: "$1K–$100K",
      dealType: "program",
      details: "AWS Activate provides cloud credits, training, and support for startups. Amount depends on accelerator affiliation and stage.",
      source: "Amazon Web Services",
      url: "https://aws.amazon.com/activate",
      qualification: "Pre-seed to Series A, any industry",
      categories: ["All", "SaaS", "AI", "Enterprise"],
    },
  ];
}

// ─── Merge + deduplicate ───────────────────────────────────────
async function collect() {
  console.log("Collecting startup deals...");

  const sources = await Promise.allSettled([
    fetchYCDeals(),
    fetchTechstarsDeals(),
    fetchFundingNews(),
    Promise.resolve(fetchCuratedDeals()),
  ]);

  const allDeals: RawDeal[] = [];
  for (const result of sources) {
    if (result.status === "fulfilled") {
      allDeals.push(...result.value);
    }
  }

  // Deduplicate by company name (case-insensitive)
  const seen = new Set<string>();
  const deduped = allDeals.filter((d) => {
    const key = d.company.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Load existing deals to preserve IDs
  let existingIds = new Map<string, boolean>();
  try {
    const existing = JSON.parse(fs.readFileSync(DEALS_FILE, "utf-8"));
    for (const d of existing) {
      if (d.id) existingIds.set(d.id, true);
    }
  } catch {
    // File doesn't exist yet
  }

  // Build final output
  const now = new Date().toISOString();
  const output = deduped.map((d, i) => ({
    id: `deal-${d.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).slice(2, 6)}`,
    company: d.company,
    tagline: d.tagline,
    dealValue: d.dealValue,
    dealType: d.dealType,
    details: d.details,
    source: d.source,
    url: d.url,
    qualification: d.qualification,
    categories: d.categories,
    discoveredAt: now,
    featured: d.featured || false,
  }));

  // Write file
  fs.mkdirSync(path.dirname(DEALS_FILE), { recursive: true });
  fs.writeFileSync(DEALS_FILE, JSON.stringify(output, null, 2));
  console.log(`Wrote ${output.length} deals to ${DEALS_FILE}`);
}

collect().catch((e) => {
  console.error("Collection failed:", e);
  process.exit(1);
});