import { prisma } from "@/lib/database/prisma";
import PostCard from "./PostCard";
import { Post } from "@/generated/prisma/client";

const PostsList = async () => {
  const userId = "cmj5uzv270004k8udw2o75cnw";

  const posts = await prisma.post.findMany({
    where: { authorId: userId },
  });

  return (
    <>
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostsList;
