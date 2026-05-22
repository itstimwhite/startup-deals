"use client";

import { useState, useMemo } from "react";
import type { Deal, DealType } from "@/types";
import { DEAL_TYPE_LABELS } from "@/types";
import { DealCard } from "./DealCard";

const ALL_CATEGORIES = [
  "All",
  "SaaS",
  "AI",
  "Consumer",
  "B2B",
  "Enterprise",
  "Health",
  "Deep Tech",
  "Climate",
  "Gaming",
  "Web3",
  "Hardware",
];

const DEAL_TYPE_FILTERS: (DealType | "all")[] = [
  "all",
  "accelerator",
  "funding",
  "grant",
  "competition",
  "program",
];

export function DealGrid({ deals }: { deals: Deal[] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<DealType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (typeFilter !== "all" && d.dealType !== typeFilter) return false;
      if (categoryFilter !== "All" && !d.categories.includes(categoryFilter))
        return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !d.company.toLowerCase().includes(q) &&
          !d.tagline.toLowerCase().includes(q) &&
          !d.details.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [deals, search, typeFilter, categoryFilter]);

  // Featured first
  const sorted = useMemo(
    () => [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    [filtered]
  );

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search companies, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-surface-700 bg-surface-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-surface-500 outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
          />
        </div>

        {/* Type filter pills */}
        <div className="flex flex-wrap gap-2">
          {DEAL_TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                typeFilter === t
                  ? "bg-accent/15 text-accent-light border border-accent/30"
                  : "bg-surface-800 text-surface-400 border border-surface-700 hover:border-surface-600 hover:text-surface-300"
              }`}
            >
              {t === "all" ? "All Deals" : DEAL_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                categoryFilter === cat
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                  : "bg-surface-850 text-surface-500 border border-surface-700/50 hover:text-surface-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-surface-500">
        {sorted.length} deal{sorted.length !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="mb-4 h-12 w-12 text-surface-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <p className="text-surface-500 text-sm">No deals match your filters</p>
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("all");
              setCategoryFilter("All");
            }}
            className="mt-3 text-xs text-accent hover:text-accent-light transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 border-t border-surface-800 pt-8 text-center">
        <p className="text-xs text-surface-600">
          Deals are automatically sourced and updated daily.{" "}
          <a
            href="https://github.com/itstimwhite/startup-deals"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light transition-colors"
          >
            Contribute on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}