import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Deals — Funding, Accelerators & Opportunities",
  description:
    "Curated startup deals, funding rounds, and accelerator opportunities. Automatically sourced and always up to date.",
  openGraph: {
    title: "Startup Deals",
    description: "Find your next startup deal — funding, accelerator, grant, and program opportunities.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}