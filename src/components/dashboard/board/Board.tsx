"use client";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { useCallback, useState } from "react";
import ColumnList from "../column/ColumnList";
import NewColumnWidget from "../column/NewColumnWidget";

const initialData = {
  tasks: [
    { id: "task-1", content: "Take out the garbage" },
    { id: "task-2", content: "Watch my favorite show" },
    { id: "task-3", content: "Charge my phone" },
    { id: "task-4", content: "Cook dinner" },
  ],
  columns: [
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
  ],
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
};

export const Board = () => {
  const [data, setData] = useState(initialData);

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

        const newState = {
          ...data,
          columnOrder: newColumnOrder,
        };
        setData(newState);
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
        const newState = {
          ...data,
          columns: [...filteredColumns, newHome],
        };

        setData(newState);
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
          if (column.id !== newHome.id || column.id !== newForeign.id) return;
        });
        const newState = {
          ...data,
          columns: [...filteredColumns, newHome, newForeign],
        };
        setData(newState);
      }
    },
    [data]
  );

  return (
    <div className={`w-full flex-col-reverse lg:flex-row flex gap-2`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex flex-col lg:flex-row gap-2"
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
