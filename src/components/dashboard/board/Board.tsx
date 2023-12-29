"use client";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useCallback, useMemo, useState } from "react";
import ColumnList from "../column/ColumnList";
import NewColumnWidget from "../column/NewColumnWidget";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import {
  updateColumnOrder,
  updateColumns,
} from "@/lib/redux-toolkit/boardSlice";

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

export const Board = () => {
 

  const { value, tasks, columns, columnOrder } = useAppSelector(
    (state) => state.board
  );
  const dispatch = useAppDispatch();

  const data = useMemo(
    () => ({
      tasks: tasks,
      columns: columns,
      columnOrder: columnOrder,
    }),
    [tasks, columns, columnOrder]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

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
        const newColumnOrder = Array.from(data.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);
        dispatch(updateColumnOrder(newColumnOrder));
        return;
      }

      const home = data.columns.find(
        (column) => column.id === source.droppableId
      ) as ColumnType;
      const foreign = data.columns.find(
        (column) => column.id === destination.droppableId
      ) as ColumnType;

      //moving within lists
      if (home === foreign) {
        const newTaskIds = Array.from(home.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newHome = {
          ...home,
          taskIds: newTaskIds,
        };

        const filteredColumns = data.columns.filter(
          (column) => column.id !== newHome.id
        );
        const newColumns = [...filteredColumns, newHome];
        dispatch(updateColumns(newColumns));
        return;
      }

      // moving from one list to another
      if (home !== foreign) {
        const homeTaskIds = Array.from(home.taskIds);
        homeTaskIds.splice(source.index, 1);
        const newHome = {
          ...home,
          taskIds: homeTaskIds,
        };

        const foreignTaskIds = Array.from(foreign.taskIds);
        foreignTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
          ...foreign,
          taskIds: foreignTaskIds,
        };
        const filteredColumns = data.columns.filter((column) => {
          const conditions =
            column.id !== newHome.id && column.id !== newForeign.id;
          if (conditions) {
            return column;
          }
        });
        const newColumns = [...filteredColumns, newHome, newForeign];
        dispatch(updateColumns(newColumns));
      }
    },
    [dispatch, data]
  );

  console.log("data :", data);

  return (
    <div className={`w-full flex gap-2`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns.find(
                  (column) => column.id === columnId
                ) as ColumnType;
       
                return (
                  <ColumnList
                    key={column.id as string}
                    column={column}
                    taskMap={data.tasks}
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
  );
};
