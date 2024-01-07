import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useIsABoardMember = (boardData: BoardDataType) => {
  const router = useRouter();
  const { userDbData } = useAppSelector((state) => state.board);
  useEffect(() => {
    const isAMember =
      boardData?.members?.filter((member) => member === userDbData?.email)
        .length !== 0 || boardData?.authorId === userDbData?.id;
    if (!isAMember && userDbData !== null) {
      toast("You do not have access to this board");
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
