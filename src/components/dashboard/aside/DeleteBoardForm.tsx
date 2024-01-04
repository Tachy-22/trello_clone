import { deleteBoard } from "@/actions/aside/deleteBoard";
import { exitInviteBoard } from "@/actions/aside/exitInvitedBoard";
import { updateBoardMembers } from "@/actions/board/updateBoardMembers";
import {
  updateInvitedBoards,
  updateUserDbData,
} from "@/lib/redux-toolkit/boardSlice";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { Button } from "@nextui-org/react";
import { ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const DeleteBoardForm = ({
  board,
  onClose,
  type,
}: {
  board: BoardDataType;
  type: string;
  onClose: () => void;
}) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { userDbData, boardList, currentBoardData, invitedBoards } =
    useAppSelector((state) => state.board);
  console.log("currentBoardData?.id as string", board?.id as string);
  const handleBoardDeletion = useCallback(() => {
    setDeleting(true);
    const updatedInvites = userDbData?.invites?.filter(
      (id) => id !== (board?.id as string)
    ) as string[];
    console.log("updatedInvites :", updatedInvites);
    {
      type === "delete"
        ? deleteBoard(board?.id as string, board?.authorId as string)
            .then(() => {
              router.push(`view`);
            })
            .then(() => {
              setDeleting(false);
              onClose();
            })
        : exitInviteBoard(userDbData?.email as string, updatedInvites)
            .then(() => {
              const updatedMembersList = board?.members?.filter(
                (email) => email !== userDbData?.email
              );
              updateBoardMembers(
                board?.id as string,
                board?.authorId,
                updatedMembersList
              );
              const updatedInvitedBoardList = invitedBoards?.filter(
                (b) => b?.id !== board?.id
              ) as BoardDataType[];
              dispatch(updateInvitedBoards(updatedInvitedBoardList));
              setDeleting(false);
              onClose();
            })
            .then(() => {
              router.push(`view`);
            });
    }
  }, [
    board?.authorId,
    board?.id,
    board?.members,
    dispatch,
    invitedBoards,
    onClose,
    router,
    type,
    userDbData?.email,
    userDbData?.invites,
  ]);

  return (
    <div>
      {!deleteStatus ? (
        <div className="flex items-center">
          <h2 className="w-full pb-4 p-2 italic font-semibold text-gray-900 dark:text-white">
            {type} this board?
          </h2>
          <div
            onClick={() => {
              setDeleteStatus(true);
            }}
            className=" hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-100 rounded-md cursor-pointer p-2 w-full justify-between flex items-center"
          >
            {type} board
            <ChevronRight />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full gap-4">
            <p className=" text-red-400">
              You can not find or reopen {type} boards. action is permanent !!
            </p>

            <Button
              isLoading={deleting}
              onPress={handleBoardDeletion}
              className="bg-red-600 text-white "
              radius="sm"
              startContent={deleting ? <></> : <Trash2 size={18} />}
            >
              {type} board
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteBoardForm;
