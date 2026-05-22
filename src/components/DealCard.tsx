"use client";

import { type Deal, DEAL_TYPE_LABELS, DEAL_TYPE_COLORS } from "@/types";
import { useState } from "react";

export function DealCard({ deal }: { deal: Deal }) {
  const [expanded, setExpanded] = useState(false);

  const catColors = [
    "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    "bg-teal-500/10 text-teal-300 border-teal-500/20",
    "bg-pink-500/10 text-pink-300 border-pink-500/20",
    "bg-orange-500/10 text-orange-300 border-orange-500/20",
    "bg-lime-500/10 text-lime-300 border-lime-500/20",
  ];

  return (
    <div className="group relative rounded-xl border border-surface-700/50 bg-surface-900/60 backdrop-blur-sm transition-all duration-300 hover:border-surface-600 hover:bg-surface-900/80 hover:shadow-lg hover:shadow-accent/5">
      {/* Feature badge */}
      {deal.featured && (
        <div className="absolute -top-px -right-px rounded-bl-xl rounded-tr-xl bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light border border-accent/20">
          Featured
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Top row: tag + deal value */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${DEAL_TYPE_COLORS[deal.dealType]}`}
          >
            {DEAL_TYPE_LABELS[deal.dealType]}
          </span>
          <span className="text-sm font-semibold text-emerald-400">
            {deal.dealValue}
          </span>
        </div>

        {/* Company + tagline */}
        <h3 className="mb-1 text-lg font-semibold text-white">{deal.company}</h3>
        <p className="mb-3 text-sm text-surface-400">{deal.tagline}</p>

        {/* Details */}
        <div className="mb-4 text-sm text-surface-300 leading-relaxed">
          {expanded || deal.details.length <= 120
            ? deal.details
            : `${deal.details.slice(0, 120)}...`}
          {deal.details.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-accent hover:text-accent-light text-xs transition-colors"
            >
              {expanded ? "show less" : "read more"}
            </button>
          )}
        </div>

        {/* Qualification */}
        <div className="mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-surface-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span className="text-xs text-surface-500">{deal.qualification}</span>
        </div>

        {/* Categories */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {deal.categories.map((cat, i) => (
            <span
              key={cat}
              className={`inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                catColors[i % catColors.length]
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={deal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-cta-hover hover:scale-[1.02] active:scale-[0.98]"
        >
          Get This Deal
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>

        {/* Source credit */}
        <p className="mt-3 text-[11px] text-surface-600 text-center">
          Sourced from {deal.source} &middot;{" "}
          {new Date(deal.discoveredAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}