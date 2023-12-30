"use client";

import { addColumnToDb } from "@/actions/board/addColumnToDb";
import { updateColumnOrderInDb } from "@/actions/board/updateColumnOrderInDb";
import {
  updateColumnOrder,
  updateColumns,
  updateCurrentBoardData,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useId, useState } from "react";

const NewColumnForm = ({ onClose }: { onClose: () => void }) => {
  const columnIdentifier = `${useId()} ${
    Math.random().toString().split(".")[1]
  }`;

  const dispatch = useAppDispatch();
  const { columns, columnOrder, userDbData, currentBoardData } = useAppSelector(
    (state) => state.board
  );
  const [title, setTitle] = useState<string>("");

  const handleColumnAddition = useCallback(() => {
    addColumnToDb(currentBoardData?.id as string, title, columnIdentifier).then(
      (column) => {
        console.log("column return", column);
      }
    );
    const newColumns = [
      ...(currentBoardData?.columns as ColumnType[]),
      { columnIdentifier: columnIdentifier, title: title, taskIds: [] },
    ] as ColumnType[];
    //   dispatch(updateColumns(newColumns));
    const newColumnOrder = [
      ...(currentBoardData?.columnOrder as string[]),
      columnIdentifier,
    ] as string[];
    //   dispatch(updateColumnOrder(newColumnOrder));
    console.log(
      "currentBoardData?.id :",
      newColumns,
      newColumnOrder,
      currentBoardData?.id
    );
    updateColumnOrderInDb(
      currentBoardData?.id as string,
      currentBoardData?.authorId as string,
      newColumnOrder as string[]
    );
    dispatch(
      updateCurrentBoardData({
        ...currentBoardData,
        columns: newColumns,
        columnOrder: newColumnOrder,
      } as BoardDataType)
    );
    onClose();
  }, [currentBoardData, title, columnIdentifier, dispatch, onClose]);

  return (
    <form
      action=""
      className=" bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-2"
    >
      <div className="py-2 px-2   border border-gray-300 rounded-md">
        {" "}
        <input
          className="outline-none bg-white text-black"
          type="text"
          name="columnName"
          placeholder="Add a new column..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-1 items-center">
        <button
          onClick={handleColumnAddition}
          type="button"
          className="p2 bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          Add List
        </button>
        <PlusIcon
          onClick={onClose}
          className={`text-4xl rotate-45 text-black hover:bg-black/5 rounded-lg p-`}
        />
      </div>
    </form>
  );
};

export default NewColumnForm;
