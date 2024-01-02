"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateColumnOrderInDb } from "../board/updateColumnOrderInDb";
import { updateTaskIdsInDb } from "./updateTaskIdsInDb";

export async function deleteTask(
  taskId: string,
  columnId: string,
  boardId: string,
  newTaskIds: string[]
) {
  // ... you will write your Prisma Client queries here
  if (boardId && columnId) {
    try {
      await prisma.task.delete({
        where: {
          id: taskId,
          boardId: boardId,
        },
      });
      console.log("Just deleted task with id :", taskId);

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
