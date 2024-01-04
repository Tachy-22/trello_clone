"use client";
import getBackground from "@/controls/getBackground";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

const BoardView = () => {
  const { boardList } = useAppSelector((state) => state.board);
  console.log("boardList from boards :", boardList);
  return (
    <div className="max-w-7xl flex flex-col p-[2rem] mx-auto w-full ">
      <div className="flex border-b gap-3 py-[2rem] w-full">
        <User />
        <h1 className="capitalize font-semibold">your Boards</h1>
      </div>
      <div className="overflow-hidden">
        <ul className="flex md:flex gap-4 py-[2rem] overflow-auto scrollVisible">
          {/* map through the list of user's board and display them */}
          {boardList?.boards?.map((board, index) => {
            return (
              <Link
                key={index}
                href={`${board?.id}`}
                style={{
                  background: getBackground(board),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded-lg h-[6rem] min-w-[12rem] text-white  text-lg font-semibold"
              >
                <span className="backdrop-brightness-[50%] h-full w-full p-1 rounded-lg ">
                  {" "}
                  {board?.title}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BoardView;
