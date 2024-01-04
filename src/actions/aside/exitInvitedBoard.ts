"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function exitInviteBoard(email: string, updatedInvites: string[]) {
  // ... you will write your Prisma Client queries here
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
      console.log("updatedInvites :", updatedInvites);
      return;
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
}

const updateBoardMembers = async () => {

      
};
