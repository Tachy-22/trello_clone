"use client";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskList from "../task/TaskList";
import AddTask from "../task/AddTask";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { updateColumnTitle } from "@/actions/column/updateColumnTitle";

import ColumnMenuButton from "./ColumnMenuButton";

const Column = ({
  column,
  tasks,
  index,
}: {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
}) => {
  const dispatch = useAppDispatch();

  const { userDbData, currentBoardData, boardList } = useAppSelector(
    (state) => state.board
  );
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState<string>(column?.title as string);
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleTitleSubmission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsEditable(false);
      if (column?.title !== title) {
        // const updatedColumn = currentBoardData?.columns?.filter(
        //   (col) => col.id === column.id
        // );
        // const updatedBoardList = Array.from(
        //   boardList?.boards as BoardDataType[]
        // );
        // const index = boardList?.boards?.findIndex(
        //   (obj) => obj?.id === column?.id
        // );
        // if (index == -1) {
        //   const boardIndex = ((boardList?.boards?.length as number) -
        //     1) as number;
        //   updatedBoardList?.splice(boardIndex, 1);

        //   updatedBoardList?.splice(boardIndex, 0, updatedBoard);
        //   console.log(
        //     "updatedBoardList",
        //     updatedBoardList,
        //     "boardIndex",
        //     boardIndex,
        //     boardList?.boards
        //   );
        // } else {
        //   updatedBoardList?.splice(index as number, 1);
        //   updatedBoardList?.splice(index as number, 0, updatedBoard);
        //   console.log("updatedBoardList", updatedBoardList, "id", index);
        // }
        //  dispatch(updateBoardList({ ...boardList, boards: updatedBoardList }));

        updateColumnTitle(
          column?.id as string,
          column?.boardId as string,
          column?.columnIdentifier as string,
          title
        );
        return;
      }
    },
    [
      column?.title,
      column?.id,
      column?.boardId,
      column?.columnIdentifier,
      title,
    ]
  );

  const handleSetIsEditable = useCallback(() => {
    setIsEditable(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Draggable draggableId={column?.columnIdentifier as string} index={index}>
        {(provided) => (
          <div
            className="bg-slate-100 rounded-xl   flex flex-col gap- w-[18rem] h-fit"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              {...provided.dragHandleProps}
              className=" px-4 py-1 flex justify-between gap-2 items-center"
            >
              {isEditable ? (
                <input
                  autoFocus
                  onBlur={handleTitleSubmission}
                  onChange={handleTitleChange}
                  value={title}
                  type="text"
                  className="bg-transparent   text-lg font-semibold bg-white p-2  rounded text-black w-full"
                />
              ) : (
                <h1
                  onClick={handleSetIsEditable}
                  className="text-lg font-semibold text-black p-2"
                >
                  {title}
                </h1>
              )}

              <ColumnMenuButton board={currentBoardData} column={column} />
            </div>

            <Droppable
              droppableId={column?.columnIdentifier as string}
              type="task"
            >
              {(provided, snapshot) => (
                <div
                  className={`${
                    snapshot.isDraggingOver ? "bg-black/30 pt-2" : ""
                  } px-4 pb-2 rounded-lg`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  //  isDraggingOver={snapshot.isDraggingOver}
                >
                  <TaskList tasks={tasks} column={column} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          
            <AddTask columnId={column?.id as string} />
          </div>
        )}
      </Draggable>
    </motion.div>
  );
};

export default Column;
