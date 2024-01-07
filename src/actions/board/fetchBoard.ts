"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchBoard(boardId: string, authorId: string) {
  if (boardId !== "view") {
    try {
      const BoardData = await prisma.board.findFirst({
        where: {
          // authorId: authorId,
          id: boardId,
        },
        include: {
          columns: true,
          tasks: true,
        },
      });
      revalidatePath("/boardData");
      return BoardData;
    } catch (error) {
      console.error(error);
    }
  } else {
    return false;
  }
}
