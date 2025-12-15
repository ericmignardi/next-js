import { NextResponse } from "next/server";

// API Route with server-side caching
// Client components can fetch this route to leverage server caching

export async function GET() {
  // This fetch runs on the server and uses Next.js Data Cache
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    next: {
      revalidate: 60, // Cache for 60 seconds
      tags: ["pokemon-api"],
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Pokemon" },
      { status: 500 }
    );
  }

  const data = await response.json();

  return NextResponse.json({
    name: data.name,
    height: data.height,
    weight: data.weight,
  });
}
