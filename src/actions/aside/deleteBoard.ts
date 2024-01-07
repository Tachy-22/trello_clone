"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBoard(boardId: string, authorId: string) {
  if (boardId && authorId) {
    try {
      await prisma.board.delete({
        where: {
          id: boardId,
          authorId: authorId,
        },
      });
      revalidatePath("/boardData");
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}
