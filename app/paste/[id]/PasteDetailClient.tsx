"use client";

import { useState, useEffect } from "react";
import TeamPreview from "@/components/TeamPreview";
import { ParsedTeam } from "@/lib/pokemon";
import { useRouter } from "next/navigation";

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

export default function PasteDetailClient({ paste, team }: { paste: PasteData; team: ParsedTeam }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const [showRaw, setShowRaw] = useState(false);
  const router = useRouter();
  const [canDelete, setCanDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    try {
      const tokens = JSON.parse(localStorage.getItem('pastemon_delete_tokens') || '{}');
      if (tokens[paste.id]) setCanDelete(true);
    } catch {}
  }, [paste.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const tokens = JSON.parse(localStorage.getItem('pastemon_delete_tokens') || '{}');
      const res = await fetch(`/api/paste/${paste.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deleteToken: tokens[paste.id] }),
      });
      if (res.ok) {
        delete tokens[paste.id];
        localStorage.setItem('pastemon_delete_tokens', JSON.stringify(tokens));
        router.push('/browse');
      } else {
        setShowDeleteConfirm(false);
        setDeleting(false);
      }
    } catch {
      setShowDeleteConfirm(false);
      setDeleting(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
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

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <button
              onClick={copyLink}
              className="rounded-xl bg-dark-600 border border-dark-500 px-3 py-2 text-xs font-semibold text-dark-100 transition-colors hover:bg-dark-500 sm:px-4 sm:text-sm"
            >
              {linkCopied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={() => setShowRaw(!showRaw)}
              className="rounded-xl bg-dark-600 border border-dark-500 px-3 py-2 text-xs font-semibold text-dark-100 transition-colors hover:bg-dark-500 sm:px-4 sm:text-sm"
            >
              {showRaw ? "Visual" : "Raw"}
            </button>
            {canDelete && !showDeleteConfirm && (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20 sm:px-4 sm:text-sm"
              >
                Delete
              </button>
            )}
            {showDeleteConfirm && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded-xl bg-red-500 border border-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-600 disabled:opacity-50 sm:px-4 sm:text-sm"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl bg-dark-600 border border-dark-500 px-3 py-2 text-xs font-semibold text-dark-100 transition-colors hover:bg-dark-500 sm:px-4 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
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
