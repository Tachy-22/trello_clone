import Link from "next/link";
import React from "react";
import LogoBar from "./LogoBar";
import AddBoardButton from "./AddBoardButton";
import MyBoards from "./MyBoards";

const AsideContainer = () => {
  return (
    <div className="w-fit gap-2 flex-col flex items-start justify-start   ">
      <LogoBar />
      <MyBoards />
    </div>
  );
};

export default AsideContainer;
