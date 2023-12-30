"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTaskToDb(
  boardId: string,
  content: string,
  taskIdentifier: string
) {
  console.log("boardId", boardId);
  try {
    await prisma.task.create({
      data: {
        boardId: boardId,
        content: content,
        taskIdentifier: taskIdentifier,
      },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
