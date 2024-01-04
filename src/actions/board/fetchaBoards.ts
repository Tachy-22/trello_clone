"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { fetchInvitedBoards } from "./fetchInvitedBoards";

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
    console.log("myBoards inner inner :", myBoards);
    const invitedBoards = await fetchInvitedBoards(
      myBoards?.invites as string[]
    );
    revalidatePath("/myBoards");
    return { myBoards, invitedBoards };
  } catch (error) {
    console.error(error);
  }
}
