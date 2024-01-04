import { updateColumnOrderInDb } from "@/actions/board/updateColumnOrderInDb";
import { updateTaskIdsInDb } from "@/actions/task/updateTaskIdsInDb";
import {
  updateColumnOrder,
  updateColumns,
  updateCurrentBoardData,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hooks";
import { DropResult } from "@hello-pangea/dnd";
import { useCallback } from "react";

const useDragDropContext = (boardData: BoardDataType) => {
  const dispatch = useAppDispatch();
  const { currentBoardData } = useAppSelector((state) => state.board);
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
        const newColumnOrder = Array.from(
          currentBoardData?.columnOrder as string[]
        );

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

      const home = currentBoardData?.columns?.find((column) => {
        return column?.columnIdentifier === source.droppableId;
      }) as ColumnType;

      const foreign = currentBoardData?.columns?.find(
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

        const filteredColumns = currentBoardData?.columns?.filter(
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
        const filteredColumns = currentBoardData?.columns?.filter((column) => {
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
    [boardData?.id, boardData?.authorId, dispatch, currentBoardData]
  );
  return { currentBoardData, onDragEnd };
};

export default useDragDropContext;
