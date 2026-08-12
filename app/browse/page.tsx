"use client";

import { useEffect, useState } from "react";
import { parseTeamPaste, getSpriteUrl } from "@/lib/pokemon";
import { encodePaste, PasteData } from "@/lib/urlPaste";
import Link from "next/link";

const SAMPLE_TEAMS: (PasteData & { description: string })[] = [
  {
    title: "Gen 9 OU Balance (Great Tusk / Kingambit)",
    author: "CompetitivePro",
    format: "gen9ou",
    description: "Classic Gen 9 OU offense balance core featuring Dragapult & Kingambit.",
    content: `Great Tusk @ Booster Energy
Ability: Protosynthesis
Tera Type: Ice
EVs: 252 Atk / 4 Def / 252 Spe
Jolly Nature
- Rapid Spin
- Headlong Rush
- Ice Spinner
- Close Combat

Kingambit @ Lum Berry
Ability: Supreme Overlord
Tera Type: Fairy
EVs: 212 HP / 252 Atk / 44 Spe
Adamant Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
- Swords Dance

Dragapult @ Choice Specs
Ability: Infiltrator
Tera Type: Dragon
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Shadow Ball
- Draco Meteor
- Flamethrower
- U-turn

Gholdengo @ Air Balloon
Ability: Good as Gold
Tera Type: Fighting
EVs: 252 SpA / 4 SpD / 252 Spe
Timid Nature
- Make It Rain
- Shadow Ball
- Focus Blast
- Nasty Plot

Ogerpon-Wellspring (F) @ Wellspring Mask
Ability: Water Absorb
Tera Type: Water
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Ivy Cudgel
- Horn Leech
- Knock Off
- Swords Dance

Iron Valiant @ Booster Energy
Ability: Quark Drive
Tera Type: Spirit
EVs: 4 Def / 252 SpA / 252 Spe
Timid Nature
- Moonblast
- Close Combat
- Thunderbolt
- Calm Mind`,
    createdAt: new Date().toISOString(),
  },
  {
    title: "Gen 9 VGC Rain Core (Archaludon / Pelipper)",
    author: "VGC Champ",
    format: "gen9vgc",
    description: "Heavy rain hyper offense core with Archaludon Electro Shot and Urshifu Rapid Strike.",
    content: `Pelipper @ Focus Sash
Ability: Drizzle
Tera Type: Ghost
EVs: 4 HP / 252 SpA / 252 Spe
Modest Nature
- Weather Ball
- Hurricane
- Tailwind
- Protect

Archaludon @ Assault Vest
Ability: Stamina
Tera Type: Grass
EVs: 252 HP / 156 Def / 100 SpA
Modest Nature
- Electro Shot
- Draco Meteor
- Flash Cannon
- Body Press

Urshifu-Rapid-Strike @ Choice Scarf
Ability: Unseen Fist
Tera Type: Water
EVs: 252 Atk / 4 SpD / 252 Spe
Jolly Nature
- Surging Strikes
- Close Combat
- Aqua Jet
- U-turn

Amoonguss @ Rocky Helmet
Ability: Regenerator
Tera Type: Water
EVs: 244 HP / 156 Def / 108 SpD
Bold Nature
- Spore
- Rage Powder
- Pollen Puff
- Protect`,
    createdAt: new Date().toISOString(),
  },
];

export default function BrowsePage() {
  const [userPastes, setUserPastes] = useState<PasteData[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("pastemon_user_pastes") || "[]");
      setUserPastes(saved);
    } catch {}
  }, []);

  const allPastes = [
    ...userPastes,
    ...SAMPLE_TEAMS.map((st) => ({
      title: st.title,
      author: st.author,
      format: st.format,
      content: st.content,
      createdAt: st.createdAt,
    })),
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Browse Teams</h1>
        <p className="mt-2 text-dark-300">
          Explore shareable Pokemon team pastes — 100% databaseless & instant.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allPastes.map((paste, idx) => {
          const encoded = encodePaste(paste);
          const team = parseTeamPaste(paste.content);
          const preview = team.pokemon.slice(0, 6);

          return (
            <Link
              key={idx}
              href={`/paste?d=${encoded}`}
              className="pokemon-card glass group rounded-2xl p-4 sm:p-5 block"
            >
              <div className="mb-3 flex items-center gap-1 overflow-hidden">
                {preview.map((p, i) => (
                  <img
                    key={i}
                    src={getSpriteUrl(p.species)}
                    alt={p.species}
                    className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                  />
                ))}
              </div>

              <h3 className="truncate text-base sm:text-lg font-bold text-white transition-colors group-hover:text-accent-purple">
                {paste.title}
              </h3>

              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-dark-300">
                <span>{paste.author}</span>
                <span className="text-dark-500">·</span>
                <span className="rounded bg-dark-700 px-1.5 py-0.5 text-xs font-medium text-accent-blue">
                  {paste.format.toUpperCase()}
                </span>
              </div>

              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
                {preview.map((p, i) => (
                  <span key={i} className="rounded bg-dark-700/60 px-1.5 sm:px-2 py-0.5 text-xs text-dark-200">
                    {p.species}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
