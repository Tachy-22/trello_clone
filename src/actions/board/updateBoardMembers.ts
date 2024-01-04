"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBoardMembers(
  boardId: string,
  authorId?: string,
  newMeberslist?: string[]
) {
  // console.log("authorId :", authorId);
  try {
    await prisma.board.update({
      where: {
        authorId: authorId,
        id: boardId,
      },
      data: { members: newMeberslist },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
