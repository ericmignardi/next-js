"use client";

import { useEffect } from "react";

// Template - remounts on every navigation (unlike layout which persists)
// Good for: entrance animations, resetting state, logging page views
export default function PostsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("Posts template mounted - this runs on every navigation");
  }, []);

  return (
    <div className="posts-template">
      {/* Template wraps page content but remounts each time */}
      {children}
    </div>
  );
}
