"use client";
import AsideItems from "@/components/dashboard/aside/AsideItems";
import { updateBoardList } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch } from "@/lib/redux-toolkit/hooks";
import { Settings, X } from "lucide-react";
import React, { useCallback, useState, useEffect } from "react";

const SideSheet = () => {
  const dispatch = useAppDispatch();

  const [hidden, toggleHidden] = useState(true);

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
          ? "lg:translate-x-[100%] translate-x-[100%]  w-[0rem] sm:w-[0rem]  "
          : "md:min-w-fit  w-[25rem] relative"
      }  h-full  transition-all   flex flex-col justify-start items-start `}
    >
      <div className=" relative w-full h-fit flex p-1 z-50   ">
        <div
          style={{ transitionDuration: "0.5s" }}
          onClick={handleAsideVisibility}
          className={`transition-all duration-1000 bg-white dark:bg-gray-900  dark:text-white text-black absolute rounded-full top-[0rem]   w-fit p-1 mt-[1.4rem] right-0 ${
            hidden ? " -translate-x-[90%]  " : "  "
          }`}
        >
          {hidden ? <Settings size={20} /> : <X size={18} />}
        </div>{" "}
      </div>
      <div
        style={{ transitionDuration: "0.5s" }}
        className={`transition-all relative  h-full  w-fit flex flex-col items-start justify-start  ${
          hidden ? "opacity-0 " : ""
        }`}
      >
        {/* {!hidden && <AsideItems />} */}
      </div>
    </aside>
  );
};

export default SideSheet;
