"use client";

import Link from "next/link";

// Root-level 404 page - catches all unmatched routes
export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">← Back to Home</Link>
    </div>
  );
}
