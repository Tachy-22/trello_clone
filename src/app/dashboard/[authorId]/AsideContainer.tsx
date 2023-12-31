"use client";
import AsideItems from "@/components/dashboard/aside/AsideItems";
import { updateBoardList } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch } from "@/lib/redux-toolkit/hooks";
import { ChevronDownIcon } from "lucide-react";
import React, { useCallback, useState, useEffect } from "react";

const AsideContainer = ({ myBoards }: { myBoards: BoardListType }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateBoardList(myBoards));
  }, [dispatch, myBoards]);

  const [hidden, toggleHidden] = useState(false);

  const handleAsideVisibility = useCallback(() => {
    toggleHidden((prev) => !prev);
  }, []);

  useEffect(() => {
    const setInitialHiddenState = () => {
      // Set hidden to true on smaller screens (less than 768px width)
      if (window.innerWidth < 540) {
        toggleHidden(true);
      }
      // else {
      //   toggleHidden(false);
      // }
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
      style={{ transitionDuration: "0.5s" }}
      className={`${
        hidden
          ? "lg:-translate-x-[93%] -translate-x-[90%]  w-[2.5rem] sm:w-[2rem]  "
          : "md:min-w-fit  w-fit relative"
      }  h-full  transition-all   flex flex-col  `}
    >
      <div className=" relative w-full flex p-1 z-50   ">
        <div
          style={{ transitionDuration: "0.5s" }}
          onClick={handleAsideVisibility}
          className={`transition-all duration-1000 dark:text-white text-black absolute rounded-full top-[3.5rem] bg-white dark:bg-gray-900  w-fit p-1 ${
            hidden
              ? "translate-x-[100%] -right-[0rem] rotate-[270deg] "
              : "-right-[1rem] rotate-90"
          }`}
        >
          <ChevronDownIcon size={18} />
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
