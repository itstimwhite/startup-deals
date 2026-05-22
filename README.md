# Startup Deals

Curated startup deals, funding rounds, accelerator programs, grants, and competitions — automatically sourced and always up to date.

Built with Next.js, open source under MIT. **[View the live site →](https://startup-deals.vercel.app)**

## How it works

- A scheduled GitHub Action runs every 6 hours to collect deals from multiple sources
- Deals are stored as static JSON in the repo
- Next.js exports a fully static site hosted on Vercel/GitHub Pages
- No database, no servers, no cost

## Data sources

| Source | Type | API Key Required |
|--------|------|------------------|
| Y Combinator | Public API | No |
| Techstars | Static portfolio data | No |
| News API | Startup funding news | Yes (`NEWS_API_KEY`) |
| Curated list | Manually maintained | No |

## Local development

```bash
pnpm install
pnpm dev          # dev server at http://localhost:3000
pnpm run collect  # refresh deals data
pnpm build        # static export to out/
```

## Deployment

Auto-deploys to [Vercel](https://vercel.com) on push to main.

## Adding a deal

Submit a PR adding to the curated list in `scripts/collect-deals.ts` (the `fetchCuratedDeals()` function), or [open an issue](https://github.com/itstimwhite/startup-deals/issues).

## License

MIT — free to use, fork, and contribute.

---

Built by [Tim White](https://github.com/itstimwhite). Part of the [Jovie](https://jovie.ai) ecosystem.