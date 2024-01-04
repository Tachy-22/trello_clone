import { updateColumnOrderInDb } from "@/actions/board/updateColumnOrderInDb";
import { updateCurrentBoardData } from "@/lib/redux-toolkit/boardSlice";
import { useAppDispatch } from "@/lib/redux-toolkit/hooks";
import { useEffect } from "react";

const useCurentBoardStateUpdate = (boardData: BoardDataType) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initialColumnOrder = boardData?.columns?.map(
      (column) => column?.columnIdentifier
    ) as string[];
    boardData?.columnOrder.length !== boardData?.columns?.length &&
      updateColumnOrderInDb(
        boardData?.id as string,
        boardData?.authorId as string,
        initialColumnOrder
      );
    dispatch(updateCurrentBoardData(boardData));
  }, [boardData, dispatch]);
  return;
};

export default useCurentBoardStateUpdate;
