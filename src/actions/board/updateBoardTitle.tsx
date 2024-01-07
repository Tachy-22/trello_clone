"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBoardTitle(
  boardId: string,
  authorId: string,
  newtitle: string
) {
  try {
    await prisma.board.update({
      where: {
        authorId: authorId,
        id: boardId,
      },
      data: { title: newtitle },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
