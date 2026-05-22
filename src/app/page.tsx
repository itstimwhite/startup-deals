import dealsData from "@/data/deals.json";
import { DealGrid } from "@/components/DealGrid";
import type { Deal } from "@/types";

export default function Home() {
  const deals = dealsData as Deal[];

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Header */}
      <header className="border-b border-surface-800/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent-light border border-accent/20">
              Updated daily &middot; Open source
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Startup{" "}
              <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Deals
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-surface-400 sm:text-base">
              Curated funding rounds, accelerator programs, grants, and
              competitions for founders. Automatically sourced and always
              up to date.
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DealGrid deals={deals} />
      </main>
    </div>
  );
}