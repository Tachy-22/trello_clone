import { Skeleton } from "@nextui-org/react";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="backdrop-blur-2xl px-[2rem] py-[1rem] w-fit ">
        <Skeleton className=" rounded-lg  w-[10rem] h-[2rem]" />
      </div>
      <Skeleton className=" m-2  w-full h-full" />
    </div>
  );
};

export default loading;
