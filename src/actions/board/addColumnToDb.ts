"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
export async function addColumnToDb(boardId: string, title: string, columnIdentifier:string) {
  try {
    const column = await prisma.column.create({
      data: {
        boardId: boardId,
        title: title,
        columnIdentifier: columnIdentifier,
      },
    });
    revalidatePath("/boardData");
    return column;
  } catch (error) {
    console.error(error);
  }
}
