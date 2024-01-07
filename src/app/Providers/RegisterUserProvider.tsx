"use client";
import isUserRegistered from "@/actions/home/isUserRegistered";
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
    const name = user?.fullName as string;
    const email = user?.emailAddresses[0]?.emailAddress as string;
    const userLocal = localStorage.getItem("trello-userId");
    const userId = user?.id as string;

    const provideUserRegistration = async () => {
      try {
        if (email) {
          const userData = await registerUser(email, name);
          dispatch(updateUserDbData(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    console.log({ userId, userDbData, userLocal });
    const updateUerDbData = async () => {
      if (userDbData === null && userLocal && email) {
        const userData = await isUserRegistered(email);
        dispatch(updateUserDbData(userData));
      }
    };
    updateUerDbData();
    if (
      userLocal !== userId &&
      isLoaded &&
      isSignedIn &&
      userDbData === null &&
      userId !== undefined
    ) {
      provideUserRegistration().then(() => {
        console.log(
          "has provided registeration ability, checking user prescence in db"
        );
        localStorage.setItem("trello-userId", userId);
      });
    } else {
      return;
    }
  }, [
    dispatch,
    isLoaded,
    isSignedIn,
    user,
    user?.emailAddresses,
    user?.fullName,
    user?.id,
    userDbData,
  ]);

  return <>{children}</>;
};

export default RegisterUserProvider;
