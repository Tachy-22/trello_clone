"use client";
import { increment } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import React from "react";

const DashboardHeader = ({
  boardId,
  boardData,
}: {
  boardId: string;
  boardData:
    | ({
        columns: {
          id: string;
          title: string;
          taskIds: string[];
          boardId: string;
        }[];
        tasks: { id: string; content: string; boardId: string }[];
      } & {
        id: string;
        title: string;
        authorId: string;
        backgroundColor: string;
        backgroundImage: string;
        columnOrder: string[];
      })
    | null
    | undefined;
}) => {
  return (
    <div className="backdrop-blur-2xl px-[2rem] py-[1rem]">
      DashboardHeader, {boardData?.title}
    </div>
  );
};

export default DashboardHeader;
