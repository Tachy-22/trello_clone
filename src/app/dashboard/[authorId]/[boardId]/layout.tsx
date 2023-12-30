import React from "react";

const DashBoardLayout = (props: {
//  board: React.ReactNode;
 // nav: React.ReactNode;
   children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full  h-full ">
      <div className="flex overflow-x-auto  my-auto h-full  w-full">
        {/* {props.nav} */}
        {/* {props.board} */}
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
