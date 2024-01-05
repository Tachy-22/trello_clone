import { deleteColumn } from "@/actions/column/deleteColumn";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const ColumnMenu = ({ column }: { column: ColumnType }) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const { currentBoardData } = useAppSelector((state) => state.board);

  const handleBoardDeletion = useCallback(() => {
    setDeleting(true);
    const updatedColumnOrder = currentBoardData?.columnOrder?.filter(
      (columnIdentifier) => columnIdentifier !== column.columnIdentifier
    ) as string[];

    deleteColumn(
      column?.id as string,
      currentBoardData?.id as string,
      updatedColumnOrder
    ).then(() => {
      setDeleting(false);
    });
  }, [
    currentBoardData?.id,
    column?.id,
    currentBoardData?.columnOrder,
    column.columnIdentifier,
  ]);

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
