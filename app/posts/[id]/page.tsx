import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

// export const dynamicParams = false; // return 404 for unknown ids (only pre-rendered pages work)

// For dynamic routes, use generateMetadata function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  return {
    title: post?.title ?? "Post Not Found",
    description: post?.content?.slice(0, 160) ?? "View post details",
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => ({
    id: post.id,
  }));
}

const DynamicPostsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  // Test error boundary - move before DB query so it actually runs
  if (id === "test-error") {
    throw new Error("This is a test error!");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return <div>{post.title}</div>;
};

export default DynamicPostsPage;
