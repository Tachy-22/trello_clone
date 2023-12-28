"use client";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState, useEffect } from "react";

const ToggleProvider = () => {
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
      style={{ transitionDuration: "3s" }}
      className={`${
        hidden
          ? "lg:-translate-x-[93%] -translate-x-[90%]  w-[2rem]  "
          : "md:min-w-fit  w-fit relative"
      } border-r  transition-all bg-blue-500   flex flex-col  `}
    >
     
      <div className=" relative w-full flex p-1 z-50 h-fit  ">
        <div
          style={{ transitionDuration: "2s" }}
          onClick={handleAsideVisibility}
          className={`transition-all duration-1000 bg-blue-500 absolute rounded-full top-0  right-0 w-fit p-1 ${
            hidden ? "translate-x-[100%] rotate-180 border-dashed border" : ""
          }`}
        >
         
          <ArrowBigLeft />
        </div>{" "}
      </div>
      <div
        style={{ transitionDuration: "1s" }}
        className={`transition-all relative    w-fit flex flex-col items-start justify-start border ${
          hidden ? "opacity-0 " : ""
        }`}
      >
        {!hidden && (
          <div className="w-fit  flex items-start justify-start   ">
            <div className="flex w-full items-center gap-2 pr-[3rem] py-2 ">
              <Link className="" href="/">
                <div className="bg-gradient-to-br from-green-900 via-green-700 to-green-300 text-white p-4 w-10 h-10 rounded-md flex justify-center items-center font-extrabold">
                  T
                </div>
              </Link>
              <div className=" flex flex-col min-w-fit w-fit ">
                <Link className="w-full font-semibold" href="/">
                  Trello Workspace
                </Link>

                <p className="">Free</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ToggleProvider;
