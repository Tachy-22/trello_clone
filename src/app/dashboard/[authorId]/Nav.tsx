import Link from "next/link";
import React from "react";
import AsideContainer from "./AsideContainer";
import { fetchBoards } from "@/actions/board/fetchaBoards";

const Nav = async ({ params }: { params: string }) => {
  console.log("params.authorId :", params);
  const boards = await fetchBoards(params);
  console.log("myBoards i kr:", boards?.myBoards);

  return (
    <AsideContainer
      invitedBoards={boards?.invitedBoards as BoardDataType[]}
      myBoards={boards?.myBoards as BoardListType}
    />
  );
};

export default Nav;
