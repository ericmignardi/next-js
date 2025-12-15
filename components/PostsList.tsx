import { prisma } from "@/lib/prisma";
import PostCard from "./PostCard";

const PostsList = async () => {
  const userId = "cmj5uzv270004k8udw2o75cnw";

  // Data fetching happens HERE - inside the Suspense boundary
  const posts = await prisma.post.findMany({
    where: { authorId: userId },
  });

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
