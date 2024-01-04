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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useDragDropContext from "@/controls/useDragDropContext";
import useCurentBoardStateUpdate from "@/controls/useCurentBoardStateUpdate";
import useIsABoardMember from "@/controls/useIsABoardMember";

export const Board = ({ boardData }: { boardData: BoardDataType }) => {
  useIsABoardMember(boardData);
  useCurentBoardStateUpdate(boardData);
  const { currentBoardData, onDragEnd } = useDragDropContext(boardData);

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
