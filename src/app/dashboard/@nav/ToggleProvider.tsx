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
      if (window.innerWidth < 768) {
        toggleHidden(true);
      } else {
        toggleHidden(false);
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
      style={{ transitionDuration: "1s" }}
      className={`${
        hidden
          ? "-translate-x-[93%] w-6 text-transparent absolute"
          : "min-w-[18rem] w-[18rem]"
      } border-r  transition-all  flex flex-col relative`}
    >
      <div className="relative w- p-1">
        <div
          style={{ transitionDuration: "2s" }}
          onClick={handleAsideVisibility}
          className={`transition-all duration-1000 absolute rounded-full  right-0 p-1 ${
            hidden ? "translate-x-[100%] rotate-180 border-dashed border" : ""
          }`}
        >
          <ArrowBigLeft fill="gray" />
        </div>
      </div>
      <div
        style={{ transitionDuration: "1s" }}
        className={`transition-all w-full ${hidden ? "opacity-0" : ""}`}
      >
        {" "}
        {!hidden && children}
      </div>
    </aside>
  );
};

export default ToggleProvider;
