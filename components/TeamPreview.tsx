"use client";

import PokemonCard from "./PokemonCard";
import { ParsedTeam, exportTeamPaste } from "@/lib/pokemon";
import { useState } from "react";

interface TeamPreviewProps {
  team: ParsedTeam;
  title?: string;
  showExport?: boolean;
  showActions?: boolean;
}

export default function TeamPreview({ team, title, showExport = false }: TeamPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportTeamPaste(team));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!team.pokemon.length) return null;

  return (
    <div className="animate-fade-in">
      {(title || showExport) && (
        <div className="mb-6 flex items-center justify-between">
          {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
          <div className="flex items-center gap-3">
            <span className="text-sm text-dark-300">{team.pokemon.length} Pokémon</span>
            {showExport && (
              <button onClick={handleCopy} className="btn-secondary text-sm">
                {copied ? "✓ Copied!" : "📋 Copy Export"}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.pokemon.map((poke, i) => (
          <PokemonCard key={i} pokemon={poke} index={i} />
        ))}
      </div>
    </div>
  );
}
