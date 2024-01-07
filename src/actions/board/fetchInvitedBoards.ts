"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function fetchInvitedBoards(invites: string[]) {
  if (invites === null || invites === undefined) {
    return;
  } else {
    try {
      if (invites?.length === 0) {
        return [];
      } else {
        const myInvitedBoards = await prisma.board.findMany({
          where: {
            id: { in: invites },
          },
        });
      
        revalidatePath("/myBoards");
        return myInvitedBoards;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
