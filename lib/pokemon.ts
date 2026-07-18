import { Sets, Teams } from '@pkmn/sets';

export interface ParsedPokemon {
  name: string;
  species: string;
  item: string;
  ability: string;
  nature: string;
  evs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  ivs: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number };
  moves: string[];
  level: number;
  shiny: boolean;
  teraType: string;
  gender: string;
}

export interface ParsedTeam {
  pokemon: ParsedPokemon[];
}

export function parseTeamPaste(paste: string): ParsedTeam {
  const team = Teams.importTeam(paste);
  const sets = team?.team ?? [];

  const pokemon: ParsedPokemon[] = sets.map((set) => ({
    name: set.name || set.species || '',
    species: set.species || '',
    item: set.item || '',
    ability: set.ability || '',
    nature: set.nature || '',
    evs: {
      hp: set.evs?.hp ?? 0,
      atk: set.evs?.atk ?? 0,
      def: set.evs?.def ?? 0,
      spa: set.evs?.spa ?? 0,
      spd: set.evs?.spd ?? 0,
      spe: set.evs?.spe ?? 0,
    },
    ivs: {
      hp: set.ivs?.hp ?? 31,
      atk: set.ivs?.atk ?? 31,
      def: set.ivs?.def ?? 31,
      spa: set.ivs?.spa ?? 31,
      spd: set.ivs?.spd ?? 31,
      spe: set.ivs?.spe ?? 31,
    },
    moves: set.moves || [],
    level: set.level ?? 100,
    shiny: set.shiny ?? false,
    teraType: set.teraType || '',
    gender: set.gender || '',
  }));

  return { pokemon };
}

export function exportTeamPaste(team: ParsedTeam): string {
  const sets = team.pokemon.map((p) => ({
    name: p.name !== p.species ? p.name : '',
    species: p.species,
    item: p.item,
    ability: p.ability,
    nature: p.nature,
    evs: { ...p.evs },
    ivs: { ...p.ivs },
    moves: [...p.moves],
    level: p.level,
    shiny: p.shiny,
    gender: p.gender,
  }));

  return sets.map(s => Sets.exportSet(s)).join('\n');
}

export function getSpriteUrl(species: string): string {
  const slug = species
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/^nidoran♀$/, 'nidoranf')
    .replace(/^nidoran♂$/, 'nidoranm');
  return `https://play.pokemonshowdown.com/sprites/gen5ani/${slug}.gif`;
}

export function getItemSpriteUrl(item: string): string {
  if (!item) return '';
  const slug = item.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `https://play.pokemonshowdown.com/sprites/itemicons/${slug}.png`;
}

const TYPE_COLORS: Record<string, string> = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD',
};

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type] || '#68A090';
}
