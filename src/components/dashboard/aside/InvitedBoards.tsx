"use client";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteBoardButton from "./DeleteBoardButton";
import { Skeleton } from "@nextui-org/react";
import getBackground from "@/controls/getBackground";

const InvitedBoards = () => {
  const { userDbData, invitedBoards } = useAppSelector((state) => state.board);

  const pathname = usePathname();

  return (
    <>
      {" "}
      {userDbData?.invites.length !== 0 && (
        <div className="flex flex-col gap-2 pt-[1rem] w-full px-[] h-fit ">
          <div className="flex justify-between items-center px-[1rem] h-full">
            <p className="font-semibold">Invited boards</p>
            <span className=""></span>
          </div>
          <div className="h-full">
            <div className="flex flex-col">
              {invitedBoards?.map((board) => {
                return (
                  <div
                    className={` transition-all duration-250 group   flex hover:bg-black/10 justify-between items-center w-full ${
                      pathname.split("/").at(-1) === board?.id
                        ? "bg-black/20"
                        : ""
                    }`}
                    key={board?.id as string}
                  >
                    <Link
                    
                      className={`" pl-4   py-2 w-full  flex gap-2 justify-start items-center "`}
                      href={`${board?.id}`}
                    >
                      <div
                        style={{
                          background: getBackground(board),
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        className="rounded-md w-[1.5rem] h-[1.5rem] border"
                      />
                      <p className=""> {board?.title}</p>
                    </Link>
                    <span className="group-hover:block  hidden pr-4">
                      <DeleteBoardButton type="exit" board={board} />
                    </span>
                  </div>
                );
              })}
            </div>
            {InvitedBoards === null && (
              <div className="flex flex-col pb-[2rem] px-[1rem] gap-2">
                {userDbData?.invites.map((skel) => {
                  return (
                    <div key={skel} className="flex gap-2 items-center">
                      <Skeleton className="w-[2rem] h-[2rem]  rounded-md " />
                      <Skeleton className="w-full h-[1.5rem] rounded-md " />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InvitedBoards;
