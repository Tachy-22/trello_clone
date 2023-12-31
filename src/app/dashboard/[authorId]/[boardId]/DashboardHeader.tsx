"use client";
import { updateBoardTitle } from "@/actions/board/updateBoardTitle";
import NamedAvatarUi from "@/components/dashboard/board/NamedAvatarUi";
import ShareBoardButton from "@/components/dashboard/board/ShareBoardButton";
import {
  updateBoardList,
  updateCurrentBoardData,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import React, { useCallback, useState } from "react";

const DashboardHeader = ({ boardData }: { boardData: BoardDataType }) => {
  const dispatch = useAppDispatch();

  const { userDbData, currentBoardData, boardList } = useAppSelector(
    (state) => state.board
  );
  console.log("userDbData mikyh :", userDbData);

  const [title, setTitle] = useState<string>(boardData?.title as string);
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleTitleSubmission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (boardData?.title !== title) {
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
          console.log(
            "updatedBoardList",
            updatedBoardList,
            "boardIndex",
            boardIndex,
            boardList?.boards
          );
        } else {
          updatedBoardList?.splice(index as number, 1);

          updatedBoardList?.splice(index as number, 0, updatedBoard);

          console.log("updatedBoardList", updatedBoardList, "id", index);
        }

       dispatch(updateBoardList({ ...boardList, boards: updatedBoardList }));

        updateBoardTitle(
          boardData?.id as string,
          boardData?.authorId as string,
          title
        );
        return;
      }
    },
    [boardData?.authorId, boardData?.id, boardData?.title, boardList, currentBoardData, dispatch, title]
  );

  return (
    <div className="backdrop-blur-2xl text-white backdrop-brightness-90 px-[2rem] py-[0.5rem] w-full absolute left-0 flex justify-between">
      {" "}
      <input
        onBlur={handleTitleSubmission}
        onChange={handleTitleChange}
        value={title}
        type="text"
        className="bg-transparent text-3xl font-semibold focus:bg-white p-2 rounded focus:text-black w-fit"
      />
      <div className="flex items-center">
        <NamedAvatarUi name={userDbData?.name as string} />
        <ShareBoardButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
