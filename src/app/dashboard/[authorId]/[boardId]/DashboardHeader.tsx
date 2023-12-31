"use client";
import NamedAvatarUi from "@/components/dashboard/board/NamedAvatarUi";
import ShareBoardButton from "@/components/dashboard/board/ShareBoardButton";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import React from "react";

const DashboardHeader = ({ boardData }: { boardData: BoardDataType }) => {
  const { userDbData } = useAppSelector((state) => state.board);
  console.log("userDbData mikyh :", userDbData);

  return (
    <div className="backdrop-blur-2xl text-white backdrop-brightness-90 px-[2rem] py-[0.5rem] w-full absolute left-0 flex justify-between">
      <h1 className="font-semibold text-2xl capitalize w-fit mix-blend-difference">
        {" "}
        {boardData?.title}
      </h1>
      <div className="flex items-center">
        <NamedAvatarUi name={userDbData?.name as string} />
        <ShareBoardButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
