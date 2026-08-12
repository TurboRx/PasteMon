"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { decodePaste, PasteData } from "@/lib/urlPaste";
import { parseTeamPaste, ParsedTeam } from "@/lib/pokemon";
import PasteDetailClient from "@/components/PasteDetailClient";
import Link from "next/link";

function PasteViewContent() {
  const searchParams = useSearchParams();
  const [pasteData, setPasteData] = useState<{ paste: PasteData; team: ParsedTeam } | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    let d = searchParams.get("d");
    if (!d && typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("d=")) {
        d = hash.split("d=")[1];
      }
    }

    if (!d) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    const decoded = decodePaste(d);
    if (!decoded || !decoded.content.trim()) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    const parsed = parseTeamPaste(decoded.content);
    setPasteData({
      paste: {
        id: "url-paste",
        title: decoded.title,
        author: decoded.author,
        format: decoded.format,
        content: decoded.content,
        createdAt: decoded.createdAt || new Date().toISOString(),
      },
      team: parsed,
    });
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="py-20 text-center text-dark-300 animate-pulse">
        Loading team paste...
      </div>
    );
  }

  if (invalid || !pasteData) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Paste Not Found</h1>
        <p className="mt-3 text-dark-300">
          This shareable link is invalid or incomplete.
        </p>
        <Link href="/new" className="btn-primary mt-6 inline-block">
          Create New Paste
        </Link>
      </div>
    );
  }

  return <PasteDetailClient paste={pasteData.paste} team={pasteData.team} />;
}

export default function PastePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-dark-300">Loading...</div>}>
      <PasteViewContent />
    </Suspense>
  );
}
