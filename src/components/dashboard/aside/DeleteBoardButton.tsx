import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MoreHorizontal } from "lucide-react";
import DeleteBoardForm from "./DeleteBoardForm";

const DeleteBoardButton = ({
  board,
  type,
}: {
  board: BoardDataType;
  type: "delete" | "exit";
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        isIconOnly
        variant="light"
        color="default"
        onPress={onOpen}
      >
        <MoreHorizontal size={15} />
      </Button>
      <Modal
        placement="bottom-center"
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {board?.title}
              </ModalHeader>
              <ModalBody>
                <DeleteBoardForm type={type} board={board} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBoardButton;
