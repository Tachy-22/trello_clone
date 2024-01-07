"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateTaskIdsInDb } from "./updateTaskIdsInDb";

export async function deleteTask(
  taskId: string,
  columnId: string,
  boardId: string,
  newTaskIds: string[]
) {
  if (boardId && columnId) {
    try {
      await prisma.task.delete({
        where: {
          id: taskId,
          boardId: boardId,
        },
      });
      await updateTaskIdsInDb(boardId, columnId, newTaskIds);
      revalidatePath("/boardData");
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}
