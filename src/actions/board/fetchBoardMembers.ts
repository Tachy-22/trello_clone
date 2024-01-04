"use server";
import { prisma } from "@/lib/prisma";

const fetchBoardMembers = async (members: string[]) => {
  const users = await prisma.user.findMany({
    where: {
      email: { in: members },
    },
    select: {
      email: true,
      name: true,
    },
  });
  console.log("the members by name;", users);
  return users;
};

export default fetchBoardMembers;
