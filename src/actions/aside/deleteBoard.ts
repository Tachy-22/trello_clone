"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBoard(boardId: string, authorId: string) {
  // ... you will write your Prisma Client queries here
  if (boardId && authorId) {
    try {
      await prisma.board.delete({
        where: {
          id: boardId,
          authorId: authorId,
        },
      });
      console.log("Just deleted Board with id :", boardId);
      revalidatePath("/boardData");
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}
