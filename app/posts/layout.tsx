import { Metadata } from "next";

// Nested layout - demonstrates layout composition and inheritance
// This layout inherits from root layout and adds posts-specific UI
export const metadata: Metadata = {
  title: "Posts",
  description: "Browse all posts",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="posts-layout">
      {/* Nested layout UI - wraps all /posts routes */}
      <aside className="posts-sidebar">
        <h3>Posts Navigation</h3>
        <p>This sidebar persists across all /posts/* pages</p>
      </aside>
      <main className="posts-content">{children}</main>
    </div>
  );
}
