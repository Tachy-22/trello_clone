"use client";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import React from "react";

const DashboardHeader = ({
  boardData,
}: {
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
  const { userDbData } = useAppSelector((state) => state.board);
  console.log("userDbData mikyh :", userDbData);

  return (
    <div className="backdrop-blur-2xl px-[2rem] py-[1rem] w-full absolute left-0">
      <h1 className="font-semibold text-2xl capitalize w-fit">
        {" "}
        {boardData?.title}
      </h1>
    </div>
  );
};

export default DashboardHeader;
