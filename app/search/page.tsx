// Example: URL State with searchParams in Next.js
// This is the most Next.js-specific state pattern

import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

// SERVER COMPONENT - reads searchParams directly
// searchParams is passed as a prop to page components
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const page = parseInt(params.page || "1");
  const sort = params.sort || "newest";

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      {/* Client component for the search input */}
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchResults query={query} page={page} sort={sort} />
      </Suspense>

      <p className="text-sm text-gray-500 mt-4">
        URL State Demo: Try /search?q=hello&page=2&sort=oldest
      </p>
    </div>
  );
}
