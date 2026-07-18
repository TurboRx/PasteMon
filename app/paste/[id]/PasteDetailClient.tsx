"use client";

import { useState } from "react";
import TeamPreview from "@/components/TeamPreview";
import { ParsedTeam } from "@/lib/pokemon";

interface PasteData {
  id: string;
  title: string;
  author: string;
  format: string;
  content: string;
  createdAt: string;
  views?: number;
}

export default function PasteDetailClient({ paste, team }: { paste: PasteData; team: ParsedTeam }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [pasteCopied, setPasteCopied] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const copyPaste = async () => {
    await navigator.clipboard.writeText(paste.content);
    setPasteCopied(true);
    setTimeout(() => setPasteCopied(false), 2000);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const FORMAT_LABELS: Record<string, string> = {
    gen9: "Gen 9", gen9ou: "Gen 9 OU", gen9uu: "Gen 9 UU", gen9vgc: "Gen 9 VGC",
    gen8: "Gen 8", gen7: "Gen 7", gen6: "Gen 6", gen5: "Gen 5", other: "Other",
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{paste.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-dark-300">
              <span>by <span className="font-medium text-dark-200">{paste.author}</span></span>
              <span className="text-dark-500">·</span>
              <span>{formatDate(paste.createdAt)}</span>
              <span className="text-dark-500">·</span>
              <span className="rounded-lg bg-dark-700 px-2.5 py-0.5 text-xs font-medium text-accent-blue">
                {FORMAT_LABELS[paste.format] || paste.format}
              </span>
              {paste.views !== undefined && paste.views > 0 && (
                <>
                  <span className="text-dark-500">·</span>
                  <span>{paste.views} view{paste.views !== 1 ? "s" : ""}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={copyLink} className="btn-secondary text-sm">
              {linkCopied ? "✓ Copied!" : "🔗 Copy Link"}
            </button>
            <button onClick={copyPaste} className="btn-secondary text-sm">
              {pasteCopied ? "✓ Copied!" : "📋 Copy Paste"}
            </button>
            <button onClick={() => setShowRaw(!showRaw)} className="btn-secondary text-sm">
              {showRaw ? "🎨 Visual" : "📝 Raw"}
            </button>
          </div>
        </div>
      </div>

      {showRaw ? (
        <div className="glass rounded-2xl p-6">
          <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-dark-100">
            {paste.content}
          </pre>
        </div>
      ) : (
        <TeamPreview team={team} showExport />
      )}
    </div>
  );
}
