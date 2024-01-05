import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useIsABoardMember = (boardData: BoardDataType) => {
  const router = useRouter();
  const { userDbData } = useAppSelector((state) => state.board);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  console.log("clerk user", userDbData, isLoaded, userId, sessionId, getToken);

  useEffect(() => {
    const isAMember =
      boardData?.members?.filter((member) => member === userDbData?.email)
        .length !== 0 || boardData?.authorId === userDbData?.id;
    console.log("isAMember:", isAMember, userDbData, boardData);
    if (!isAMember && userDbData !== null) {
      toast("You do not have access to this board");
      console.log("Im pushing the undefined tin");
      router.push(`/dashboard/${userDbData?.id}/view`);
    }
  }, [
    boardData?.authorId,
    boardData?.members,
    boardData,
    router,
    userDbData?.email,
    userDbData?.id,
    userDbData,
  ]);

  return;
};

export default useIsABoardMember;
