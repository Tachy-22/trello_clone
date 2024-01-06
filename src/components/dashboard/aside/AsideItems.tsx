import React from "react";
import LogoBar from "./LogoBar";
import MyBoards from "./MyBoards";
import InvitedBoards from "./InvitedBoards";

const AsideContainer = () => {
  return (
    <div className="w-fit h-full   flex-col flex items-start justify-start    ">
      <LogoBar />
      <MyBoards />
      <InvitedBoards />
    </div>
  );
};

export default AsideContainer;
