"use server";

import { Post } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const authorId = "cmj5uzv270004k8udw2o75cnw";

type ActionResult<T> =
  | { success: true; post: T }
  | { success: false; error: string };

// Server Actions for mutations
export const createPost = async (formData: FormData): Promise<void> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    // ISR - force cache revalidation
    revalidatePath("/posts");
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};

export const updatePost = async (
  id: string,
  data: Partial<Pick<Post, "title" | "content">>
): Promise<ActionResult<Post>> => {
  try {
    const post = await prisma.post.update({
      where: {
        id,
      },
      data,
    });

    revalidatePath("/posts");

    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update post",
    };
  }
};

export const deletePost = async (id: string): Promise<ActionResult<Post>> => {
  try {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/posts");

    return { success: true, post };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete post",
    };
  }
};
