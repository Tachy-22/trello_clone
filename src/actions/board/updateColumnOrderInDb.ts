"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateColumnOrderInDb(
  boardId: string,
  authorId: string,
  newColumnOrder: string[]
) {
 // console.log("authorId :", authorId);
  try {
    await prisma.board.update({
      where: {
        authorId: authorId,
        id: boardId,
      },
      data: { columnOrder: newColumnOrder },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
