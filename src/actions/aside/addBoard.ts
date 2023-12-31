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
  // ... you will write your Prisma Client queries here
  try {
    const newBoard = await prisma.board.create({
      data: {
        title: boardCreationData.boardTitle,
        backgroundColor: boardCreationData.bgColor,
        backgroundImage: boardCreationData.bgUrl,
        authorId: authorId,
      },
    });
    console.log("newBoard :", newBoard);
    revalidatePath("/boardData");
    return newBoard.id;
  } catch (error) {
    console.error(error);
  }
}
