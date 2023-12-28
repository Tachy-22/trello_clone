import React from "react";
import NewColumnForm from "./NewColumnForm";
import { PlusIcon } from "lucide-react";
const NewColumnWidget = () => {
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const toggleFormOpen = () => {
    setIsFormVisible(true);
  };
  const toggleFormClose = () => {
    setIsFormVisible(false);
  };
  return (
    <div className="w-[18rem]">
      {isFormVisible ? (
        <NewColumnForm onClose={toggleFormClose} />
      ) : (
        <div
          onClick={toggleFormOpen}
          className="flex gap-2 h-fit cursor-pointer  rounded-lg p-3  bg-black/10 hover:bg-black/5 items-center text-white"
        >
          {" "}
          <span className=" text-sm font-semibold ">
            <PlusIcon />
          </span>
          <p className="">Add another list</p>
        </div>
      )}
    </div>
  );
};

export default NewColumnWidget;
