"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateTaskIdsInDb(
  boardId: string,
  columnId: string,
  taskIds: string[]
) {
  // console.log("authorId :", authorId);
  try {
    await prisma.column.update({
      where: {
        id: columnId,
        boardId: boardId,
      },
      data: { taskIds: taskIds },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
