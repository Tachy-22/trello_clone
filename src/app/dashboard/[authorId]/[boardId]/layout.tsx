import React from "react";

const DashBoardLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full  h-full ">
      <div className="flex overflow-x-auto  my-auto h-full  w-full">
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
