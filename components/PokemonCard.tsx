"use client";

import { ParsedPokemon, getSpriteUrl } from "@/lib/pokemon";

interface PokemonCardProps {
  pokemon: ParsedPokemon;
  index: number;
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP", atk: "Atk", def: "Def", spa: "SpA", spd: "SpD", spe: "Spe",
};

const STAT_COLORS: Record<string, string> = {
  hp: "#ff6b6b", atk: "#f59e0b", def: "#4ecdc4",
  spa: "#a855f7", spd: "#ec4899", spe: "#3b82f6",
};

function StatBar({ label, value, maxValue = 252, color }: {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-right text-xs font-medium text-dark-300">{label}</span>
      <div className="stat-bar flex-1">
        <div
          className="stat-bar-fill"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
      <span className="w-8 text-xs font-mono text-dark-200">{value}</span>
    </div>
  );
}

export default function PokemonCard({ pokemon, index }: PokemonCardProps) {
  const hasEVs = Object.values(pokemon.evs).some((v) => v > 0);
  const hasCustomIVs = Object.values(pokemon.ivs).some((v) => v < 31);

  return (
    <div
      className="pokemon-card glass rounded-2xl p-5 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-dark-700/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getSpriteUrl(pokemon.species)}
              alt={pokemon.species}
              className="h-16 w-16 object-contain animate-float"
              style={{ animationDelay: `${index * 200}ms` }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://play.pokemonshowdown.com/sprites/gen5/${pokemon.species.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
              }}
            />
          </div>
          {pokemon.shiny && (
            <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-gold text-xs">
              ✦
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold text-white">
            {pokemon.name !== pokemon.species ? (
              <>
                {pokemon.name}{" "}
                <span className="text-sm font-normal text-dark-300">({pokemon.species})</span>
              </>
            ) : (
              pokemon.species
            )}
            {pokemon.gender && (
              <span className={`ml-1 text-sm ${pokemon.gender === "M" ? "text-blue-400" : "text-pink-400"}`}>
                {pokemon.gender === "M" ? "♂" : "♀"}
              </span>
            )}
          </h3>
          <div className="mt-1 flex flex-wrap gap-2">
            {pokemon.ability && (
              <span className="rounded-lg bg-dark-600 px-2 py-0.5 text-xs font-medium text-accent-blue">
                {pokemon.ability}
              </span>
            )}
            {pokemon.item && (
              <span className="rounded-lg bg-dark-600 px-2 py-0.5 text-xs font-medium text-accent-gold">
                {pokemon.item}
              </span>
            )}
            {pokemon.nature && (
              <span className="rounded-lg bg-dark-600 px-2 py-0.5 text-xs font-medium text-accent-pink">
                {pokemon.nature}
              </span>
            )}
          </div>
          {pokemon.teraType && (
            <div className="mt-1.5">
              <span className="rounded-lg bg-gradient-to-r from-accent-purple/20 to-accent-pink/20 border border-accent-purple/30 px-2 py-0.5 text-xs font-medium text-accent-purple">
                Tera: {pokemon.teraType}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-dark-400">Moves</h4>
        <div className="grid grid-cols-2 gap-1.5">
          {pokemon.moves.map((move, i) => (
            <div key={i} className="rounded-lg bg-dark-700/60 px-3 py-1.5 text-sm font-medium text-dark-100">
              {move}
            </div>
          ))}
        </div>
      </div>

      {hasEVs && (
        <div className="mb-3">
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-dark-400">EVs</h4>
          <div className="space-y-1">
            {(Object.entries(pokemon.evs) as [string, number][])
              .filter(([, v]) => v > 0)
              .map(([stat, value]) => (
                <StatBar key={stat} label={STAT_LABELS[stat]} value={value} maxValue={252} color={STAT_COLORS[stat]} />
              ))}
          </div>
        </div>
      )}

      {hasCustomIVs && (
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-dark-400">IVs</h4>
          <div className="space-y-1">
            {(Object.entries(pokemon.ivs) as [string, number][])
              .filter(([, v]) => v < 31)
              .map(([stat, value]) => (
                <StatBar key={stat} label={STAT_LABELS[stat]} value={value} maxValue={31} color={STAT_COLORS[stat]} />
              ))}
          </div>
        </div>
      )}

      {pokemon.level !== 100 && (
        <div className="mt-2 text-xs text-dark-400">Level {pokemon.level}</div>
      )}
    </div>
  );
}
