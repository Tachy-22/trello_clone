import React from "react";
import AsideContainer from "./AsideContainer";
import { fetchBoards } from "@/actions/board/fetchaBoards";

const Nav = async ({ params }: { params: string }) => {
  const boards = await fetchBoards(params);

  return (
    <AsideContainer
      invitedBoards={boards?.invitedBoards as BoardDataType[]}
      myBoards={boards?.myBoards as BoardListType}
    />
  );
};

export default Nav;
