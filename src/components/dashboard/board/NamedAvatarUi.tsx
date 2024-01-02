import { Avatar } from "@nextui-org/react";
import ShareBoardButton from "@/components/dashboard/board/ShareBoardButton";

const NamedAvatarUi = ({ name }: { name: string }) => {
  return (
    <>
      <div className="flex gap-3 items-center mr-3">
        <Avatar
          classNames={{
            base: "bg-gradient-to-br lg:text-xl text-lg  from-[#FFB457] to-[#FF705B]",
          }}
          name={name
            ?.split(" ")
            ?.map((name) => name[0])
            ?.join("")}
        />
      </div>
    </>
  );
};

export default NamedAvatarUi;
