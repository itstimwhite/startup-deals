#!/usr/bin/env bash
# ─── Local deal collection (no-agent cron) ──────────────────────
# Runs the collection script and commits any new deals.
# Designed to run as a no-agent Hermes cron.
set -euo pipefail

REPO="$HOME/conductor/repos/startup-deals"

cd "$REPO"

# Pull latest from GitHub first (in case GH Action already updated)
git pull --rebase origin main 2>/dev/null || true

# Run the collection script
pnpm install --silent 2>/dev/null || true
npx tsx scripts/collect-deals.ts

# Commit if anything changed
if ! git diff --quiet; then
  git add -A
  git commit -m "chore: refresh startup deals [automated]"
  git push origin main
  echo "Deals updated and pushed"
else
  echo "No new deals"
fi