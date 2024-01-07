"use server";
import { prisma } from "@/lib/prisma";

const fetchUserWithId = async (authorId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return user;
};

export default fetchUserWithId;
