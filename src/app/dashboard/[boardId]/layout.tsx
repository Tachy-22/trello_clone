import React from "react";

const DashBoardLayout = (props: {
  board: React.ReactNode;
  nav: React.ReactNode;
  //  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col   h-full ">
      <div className="flex overflow-x-auto  my-auto h-full fixed w-full">
        {props.nav}
        {props.board}
        {/* {props.children} */}
      </div>
    </div>
  );
};

export default DashBoardLayout;
