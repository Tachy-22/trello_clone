"use client";
import { addTask, updateColumns } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { PlusIcon } from "lucide-react";
import React from "react";

const AddTaskForm = ({
  onClose,
  columnId,
}: {
  onClose: () => void;
  columnId: string;
}) => {
  const dispatch = useAppDispatch();
  const { columns } = useAppSelector((state) => state.board);
  const [title, setTitle] = React.useState<string>("");

  const handleTaskAddition = React.useCallback(() => {
    const newTask = { id: title, content: title };
    dispatch(addTask(newTask as TaskType));
    const currentColumn = columns?.find((column) => column?.id === columnId);
    const filteredColumns = columns?.filter(
      (column) => column?.id !== columnId
    ) as ColumnType[];
    dispatch(
      updateColumns([
        ...filteredColumns,
        {
          ...currentColumn,
          taskIds: [...(currentColumn?.taskIds as string[]), title],
        },
      ] as ColumnType[])
    );
    onClose();
  }, [columnId, columns, dispatch, onClose, title]);

  return (
    <form
      action=""
      className=" bg-white rounded-lg shadow-lg border p-2 flex flex-col gap-2"
    >
      <div className="py-2 px-2   border border-gray-300 rounded-md">
        {" "}
        <input
          className="outline-none text-black bg-white "
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
          onClick={handleTaskAddition}
          type="button"
          className="p2 bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          Add List
        </button>
        <PlusIcon
          onClick={onClose}
          className={`text-4xl rotate-45 text-black hover:bg-black/5 rounded-lg `}
        />
      </div>
    </form>
  );
};

export default AddTaskForm;
