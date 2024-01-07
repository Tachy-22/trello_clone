"use server";
import { prisma } from "@/lib/prisma";

const isUserRegistered = async (email: string,) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      
    },
  });
  return user;
};

export default isUserRegistered;
