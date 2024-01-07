"use client";
import registerUser from "@/actions/home/registerUser";
import { updateUserDbData } from "@/lib/redux-toolkit/boardSlice";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const RegisterUserProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userDbData } = useAppSelector((state) => state.board);
  useEffect(() => {
    const provideUserRegistration = async () => {
      try {
        const name = user?.fullName as string;
        const email = user?.emailAddresses[0]?.emailAddress as string;
        if (email) {
          const userData = await registerUser(email, name);
          dispatch(updateUserDbData(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const userLocal = localStorage.getItem("trello-userId");
    const userId = user?.id as string;
    if (userLocal !== user?.id && isLoaded && isSignedIn) {
      provideUserRegistration().then(() => {
        localStorage.setItem("trello-userId", userId);
      });
    } else {
      return;
    }
  }, [
    dispatch,
    isLoaded,
    isSignedIn,
    user?.emailAddresses,
    user?.fullName,
    user?.id,
    userDbData,
  ]);

  return <>{children}</>;
};

export default RegisterUserProvider;
