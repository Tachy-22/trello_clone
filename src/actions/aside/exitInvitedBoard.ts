"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function exitInviteBoard(email: string, updatedInvites: string[]) {
  if (email && updatedInvites) {
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          invites: updatedInvites,
        },
      });
      revalidatePath("/boardData");
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}


