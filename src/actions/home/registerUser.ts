"use server";

import { prisma } from "@/lib/prisma";
import isUserRegistered from "./isUserRegistered";

const registerUser = async (email: string, name: string) => {
  const userData = await isUserRegistered(email);
  if (userData) {
    console.log("this user has been registered already");
    const status = "registered";
    return userData;
  } else {
    const userData = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    const status = "registered";
    return userData;
  }
};

export default registerUser;
