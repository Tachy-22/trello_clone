import React from "react";
import LogoBar from "./LogoBar";
import MyBoards from "./MyBoards";

const AsideContainer = () => {
  return (
    <div className="w-fit h-full gap-2 flex-col flex items-start justify-start   ">
      <LogoBar />
      <MyBoards />
    </div>
  );
};

export default AsideContainer;
