"use client";
import AsideItems from "@/components/dashboard/aside/AsideItems";
import {
  updateBoardList,
  updateInvitedBoards,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch } from "@/lib/redux-toolkit/hooks";
import { useAuth } from "@clerk/nextjs";
import { ChevronDownIcon } from "lucide-react";
import React, { useCallback, useState, useEffect } from "react";

const AsideContainer = ({
  myBoards,
  invitedBoards,
}: {
  myBoards: BoardListType;
  invitedBoards: BoardDataType[];
}) => {
  const dispatch = useAppDispatch();
  const [hidden, toggleHidden] = useState(false);

  useEffect(() => {
    dispatch(updateBoardList(myBoards));
    dispatch(updateInvitedBoards(invitedBoards));
  }, [dispatch, myBoards, invitedBoards]);

  const handleAsideVisibility = useCallback(() => {
    toggleHidden((prev) => !prev);
  }, []);

  useEffect(() => {
    const setInitialHiddenState = () => {
      if (window.innerWidth < 540) {
        toggleHidden(true);
      }
    };

    // Set initial state on component mount
    setInitialHiddenState();

    // Listen to window resize events to update the state
    const handleResize = () => {
      setInitialHiddenState();
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <aside
      className={`${
        hidden
          ? "-translate-x-[93%]   w-[1.3rem]  "
          : "min-w-fit  w-fit relative"
      }  h-full  transition-all duration-500  flex flex-col  `}
    >
      <div className=" relative w-full flex p-1 z-50   ">
        <div
          onClick={handleAsideVisibility}
          className={`transition-all  duration-500  absolute   rounded-full top-[0rem]  w-fit p-1 ${
            hidden
              ? "translate-x-[100%] right-[0.5rem] rotate-[270deg] "
              : "right-0 rotate-90 "
          }`}
        >
          <ChevronDownIcon size={22} />
        </div>{" "}
      </div>
      <div
        style={{ transitionDuration: "0.5s" }}
        className={`transition-all relative  h-full  w-fit flex flex-col items-start justify-start  ${
          hidden ? "opacity-0 " : ""
        }`}
      >
        {!hidden && <AsideItems />}
      </div>
    </aside>
  );
};

export default AsideContainer;
