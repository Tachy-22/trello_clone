"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import ShareBoardForm from "@/components/dashboard/board/ShareBoardForm";
import { UserPlus } from "lucide-react";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";

const ShareBoardButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userDbData, currentBoardData } = useAppSelector(
    (state) => state.board
  );

  const conditionForFormRender = userDbData?.id === currentBoardData?.authorId;
  
  return (
    <div className="flex  items-center">
      <Button size="sm" color="default" onPress={onOpen} radius="sm">
        <UserPlus size={12} />
        <p className=" py-1 text-md ">Share</p>
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share board
              </ModalHeader>
              <ModalBody>
                {conditionForFormRender ? (
                  <ShareBoardForm />
                ) : (
                  <p className="text-red-400">
                    You can not share this board since you are not an admin !.
                  </p>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareBoardButton;
