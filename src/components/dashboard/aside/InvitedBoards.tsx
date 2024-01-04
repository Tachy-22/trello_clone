"use client";
import { fetchInvitedBoards } from "@/actions/board/fetchInvitedBoards";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import DeleteBoardButton from "./DeleteBoardButton";

const InvitedBoards = () => {
  const { userDbData } = useAppSelector((state) => state.board);
  const [InvitedBoards, setInvitesBoards] = useState<BoardDataType[]>([]);
  useLayoutEffect(() => {
    const fetchInvites = async () => {
      console.log(" userDbData?.invites,", userDbData?.invites);
      const invites = await fetchInvitedBoards(userDbData?.invites as string[]);
      setInvitesBoards(invites as BoardDataType[]);
      console.log("invites", invites);
    };
    fetchInvites();
  }, [userDbData?.invites]);

  console.log("InvitedBoards:", InvitedBoards);
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 pt-[1rem] w-full px-[] h-fit ">
      <div className="flex justify-between items-center px-[1rem] h-full">
        <p className="font-semibold">Invited boards</p>
        <span className=""></span>
      </div>
      <div className="h-full">
        <div className="flex flex-col">
          {InvitedBoards?.map((board) => {
            const color1 = board?.backgroundColor.split("-")[0];
            const color2 = board?.backgroundColor.split("-")[1];

            const background =
              board?.backgroundColor !== ""
                ? `linear-gradient(to  right,  ${color1} 0%,${color2} 100%)`
                : `url(${board?.backgroundImage})`;
            return (
              <div
                className={` transition-all duration-250 group   flex hover:bg-black/10 justify-between items-center w-full ${
                  pathname.split("/").at(-1) === board?.id ? "bg-black/20" : ""
                }`}
                key={board?.id as string}
              >
                <Link
                  className={`" pl-4   py-2 w-full  flex gap-2 justify-start items-center "`}
                  href={`${board?.id}`}
                >
                  <div
                    style={{
                      background: background,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="rounded-md w-[1.5rem] h-[1.5rem] border"
                  />
                  <p className=""> {board?.title}</p>
                </Link>
                <span className="  hidden pr-4">
                  <DeleteBoardButton board={board} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvitedBoards;
