"use server";

import { prisma } from "@/lib/prisma";

const updateInvitedBoards = async (email: string, invites: string[]) => {
  //register user
  if (invites.length !== 0) {
    const update = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        invites: invites,
      },
    });
    console.log("updates:", update);
    return update;
  }
};

export default updateInvitedBoards;
