"use client";
import { ArrowBigLeft } from "lucide-react";
import React, { useCallback, useState, useEffect } from "react";

const ToggleProvider = ({ children }: { children: React.ReactNode }) => {
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
          : "md:min-w-[18rem] md:w-[18rem] w-fit relative"
      } border-r  transition-all    flex flex-col z-0 bg-white`}
    >
      <div className="relative w- p-1 z-50">
        <div
          style={{ transitionDuration: "2s" }}
          onClick={handleAsideVisibility}
          className={`transition-all duration-1000 absolute rounded-full top-0  right-0 p-1 ${
            hidden ? "translate-x-[2rem] rotate-180 border-dashed border" : ""
          }`}
        >
          tog
          <ArrowBigLeft fill="gray" />
        </div>
      </div>
      <div
        style={{ transitionDuration: "1s" }}
        className={`transition-all w-fit flex flex-col border ${hidden ? "opacity-0" : ""}`}
      >
        {" "}
        {!hidden && children}
      </div>
    </aside>
  );
};

export default ToggleProvider;
