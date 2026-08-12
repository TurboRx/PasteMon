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

const FORMAT_LABELS: Record<string, string> = {
  gen9: "Gen 9", gen9ou: "Gen 9 OU", gen9uu: "Gen 9 UU", gen9vgc: "Gen 9 VGC",
  gen8: "Gen 8", gen7: "Gen 7", gen6: "Gen 6", gen5: "Gen 5", other: "Other",
};

import { getShortLink } from "@/lib/urlPaste";

export default function PasteDetailClient({ paste, team }: { paste: PasteData; team: ParsedTeam }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [generatingShort, setGeneratingShort] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const copyLink = async () => {
    setGeneratingShort(true);
    try {
      const shortUrl = await getShortLink(window.location.href);
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (error) {
          console.error(error);
        } finally {
          textArea.remove();
        }
      }
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    } finally {
      setGeneratingShort(false);
    }
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{paste.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-dark-300">
              <span>by <span className="font-medium text-dark-200">{paste.author}</span></span>
              <span className="text-dark-500 hidden sm:inline">·</span>
              <span>{formatDate(paste.createdAt)}</span>
              <span className="text-dark-500">·</span>
              <span className="rounded-lg bg-dark-700 px-2.5 py-0.5 text-xs font-medium text-accent-blue">
                {FORMAT_LABELS[paste.format] || paste.format.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <button
              onClick={copyLink}
              disabled={generatingShort}
              className="rounded-xl bg-accent-purple hover:bg-accent-purple/90 border border-accent-purple/40 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-lg shadow-accent-purple/20 sm:text-sm flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.9-9.9l4.5 4.5a4.5 4.5 0 010 6.364l-4.5 4.5a4.5 4.5 0 01-7.244-1.242" />
              </svg>
              {generatingShort ? "Shortening..." : linkCopied ? "Short Link Copied!" : "Copy Short Link"}
            </button>

            <button
              onClick={() => setShowRaw(!showRaw)}
              className="rounded-xl bg-dark-600 border border-dark-500 px-3 py-2 text-xs font-semibold text-dark-100 transition-colors hover:bg-dark-500 sm:px-4 sm:text-sm"
            >
              {showRaw ? "Visual Preview" : "Raw Showdown Text"}
            </button>
          </div>
        </div>
      </div>

      {showRaw ? (
        <div className="glass rounded-2xl p-4 sm:p-6">
          <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-dark-100 sm:text-sm">
            {paste.content}
          </pre>
        </div>
      ) : (
        <TeamPreview team={team} showExport />
      )}
    </div>
  );
}
