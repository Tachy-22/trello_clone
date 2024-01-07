"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskContent(
  tasKId: string,
  boardId: string,
  taskIdentifier: string,
  newContent: string
) {
  try {
    await prisma.task.update({
      where: {
        taskIdentifier: taskIdentifier,
        boardId: boardId,
        id: tasKId,
      },
      data: { content: newContent },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
