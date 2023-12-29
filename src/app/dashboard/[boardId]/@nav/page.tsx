import Link from "next/link";
import React from "react";
import AsideContainer from "./AsideContainer";
import { fetchBoards } from "@/actions/board/fetchaBoards";

const page = async ({ params }: { params: { boardId: string } }) => {
  const myBoards = await fetchBoards(params.boardId.split("-")[1]);
  return <AsideContainer myBoards={myBoards} />;
};

export default page;
