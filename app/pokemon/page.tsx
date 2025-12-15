// Server Component with Next.js Data Cache
// Demonstrates: time-based revalidation, fetch caching, tags

import Image from "next/image";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

// Revalidate entire page every 60 seconds
export const revalidate = 60;

async function getPokemon(): Promise<Pokemon> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    // Time-based revalidation (ISR pattern)
    next: {
      revalidate: 60, // Cache for 60 seconds
      tags: ["pokemon"], // Tag for on-demand revalidation
    },
  });

  if (!response.ok) throw new Error("Failed to fetch Pokemon");

  return response.json();
}

export default async function PokemonPage() {
  const pokemon = await getPokemon();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      {pokemon.sprites?.front_default && (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      )}
      <p className="text-sm text-gray-500 mt-4">
        This page uses Next.js Data Cache with 60s revalidation
      </p>
    </div>
  );
}
