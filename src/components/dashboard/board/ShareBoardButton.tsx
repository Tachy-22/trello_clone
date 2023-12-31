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
const ShareBoardButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button size="sm" color="default" onPress={onOpen} radius="sm">
        <UserPlus size={15} />
        <p className=" py-1 text-md">Share</p>
      </Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share board
              </ModalHeader>
              <ModalBody>
                <ShareBoardForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareBoardButton;
