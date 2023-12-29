"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchBoard(boardId: string, authorId: string) {
  console.log("authorId :", authorId);
  try {
    const BoardData = await prisma.board.findFirst({
      where: {
        authorId: authorId,
        id: boardId,
      },
      include: {
        columns: true,
        tasks: true,
      },
    });
    console.log("BoardData :", BoardData);
    revalidatePath("/boardData");
    return BoardData;
  } catch (error) {
    console.error(error);
  }
}
