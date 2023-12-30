"use client";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useCallback, useEffect, useMemo, useState } from "react";
import ColumnList from "../column/ColumnList";
import NewColumnWidget from "../column/NewColumnWidget";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import {
  updateColumnOrder,
  updateColumns,
  updateCurrentBoardData,
} from "@/lib/redux-toolkit/boardSlice";
import { updateColumnOrderInDb } from "@/actions/board/updateColumnOrderInDb";
import { updateTaskIdsInDb } from "@/actions/task/updateTaskIdsInDb";

const TasksInit = [
  { id: "task-1", content: "Take out the garbage" },
  { id: "task-2", content: "Watch my favorite show" },
  { id: "task-3", content: "Charge my phone" },
  { id: "task-4", content: "Cook dinner" },
];

const ColumnsInit = [
  {
    id: "column-1",
    title: "To do",
    taskIds: ["task-1", "task-2"],
  },
  {
    id: "column-2",
    title: "In progress",
    taskIds: ["task-3", "task-4"],
  },
];
const ColumnOrderInit = ["column-1", "column-2"];

export const Board = ({
  boardId,
  boardData,
}: {
  boardId: string;
  boardData: BoardDataType;
}) => {
  const dispatch = useAppDispatch();
  const { tasks, userDbData, columns, columnOrder, currentBoardData } =
    useAppSelector((state) => state.board);

  console.log(
    "currentBoardData :",
    currentBoardData,
    tasks,
    columns,
    columnOrder
  );

  useEffect(() => {
    // console.log("ran the use effect hook");
    // updateColumnOrderInDb(boardData?.id as string, boardData?.authorId as string, columnOrder);
    const initialColumnOrder = boardData?.columns?.map(
      (column) => column?.columnIdentifier
    ) as string[];
    console.log(
      "initialColumnOrder:",
      initialColumnOrder,
      boardData?.columnOrder.length === 0,
      boardData?.columns?.length !== 0
    );
    boardData?.columnOrder.length !== boardData?.columns?.length &&
      updateColumnOrderInDb(
        boardData?.id as string,
        boardData?.authorId as string,
        initialColumnOrder
      );
    //  boardData?.columnOrder.length !== boardData?.columns?.length &&
    dispatch(updateCurrentBoardData(boardData));
    console.log("here sis it");
  }, [boardData, dispatch]);

  // const data = useMemo(
  //   () => ({ tasks, columns, columnOrder }),
  //   [tasks, columns, columnOrder]
  const data = useMemo(() => currentBoardData, [currentBoardData]);
  console.log(
    "boardData from board :",
    boardData,
    //columnOrder,
    data
    // columns
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      console.log(destination, source, draggableId, type);
      //for invalid DND
      if (!destination) {
        return;
      }
      //for same position DND
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(data?.columnOrder as string[]);
        // console.log(
        //   "newColumnOrder 1:",
        //   newColumnOrder,
        //   source.index,
        //   destination.index
        // );
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        updateColumnOrderInDb(
          boardData?.id as string,
          boardData?.authorId as string,
          newColumnOrder as string[]
        );
        dispatch(
          updateCurrentBoardData({
            ...currentBoardData,
            columnOrder: newColumnOrder as string[],
          } as BoardDataType)
        );
        dispatch(updateColumnOrder(newColumnOrder));
        return;
      }

      const home = data?.columns?.find((column) => {
        console.log(column?.id, "column?.id");
        return column?.columnIdentifier === source.droppableId;
      }) as ColumnType;

      const foreign = data?.columns?.find(
        (column) => column?.columnIdentifier === destination.droppableId
      ) as ColumnType;

      //moving within lists
      if (home === foreign) {
        const newTaskIds = Array.from(home?.taskIds as string[]);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newHome = {
          ...home,
          taskIds: newTaskIds,
        };

        console.log("homeic:", home);
        const filteredColumns = data?.columns?.filter(
          (column) => column?.id !== newHome.id
        ) as ColumnType[];
        const newColumns = [...filteredColumns, newHome];

        updateTaskIdsInDb(
          currentBoardData?.id as string,
          newHome.id,
          newTaskIds
        );
        dispatch(
          updateCurrentBoardData({
            ...currentBoardData,
            columns: newColumns,
          } as BoardDataType)
        );
        dispatch(updateColumns(newColumns as ColumnType[]));
        return;
      }

      // moving from one list to another
      if (home !== foreign) {
        const homeTaskIds = Array.from(home?.taskIds as string[]);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
          ...home,
          taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign?.taskIds as string[]);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
          ...foreign,
          taskIds: foreignTaskIds,
        };
        const filteredColumns = data?.columns?.filter((column) => {
          const conditions =
            column?.id !== newHome.id && column?.id !== newForeign.id;
          if (conditions) {
            return column;
          }
        }) as ColumnType[];
        const newColumns = [...filteredColumns, newHome, newForeign];

        updateTaskIdsInDb(
          currentBoardData?.id as string,
          newHome.id,
          homeTaskIds
        );
        updateTaskIdsInDb(
          currentBoardData?.id as string,
          newForeign.id,
          foreignTaskIds
        );
        dispatch(
          updateCurrentBoardData({
            ...currentBoardData,
            columns: newColumns,
          } as BoardDataType)
        );
        dispatch(updateColumns(newColumns as ColumnType[]));
      }
    },
    [
      data?.columns,
      data?.columnOrder,
      boardData?.id,
      boardData?.authorId,
      dispatch,
      currentBoardData,
    ]
  );

  //console.log("data :", data);

  return (
    <div
      className={`  flex gap-2 h-full pt-[5rem] p-[1.5rem] oveflow-auto scrollVisible snap-end  `}
    >
      <div className=" flex w-full  py-6 px-2 gap-4  ">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex gap-3   w-fit "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.columnOrder?.map((columnId, index) => {
                  const column = data?.columns?.find(
                    (column) => column?.columnIdentifier === columnId
                  ) as ColumnType;

                  return (
                    <ColumnList
                      key={column?.id as string}
                      column={column as ColumnType}
                      taskMap={data?.tasks as TaskType[]}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <NewColumnWidget />
      </div>
    </div>
  );
};
