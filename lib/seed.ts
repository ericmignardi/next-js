import "dotenv/config";
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Seeding database...");

  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Johnson",
      posts: {
        create: [
          {
            title: "Getting Started with Next.js",
            content: "Next.js is a powerful React framework...",
          },
          {
            title: "Understanding Prisma",
            content: "Prisma makes database access easy...",
          },
          {
            title: "Styling with Tailwind CSS",
            content: "Tailwind CSS provides utility-first styling...",
          },
        ],
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob Smith",
      posts: {
        create: [
          {
            title: "My First Blog Post",
            content: "Hello world! This is my first post.",
          },
          {
            title: "React Tips and Tricks",
            content: "Here are some useful React patterns...",
          },
          {
            title: "TypeScript Best Practices",
            content: "TypeScript helps catch errors early...",
          },
        ],
      },
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
