import { useAppSelector } from "@/lib/redux-toolkit/hooks";
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

    if (!isAMember) {
      toast("You do not have access to this board");
      router.push(`/dashboard/${userDbData?.id}/view`);
    }
  }, [
    boardData?.authorId,
    boardData?.members,
    router,
    userDbData?.email,
    userDbData?.id,
  ]);

  return;
};

export default useIsABoardMember;
