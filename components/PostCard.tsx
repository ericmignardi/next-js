import { Post } from "@/generated/prisma/client";
import Link from "next/link";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <div>{post.title}</div>
      <Link href={`/posts/${post.id}`}>Edit</Link>
    </div>
  );
};

export default PostCard;
