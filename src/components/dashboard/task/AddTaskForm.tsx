"use client";
import { addTaskToDb } from "@/actions/task/addTaskToDb";
import { updateTaskIdsInDb } from "@/actions/task/updateTaskIdsInDb";
import {
  updateTask,
  updateColumns,
  updateCurrentBoardData,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { PlusIcon } from "lucide-react";
import React, { useId } from "react";

const AddTaskForm = ({
  onClose,
  columnId,
}: {
  onClose: () => void;
  columnId: string;
}) => {
  const taskIdentifier = `${useId()} ${Math.random().toString().split(".")[1]}`;

  const dispatch = useAppDispatch();
  const { columns, currentBoardData } = useAppSelector((state) => state.board);
  const [content, setContent] = React.useState<string>("");

  const handleTaskAddition = React.useCallback(() => {
    const newTask = {
      content: content,
      taskIdentifier: taskIdentifier,
    } as TaskType;


    console.log("newtask :", newTask);

    dispatch(updateTask(newTask));
    
    console.log("add task");
    const currentColumn = currentBoardData?.columns?.find(
      (column) => column?.id === columnId
    ) as ColumnType;
    console.log("current column");
    const filteredColumns = currentBoardData?.columns?.filter(
      (column) => column?.id !== columnId
    ) as ColumnType[];
    console.log("filtered Columns");
    const updatedTasks = [...(currentBoardData?.tasks as TaskType[]), newTask];
    const updatedTaskIds = [
      ...currentColumn?.taskIds,
      newTask?.taskIdentifier,
    ] as string[];
    const updatedColumns = [
      ...filteredColumns,
      { ...currentColumn, taskIds: updatedTaskIds },
    ];

    dispatch(
      updateCurrentBoardData({
        ...currentBoardData,
        tasks: updatedTasks,
        columns: updatedColumns,
      } as BoardDataType)
    );
    console.log("miiki", currentColumn, updatedTasks);

    console.log("mi   iololiki", updatedTaskIds);

    console.log("updated columns duh :", updatedColumns);

    addTaskToDb(currentBoardData?.id as string, content, taskIdentifier).then(
      (column) => {
        console.log("column return", column);
      }
    );

    updateTaskIdsInDb(currentBoardData?.id as string, columnId, updatedTaskIds);

    console.log("dispatched last nigga");
    onClose();
  }, [columnId, currentBoardData, dispatch, onClose, taskIdentifier, content]);

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
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
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
