"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateColumnTitle(
  columnId: string,
  boardId: string,
  columnIdentifier: string,
  newtitle: string
) {
  try {
    await prisma.column.update({
      where: {
        columnIdentifier: columnIdentifier,
        id: columnId,
        boardId: boardId,
      },
      data: { title: newtitle },
    });
    revalidatePath("/boardData");
    return;
  } catch (error) {
    console.error(error);
  }
}
