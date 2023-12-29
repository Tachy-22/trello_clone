"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchBoards(authorId: string) {
  console.log("authorId :", authorId);
  try {
    const myBoards = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
      include: {
        boards: true,
      },
    });
    console.log("myBoards :", myBoards);
    revalidatePath("/myBoards");
    return myBoards;
  } catch (error) {
    console.error(error);
  }
}
