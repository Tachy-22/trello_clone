"use client";
import fetchBoardMembers from "@/actions/board/fetchBoardMembers";
import fetchUserWithId from "@/actions/board/fetchUserWithId";
import { updateBoardTitle } from "@/actions/board/updateBoardTitle";
import ShareBoardButton from "@/components/dashboard/board/ShareBoardButton";
import useIsABoardMember from "@/controls/useIsABoardMember";
import { updateBoardList } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { Avatar, AvatarGroup, Tooltip } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";

const DashboardHeader = ({ boardData }: { boardData: BoardDataType }) => {
 // useIsABoardMember(boardData);

  const dispatch = useAppDispatch();
  const { currentBoardData, boardList } = useAppSelector(
    (state) => state.board
  );

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(boardData?.title as string);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [members, setMembers] = useState<memberDataType[] | null>(null);
  const [admin, setAdmin] = useState<memberDataType | null>(null);

  useEffect(() => {
    fetchBoardMembers(currentBoardData?.members as string[]).then((result) => {
      setMembers(result as memberDataType[]);
    });
  }, [currentBoardData?.members]);

  useEffect(() => {
    if (currentBoardData?.authorId !== undefined) {
      fetchUserWithId(currentBoardData?.authorId as string).then((result) =>
        setAdmin(result)
      );
    }
  }, [currentBoardData?.authorId]);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleTitleSubmission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditable(false);
      if (boardData?.title !== title) {
        setIsUpdating(true);

        const updatedBoard = {
          ...currentBoardData,
          title: title,
        } as BoardDataType;

        const updatedBoardList = Array.from(
          boardList?.boards as BoardDataType[]
        );

        const index = boardList?.boards?.findIndex(
          (obj) => obj?.id === boardData?.id
        );

        if (index == -1) {
          const boardIndex = ((boardList?.boards?.length as number) -
            1) as number;
          updatedBoardList?.splice(boardIndex, 1);

          updatedBoardList?.splice(boardIndex, 0, updatedBoard);
        } else {
          updatedBoardList?.splice(index as number, 1);

          updatedBoardList?.splice(index as number, 0, updatedBoard);
        }

        dispatch(
          updateBoardList({
            ...boardList,
            boards: updatedBoardList,
          } as BoardListType)
        );

        updateBoardTitle(
          boardData?.id as string,
          boardData?.authorId as string,
          title
        ).then(() => {
          setIsUpdating(false);
        });
        return;
      }
    },
    [
      boardData?.authorId,
      boardData?.id,
      boardData?.title,
      boardList,
      currentBoardData,
      dispatch,
      title,
    ]
  );

  const initiateTitleEdit = useCallback(() => {
    setIsEditable(true);
  }, []);

  return (
    <div className="backdrop-blur-2xl text-white backdrop-brightness-90 md:px-[2rem] px-[1rem] md:pr-[3rem] py-[0.5rem] w-full absolute left-0 flex justify-between">
      {" "}
      <div className="flex justify-start w-fit items-start">
        {isEditable ? (
          <input
            autoFocus
            onBlur={handleTitleSubmission}
            onChange={handleTitleChange}
            value={title}
            type="text"
            className=" text-xl md:text-2xl lg:text-3xl text-elip font-semibold bg-white p-1 md:p-2 rounded text-black md:w-[10rem] w-[5rem]"
          />
        ) : (
          <p
            onClick={initiateTitleEdit}
            className="text-xl md:text-2xl lg:text-3xl w-full  font-semibold p-1 md:p-2"
          >
            {title}
          </p>
        )}{" "}
        {isUpdating && (
          <span className="relative flex h-2 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>
      <div className="sm:flex gap-1 hidden items-center cursor-pointer">
        <div className="relative flex justify-center mix-blend-difference px-[1rem]">
          <Tooltip content={admin?.email}>
            <Avatar
              classNames={{
                base: "bg-gradient-to-br z-0 lg:text-xl text-lg  from-[#FFB457] to-[#FF705B]",
              }}
              name={returnInitials(admin?.name as string)}
            />
          </Tooltip>
          <span className="absolute mx-auto  right-0 left-0 -bottom-[0.6rem] rounded-sm px-[0.1rem] z-0 text-[0.7rem]  text-blue-400 w-fit  text-center bg-black/40">
            admin
          </span>
        </div>
        <AvatarGroup>
          {members?.map((member, index) => {
            return (
              <div key={index} className="relative">
                <Tooltip content={member?.email}>
                  <Avatar
                    className={`${
                      avatarColors[index % avatarColors.length]
                    } lg:text-xl text-lg`}
                    name={returnInitials(member?.name as string)}
                  />
                </Tooltip>
              </div>
            );
          })}
        </AvatarGroup>

        <ShareBoardButton />
      </div>
    </div>
  );
};

export default DashboardHeader;

const returnInitials = (name: string) => {
  const initials = name
    ?.split(" ")
    ?.map((name) => name[0])
    ?.join("");
  return initials;
};

const avatarColors = [
  "bg-blue-400",
  "bg-orange-400",
  "bg-red-400",
  "bg-pink-400",
];
