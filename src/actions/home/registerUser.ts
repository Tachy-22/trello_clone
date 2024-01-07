"use server";

import { prisma } from "@/lib/prisma";
import isUserRegistered from "./isUserRegistered";

const registerUser = async (email: string, name: string) => {
  const userData = await isUserRegistered(email);
  if (userData) {
    console.log("this user has been registered already");
    return userData;
  } else {
    const userData = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    return userData;
  }
};

export default registerUser;
