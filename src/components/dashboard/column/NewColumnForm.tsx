"use client";

import {
  updateColumnOrder,
  updateColumns,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { PlusIcon } from "lucide-react";
import React, { useCallback, useState } from "react";

const NewColumnForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const {  columns, columnOrder } = useAppSelector(
    (state) => state.board
  );
  const [title, setTitle] = useState<string>("");

  const handleColumnAddition = useCallback(() => {
    const newColumns = [...columns, { id: title, title: title, taskIds: [] }];
    dispatch(updateColumns(newColumns));
    const newColumnOrder = [...columnOrder, title];
    dispatch(updateColumnOrder(newColumnOrder));
    onClose();
  }, [dispatch, title, columnOrder, columns, onClose]);

  return (
    <form
      action=""
      className=" bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-2"
    >
      <div className="py-2 px-2   border border-gray-300 rounded-md">
        {" "}
        <input
          className="outline-none "
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
          className={`text-4xl rotate-45 hover:bg-black/5 rounded-lg p-`}
        />
      </div>
    </form>
  );
};

export default NewColumnForm;
