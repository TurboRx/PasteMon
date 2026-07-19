import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PasteMon — Pokemon Showdown Team Sharing",
  description:
    "Share, browse, and analyze Pokemon Showdown teams with a modern visual team builder. Paste your team export and get beautiful previews with sprites, stats, and shareable links.",
  keywords: [
    "Pokemon", "Showdown", "team builder", "paste",
    "competitive pokemon", "team sharing",
  ],
  openGraph: {
    title: "PasteMon — Pokemon Showdown Team Sharing",
    description: "Share, browse, and analyze Pokemon Showdown teams with a modern visual team builder.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark-900 text-dark-100 noise-overlay bg-grid antialiased">
        <header className="sticky top-0 z-50 glass-strong border-b border-dark-700/50">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <a href="/" className="group flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink shadow-lg shadow-accent-purple/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent-purple">
                Paste<span className="gradient-text">Mon</span>
              </span>
            </a>
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="/browse" className="text-sm font-medium text-dark-200 transition-colors hover:text-white">
                Browse
              </a>
              <a href="/new" className="btn-primary text-sm py-2 px-4 sm:py-auto sm:px-6">
                + New Paste
              </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>

        <footer className="mt-16 border-t border-dark-700 py-8 text-center text-sm text-dark-300 sm:mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p>PasteMon &mdash; Pokemon Showdown Team Sharing Platform</p>
            <p className="mt-1 text-dark-400">Not affiliated with Pokemon or Smogon. Pokemon is a trademark of Nintendo.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
