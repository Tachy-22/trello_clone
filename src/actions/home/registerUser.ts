"use server";

import { prisma } from "@/lib/prisma";
import isUserRegistered from "./isUserRegistered";

const registerUser = async (email: string, name: string) => {
  const user = await isUserRegistered(email);
  if (user) {
    console.log("this user has been registered already");
    return user;
  } else {
    //register user
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    return user;
  }
};

export default registerUser;
