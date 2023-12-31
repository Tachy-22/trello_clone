"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ColumnList from "../column/ColumnList";
import NewColumnWidget from "../column/NewColumnWidget";

import useDragDropContext from "@/controls/useDragDropContext";
import useCurentBoardStateUpdate from "@/controls/useCurentBoardStateUpdate";
import useIsABoardMember from "@/controls/useIsABoardMember";

export const Board = ({ boardData }: { boardData: BoardDataType }) => {
  useIsABoardMember(boardData);
  useCurentBoardStateUpdate(boardData);
  const { currentBoardData, onDragEnd } = useDragDropContext(boardData);

  return (
    <div
      className={`  flex gap-2 h-full pt-[4rem]  oveflow-auto scrollVisible snap-end  `}
    >
      <div className=" flex w-full  py-6  gap-4  ">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="flex gap-2   w-fit "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {currentBoardData?.columnOrder?.map((columnId, index) => {
                  const column = currentBoardData?.columns?.find(
                    (column) => column?.columnIdentifier === columnId
                  ) as ColumnType;

                  return (
                    <ColumnList
                      key={column?.id as string}
                      column={column as ColumnType}
                      taskMap={currentBoardData?.tasks as TaskType[]}
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
