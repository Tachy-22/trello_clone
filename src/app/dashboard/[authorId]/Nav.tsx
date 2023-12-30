import Link from "next/link";
import React from "react";
import AsideContainer from "./AsideContainer";
import { fetchBoards } from "@/actions/board/fetchaBoards";

const Nav = async ({ params }: { params: string }) => {
  console.log("params.authorId :", params);
  const myBoards = await fetchBoards(params);
    console.log("myBoards i kr:", myBoards);

  return <AsideContainer myBoards={myBoards} />;
};

export default Nav;
