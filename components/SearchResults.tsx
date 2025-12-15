"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

// CLIENT COMPONENT - demonstrates URL state manipulation
// useSearchParams + useRouter for client-side URL updates
export default function SearchResults({
  query,
  page,
  sort,
}: {
  query: string;
  page: number;
  sort: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper to update URL params without full page reload
  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className="space-y-4">
      {/* Search input that updates URL */}
      <input
        type="text"
        placeholder="Search..."
        defaultValue={query}
        onChange={(e) => updateParams({ q: e.target.value, page: "1" })}
        className="border p-2 rounded w-full"
      />

      {/* Sort selector */}
      <select
        value={sort}
        onChange={(e) => updateParams({ sort: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="popular">Popular</option>
      </select>

      {/* Display current state */}
      <div className="bg-gray-100 p-4 rounded">
        <p>Query: {query || "(empty)"}</p>
        <p>Page: {page}</p>
        <p>Sort: {sort}</p>
      </div>

      {/* Pagination */}
      <div className="flex gap-2">
        <button
          onClick={() => updateParams({ page: String(Math.max(1, page - 1)) })}
          disabled={page <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => updateParams({ page: String(page + 1) })}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
