import { Suspense } from "react";
import { createPost } from "@/actions/actions";
import PostsList from "@/components/PostsList";
import { Metadata } from "next";
// CSS Modules
import styles from "@/styles/post.module.css";

// export const dynamic = 'force-dynamic' // entire route dynamic
// export const revalidate = 60 // revalidate entire page every 60 seconds
// export const revalidate = false // static (default) - built at build time

// ✅ Metadata must be EXPORTED at module level
export const metadata: Metadata = {
  title: "Posts Page",
  description: "Displays a list of Posts",
};

const PostsPage = () => {
  return (
    <div>
      {/* Read - Suspense wraps the async component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-blue-500">
        <Suspense
          fallback={<div className="animate-pulse">Loading posts...</div>}
        >
          <PostsList />
        </Suspense>
      </div>

      {/* Create */}
      <div className={styles.container}>
        <h1>Create</h1>
        <form action={createPost}>
          <input type="text" name="title" placeholder="Title" required />
          <input type="text" name="content" placeholder="Content" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostsPage;
