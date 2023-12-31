import { deleteColumn } from "@/actions/column/deleteColumn";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const ColumnMenu = ({
  column,
  board,
}: {
  column: ColumnType;
  board: BoardDataType;
}) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleBoardDeletion = useCallback(() => {
    setDeleting(true);
    const updatedColumnOrder = board?.columnOrder?.filter(
      (columnIdentifier) => columnIdentifier !== column.columnIdentifier
    ) as string[];
    console.log("newColumnOrder :", updatedColumnOrder);
    deleteColumn(
      column?.id as string,
      board?.id as string,
      updatedColumnOrder
    ).then(() => {
      setDeleting(false);
    });
  }, [board?.id, column?.id, board?.columnOrder, column.columnIdentifier]);

  return (
    <div>
      {!deleteStatus ? (
        <div className="flex flex-col cursor-pointer   underline-offset-2 rounded-md">
          <h2 className=" text-lg text-center">List menu</h2>
          <div
            onClick={() => {
              setDeleteStatus(true);
            }}
            className="flex  hover:border-b-gray-500 border-b border-transparent items-center justify-between"
          >
            <p className="w-full     text-gray-900 dark:text-white">
              Delete list
            </p>
            <div className="  transition-colors duration-100 rounded-md cursor-pointer p-2 w-fit justify-between flex items-center">
              <ChevronRight size={18} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full gap-4">
            <Button
              size={"sm"}
              variant="ghost"
              className=""
              isIconOnly
              onPress={() => {
                setDeleteStatus(false);
              }}
            >
              <ChevronLeft size={18} />
            </Button>

            <p className=" text-red-900 px-1 text-start">
              You can not find or reopen closed Lists. Deletion is permanent !!
            </p>

            <Button
              isLoading={deleting}
              onPress={handleBoardDeletion}
              className="bg-red-600 text-white "
              radius="sm"
              startContent={deleting ? <></> : <Trash2 size={18} />}
            >
              Delete List
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnMenu;
