"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// On-demand revalidation examples
// Call these from Server Actions or Route Handlers after mutations

// Next.js 16: revalidateTag now requires a cache profile as second argument
// Profiles: "default", "aggressive", "stale", or custom CacheLifeConfig

export async function revalidatePokemonByPath() {
  // Revalidate the entire pokemon page
  revalidatePath("/pokemon");
}

export async function revalidatePokemonByTag() {
  // Revalidate all fetches tagged with "pokemon"
  revalidateTag("pokemon", "default");
}

export async function revalidatePostsByTag() {
  // Revalidate all fetches tagged with "posts"
  revalidateTag("posts", "default");
}
