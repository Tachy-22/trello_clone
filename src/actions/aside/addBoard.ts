"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type boardDataParam = {
  boardTitle: string;
  bgColor: string;
  bgUrl: string;
};

export async function addBoard(
  boardCreationData: boardDataParam,
  authorId: string
) {
  try {
    const newBoard = await prisma.board.create({
      data: {
        title: boardCreationData.boardTitle,
        backgroundColor: boardCreationData.bgColor,
        backgroundImage: boardCreationData.bgUrl,
        authorId: authorId,
      },
    });
    revalidatePath("/boardData");
    return newBoard.id;
  } catch (error) {
    console.error(error);
  }
}
