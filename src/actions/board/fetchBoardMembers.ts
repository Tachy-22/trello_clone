"use server";
import { prisma } from "@/lib/prisma";

const fetchBoardMembers = async (members: string[]) => {
  if (members === null || members === undefined) {
    return;
  } else {
    try {
      if (members?.length === 0) {
        return [];
      } else {
        const membersData = await prisma.user.findMany({
          where: {
            email: { in: members },
          },
          select: {
            email: true,
            name: true,
          },
        });
        console.log("the membersData by name;", membersData);
        return membersData;
      }
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchBoardMembers;
