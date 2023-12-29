import React from "react";

import AddTaskForm from "./AddTaskForm";
import { PlusIcon } from "lucide-react";

const AddTask = ({columnId}:{columnId:string}) => {
  const [isFormVisible, setIsFormVisible] = React.useState<boolean>(false);

  const toggleFormOpen = () => {
    setIsFormVisible(true);
  };
  const toggleFormClose = () => {
    setIsFormVisible(false);
  };
  return (
    <div className=" p-2">
      {isFormVisible ? (
        <AddTaskForm columnId={columnId} onClose={toggleFormClose} />
      ) : (
        <div
          onClick={toggleFormOpen}
          className="flex gap-2 h-fit cursor-pointer  rounded-lg  p-2   hover:bg-black/5 items-center hover:text-white text-gray-500"
        >
          {" "}
          <span className=" text-sm font-semibold ">
            <PlusIcon />
          </span>
          <p className="capitalize text-sm">Add Task</p>
        </div>
      )}
    </div>
  );
};

export default AddTask;
