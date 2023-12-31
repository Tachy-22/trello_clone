"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { updateColumnOrderInDb } from "../board/updateColumnOrderInDb";

export async function deleteColumn(
  columnId: string,
  boardId: string,
  newColumnOrder: string[]
) {
  // ... you will write your Prisma Client queries here
  if (boardId && columnId) {
    try {
      await prisma.column.delete({
        where: {
          id: columnId,
          boardId: boardId,
        },
      });
      console.log("Just deleted column with id :", columnId);

      await updateColumnOrderInDb(boardId, undefined, newColumnOrder);
      revalidatePath("/boardData");
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}
