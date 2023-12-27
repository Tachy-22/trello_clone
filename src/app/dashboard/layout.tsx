import React from "react";

const DashBoardLayout = (props: {
  children: React.ReactNode;
  nav: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col bg-green-400  h-full ">
      <div className="flex bg-purple-600  my-auto h-full fixed w-full" >
        {props.nav}
        {props.children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
