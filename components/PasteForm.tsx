"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parseTeamPaste } from "@/lib/pokemon";
import TeamPreview from "./TeamPreview";

const SAMPLE_PASTE = `Dragapult @ Choice Specs
Ability: Infiltrator
Tera Type: Dragon
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Shadow Ball
- Draco Meteor
- Flamethrower
- U-turn

Great Tusk @ Booster Energy
Ability: Protosynthesis
Tera Type: Steel
EVs: 252 Atk / 4 Def / 252 Spe
Jolly Nature
- Headlong Rush
- Close Combat
- Ice Spinner
- Rapid Spin

Gholdengo @ Air Balloon
Ability: Good as Gold
Tera Type: Fighting
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
IVs: 0 Atk
- Make It Rain
- Shadow Ball
- Focus Blast
- Nasty Plot`;

export default function PasteForm() {
  const router = useRouter();
  const [paste, setPaste] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [format, setFormat] = useState("gen9");
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const team = paste.trim() ? parseTeamPaste(paste) : null;

  const handleSave = async () => {
    if (!paste.trim()) {
      setError("Please paste a team first.");
      return;
    }
    if (!team || team.pokemon.length === 0) {
      setError("Couldn't parse any Pokemon from that paste. Make sure it's in Showdown export format.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title || team.pokemon.map((p) => p.species).join(" / "),
          author: author || "Anonymous",
          format,
          content: paste,
          isPublic,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      router.push(`/paste/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save paste. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Metadata fields */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-200">
            Title <span className="text-dark-400">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My OU Team"
            maxLength={200}
            className="w-full rounded-xl bg-dark-800 border-2 border-dark-600 px-4 py-2.5 text-sm text-white placeholder-dark-400 outline-none transition-colors focus:border-accent-purple"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-200">
            Author <span className="text-dark-400">(optional)</span>
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            maxLength={100}
            className="w-full rounded-xl bg-dark-800 border-2 border-dark-600 px-4 py-2.5 text-sm text-white placeholder-dark-400 outline-none transition-colors focus:border-accent-purple"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark-200">Format</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full rounded-xl bg-dark-800 border-2 border-dark-600 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-accent-purple appearance-none cursor-pointer"
          >
            <option value="gen9">Gen 9 (SV)</option>
            <option value="gen9ou">Gen 9 OU</option>
            <option value="gen9uu">Gen 9 UU</option>
            <option value="gen9vgc">Gen 9 VGC</option>
            <option value="gen8">Gen 8 (SwSh)</option>
            <option value="gen7">Gen 7 (SM)</option>
            <option value="gen6">Gen 6 (XY)</option>
            <option value="gen5">Gen 5 (BW)</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Paste textarea */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-dark-200">Team Paste</label>
          <button
            onClick={() => { setPaste(SAMPLE_PASTE); setTitle("Sample OU Team"); setError(""); }}
            className="text-xs text-accent-purple transition-colors hover:text-accent-pink"
          >
            Load sample team
          </button>
        </div>
        <textarea
          value={paste}
          onChange={(e) => { setPaste(e.target.value); setError(""); }}
          className="paste-textarea min-h-[240px] sm:min-h-[280px]"
          maxLength={50000}
          placeholder={`Paste your Pokemon Showdown team export here...\n\nExample:\nDragapult @ Choice Specs\nAbility: Infiltrator\nTera Type: Dragon\nEVs: 252 SpA / 4 SpD / 252 Spe\nTimid Nature\n- Shadow Ball\n- Draco Meteor\n- Flamethrower\n- U-turn`}
        />
        {paste.trim() && team && (
          <p className="mt-1.5 text-xs text-dark-400">
            {team.pokemon.length > 0
              ? `${team.pokemon.length} Pokémon parsed`
              : "No Pokémon detected — check your paste format"}
          </p>
        )}
      </div>

      {/* Public toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsPublic(!isPublic)}
          className={`relative h-6 w-11 rounded-full transition-colors ${isPublic ? "bg-accent-purple" : "bg-dark-600"}`}
          aria-label={isPublic ? "Make private" : "Make public"}
        >
          <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${isPublic ? "translate-x-5" : "translate-x-0"}`} />
        </button>
        <span className="text-sm text-dark-200">
          {isPublic ? "Public — visible on browse page" : "Private — only accessible via link"}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Save button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !paste.trim()}
          className="btn-primary flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </>
          ) : (
            "Save & Share"
          )}
        </button>
      </div>

      {/* Live preview */}
      {team && team.pokemon.length > 0 && (
        <div className="mt-6 sm:mt-8 border-t border-dark-700 pt-6 sm:pt-8">
          <TeamPreview team={team} title="Live Preview" showExport />
        </div>
      )}
    </div>
  );
}
