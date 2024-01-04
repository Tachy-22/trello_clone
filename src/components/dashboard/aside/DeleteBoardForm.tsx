import { deleteBoard } from "@/actions/aside/deleteBoard";
import { Button } from "@nextui-org/react";
import { ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const DeleteBoardForm = ({
  board,
  onClose,
}: {
  board: BoardDataType;
  onClose: () => void;
}) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleBoardDeletion = useCallback(() => {
    setDeleting(true);
    deleteBoard(board?.id as string, board?.authorId as string)
      .then(() => {
        router.push(`view` );
      })
      .then(() => {
        setDeleting(false);
        onClose();
      });
  }, [board?.authorId, board?.id, onClose, router]);

  return (
    <div>
      {!deleteStatus ? (
        <div className="flex items-center">
          <h2 className="w-full pb-4 p-2 italic font-semibold text-gray-900 dark:text-white">
            Delete this board?
          </h2>
          <div
            onClick={() => {
              setDeleteStatus(true);
            }}
            className=" hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-100 rounded-md cursor-pointer p-2 w-full justify-between flex items-center"
          >
            Delete board
            <ChevronRight />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full gap-4">
            <p className=" text-red-400">
              You can not find or reopen closed boards. Deletion is permanent !!
            </p>

            <Button
              isLoading={deleting}
              onPress={handleBoardDeletion}
              className="bg-red-600 text-white "
              radius="sm"
              startContent={deleting ? <></> : <Trash2 size={18} />}
            >
              Delete board
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteBoardForm;
